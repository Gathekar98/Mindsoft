import Link from "next/link";
import type { LeadStatus, Prisma } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getService } from "@/lib/services";
import { AdminPageHeader, EmptyState, FilterTabs, StatusBadge, Table, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Leads & quotes" };

const statuses: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST", "SPAM"];

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; type?: string; q?: string }> }) {
  await requireSession("leads");
  const { status, type, q } = await searchParams;
  const where: Prisma.LeadWhereInput = {
    ...(status && statuses.includes(status as LeadStatus) ? { status: status as LeadStatus } : {}),
    ...(type === "QUOTE" || type === "CONTACT" ? { type } : {}),
    ...(q
      ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }, { company: { contains: q, mode: "insensitive" } }] }
      : {}),
  };
  const [leads, counts] = await Promise.all([
    db.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    db.lead.groupBy({ by: ["status"], _count: true }),
  ]);
  const countOf = (s: string) => counts.find((c) => c.status === s)?._count ?? 0;
  const exportQs = new URLSearchParams({ ...(status ? { status } : {}), ...(type ? { type } : {}), ...(q ? { q } : {}) }).toString();

  return (
    <>
      <AdminPageHeader
        title="Leads & quotes"
        subtitle="Contact enquiries and quote requests from the website."
        actions={<a href={`/api/admin/leads/export${exportQs ? `?${exportQs}` : ""}`} className="btn-outline !py-2.5">Export CSV</a>}
      />
      <FilterTabs base="/admin/leads" param="status" current={status} items={statuses.map((s) => ({ value: s, label: s.replace("_", " ").toLowerCase(), count: countOf(s) }))} />
      <form className="mb-4 flex flex-wrap gap-2" role="search">
        {status && <input type="hidden" name="status" value={status} />}
        <label htmlFor="q" className="sr-only">Search leads</label>
        <input id="q" name="q" defaultValue={q} placeholder="Search name, email or company" className="field max-w-sm !py-2.5" />
        <label htmlFor="type" className="sr-only">Type</label>
        <select id="type" name="type" defaultValue={type ?? ""} className="field max-w-[180px] !py-2.5">
          <option value="">All types</option>
          <option value="QUOTE">Quote requests</option>
          <option value="CONTACT">Contact</option>
        </select>
        <button className="btn-outline !py-2.5">Filter</button>
      </form>

      {leads.length === 0 ? (
        <EmptyState title="No leads found" text="New enquiries from the website will appear here." />
      ) : (
        <Table head={["Name", "Type", "Service", "Budget", "Received", "Status"]}>
          {leads.map((l) => (
            <tr key={l.id} className="hover:bg-mist">
              <td className="px-4 py-3">
                <Link href={`/admin/leads/${l.id}`} className="font-semibold text-navy hover:text-ocean">{l.name}</Link>
                <div className="text-xs text-muted">{l.email}</div>
              </td>
              <td className="px-4 py-3">{l.type === "QUOTE" ? "Quote" : "Contact"}</td>
              <td className="px-4 py-3">{l.service ? getService(l.service)?.name ?? l.service : "—"}</td>
              <td className="px-4 py-3">{l.budget ?? "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap">{fmtDate(l.createdAt)}</td>
              <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
            </tr>
          ))}
        </Table>
      )}
    </>
  );
}
