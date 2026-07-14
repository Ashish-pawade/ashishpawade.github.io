# ashishpawade.com

Personal portfolio + private dashboard, built as a single Next.js 15 app. The
public site (`/`, `/about`, `/skills`, `/experience`, `/projects`,
`/certifications`, `/blog`, `/contact`) is open to everyone; the dashboard
(`/dashboard/*`) is a login-gated personal tool with four independent
trackers — Expenses, Certifications, Learning, Habits.

## Tech stack

- **Next.js 15** (App Router, TypeScript, `src/` layout)
- **Neon Postgres** + **Prisma 7** (custom `prisma-client` generator, output at `src/generated/prisma`)
- **Auth.js (NextAuth) v5** — Credentials provider, JWT sessions, single admin user
- **Zod** + **react-hook-form** for all forms
- **Recharts** (expense category pie chart) + a hand-rolled GitHub-style heatmap (habits)
- **shadcn/ui** (Base UI primitives under the hood, not Radix — see note below) + Tailwind CSS
- **bcryptjs** for password hashing (pure JS, no native build step)

## Local setup

### 1. Prerequisites

- Node.js 18.18+ (any recent LTS is fine)
- A [Neon](https://neon.tech) account (free tier works) for Postgres

### 2. Create a Neon project and get both connection strings

1. Create a new Neon project.
2. In the Neon dashboard, go to **Connect** and copy:
   - The **pooled** connection string (hostname contains `-pooler`) → this is `DATABASE_URL`.
   - The **direct** connection string (same hostname, without `-pooler`) → this is `DIRECT_URL`.

Both are required: the app's runtime uses the pooled connection (via the
`@prisma/adapter-neon` driver adapter, which uses Neon's serverless
HTTP/WebSocket driver — this avoids exhausting Postgres connections on
serverless deploys). Prisma Migrate and the seed script use the direct
connection, since Neon's pooler doesn't support everything Migrate needs.

### 3. Install and configure

```bash
npm install
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` / `DIRECT_URL` — from step 2.
- `ADMIN_EMAIL` — your login email.
- `ADMIN_PASSWORD_HASH` — see below.
- `AUTH_SECRET` — generate with `npx auth secret` or `openssl rand -base64 32`.

### 4. Generate the admin password hash

```bash
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" "your-password-here"
```

Paste the output into `ADMIN_PASSWORD_HASH`.

**Important — escaping `$` in `.env`:** bcrypt hashes look like
`$2b$12$abc...`. Next.js's built-in env loader treats `$name` as a variable
reference and will silently mangle the hash unless you escape every `$` as
`\$`:

```
ADMIN_PASSWORD_HASH="\$2b\$12\$abc..."
```

`.env.example` already shows this format. (Plain `dotenv`, used by
`prisma.config.ts` and `prisma/seed.ts`, does *not* do this expansion or
unescaping — `src/lib/env.ts` normalizes both cases so the same `.env` value
works everywhere regardless of which loader reads it.)

### 5. Run migrations and seed

```bash
npx prisma migrate dev
npx prisma db seed
```

This creates the admin user and a few sample rows in each tracker
(including a couple of certification entries ported from the real
portfolio content, and a Ram → Food vendor alias to demo the expense
autofill).

### 6. Run it

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site, or `http://localhost:3000/login` to sign in to the dashboard.

## Switching Postgres providers

Neon is the default and recommended target (it's what the driver adapter in
`src/lib/prisma.ts` is written for). To point at a different Postgres
provider:

1. Update `DATABASE_URL` / `DIRECT_URL` in `.env` to the new provider's
   connection strings.
2. If the new provider doesn't need connection pooling (e.g. a
   traditional long-lived Postgres server), you can simplify
   `src/lib/prisma.ts` to construct `PrismaClient` directly instead of via
   `PrismaNeon` — but for anything serverless-deployed, keeping a pooling
   adapter is strongly recommended.

### Fully offline dev (no Postgres) — documented fallback, not the default

Prisma doesn't support enums on SQLite, so this isn't a one-line swap. If
you need to develop fully offline: change `datasource db { provider =
"sqlite" }` in `prisma/schema.prisma`, convert every enum field (e.g.
`TransactionType`, `CertStatus`) to `String` with Zod-level validation
instead, change `Expense.amount` from `Decimal` to a scaled `Int` (paise),
and change `HabitEntry.date` from `@db.Date` to `DateTime`. This is more
work than a config change — the Postgres/Neon path is the one actually
built and tested here.

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon pooled connection string. Used by the app at runtime via the Neon driver adapter. |
| `DIRECT_URL` | Neon direct (unpooled) connection string. Used by Prisma Migrate and the seed script only. |
| `ADMIN_EMAIL` | Login email for the single admin user. |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of the admin password (never plaintext). See generation steps above. |
| `AUTH_SECRET` | Auth.js session signing secret. |

