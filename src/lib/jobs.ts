import "server-only";
import { db } from "./db";
import type { JobKind } from "@prisma/client";

/** Jobs visible on the public site: published, plus closed ones (shown as closed). */
export async function listPublicJobs(kind?: JobKind) {
  return db.job.findMany({
    where: { status: { in: ["PUBLISHED", "CLOSED"] }, ...(kind ? { kind } : {}) },
    orderBy: [{ status: "desc" }, { publishedAt: "desc" }],
  });
}

export async function getPublicJob(slug: string) {
  const job = await db.job.findUnique({ where: { slug } });
  if (!job || job.status === "DRAFT") return null;
  return job;
}

export function isAcceptingApplications(job: { status: string; closesAt: Date | null }) {
  return job.status === "PUBLISHED" && (!job.closesAt || job.closesAt > new Date());
}
