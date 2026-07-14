const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Calendar date string (YYYY-MM-DD) for the given instant, in Asia/Kolkata. */
export function toISTDateString(date: Date = new Date()): string {
  const ist = new Date(date.getTime() + IST_OFFSET_MS);
  return `${ist.getUTCFullYear()}-${String(ist.getUTCMonth() + 1).padStart(2, "0")}-${String(
    ist.getUTCDate()
  ).padStart(2, "0")}`;
}

/** A Date representing UTC midnight of the given IST calendar day — matches
 * how Prisma's @db.Date column stores/compares dates. */
export function istDateStringToUtcMidnight(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000Z`);
}

export function todayAsUtcMidnight(): Date {
  return istDateStringToUtcMidnight(toISTDateString());
}
