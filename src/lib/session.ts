/**
 * Stateless admin sessions: a signed, httpOnly JWT cookie.
 * Edge-safe (used by middleware) — no Node-only imports here.
 */
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@prisma/client";

export const SESSION_COOKIE = "ms_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export interface SessionPayload {
  sub: string; // user id
  email: string;
  name: string;
  role: Role;
}

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      name: String(payload.name),
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};

/** Which admin areas each role may use. ADMIN may use everything. */
export const roleAccess: Record<string, Role[]> = {
  leads: ["ADMIN", "SALES"],
  careers: ["ADMIN", "HR"],
  content: ["ADMIN", "EDITOR"],
  users: ["ADMIN"],
};

export function canAccess(role: Role, area: keyof typeof roleAccess) {
  return roleAccess[area].includes(role);
}
