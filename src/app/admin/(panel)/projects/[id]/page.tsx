import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, StatusBadge } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/ActionForm";
import { ProjectForm } from "@/components/admin/ContentForms";
import { deleteProject, setProjectStatus } from "../../../actions/content";

export const metadata = { title: "Edit project" };

export default async function EditProjectPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  await requireSession("content");
  const { id } = await params;
  const { created } = await searchParams;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <>
      <Link href="/admin/projects" className="mb-3 inline-block text-sm font-semibold text-ocean">← Portfolio</Link>
      <AdminPageHeader
        title={project.title}
        actions={<><StatusBadge status={project.status} />{project.status === "PUBLISHED" && <a href={`/work/${project.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ocean">View ↗</a>}</>}
      />
      {created && <p role="status" className="mb-4 rounded-xl bg-mint-soft px-4 py-3 text-sm text-mint-text">Draft created.</p>}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.status === "DRAFT" ? (
          <ActionButton action={setProjectStatus} hidden={{ id: project.id, status: "PUBLISHED" }} label="Publish" confirm="Publish this case study? Confirm it's approved by the client." className="!border-mint !text-mint-text" />
        ) : (
          <ActionButton action={setProjectStatus} hidden={{ id: project.id, status: "DRAFT" }} label="Unpublish" />
        )}
        <ActionButton action={deleteProject} hidden={{ id: project.id }} label="Delete" confirm="Delete this project permanently?" className="!border-[#f5c2bd] !text-[#b42318]" />
      </div>
      <Card><ProjectForm project={project} /></Card>
    </>
  );
}
