const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * In-memory fixed-window limiter. Not distributed-safe across serverless
 * cold starts/instances — acceptable for a single-admin, low-traffic app.
 * See README security notes for the Upstash Redis upgrade path.
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return true;
  }

  entry.count += 1;
  return false;
}
