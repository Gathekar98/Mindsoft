import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatus } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getService } from "@/lib/services";
import { AdminPageHeader, Card, StatusBadge, fmtDate } from "@/components/admin/ui";
import { ActionButton } from "@/components/admin/ActionForm";
import { addLeadNote, deleteLead, updateLeadStatus } from "../../../actions/leads";

export const metadata = { title: "Lead" };

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireSession("leads");
  const { id } = await params;
  const lead = await db.lead.findUnique({
    where: { id },
    include: { notes: { orderBy: { createdAt: "desc" }, include: { author: { select: { name: true } } } } },
  });
  if (!lead) notFound();

  const rows: [string, string | null][] = [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Service", lead.service ? getService(lead.service)?.name ?? lead.service : null],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Source page", lead.sourcePage],
    ["Received", fmtDate(lead.createdAt)],
    ["Consent given", fmtDate(lead.consentAt)],
  ];

  return (
    <>
      <Link href="/admin/leads" className="mb-3 inline-block text-sm font-semibold text-ocean">← All leads</Link>
      <AdminPageHeader
        title={lead.name}
        subtitle={`${lead.type === "QUOTE" ? "Quote request" : "Contact enquiry"} · ${fmtDate(lead.createdAt)}`}
        actions={<StatusBadge status={lead.status} />}
      />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="mb-2 font-display font-bold">Message</h2>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-slate">{lead.message}</p>
          </Card>
          <Card>
            <h2 className="mb-3 font-display font-bold">Details</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="text-sm font-medium break-words">
                    {k === "Email" && v ? <a href={`mailto:${v}`} className="text-ocean underline">{v}</a> : k === "Phone" && v ? <a href={`tel:${v.replace(/\s/g, "")}`} className="text-ocean underline">{v}</a> : v ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="mb-3 font-display font-bold">Status</h2>
            <form action={updateLeadStatus} className="flex gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="status" className="sr-only">Status</label>
              <select id="status" name="status" defaultValue={lead.status} className="field !py-2.5">
                {Object.values(LeadStatus).map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <button className="btn-primary !py-2.5">Update</button>
            </form>
          </Card>
          <Card>
            <h2 className="mb-3 font-display font-bold">Internal notes</h2>
            <form action={addLeadNote} className="flex flex-col gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <label htmlFor="body" className="sr-only">New note</label>
              <textarea id="body" name="body" rows={3} required placeholder="Add a note (only visible to staff)" className="field" />
              <button className="btn-outline self-start !py-2">Add note</button>
            </form>
            <ul className="mt-4 flex flex-col gap-3">
              {lead.notes.map((n) => (
                <li key={n.id} className="rounded-xl bg-mist p-3">
                  <p className="text-sm whitespace-pre-wrap">{n.body}</p>
                  <p className="mt-1 text-xs text-muted">{n.author?.name ?? "Deleted user"} · {fmtDate(n.createdAt)}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="mb-2 font-display font-bold">Danger zone</h2>
            <p className="mb-3 text-sm text-slate">Permanently delete this lead and its notes (for example, on a data deletion request).</p>
            <ActionButton action={deleteLead} hidden={{ id: lead.id }} label="Delete lead" confirm="Permanently delete this lead? This cannot be undone." className="!border-[#f5c2bd] !text-[#b42318]" />
          </Card>
        </div>
      </div>
    </>
  );
}
