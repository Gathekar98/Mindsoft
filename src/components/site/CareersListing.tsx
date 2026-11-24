import Image from "next/image";
import { CtaBand, PageHero, SectionHead } from "./PageHero";
import { JobBoard, type JobCard } from "./JobBoard";
import { isAcceptingApplications, postedLabel, teams, type Job } from "@/content/jobs";
import { perks } from "@/content/job-profiles";
import { site } from "@/lib/site";

const perkIcons = [
  "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
  "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM8 7h8M8 11h6",
  "M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.5 19.5l1-6.3L3 8.9 9 8z",
  "M12 7v5l3 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z",
  "M8 7l-5 5 5 5M16 7l5 5-5 5",
  "M3 20h18M6 20V10M11 20V6M16 20v-8M21 20V4",
];

export function CareersListing({ jobs, initialTeam = "All", internships = false }: { jobs: Job[]; initialTeam?: string; internships?: boolean }) {
  const cards: JobCard[] = jobs.map((j) => ({
    slug: j.slug,
    title: j.title,
    team: j.team,
    summary: j.summary,
    location: j.location,
    workMode: j.workMode,
    employmentType: j.employmentType,
    experience: j.experience,
    skills: j.skills,
    hiringNow: j.hiringNow,
    open: isAcceptingApplications(j),
    posted: postedLabel(j.postedOn),
  }));
  const openCount = cards.filter((c) => c.open).length;

  return (
    <>
      <PageHero
        eyebrow={`${internships ? "Internships" : "Careers"} · ${openCount} open role${openCount === 1 ? "" : "s"}`}
        title={internships ? "Start your career on real projects." : "Build what's next, with a team that cares about craft."}
        intro={
          internships
            ? "Our internships are for students and freshers who want hands-on experience with real client work, with a mentor reviewing your progress."
            : "We're a remote-first team in Pune building websites, web apps and software for growing businesses. Find a role where your work ships to real users and you keep learning."
        }
        crumbs={internships ? [{ label: "Careers", href: "/careers" }, { label: "Internships" }] : [{ label: "Careers" }]}
        aside={
          <div className="relative mx-auto h-[320px] w-full max-w-[480px]">
            <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_30px_60px_rgba(12,18,45,0.16)]">
              <Image src="/images/team-celebrating.jpg" alt="A happy team celebrating a result at their desk" fill priority sizes="480px" className="object-cover" />
            </div>
            <span className="absolute -bottom-4 left-4 flex animate-bob items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-[var(--shadow-float)]">
              <span className="h-2 w-2 animate-ping-soft rounded-full bg-mint" /> Remote-friendly
            </span>
            <span className="absolute -top-4 right-4 animate-bob rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-float)] [animation-delay:1.5s]">
              Replies within a few days
            </span>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <a href="#roles" className="btn-primary">See open roles</a>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent("General application")}`} className="btn-outline">General application</a>
        </div>
      </PageHero>

      <section id="roles" className="container-ms flex scroll-mt-28 flex-col gap-8 py-16">
        <SectionHead
          eyebrow="Open roles"
          title={internships ? "Internship openings" : "Find your next role"}
          intro="Every role is remote-first. Filter by team or search by skill."
        />
        <JobBoard jobs={cards} teams={[...teams]} initialTeam={initialTeam} />
      </section>

      <section className="bg-mist">
        <div className="container-ms flex flex-col gap-10 py-20">
          <SectionHead center eyebrow="Life at Mindsoft" title="Why work with us" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p, i) => (
              <li key={p.t} className="card-lift reveal flex gap-4 rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-sky" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path d={perkIcons[i]} fill="none" stroke="#0A6C9E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
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
        <SectionHead eyebrow="The process" title="How hiring works" />
        <ol className="grid gap-4 md:grid-cols-4">
          {[
            ["Apply", "Send your details and résumé. It takes about 3 minutes."],
            ["Intro call", "A short, friendly call to get to know you and the role."],
            ["Skills check", "A practical task or technical conversation, relevant to the job."],
            ["Offer", "If it's a good fit, we share an offer and onboarding plan."],
          ].map(([t, d], i) => (
            <li key={t} className="reveal flex flex-col gap-3 rounded-[20px] border border-line p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] font-display font-extrabold text-white">
                0{i + 1}
              </span>
              <h3 className="font-display text-lg font-bold">{t}</h3>
              <p className="text-sm text-slate">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title="Don't see the right role?"
        text="We're always happy to hear from talented people. Send us your résumé and tell us what you'd like to work on."
        primary={{ label: "Send a general application", href: `mailto:${site.email}?subject=${encodeURIComponent("General application")}` }}
        secondary={{ label: "Learn about us", href: "/about" }}
      />
    </>
  );
}
