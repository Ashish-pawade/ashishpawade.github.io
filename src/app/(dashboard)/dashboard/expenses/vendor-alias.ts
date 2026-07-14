"use server";

import { prisma } from "@/lib/prisma";

export async function lookupVendorAlias(rawString: string) {
  if (!rawString.trim()) return null;
  return prisma.vendorAlias.findUnique({ where: { rawString: rawString.trim() } });
}
