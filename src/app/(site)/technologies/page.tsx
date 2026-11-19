import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Technologies",
  description: "The technologies Mindsoft Tech Solutions uses: React, Next.js, TypeScript, Python, Django, FastAPI, PostgreSQL, MySQL, cloud hosting, APIs and AI tools.",
  alternates: { canonical: "/technologies" },
};

const groups = [
  { t: "Frontend", tint: "bg-sky", items: [["React.js", "Component-based interfaces"], ["Next.js", "Fast, SEO-friendly sites and apps"], ["TypeScript", "Safer, maintainable code"], ["Tailwind CSS", "Consistent, responsive styling"]] },
  { t: "Backend", tint: "bg-coral-soft", items: [["Python", "Business logic, data and AI"], ["Django", "Full applications with admin"], ["FastAPI", "High-performance APIs"], ["Node.js", "JavaScript services and tooling"]] },
  { t: "Data", tint: "bg-mint-soft", items: [["PostgreSQL", "Reliable relational database"], ["MySQL", "Widely supported database"], ["Prisma", "Type-safe database access"], ["Redis", "Caching and queues"]] },
  { t: "Cloud & DevOps", tint: "bg-sun-soft", items: [["AWS", "Scalable cloud infrastructure"], ["Vercel", "Fast frontend hosting"], ["Docker", "Consistent environments"], ["GitHub Actions", "Automated testing and deploys"]] },
  { t: "Integrations & AI", tint: "bg-sky", items: [["REST & Webhooks", "Connecting systems"], ["Payment gateways", "Razorpay, Stripe"], ["LLM APIs", "Assistants and automation"], ["Workflow tools", "Scheduled and triggered jobs"]] },
  { t: "Design & quality", tint: "bg-coral-soft", items: [["Figma", "Design and prototyping"], ["Lighthouse", "Performance and SEO checks"], ["Testing Library", "Reliable UI tests"], ["Playwright", "End-to-end testing"]] },
];

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="Modern, proven tools chosen for your needs."
        intro="We use widely adopted technologies that are fast, secure and easy to maintain, so your product is never tied to a niche tool or a single developer."
        crumbs={[{ label: "Technologies" }]}
      />
      <section className="container-ms grid gap-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.t} className="card-lift reveal flex flex-col gap-4 rounded-[24px] border border-line bg-white p-7">
            <h2 className={`self-start rounded-full px-3.5 py-1.5 font-display text-sm font-bold ${g.tint}`}>{g.t}</h2>
            <ul className="flex flex-col divide-y divide-line">
              {g.items.map(([name, use]) => (
                <li key={name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-semibold">{name}</span>
                  <span className="text-right text-sm text-muted">{use}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="bg-mist">
        <div className="container-ms py-16">
          <SectionHead center eyebrow="How we choose" title="The right tool for the job, not the trendiest one." intro="We recommend technology based on your goals, budget, team skills and long-term maintenance, and we explain the trade-offs in plain language." />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
