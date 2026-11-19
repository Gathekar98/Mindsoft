import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, EmptyState, StatusBadge, Table, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Jobs" };

export default async function JobsPage() {
  await requireSession("careers");
  const jobs = await db.job.findMany({ orderBy: [{ status: "asc" }, { updatedAt: "desc" }], include: { _count: { select: { applications: true } } } });
  return (
    <>
      <AdminPageHeader title="Jobs & internships" subtitle="Drafts are hidden from the website until you publish them." actions={<Link href="/admin/jobs/new" className="btn-primary !py-2.5">New job</Link>} />
      {jobs.length === 0 ? (
        <EmptyState title="No jobs yet" text="Create your first vacancy." action={<Link href="/admin/jobs/new" className="btn-primary">New job</Link>} />
      ) : (
        <Table head={["Title", "Type", "Status", "Applications", "Updated", ""]}>
          {jobs.map((j) => (
            <tr key={j.id} className="hover:bg-mist">
              <td className="px-4 py-3"><Link href={`/admin/jobs/${j.id}`} className="font-semibold hover:text-ocean">{j.title}</Link><div className="text-xs text-muted">/careers/{j.slug}</div></td>
              <td className="px-4 py-3">{j.kind === "INTERNSHIP" ? "Internship" : "Job"}</td>
              <td className="px-4 py-3"><StatusBadge status={j.status} /></td>
              <td className="px-4 py-3"><Link href={`/admin/applications?job=${j.id}`} className="text-ocean underline">{j._count.applications}</Link></td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(j.updatedAt)}</td>
              <td className="px-4 py-3 text-right"><Link href={`/admin/jobs/${j.id}`} className="text-sm font-semibold text-ocean">Edit</Link></td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
