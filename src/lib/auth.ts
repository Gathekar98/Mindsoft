import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "./db";
import {
  SESSION_COOKIE,
  canAccess,
  roleAccess,
  sessionCookieOptions,
  signSession,
  verifySession,
} from "./session";

export async function getSession() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  // Re-check the account so deactivated users lose access immediately.
  const user = await db.user.findUnique({ where: { id: session.sub }, select: { active: true, role: true } });
  if (!user?.active) return null;
  return { ...session, role: user.role };
}

/** Use at the top of every admin page and server action. */
export async function requireSession(area?: keyof typeof roleAccess) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (area && !canAccess(session.role, area)) redirect("/admin?denied=1");
  return session;
}

// Dummy hash so failed lookups take as long as real ones (timing safety).
const DUMMY_HASH = bcrypt.hashSync("timing-safety-placeholder", 12);

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok || !user.active) return false;

  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);
  return true;
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
