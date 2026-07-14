import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config (no Prisma/bcrypt) — consumed by both the full
 * auth.ts (Node runtime, adds the Credentials provider) and middleware.ts
 * (Edge runtime, only needs to read/verify the JWT session).
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
