import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, StatusBadge, fmtDate } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/ActionForm";
import { deleteApplication, updateApplicationStatus } from "../../../actions/careers";

export const metadata = { title: "Application" };

function SafeLink({ href }: { href: string | null }) {
  if (!href || !/^https?:\/\//i.test(href)) return <>—</>;
  return <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-ocean underline">{href}</a>;
}

export default async function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireSession("careers");
  const { id } = await params;
  const a = await db.application.findUnique({ where: { id }, include: { job: true } });
  if (!a) notFound();

  const rows: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${a.email}`} className="text-ocean underline">{a.email}</a>],
    ["Mobile", <a key="p" href={`tel:${a.phone.replace(/\s/g, "")}`} className="text-ocean underline">{a.phone}</a>],
    ["Location", a.location],
    ["Education", a.education],
    ["Experience", a.experience],
    ["Skills", a.skills],
    ["Portfolio", <SafeLink key="pf" href={a.portfolioUrl} />],
    ["GitHub", <SafeLink key="gh" href={a.githubUrl} />],
    ["LinkedIn", <SafeLink key="li" href={a.linkedinUrl} />],
    ["Applied", fmtDate(a.createdAt)],
    ["Consent given", fmtDate(a.consentAt)],
  ];

  return (
    <>
      <Link href="/admin/applications" className="mb-3 inline-block text-sm font-semibold text-ocean">← All applications</Link>
      <AdminPageHeader title={a.fullName} subtitle={`Applied for ${a.job.title}`} actions={<StatusBadge status={a.status} />} />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="mb-3 font-display font-bold">Candidate details</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="text-sm font-medium break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card>
            <h2 className="mb-2 font-display font-bold">Cover letter</h2>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-slate">{a.coverLetter || "No cover letter provided."}</p>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="mb-3 font-display font-bold">Resume</h2>
            <p className="mb-3 text-sm text-slate">{a.resumeName} · {(a.resumeSize / 1024).toFixed(0)} KB</p>
            <a href={`/api/admin/resume/${a.id}`} className="btn-primary !py-2.5">Download resume</a>
          </Card>
          <Card>
            <h2 className="mb-3 font-display font-bold">Status</h2>
            <form action={updateApplicationStatus} className="flex gap-2">
              <input type="hidden" name="id" value={a.id} />
              <label htmlFor="status" className="sr-only">Status</label>
              <select id="status" name="status" defaultValue={a.status} className="field !py-2.5">
                {Object.values(ApplicationStatus).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="btn-primary !py-2.5">Update</button>
            </form>
          </Card>
          <Card>
            <h2 className="mb-2 font-display font-bold">Delete</h2>
            <p className="mb-3 text-sm text-slate">Permanently delete this application and its resume file (for example, on request or after the retention period).</p>
            <ActionButton action={deleteApplication} hidden={{ id: a.id }} label="Delete application" confirm="Permanently delete this application and resume? This cannot be undone." className="!border-[#f5c2bd] !text-[#b42318]" />
          </Card>
        </div>
      </div>
    </>
  );
}
