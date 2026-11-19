import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";
import { Faq } from "@/components/site/Faq";
import { generalFaqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description: "Why businesses work with Mindsoft Tech Solutions: written scopes, regular demos, full code ownership, security-first builds and support after launch.",
  alternates: { canonical: "/why-choose-us" },
};

const reasons = [
  { t: "Plain-language scope", d: "Clear deliverables, timelines and costs in writing before any work begins. No hidden extras.", icon: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3" },
  { t: "Progress you can see", d: "Regular demos of working software, so you can steer the project early and often.", icon: "M3 5h18v12H3zM10 9l4 2-4 2z" },
  { t: "You own everything", d: "Source code, designs, domains and accounts belong to you. No lock-in.", icon: "M8 7l-5 5 5 5M16 7l5 5-5 5" },
  { t: "Secure by default", d: "Good security practice, protected admin areas, backups and careful handling of personal data.", icon: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" },
  { t: "Fast and search-friendly", d: "Performance, accessibility and SEO are part of every build, not an afterthought.", icon: "M13 3L5 14h6l-1 7 8-11h-6z" },
  { t: "One team, end to end", d: "Design, development, hosting and support from one accountable team.", icon: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 3-5 6-5s6 2 6 5M12 20c0-3 3-5 6-5s4 1 4 3" },
  { t: "Modern, proven technology", d: "React, Next.js, Python and PostgreSQL: widely used tools that are easy to hire for and maintain.", icon: "M4 6h16M4 12h16M4 18h10" },
  { t: "Support after launch", d: "Monthly care plans keep your product secure, updated and improving as you grow.", icon: "M4 12a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2v-6h4M4 12v4a2 2 0 0 0 2 2h2v-6H4" },
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Mindsoft"
        title="A dependable partner, not just a vendor."
        intro="Choosing a technology partner is a big decision. Here is what you can expect when you work with us, every time."
        crumbs={[{ label: "Why choose us" }]}
      />

      <section className="container-ms py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <li key={r.t} className="card-lift reveal flex flex-col gap-4 rounded-[22px] border border-line bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-sky" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24"><path d={r.icon} fill="none" stroke="#0A6C9E" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h2 className="font-display text-lg font-bold">{r.t}</h2>
              <p className="text-[15px] leading-relaxed text-slate">{r.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <Image src="/images/developers-coding.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div className="container-ms relative grid gap-10 py-20 lg:grid-cols-2">
          <SectionHead dark eyebrow="Honest by design" title="What we won't do." />
          <ul className="flex flex-col gap-4 text-on-dark">
            {[
              "Promise first-page Google rankings or results we can't control.",
              "Start work without a written, agreed scope and quote.",
              "Hold your code, domain or hosting accounts hostage.",
              "Recommend complex custom builds when a simpler option will do.",
            ].map((x) => (
              <li key={x} className="reveal flex gap-3 rounded-2xl border border-navy-line bg-navy-2/80 p-5">
                <span aria-hidden="true" className="font-bold text-coral">✕</span> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-ms grid gap-10 py-20 lg:grid-cols-[1fr_1.3fr]">
        <SectionHead eyebrow="FAQ" title="Questions before you decide" />
        <Faq items={generalFaqs} />
      </section>

      <CtaBand />
    </>
  );
}
