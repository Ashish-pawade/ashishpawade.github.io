"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { habitSchema } from "./schema";
import { todayAsUtcMidnight } from "./date-utils";

export async function getHabitsWithEntries() {
  const sixteenWeeksAgo = new Date(Date.now() - 16 * 7 * 24 * 60 * 60 * 1000);
  return prisma.habit.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      entries: {
        where: { date: { gte: sixteenWeeksAgo } },
        orderBy: { date: "asc" },
      },
    },
  });
}

export async function createHabit(input: unknown) {
  const data = habitSchema.parse(input);
  await prisma.habit.create({ data });
  revalidatePath("/dashboard/habits");
}

export async function deleteHabit(id: string) {
  await prisma.habit.delete({ where: { id } });
  revalidatePath("/dashboard/habits");
}

export async function toggleTodayEntry(habitId: string) {
  const today = todayAsUtcMidnight();
  const existing = await prisma.habitEntry.findUnique({
    where: { habitId_date: { habitId, date: today } },
  });

  if (existing) {
    await prisma.habitEntry.update({
      where: { id: existing.id },
      data: { done: !existing.done },
    });
  } else {
    await prisma.habitEntry.create({
      data: { habitId, date: today, done: true },
    });
  }
  revalidatePath("/dashboard/habits");
}
