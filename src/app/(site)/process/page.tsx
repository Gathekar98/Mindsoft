import type { Metadata } from "next";
import { CheckIcon, CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Our Development Process",
  description: "How Mindsoft Tech Solutions plans, designs, builds, launches and supports websites and software: a clear five-step process with regular demos.",
  alternates: { canonical: "/process" },
};

const steps = [
  {
    t: "Discover",
    d: "We start with a free call to understand your business, users, goals, budget and timeline. For larger projects we run a short paid discovery workshop to map requirements in detail.",
    you: ["A clear summary of your goals", "Suggested approach and options", "Initial estimate range"],
  },
  {
    t: "Plan & quote",
    d: "We turn what we learned into a written proposal: scope, features, milestones, technology choices, responsibilities and a clear quote. Nothing starts until you approve it.",
    you: ["Written scope and milestones", "Fixed quote or monthly plan", "Project board access"],
  },
  {
    t: "Design",
    d: "We design the user journeys and screens, then share clickable prototypes so you can try the experience and give feedback before development begins.",
    you: ["Wireframes and visual designs", "Clickable prototype", "Design system for consistency"],
  },
  {
    t: "Build",
    d: "We develop in short cycles. After each cycle you see a working demo, so feedback is quick and there are no surprises at the end.",
    you: ["Regular progress demos", "Staging site to review", "Tested, reviewed code"],
  },
  {
    t: "Launch",
    d: "Before go-live we test on real devices, check speed, accessibility, security and SEO, set up backups and monitoring, then launch carefully.",
    you: ["Quality and performance checks", "Smooth go-live", "Handover and documentation"],
  },
  {
    t: "Support & grow",
    d: "After launch we can look after your product with a monthly care plan, or hand everything over to your own team with full documentation.",
    you: ["Updates, backups and monitoring", "Ongoing improvements", "Monthly report"],
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear process, so you always know what happens next."
        intro="Every project follows the same proven steps, scaled to its size. You get written plans, regular demos and a single point of contact throughout."
        crumbs={[{ label: "Our process" }]}
      />

      <section className="container-ms py-20">
        <ol className="relative flex flex-col gap-6 before:absolute before:top-4 before:bottom-4 before:left-[27px] before:w-[2px] before:bg-[linear-gradient(#3EC0D5,#FF8A5B)] sm:before:left-[31px]">
          {steps.map((s, i) => (
            <li key={s.t} className="reveal relative grid gap-5 pl-[76px] sm:pl-[92px] lg:grid-cols-[1.4fr_1fr]">
              <span className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] font-display text-lg font-extrabold text-white shadow-[var(--shadow-cta)] sm:h-16 sm:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-2xl font-extrabold">{s.t}</h2>
                <p className="leading-relaxed text-slate">{s.d}</p>
              </div>
              <div className="card-lift rounded-[20px] border border-line bg-mist p-5">
                <p className="mb-2 text-sm font-semibold text-ocean">What you get</p>
                <ul className="flex flex-col gap-2">
                  {s.you.map((y) => (
                    <li key={y} className="flex items-center gap-2.5 text-[15px]"><CheckIcon /> {y}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-mist">
        <div className="container-ms grid gap-10 py-20 lg:grid-cols-2">
          <SectionHead eyebrow="Communication" title="How we keep you in the loop." />
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Single point of contact", "One person who knows your project and answers your questions."],
              ["Shared project board", "See tasks, progress and what's next at any time."],
              ["Regular demos", "Working software to review, not just status updates."],
              ["Written decisions", "Changes to scope or cost are agreed in writing first."],
            ].map(([t, d]) => (
              <li key={t} className="card-lift reveal rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-slate">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Ready to start with a free discovery call?" />
    </>
  );
}
