"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface JobCard {
  slug: string;
  title: string;
  team: string;
  summary: string;
  location: string;
  workMode: string;
  employmentType: string;
  experience: string;
  skills: string[];
  hiringNow?: boolean;
  open: boolean;
  posted: string;
}

const Pin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="2" fill="currentColor" /></svg>
);
const Laptop = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M2 19h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const Clock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
const Star = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
);

export function JobBoard({ jobs, teams, initialTeam = "All" }: { jobs: JobCard[]; teams: string[]; initialTeam?: string }) {
  const [team, setTeam] = useState(initialTeam);
  const [q, setQ] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: jobs.length };
    for (const j of jobs) c[j.team] = (c[j.team] ?? 0) + 1;
    return c;
  }, [jobs]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (team === "All" || j.team === team) &&
        (!term || `${j.title} ${j.team} ${j.skills.join(" ")}`.toLowerCase().includes(term)),
    );
  }, [jobs, team, q]);

  const tabs = ["All", ...teams.filter((t) => counts[t])];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div role="tablist" aria-label="Filter roles by team" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={team === t}
              onClick={() => setTeam(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                team === t ? "bg-navy text-white" : "border border-line bg-white text-slate hover:border-ocean-2 hover:text-ocean"
              }`}
            >
              {t === "All" ? "All teams" : t} <span className="ml-1 opacity-60">{counts[t]}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-sm">
          <label htmlFor="job-search" className="sr-only">Search roles</label>
          <svg className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <input id="job-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search roles or skills" className="field !py-2.5 !pl-10" />
        </div>
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {jobs.length} roles
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-start gap-2 rounded-[24px] border border-dashed border-[#CDEBF6] bg-mist p-10">
          <p className="font-display text-xl font-bold">No roles match your search.</p>
          <button type="button" onClick={() => { setTeam("All"); setQ(""); }} className="text-sm font-semibold text-ocean underline">
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {visible.map((j) => (
            <li key={j.slug} className="card-lift flex flex-col gap-4 rounded-[22px] border border-line bg-white p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold tracking-wide text-ocean-text uppercase">{j.team}</span>
                {j.hiringNow && j.open && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-xs font-bold text-mint-text">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Hiring now
                  </span>
                )}
                {!j.open && <span className="rounded-full bg-[#F1F2F6] px-2.5 py-1 text-xs font-bold text-muted">Closed</span>}
              </div>
              <h3 className="font-display text-xl leading-snug font-bold">
                <Link href={`/careers/${j.slug}`} className="hover:text-ocean">{j.title}</Link>
              </h3>
              <p className="text-[15px] leading-relaxed text-slate">{j.summary}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
                <li className="flex items-center gap-1.5"><Pin />{j.location}</li>
                <li className="flex items-center gap-1.5"><Laptop />{j.workMode}</li>
                <li className="flex items-center gap-1.5"><Clock />{j.employmentType}</li>
                <li className="flex items-center gap-1.5"><Star />{j.experience}</li>
              </ul>
              <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                {j.skills.map((s) => (
                  <li key={s} className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-ocean">{s}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-line pt-4">
                {j.open && (
                  <Link href={`/careers/${j.slug}#apply`} className="btn-primary !px-4 !py-2.5 !text-sm">Apply now</Link>
                )}
                <Link href={`/careers/${j.slug}`} className="btn-outline !px-4 !py-2.5 !text-sm">View details</Link>
                <span className="ml-auto text-xs text-muted">{j.posted}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
