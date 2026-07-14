// Prisma 7: connection URLs live here, not in schema.prisma.
// DIRECT_URL (unpooled) is used by Migrate/introspection; the app runtime
// connects separately via the Neon driver adapter using the pooled
// DATABASE_URL — see src/lib/prisma.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DIRECT_URL"],
  },
});
