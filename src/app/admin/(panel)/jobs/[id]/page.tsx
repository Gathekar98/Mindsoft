import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, StatusBadge } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/ActionForm";
import { JobForm } from "@/components/admin/JobForm";
import { deleteJob, setJobStatus } from "../../../actions/careers";

export const metadata = { title: "Edit job" };

export default async function EditJobPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string; kept?: string }> }) {
  await requireSession("careers");
  const { id } = await params;
  const { created, kept } = await searchParams;
  const job = await db.job.findUnique({ where: { id }, include: { _count: { select: { applications: true } } } });
  if (!job) notFound();

  return (
    <>
      <Link href="/admin/jobs" className="mb-3 inline-block text-sm font-semibold text-ocean">← All jobs</Link>
      <AdminPageHeader
        title={job.title}
        subtitle={`${job._count.applications} application(s)`}
        actions={
          <>
            <StatusBadge status={job.status} />
            {job.status !== "DRAFT" && <a href={`/careers/${job.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ocean">View on site ↗</a>}
          </>
        }
      />
      {created && <p role="status" className="mb-4 rounded-xl bg-mint-soft px-4 py-3 text-sm text-mint-text">Draft created. Review it, then publish when ready.</p>}
      {kept && <p role="status" className="mb-4 rounded-xl bg-sun-soft px-4 py-3 text-sm text-[#8A5A00]">This job has applications, so it was closed instead of deleted to keep candidate records.</p>}

      <div className="mb-6 flex flex-wrap gap-2">
        {job.status !== "PUBLISHED" && <ActionButton action={setJobStatus} hidden={{ id: job.id, status: "PUBLISHED" }} label="Publish" confirm="Publish this job on the website?" className="!border-mint !text-mint-text" />}
        {job.status === "PUBLISHED" && <ActionButton action={setJobStatus} hidden={{ id: job.id, status: "CLOSED" }} label="Close applications" confirm="Close this job? It stays visible as closed." />}
        {job.status !== "DRAFT" && <ActionButton action={setJobStatus} hidden={{ id: job.id, status: "DRAFT" }} label="Unpublish (draft)" />}
        <ActionButton action={deleteJob} hidden={{ id: job.id }} label="Delete" confirm={job._count.applications ? "This job has applications. It will be closed instead of deleted. Continue?" : "Delete this job permanently?"} className="!border-[#f5c2bd] !text-[#b42318]" />
      </div>

      <Card><JobForm job={job} /></Card>
    </>
  );
}
