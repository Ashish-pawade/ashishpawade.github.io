import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type HabitFormValues = z.infer<typeof habitSchema>;

export type HabitWithEntries = {
  id: string;
  name: string;
  createdAt: Date;
  entries: { date: Date; done: boolean }[];
};
