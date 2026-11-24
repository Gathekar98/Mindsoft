import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/content/jobs";
import { CheckIcon, PageHero, SectionHead } from "./PageHero";
import { isAcceptingApplications } from "@/content/jobs";

const perks = [
  { t: "Remote-first", d: "Work from anywhere, with clear async communication." },
  { t: "Real projects", d: "Ship features used by real businesses from day one." },
  { t: "Mentoring", d: "Code reviews, pairing and guidance from experienced developers." },
  { t: "Modern stack", d: "React, Next.js, TypeScript, Python and PostgreSQL." },
  { t: "Clear growth", d: "Regular feedback and a path to take on more responsibility." },
  { t: "Learning time", d: "Space to learn new tools and share what you discover." },
];

type Filter = "all" | "jobs" | "internships";

export function CareersListing({ jobs, filter, base }: { jobs: Job[]; filter: Filter; base: "/careers" | "/careers/internships" }) {
  const tabs: { id: Filter; label: string; href: string }[] = [
    { id: "all", label: "All openings", href: "/careers" },
    { id: "jobs", label: "Jobs", href: "/careers?type=jobs" },
    { id: "internships", label: "Internships", href: "/careers/internships" },
  ];
  const isInternPage = base === "/careers/internships";

  return (
    <>
      <PageHero
        eyebrow={isInternPage ? "Internships" : "Careers at Mindsoft"}
        title={isInternPage ? "Start your career on real projects." : "Build your career with a growing team."}
        intro={
          isInternPage
            ? "Our internships are for students and freshers who want hands-on experience with React or Python, with mentoring from experienced developers."
            : "We're looking for curious, reliable React and Python developers who enjoy building things that businesses actually use."
        }
        crumbs={isInternPage ? [{ label: "Careers", href: "/careers" }, { label: "Internships" }] : [{ label: "Careers" }]}
        aside={
          <div className="relative mx-auto h-[300px] w-full max-w-[460px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_rgba(12,18,45,0.16)]">
            <Image src="/images/team-celebrating.jpg" alt="A happy team celebrating a result at their desk" fill priority sizes="460px" className="object-cover" />
          </div>
        }
      >
        <a href="#openings" className="btn-primary">See open roles</a>
      </PageHero>

      <section id="openings" className="container-ms flex scroll-mt-28 flex-col gap-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Open positions" title={isInternPage ? "Internship openings" : "Current openings"} />
          <nav aria-label="Filter openings" className="flex gap-2 rounded-full bg-mist p-1.5">
            {tabs.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                aria-current={filter === t.id ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === t.id ? "bg-navy text-white" : "text-slate hover:text-ocean"}`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>

        {jobs.length === 0 ? (
          <div className="reveal flex flex-col items-start gap-3 rounded-[24px] border border-dashed border-[#CDEBF6] bg-mist p-10">
            <h3 className="font-display text-xl font-bold">No openings right now</h3>
            <p className="max-w-xl text-slate">
              We don&apos;t have any {filter === "internships" ? "internships" : filter === "jobs" ? "job openings" : "openings"} at the moment. New roles are announced here first, so please check back soon.
            </p>
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {jobs.map((j) => {
              const open = isAcceptingApplications(j);
              return (
                <li key={j.slug} className="card-lift reveal relative flex flex-col gap-4 rounded-[22px] border border-line bg-white p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${j.kind === "internship" ? "bg-mint-soft text-mint-text" : "bg-sky text-ocean"}`}>
                      {j.kind === "internship" ? "Internship" : "Job"}
                    </span>
                    {!open && <span className="rounded-full bg-[#F1F2F6] px-3 py-1 text-xs font-bold text-muted">Closed</span>}
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    <Link href={`/careers/${j.slug}`} className="after:absolute after:inset-0 hover:text-ocean">{j.title}</Link>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate">{j.summary}</p>
                  <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <div><dt className="sr-only">Location</dt><dd>{j.location}</dd></div>
                    <div><dt className="sr-only">Type</dt><dd>{j.employmentType}</dd></div>
                    <div><dt className="sr-only">Experience</dt><dd>{j.experience}</dd></div>
                  </dl>
                  <span className="mt-auto text-sm font-semibold text-ocean">View details <span className="arrow">→</span></span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="bg-mist">
        <div className="container-ms flex flex-col gap-10 py-20">
          <SectionHead center eyebrow="Why join us" title="What working at Mindsoft is like" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <li key={p.t} className="card-lift reveal flex gap-4 rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
                <CheckIcon className="mt-0.5" />
                <div>
                  <h3 className="font-semibold">{p.t}</h3>
                  <p className="mt-1 text-sm text-slate">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-ms flex flex-col gap-10 py-20">
        <SectionHead eyebrow="Hiring process" title="What happens after you apply" />
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            ["Apply online", "Submit the form with your resume and links to your work."],
            ["Review", "We read every application and reply to shortlisted candidates by email."],
            ["Interview", "A conversation about your experience, plus a short practical task."],
            ["Offer", "If it's a good fit, we share an offer and onboarding plan."],
          ].map(([t, d], i) => (
            <li key={t} className="reveal flex flex-col gap-3 rounded-[20px] border border-line p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] font-display font-extrabold text-white">{i + 1}</span>
              <h3 className="font-display text-lg font-bold">{t}</h3>
              <p className="text-sm text-slate">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
