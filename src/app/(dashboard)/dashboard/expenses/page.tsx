import { Suspense } from "react";
import {
  getExpenses,
  getExpenseCategories,
  getMonthlySummary,
  getCategoryBreakdown,
} from "./actions";
import { ExpenseTable } from "./components/expense-table";
import { ExpenseFormDialog } from "./components/expense-form-dialog";
import { ExpenseFilters } from "./components/expense-filters";
import { MonthlySummaryCards } from "./components/monthly-summary-cards";
import { CategoryPieChart } from "./components/category-pie-chart";
import { Button } from "@/components/ui/button";

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; month?: string }>;
}) {
  const params = await searchParams;
  const month = params.month || currentMonth();

  const [expenses, categories, summary, breakdown] = await Promise.all([
    getExpenses({ search: params.search, category: params.category, month: params.month }),
    getExpenseCategories(),
    getMonthlySummary(month),
    getCategoryBreakdown(month),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Expenses</h1>
        <ExpenseFormDialog mode="create" trigger={<Button>Add expense</Button>} />
      </div>

      <MonthlySummaryCards {...summary} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Suspense>
            <ExpenseFilters categories={categories} />
          </Suspense>
          <ExpenseTable expenses={expenses} />
        </div>
        <div className="rounded-md border p-4">
          <h2 className="mb-2 text-sm font-medium">Spending by category</h2>
          <CategoryPieChart data={breakdown} />
        </div>
      </div>
    </div>
  );
}
