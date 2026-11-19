"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma, type PublishStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { postSchema, projectSchema } from "@/lib/admin-validation";
import { flattenErrors, type FormState } from "@/lib/validation";

function uniqueError(e: unknown, raw: Record<string, string>): FormState | null {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
    return { status: "error", message: "That slug is already in use.", fieldErrors: { slug: "Slug must be unique" }, values: raw };
  }
  return null;
}

// ---------------- Posts ----------------

export async function savePost(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession("content");
  const id = formData.get("id") ? String(formData.get("id")) : null;
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: raw };
  let newId: string | null = null;
  try {
    const post = id ? await db.post.update({ where: { id }, data: parsed.data }) : await db.post.create({ data: parsed.data });
    newId = id ? null : post.id;
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
  } catch (e) {
    const err = uniqueError(e, raw);
    if (err) return err;
    throw e;
  }
  if (newId) redirect(`/admin/posts/${newId}?created=1`);
  return { status: "success", message: "Post saved." };
}

export async function setPostStatus(formData: FormData) {
  await requireSession("content");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as PublishStatus;
  if (status !== "DRAFT" && status !== "PUBLISHED") return;
  const current = await db.post.findUniqueOrThrow({ where: { id } });
  const post = await db.post.update({ where: { id }, data: { status, ...(status === "PUBLISHED" && !current.publishedAt ? { publishedAt: new Date() } : {}) } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath(`/admin/posts/${id}`);
}

export async function deletePost(formData: FormData) {
  await requireSession("content");
  const post = await db.post.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/posts");
}

// ---------------- Projects ----------------

export async function saveProject(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession("content");
  const id = formData.get("id") ? String(formData.get("id")) : null;
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: raw };
  let newId: string | null = null;
  try {
    const p = id ? await db.project.update({ where: { id }, data: parsed.data }) : await db.project.create({ data: parsed.data });
    newId = id ? null : p.id;
    revalidatePath("/work");
    revalidatePath(`/work/${p.slug}`);
  } catch (e) {
    const err = uniqueError(e, raw);
    if (err) return err;
    throw e;
  }
  if (newId) redirect(`/admin/projects/${newId}?created=1`);
  return { status: "success", message: "Project saved." };
}

export async function setProjectStatus(formData: FormData) {
  await requireSession("content");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as PublishStatus;
  if (status !== "DRAFT" && status !== "PUBLISHED") return;
  const current = await db.project.findUniqueOrThrow({ where: { id } });
  const p = await db.project.update({ where: { id }, data: { status, ...(status === "PUBLISHED" && !current.publishedAt ? { publishedAt: new Date() } : {}) } });
  revalidatePath("/work");
  revalidatePath(`/work/${p.slug}`);
  revalidatePath(`/admin/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  await requireSession("content");
  const p = await db.project.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/work");
  revalidatePath(`/work/${p.slug}`);
  redirect("/admin/projects");
}
