import { z } from "zod";

export const learningSchema = z.object({
  title: z.string().min(1, "Title is required"),
  provider: z.enum(["NPTEL", "UDEMY", "COURSERA", "YOUTUBE", "BOOK", "OTHER"]),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "PAUSED"]),
  progressPercent: z.coerce.number().min(0).max(100),
  hoursSpent: z.coerce.number().min(0),
  link: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
  notes: z.string().optional(),
});

export type LearningFormValues = z.infer<typeof learningSchema>;

export type LearningRow = {
  id: string;
  title: string;
  provider: "NPTEL" | "UDEMY" | "COURSERA" | "YOUTUBE" | "BOOK" | "OTHER";
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "PAUSED";
  progressPercent: number;
  hoursSpent: number;
  link: string | null;
  notes: string | null;
};
