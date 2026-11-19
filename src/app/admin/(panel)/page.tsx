import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { canAccess } from "@/lib/session";
import { db } from "@/lib/db";
import { AdminPageHeader, Card, StatusBadge, fmtDate } from "@/components/admin/ui";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const session = await requireSession();
  const { denied } = await searchParams;
  const showLeads = canAccess(session.role, "leads");
  const showCareers = canAccess(session.role, "careers");
  const showContent = canAccess(session.role, "content");

  const [newLeads, totalLeads, recentLeads, newApps, openJobs, recentApps, drafts] = await Promise.all([
    showLeads ? db.lead.count({ where: { status: "NEW" } }) : 0,
    showLeads ? db.lead.count() : 0,
    showLeads ? db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }) : [],
    showCareers ? db.application.count({ where: { status: "NEW" } }) : 0,
    showCareers ? db.job.count({ where: { status: "PUBLISHED" } }) : 0,
    showCareers ? db.application.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { job: { select: { title: true } } } }) : [],
    showContent ? db.post.count({ where: { status: "DRAFT" } }) : 0,
  ]);

  const stats = [
    showLeads && { label: "New leads", value: newLeads, href: "/admin/leads?status=NEW" },
    showLeads && { label: "All leads", value: totalLeads, href: "/admin/leads" },
    showCareers && { label: "New applications", value: newApps, href: "/admin/applications?status=NEW" },
    showCareers && { label: "Published jobs", value: openJobs, href: "/admin/jobs" },
    showContent && { label: "Draft posts", value: drafts, href: "/admin/posts" },
  ].filter(Boolean) as { label: string; value: number; href: string }[];

  return (
    <>
      <AdminPageHeader title={`Welcome, ${session.name.split(" ")[0]}`} subtitle="Here's what's happening on the website." />
      {denied && <p role="alert" className="mb-5 rounded-xl bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]">You don&apos;t have access to that area.</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card-lift rounded-2xl border border-line bg-white p-5">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-extrabold">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {showLeads && (
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display font-bold">Latest leads</h2>
              <Link href="/admin/leads" className="text-sm font-semibold text-ocean">View all</Link>
            </div>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted">No leads yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {recentLeads.map((l) => (
                  <li key={l.id}>
                    <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-ocean">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{l.name}</span>
                        <span className="text-xs text-muted">{l.type === "QUOTE" ? "Quote" : "Contact"} · {fmtDate(l.createdAt)}</span>
                      </span>
                      <StatusBadge status={l.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
        {showCareers && (
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display font-bold">Latest applications</h2>
              <Link href="/admin/applications" className="text-sm font-semibold text-ocean">View all</Link>
            </div>
            {recentApps.length === 0 ? (
              <p className="text-sm text-muted">No applications yet.</p>
            ) : (
              <ul className="divide-y divide-line">
                {recentApps.map((a) => (
                  <li key={a.id}>
                    <Link href={`/admin/applications/${a.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-ocean">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{a.fullName}</span>
                        <span className="text-xs text-muted">{a.job.title} · {fmtDate(a.createdAt)}</span>
                      </span>
                      <StatusBadge status={a.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </>
  );
}