## Deploying to Vercel

1. Push this repo to GitHub (or import directly from Vercel's dashboard).
2. In Vercel, import the project.
3. Add all five environment variables above in Vercel's Project Settings → Environment Variables.
4. Deploy. Vercel auto-detects Next.js — no custom build command needed.

## Pointing www.ashishpawade.com at Vercel

1. In Vercel: Project Settings → Domains → add `ashishpawade.com` and `www.ashishpawade.com`.
2. Vercel will show the DNS records to add (typically an `A` record for the
   apex domain and a `CNAME` for `www`). Add these at your DNS
   registrar (Namecheap, per the domain's original GitHub Pages setup).
3. Once DNS propagates and Vercel shows the domain as verified, **turn off
   GitHub Pages** for this repo (Settings → Pages → set source to "None")
   so two hosts aren't both claiming the domain.

The `CNAME` file at the repo root is a leftover from the old GitHub Pages
setup — Vercel doesn't read it (domain binding lives in Vercel's dashboard
+ your DNS provider). It's harmless to leave in place as a historical
reference, or you can delete it once the migration is complete.

## Project structure

```
src/
  app/
    (public)/        # public portfolio route group — no auth
    (auth)/login/     # standalone login page (public, outside the dashboard shell)
    (dashboard)/
      layout.tsx      # session check + sidebar shell
      dashboard/
        page.tsx      # portal landing (module shortcut cards)
        expenses/      # each tracker: page.tsx, actions.ts, schema.ts, components/
        certifications/
        learning/
        habits/
    api/auth/[...nextauth]/route.ts
  components/
    ui/               # shadcn-generated primitives
    public/           # nav, footer, section heading
    dashboard/        # sidebar, shell, sign-out button
  data/               # typed content for the public site (no CMS/DB)
  lib/                # prisma client, env validation, auth config, rate limiter
prisma/
  schema.prisma
  seed.ts
middleware.ts          # note: lives in src/, required by the src/ dir layout
```

**Adding a 5th dashboard module** is meant to be a copy-paste of one
tracker folder (e.g. duplicate `learning/`, rename, adjust its Prisma
model and Zod schema) plus one new link in
`src/components/dashboard/sidebar.tsx`. Trackers deliberately don't share a
generic CRUD abstraction — each `actions.ts` is self-contained.

## Security notes

- **Security headers** (CSP, HSTS, X-Frame-Options, etc.) are set in
  `next.config.ts`. The CSP's `script-src` allows `'unsafe-eval'` **only in
  development** (Next.js's dev-mode Fast Refresh requires it) — production
  builds never include it. `'unsafe-inline'` on script/style is a
  deliberate MVP concession for Next.js/Tailwind hydration; a nonce-based
  CSP is the natural next hardening step.
- **CSRF**: no custom middleware. Auth.js v5 handles CSRF on its own
  sign-in endpoint, and every tracker mutation goes through a Next.js
  Server Action, which the framework already origin-checks per request.
- **Login rate limiting** (`src/lib/rate-limit.ts`) is a simple in-memory
  fixed-window limiter (5 attempts / 60s per IP). It is **not
  distributed-safe** — it resets on cold start and doesn't share state
  across serverless instances. Fine for a single-admin, low-traffic app;
  if that ever changes, swap in Upstash Ratelimit (Redis-backed) as a
  drop-in replacement.
- **Middleware location**: because this project uses a `src/` directory,
  `middleware.ts` must live at `src/middleware.ts`, not the repo root —
  Next.js silently ignores it at the wrong location (no build error, no
  route protection). Worth remembering if this ever gets restructured.
- This project uses **Prisma 7**, whose Neon integration works through the
  `@prisma/adapter-neon` driver adapter rather than a plain connection
  string — Prisma 7 removed schema-level `directUrl` entirely, so the
  pooled/direct split now happens across `prisma.config.ts` (direct, for
  Migrate) and `src/lib/prisma.ts` (pooled, via the adapter, for runtime).
- This project's **shadcn/ui setup uses [Base UI](https://base-ui.com)**
  primitives, not Radix — a newer shadcn style. The practical difference:
  polymorphic components use a `render={<Target />}` prop instead of
  Radix's `asChild`, and the target element should have no children of its
  own (the wrapping component's children get merged in). Worth knowing
  before copying patterns from older shadcn/Radix examples online.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also runs type checking + linting) |
| `npm run start` | Run a production build |
| `npm run lint` | Lint only |
| `npx prisma studio` | Browse the database |
| `npx prisma migrate dev` | Create/apply a migration |
| `npx prisma db seed` | Re-run the seed script (idempotent) |
