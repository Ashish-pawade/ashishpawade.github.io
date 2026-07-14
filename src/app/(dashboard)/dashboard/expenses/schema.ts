import { z } from "zod";

export const expenseSchema = z.object({
  date: z.coerce.date(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Category is required"),
  payee: z.string().min(1, "Payee is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  note: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export type ExpenseRow = {
  id: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
  category: string;
  payee: string;
  amount: number;
  note: string | null;
};
