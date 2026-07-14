import { z } from "zod";

export const certificationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["PREPARING", "PLANNED", "COMPLETED", "RENEW"]),
  examDate: z.string().optional(),
  expiryDate: z.string().optional(),
  score: z.string().optional(),
  certificateUrl: z.union([z.literal(""), z.string().url("Must be a valid URL")]).optional(),
  notes: z.string().optional(),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;

export type CertificationRow = {
  id: string;
  name: string;
  status: "PREPARING" | "PLANNED" | "COMPLETED" | "RENEW";
  examDate: Date | null;
  expiryDate: Date | null;
  score: string | null;
  certificateUrl: string | null;
  notes: string | null;
};
