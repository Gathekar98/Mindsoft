"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { login, logout, requireSession } from "@/lib/auth";
import { clientFingerprint, rateLimit } from "@/lib/security";
import type { FormState } from "@/lib/validation";

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const { ipHash } = await clientFingerprint();

  if (!rateLimit(`login:${ipHash}`, 8, 15 * 60 * 1000)) {
    return { status: "error", message: "Too many attempts. Please wait 15 minutes and try again." };
  }
  if (!email || !password) return { status: "error", message: "Enter your email and password.", values: { email } };

  const ok = await login(email, password);
  if (!ok) return { status: "error", message: "Incorrect email or password.", values: { email } };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

const passwordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    next: z.string().min(10, "Use at least 10 characters").max(200),
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, { path: ["confirm"], message: "Passwords don't match" });

export async function changePasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await requireSession();
  const parsed = passwordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }
  const user = await db.user.findUniqueOrThrow({ where: { id: session.sub } });
  if (!(await bcrypt.compare(parsed.data.current, user.passwordHash))) {
    return { status: "error", message: "Current password is incorrect." };
  }
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(parsed.data.next, 12) } });
  return { status: "success", message: "Password updated." };
}
