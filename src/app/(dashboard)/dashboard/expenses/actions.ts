"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { expenseSchema } from "./schema";

export type ExpenseFilters = { search?: string; category?: string; month?: string };

function monthRange(month: string) {
  const [y, m] = month.split("-").map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);
  return { start, end };
}

function buildWhere(filters: ExpenseFilters) {
  const where: Record<string, unknown> = {};
  if (filters.category) where.category = filters.category;
  if (filters.search) {
    where.OR = [
      { payee: { contains: filters.search, mode: "insensitive" } },
      { note: { contains: filters.search, mode: "insensitive" } },
    ];
  }
  if (filters.month) {
    const { start, end } = monthRange(filters.month);
    where.date = { gte: start, lt: end };
  }
  return where;
}

export async function getExpenses(filters: ExpenseFilters = {}) {
  const expenses = await prisma.expense.findMany({
    where: buildWhere(filters),
    orderBy: { date: "desc" },
  });
  return expenses.map((e) => ({ ...e, amount: Number(e.amount.toString()) }));
}

export async function getExpenseCategories() {
  const rows = await prisma.expense.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}

export async function getMonthlySummary(month: string) {
  const { start, end } = monthRange(month);
  const rows = await prisma.expense.findMany({ where: { date: { gte: start, lt: end } } });

  let income = 0;
  let expense = 0;
  for (const r of rows) {
    const amt = Number(r.amount.toString());
    if (r.type === "INCOME") income += amt;
    else expense += amt;
  }
  const savings = income - expense;
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;
  return { income, expense, savings, savingsRate };
}

export async function getCategoryBreakdown(month: string) {
  const { start, end } = monthRange(month);
  const rows = await prisma.expense.findMany({
    where: { date: { gte: start, lt: end }, type: "EXPENSE" },
  });

  const totals = new Map<string, number>();
  for (const r of rows) {
    const amt = Number(r.amount.toString());
    totals.set(r.category, (totals.get(r.category) ?? 0) + amt);
  }
  return Array.from(totals.entries()).map(([category, value]) => ({ category, value }));
}

export async function createExpense(input: unknown) {
  const data = expenseSchema.parse(input);
  await prisma.expense.create({ data });
  revalidatePath("/dashboard/expenses");
}

export async function updateExpense(id: string, input: unknown) {
  const data = expenseSchema.parse(input);
  await prisma.expense.update({ where: { id }, data });
  revalidatePath("/dashboard/expenses");
}

export async function deleteExpense(id: string) {
  await prisma.expense.delete({ where: { id } });
  revalidatePath("/dashboard/expenses");
}
