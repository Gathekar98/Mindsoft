import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CheckIcon } from "@/components/site/PageHero";
import { ShareButton } from "@/components/site/ShareButton";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { getPublicJob, isAcceptingApplications, listPublicJobs, postedLabel } from "@/content/jobs";
import { perks } from "@/content/job-profiles";
import { formatDate } from "@/content/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;
// Re-check "closesOn" dates and "Posted …" labels hourly without a rebuild.
export const revalidate = 3600;

export function generateStaticParams() {
  return listPublicJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getPublicJob(slug);
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — Careers (Remote, India)`,
    description: job.summary.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: { title: `${job.title} at ${site.name}`, description: job.summary },
  };
}

const metaIcons = {
  location: "M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  mode: "M4 5h16v11H4zM2 19h20",
  type: "M12 7v5l3 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z",
  exp: "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z",
};

function Meta({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getPublicJob(slug);
  if (!job) notFound();
  const open = isAcceptingApplications(job);

  const others = listPublicJobs()
    .filter((j) => j.slug !== job.slug && isAcceptingApplications(j))
    .sort((a, b) => Number(b.team === job.team) - Number(a.team === job.team))
    .slice(0, 3);

  const sections = [
    { t: "What you'll do", items: job.responsibilities },
    { t: "What we're looking for", items: job.requirements },
    { t: "Nice to have", items: job.niceToHave },
  ].filter((s) => s.items.length);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#E1F6FF_0%,#F4FBFF_70%,#fff_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.3),transparent_70%)]" />
        <div className="container-ms relative flex flex-col gap-5 pt-10 pb-14">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: job.title }]} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[13px] font-bold tracking-wide text-ocean-text uppercase shadow-sm">{job.team}</span>
            {job.hiringNow && open && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 text-xs font-bold text-mint-text">
                <span className="h-1.5 w-1.5 animate-ping-soft rounded-full bg-mint" /> Hiring now
              </span>
            )}
            {!open && <span className="rounded-full bg-[#F1F2F6] px-3 py-1 text-xs font-bold text-muted">Closed</span>}
          </div>
          <h1 className="max-w-[860px] animate-rise font-display text-[34px] leading-[1.1] font-extrabold tracking-[-0.02em] sm:text-[48px]">{job.title}</h1>
          <p className="max-w-[760px] text-lg leading-relaxed text-slate">{job.summary}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-[#3A4460]">
            <Meta icon={metaIcons.location}>{job.location}</Meta>
            <Meta icon={metaIcons.mode}>{job.workMode}</Meta>
            <Meta icon={metaIcons.type}>{job.employmentType}</Meta>
            <Meta icon={metaIcons.exp}>{job.experience}</Meta>
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            {open ? (
              <a href="#apply" className="btn-primary">Apply now</a>
            ) : (
              <span className="rounded-xl bg-[#F1F2F6] px-4 py-3 font-semibold text-muted">This role is closed</span>
            )}
            <ShareButton title={`${job.title} at ${site.name}`} className="btn-outline" />
          </div>
        </div>
      </section>

      {/* ---------- Details + sidebar ---------- */}
      <section className="container-ms grid gap-12 py-14 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-12">
          <div className="reveal flex flex-col gap-3">
            <h2 className="font-display text-2xl font-extrabold">About the role</h2>
            <p className="text-[16px] leading-relaxed text-slate">{job.about}</p>
          </div>

          {sections.map((s) => (
            <div key={s.t} className="reveal flex flex-col gap-4">
              <h2 className="font-display text-2xl font-extrabold">{s.t}</h2>
              <ul className="flex flex-col gap-3">
                {s.items.map((x) => (
                  <li key={x} className="flex gap-3 text-[16px] leading-relaxed text-slate">
                    <CheckIcon className="mt-1" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="reveal flex flex-col gap-4">
            <h2 className="font-display text-2xl font-extrabold">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <li key={s} className="rounded-full border border-[#CDEBF6] bg-sky px-3.5 py-1.5 text-sm font-semibold text-ocean">{s}</li>
              ))}
            </ul>
          </div>

          <div className="reveal flex flex-col gap-5">
            <h2 className="font-display text-2xl font-extrabold">Why you&apos;ll like it here</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {perks.slice(0, 4).map((p) => (
                <li key={p.t} className="rounded-[18px] border border-line bg-mist p-5">
                  <p className="font-semibold">{p.t}</p>
                  <p className="mt-1 text-sm text-slate">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-4 rounded-[24px] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-bold">Role summary</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {[
                ["Team", job.team],
                ["Location", job.location],
                ["Work mode", job.workMode],
                ["Type", job.employmentType],
                ["Experience", job.experience],
                ["Openings", String(job.openings)],
                ["Posted", formatDate(job.postedOn)],
                ...(job.closesOn ? [["Apply by", formatDate(job.closesOn)]] : []),
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            {open && <a href="#apply" className="btn-primary mt-1">Apply now</a>}
            <p className="text-xs text-muted">Takes about 3 minutes. Have your résumé ready (PDF/DOC, max 4 MB).</p>
          </div>

          {others.length > 0 && (
            <div className="flex flex-col gap-3 rounded-[24px] bg-mist p-6">
              <h2 className="font-display text-lg font-bold">Other open roles</h2>
              <ul className="flex flex-col divide-y divide-line">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/careers/${o.slug}`} className="flex flex-col py-3 hover:text-ocean">
                      <span className="font-semibold">{o.title}</span>
                      <span className="text-xs text-muted">{o.workMode} · {o.location}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/careers#roles" className="text-sm font-semibold text-ocean">All roles →</Link>
            </div>
          )}
        </aside>
      </section>

      {/* ---------- Apply ---------- */}
      <section id="apply" className="scroll-mt-24 bg-mist">
        <div className="container-ms flex max-w-[920px] flex-col gap-6 py-16">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Apply now</p>
            <h2 className="font-display text-[30px] leading-tight font-extrabold">Apply for {job.title}</h2>
            <p className="text-slate">{job.employmentType} · {job.workMode} · {job.location} · {postedLabel(job.postedOn)}</p>
          </div>
          {open ? (
            <ApplicationForm jobSlug={job.slug} jobTitle={job.title} />
          ) : (
            <div className="rounded-[24px] border border-line bg-white p-10 text-center">
              <h3 className="font-display text-2xl font-extrabold">This position is closed</h3>
              <p className="mt-2 text-slate">It is no longer accepting applications.</p>
              <Link href="/careers#roles" className="btn-primary mt-6">See other openings</Link>
            </div>
          )}
        </div>
      </section>

      {open && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              title: job.title,
              description: [job.about, ...job.responsibilities, ...job.requirements].join(" "),
              datePosted: job.postedOn,
              ...(job.closesOn ? { validThrough: `${job.closesOn}T23:59:59+05:30` } : {}),
              employmentType: job.kind === "internship" ? "INTERN" : "FULL_TIME",
              jobLocationType: "TELECOMMUTE",
              applicantLocationRequirements: { "@type": "Country", name: "India" },
              hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url },
            }),
          }}
        />
      )}
    </>
  );
}
