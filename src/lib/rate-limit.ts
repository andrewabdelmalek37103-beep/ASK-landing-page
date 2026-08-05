/**
 * Minimal in-memory rate limiter for the lead-capture endpoint.
 *
 * This is intentionally simple and works for a single long-lived server process.
 * On serverless/edge platforms (Vercel included) each instance has its own memory,
 * so this does NOT provide a hard guarantee across concurrent instances.
 *
 * For production-grade protection, replace this with a shared store such as
 * Upstash Redis (`@upstash/ratelimit`) or a WAF-level rule (Vercel Firewall,
 * Cloudflare) in front of `/api/lead`.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(identifier, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}
