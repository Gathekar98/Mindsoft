import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, EmptyState, StatusBadge, Table, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Portfolio" };

export default async function ProjectsPage() {
  await requireSession("content");
  const projects = await db.project.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <>
      <AdminPageHeader title="Portfolio" subtitle="Case studies for the Work page. Publish only approved, real projects." actions={<Link href="/admin/projects/new" className="btn-primary !py-2.5">New project</Link>} />
      {projects.length === 0 ? (
        <EmptyState title="No projects yet" text="Add a case study once a project is complete and approved for sharing." action={<Link href="/admin/projects/new" className="btn-primary">New project</Link>} />
      ) : (
        <Table head={["Title", "Industry", "Status", "Featured", "Updated"]}>
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-mist">
              <td className="px-4 py-3"><Link href={`/admin/projects/${p.id}`} className="font-semibold hover:text-ocean">{p.title}</Link></td>
              <td className="px-4 py-3">{p.industry}</td>
              <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
              <td className="px-4 py-3">{p.featured ? "Yes" : "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(p.updatedAt)}</td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
