"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApplicationStatus, JobStatus, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { deleteResume } from "@/lib/storage";
import { jobSchema } from "@/lib/admin-validation";
import { flattenErrors, type FormState } from "@/lib/validation";

function refreshPublic(slug?: string) {
  revalidatePath("/careers");
  revalidatePath("/careers/internships");
  if (slug) revalidatePath(`/careers/${slug}`);
  revalidatePath("/admin/jobs");
}

export async function saveJob(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession("careers");
  const id = formData.get("id") ? String(formData.get("id")) : null;
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = jobSchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: raw };

  try {
    const job = id
      ? await db.job.update({ where: { id }, data: parsed.data })
      : await db.job.create({ data: { ...parsed.data, status: "DRAFT" } });
    refreshPublic(job.slug);
    if (!id) redirect(`/admin/jobs/${job.id}?created=1`);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { status: "error", message: "That slug is already used by another job.", fieldErrors: { slug: "Slug must be unique" }, values: raw };
    }
    throw e;
  }
  return { status: "success", message: "Job saved." };
}

export async function setJobStatus(formData: FormData) {
  await requireSession("careers");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as JobStatus;
  if (!Object.values(JobStatus).includes(status)) return;
  const current = await db.job.findUniqueOrThrow({ where: { id } });
  const job = await db.job.update({
    where: { id },
    data: { status, ...(status === "PUBLISHED" && !current.publishedAt ? { publishedAt: new Date() } : {}) },
  });
  refreshPublic(job.slug);
  revalidatePath(`/admin/jobs/${id}`);
}

export async function deleteJob(formData: FormData) {
  await requireSession("careers");
  const id = String(formData.get("id"));
  const count = await db.application.count({ where: { jobId: id } });
  if (count > 0) {
    // Keep candidate records intact: close the job instead of deleting it.
    await db.job.update({ where: { id }, data: { status: "CLOSED" } });
    refreshPublic();
    redirect(`/admin/jobs/${id}?kept=1`);
  }
  const job = await db.job.delete({ where: { id } });
  refreshPublic(job.slug);
  redirect("/admin/jobs");
}

export async function updateApplicationStatus(formData: FormData) {
  await requireSession("careers");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as ApplicationStatus;
  if (!Object.values(ApplicationStatus).includes(status)) return;
  await db.application.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/applications/${id}`);
  revalidatePath("/admin/applications");
}

export async function deleteApplication(formData: FormData) {
  await requireSession("careers");
  const id = String(formData.get("id"));
  const app = await db.application.delete({ where: { id } });
  await deleteResume(app.resumeKey);
  revalidatePath("/admin/applications");
  redirect("/admin/applications");
}
