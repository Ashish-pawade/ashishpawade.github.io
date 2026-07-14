"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { learningSchema } from "./schema";

function toDbInput(input: unknown) {
  const parsed = learningSchema.parse(input);
  return {
    title: parsed.title,
    provider: parsed.provider,
    status: parsed.status,
    progressPercent: parsed.progressPercent,
    hoursSpent: parsed.hoursSpent,
    link: parsed.link || null,
    notes: parsed.notes || null,
  };
}

export async function getLearningItems() {
  return prisma.learning.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createLearning(input: unknown) {
  const data = toDbInput(input);
  await prisma.learning.create({ data });
  revalidatePath("/dashboard/learning");
}

export async function updateLearning(id: string, input: unknown) {
  const data = toDbInput(input);
  await prisma.learning.update({ where: { id }, data });
  revalidatePath("/dashboard/learning");
}

export async function deleteLearning(id: string) {
  await prisma.learning.delete({ where: { id } });
  revalidatePath("/dashboard/learning");
}
