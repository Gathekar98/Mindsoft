import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

/** Salted hash of the client IP — we never store raw IPs. */
export async function clientFingerprint() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT ?? "dev-salt";
  return {
    ipHash: createHash("sha256").update(salt + ip).digest("hex").slice(0, 32),
    userAgent: (h.get("user-agent") ?? "").slice(0, 300),
  };
}

/**
 * Simple in-memory sliding-window rate limiter (per server instance).
 * Only SUCCESSFUL submissions are recorded, so visitors who fix validation
 * errors are never locked out. Disabled in local development.
 */
const buckets = new Map<string, number[]>();
const enabled = process.env.NODE_ENV === "production";

function recent(key: string, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  buckets.set(key, hits);
  return hits;
}

/** True when `key` already has `limit` successful submissions within the window. */
export function isRateLimited(key: string, limit: number, windowMs: number) {
  if (!enabled) return false;
  return recent(key, windowMs).length >= limit;
}

/** Record one successful submission for each key. */
export function recordSubmission(...keys: string[]) {
  if (!enabled) return;
  const now = Date.now();
  for (const k of keys) buckets.set(k, [...(buckets.get(k) ?? []), now]);
}

/** Optional Cloudflare Turnstile check. Passes when Turnstile isn't configured. */
export async function verifyTurnstile(token: string | null | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
