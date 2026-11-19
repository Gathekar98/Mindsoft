import Link from "next/link";
import type { ApplicationStatus, Prisma } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, EmptyState, FilterTabs, StatusBadge, Table, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Applications" };

const statuses: ApplicationStatus[] = ["NEW", "REVIEWING", "SHORTLISTED", "INTERVIEW", "OFFERED", "HIRED", "REJECTED", "WITHDRAWN"];

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ status?: string; job?: string; q?: string }> }) {
  await requireSession("careers");
  const { status, job, q } = await searchParams;
  const where: Prisma.ApplicationWhereInput = {
    ...(status && statuses.includes(status as ApplicationStatus) ? { status: status as ApplicationStatus } : {}),
    ...(job ? { jobId: job } : {}),
    ...(q ? { OR: [{ fullName: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }, { skills: { contains: q, mode: "insensitive" } }] } : {}),
  };
  const [apps, jobs] = await Promise.all([
    db.application.findMany({ where, orderBy: { createdAt: "desc" }, take: 300, include: { job: { select: { title: true } } } }),
    db.job.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } }),
  ]);

  return (
    <>
      <AdminPageHeader title="Applications" subtitle="Candidate applications. Resumes are private and only downloadable here." />
      <FilterTabs base="/admin/applications" param="status" current={status} items={statuses.map((s) => ({ value: s, label: s.toLowerCase() }))} />
      <form className="mb-4 flex flex-wrap gap-2" role="search">
        {status && <input type="hidden" name="status" value={status} />}
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" name="q" defaultValue={q} placeholder="Search name, email or skills" className="field max-w-sm !py-2.5" />
        <label htmlFor="job" className="sr-only">Job</label>
        <select id="job" name="job" defaultValue={job ?? ""} className="field max-w-[260px] !py-2.5">
          <option value="">All jobs</option>
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <button className="btn-outline !py-2.5">Filter</button>
      </form>
      {apps.length === 0 ? (
        <EmptyState title="No applications found" text="Applications submitted on the careers pages will appear here." />
      ) : (
        <Table head={["Candidate", "Role", "Location", "Experience", "Received", "Status"]}>
          {apps.map((a) => (
            <tr key={a.id} className="hover:bg-mist">
              <td className="px-4 py-3"><Link href={`/admin/applications/${a.id}`} className="font-semibold hover:text-ocean">{a.fullName}</Link><div className="text-xs text-muted">{a.email}</div></td>
              <td className="px-4 py-3">{a.job.title}</td>
              <td className="px-4 py-3">{a.location}</td>
              <td className="px-4 py-3">{a.experience}</td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(a.createdAt)}</td>
              <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
