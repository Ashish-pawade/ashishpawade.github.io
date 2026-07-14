"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { certificationSchema } from "./schema";

function toDbInput(input: unknown) {
  const parsed = certificationSchema.parse(input);
  return {
    name: parsed.name,
    status: parsed.status,
    examDate: parsed.examDate ? new Date(parsed.examDate) : null,
    expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate) : null,
    score: parsed.score || null,
    certificateUrl: parsed.certificateUrl || null,
    notes: parsed.notes || null,
  };
}

export async function getCertifications() {
  return prisma.certification.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createCertification(input: unknown) {
  const data = toDbInput(input);
  await prisma.certification.create({ data });
  revalidatePath("/dashboard/certifications");
}

export async function updateCertification(id: string, input: unknown) {
  const data = toDbInput(input);
  await prisma.certification.update({ where: { id }, data });
  revalidatePath("/dashboard/certifications");
}

export async function deleteCertification(id: string) {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/dashboard/certifications");
}
