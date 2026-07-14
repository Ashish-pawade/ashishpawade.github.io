import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required (Neon pooled connection string)"),
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required (Neon direct connection string)"),
  ADMIN_EMAIL: z.email("ADMIN_EMAIL must be a valid email"),
  ADMIN_PASSWORD_HASH: z.string().min(1, "ADMIN_PASSWORD_HASH is required (bcrypt hash)"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
});

// Next.js's built-in env loader expands `$name` sequences, so bcrypt hashes
// (full of literal `$`) must be escaped as `\$` in .env — Next unescapes
// those back to `$` after loading. Plain `dotenv` (used by prisma.config.ts
// and prisma/seed.ts, which aren't loaded through Next) does not perform
// that unescaping, so the same .env value can arrive here containing literal
// backslashes depending on which loader ran. Normalizing here covers both.
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.replace(/\\\$/g, "$");

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH: adminPasswordHash,
  AUTH_SECRET: process.env.AUTH_SECRET,
});
