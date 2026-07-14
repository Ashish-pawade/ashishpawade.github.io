import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";

async function main() {
  await prisma.user.upsert({
    where: { email: env.ADMIN_EMAIL },
    update: { passwordHash: env.ADMIN_PASSWORD_HASH },
    create: { email: env.ADMIN_EMAIL, passwordHash: env.ADMIN_PASSWORD_HASH },
  });

  const certifications: {
    name: string;
    status: "PREPARING" | "PLANNED" | "COMPLETED" | "RENEW";
    examDate?: Date;
    expiryDate?: Date;
    score?: string;
    notes?: string;
  }[] = [
    {
      name: "GATE 2025 — Computer Science",
      status: "COMPLETED",
      examDate: new Date("2025-02-01"),
      score: "678",
    },
    {
      name: "M.Tech — Computer Science & Engineering (IIT Dharwad)",
      status: "PREPARING",
      notes: "In progress, expected Jun 2027",
    },
    { name: "eWPTXv2 / OSCP", status: "PLANNED" },
    { name: "CompTIA Security+ / CEH", status: "PLANNED" },
    { name: "ISO 27001 Lead Implementer", status: "PLANNED" },
    { name: "CISM / CISA", status: "PLANNED" },
  ];

  for (const cert of certifications) {
    const existing = await prisma.certification.findFirst({ where: { name: cert.name } });
    if (existing) {
      await prisma.certification.update({ where: { id: existing.id }, data: cert });
    } else {
      await prisma.certification.create({ data: cert });
    }
  }

  const vendorAliases = [
    { rawString: "Ram", canonicalVendor: "Ram's Mess", defaultCategory: "Food" },
    { rawString: "Zomato", canonicalVendor: "Zomato", defaultCategory: "Food" },
    { rawString: "IRCTC", canonicalVendor: "Indian Railways", defaultCategory: "Travel" },
  ];

  for (const alias of vendorAliases) {
    await prisma.vendorAlias.upsert({
      where: { rawString: alias.rawString },
      update: alias,
      create: alias,
    });
  }

  const today = new Date();
  const daysAgo = (n: number) => new Date(today.getTime() - n * 24 * 60 * 60 * 1000);

  const expenses: {
    date: Date;
    type: "INCOME" | "EXPENSE";
    category: string;
    payee: string;
    amount: number;
    note?: string;
  }[] = [
    {
      date: daysAgo(1),
      type: "EXPENSE",
      category: "Food",
      payee: "Ram",
      amount: 150,
      note: "Lunch",
    },
    {
      date: daysAgo(3),
      type: "EXPENSE",
      category: "Travel",
      payee: "IRCTC",
      amount: 850,
      note: "Train ticket Pune-Dharwad",
    },
    {
      date: daysAgo(5),
      type: "EXPENSE",
      category: "Utilities",
      payee: "BSNL",
      amount: 499,
    },
    {
      date: daysAgo(7),
      type: "INCOME",
      category: "Salary",
      payee: "IPPB",
      amount: 65000,
      note: "Monthly salary",
    },
    {
      date: daysAgo(10),
      type: "EXPENSE",
      category: "Food",
      payee: "Zomato",
      amount: 320,
    },
  ];

  const existingExpenses = await prisma.expense.count();
  if (existingExpenses === 0) {
    await prisma.expense.createMany({ data: expenses });
  }

  const learningItems: {
    title: string;
    provider: "NPTEL" | "UDEMY" | "COURSERA" | "YOUTUBE" | "BOOK" | "OTHER";
    status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "PAUSED";
    progressPercent: number;
    hoursSpent: number;
    link?: string;
  }[] = [
    {
      title: "Deep Learning Specialization",
      provider: "COURSERA",
      status: "IN_PROGRESS",
      progressPercent: 45,
      hoursSpent: 18,
    },
    {
      title: "NPTEL — Computer Architecture",
      provider: "NPTEL",
      status: "IN_PROGRESS",
      progressPercent: 60,
      hoursSpent: 24,
    },
    {
      title: "OWASP Top 10 Deep Dive",
      provider: "YOUTUBE",
      status: "COMPLETED",
      progressPercent: 100,
      hoursSpent: 6,
    },
  ];

  const existingLearning = await prisma.learning.count();
  if (existingLearning === 0) {
    await prisma.learning.createMany({ data: learningItems });
  }

  const habitNames = ["Read for 30 minutes", "Exercise"];
  for (const name of habitNames) {
    let habit = await prisma.habit.findFirst({ where: { name } });
    if (!habit) {
      habit = await prisma.habit.create({ data: { name } });
    }

    for (let i = 0; i < 14; i++) {
      const date = new Date(daysAgo(i).toDateString());
      await prisma.habitEntry.upsert({
        where: { habitId_date: { habitId: habit.id, date } },
        update: {},
        create: { habitId: habit.id, date, done: i % 3 !== 0 },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
