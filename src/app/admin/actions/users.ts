"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { Prisma, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { userSchema } from "@/lib/admin-validation";
import { flattenErrors, type FormState } from "@/lib/validation";

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession("users");
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = userSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: { ...raw, password: "" } };
  const { password, ...data } = parsed.data;
  try {
    await db.user.create({ data: { ...data, passwordHash: await bcrypt.hash(password, 12) } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { status: "error", message: "A user with that email already exists.", fieldErrors: { email: "Already in use" }, values: { ...raw, password: "" } };
    }
    throw e;
  }
  revalidatePath("/admin/users");
  return { status: "success", message: `User ${data.email} created. Share the temporary password securely and ask them to change it.` };
}

export async function updateUser(formData: FormData) {
  const session = await requireSession("users");
  const id = String(formData.get("id"));
  const role = String(formData.get("role")) as Role;
  const active = formData.get("active") === "on";
  if (!Object.values(Role).includes(role)) return;
  // Prevent locking yourself out.
  if (id === session.sub && (role !== "ADMIN" || !active)) return;
  await db.user.update({ where: { id }, data: { role, active } });
  revalidatePath("/admin/users");
}
