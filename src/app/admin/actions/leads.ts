"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LeadStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function updateLeadStatus(formData: FormData) {
  await requireSession("leads");
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  if (!Object.values(LeadStatus).includes(status)) return;
  await db.lead.update({ where: { id }, data: { status } });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function addLeadNote(formData: FormData) {
  const session = await requireSession("leads");
  const id = String(formData.get("id"));
  const body = String(formData.get("body") ?? "").trim().slice(0, 4000);
  if (!body) return;
  await db.leadNote.create({ data: { leadId: id, body, authorId: session.sub } });
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLead(formData: FormData) {
  await requireSession("leads");
  const id = String(formData.get("id"));
  await db.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
