import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Mindsoft Tech Solutions is a remote-first IT services company in Pune, Maharashtra, India, building websites, web applications and business software.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Clarity", d: "Plain language, written scopes and honest estimates. You always know what's happening and why." },
  { t: "Craft", d: "Clean, tested, documented code and thoughtful design that's easy to maintain." },
  { t: "Ownership", d: "We treat your product as if it were ours, and you keep full ownership of everything we build." },
  { t: "Partnership", d: "We aim to be the technology partner you call first, not a vendor you manage." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Mindsoft"
        title={<>A technology partner for businesses that want to grow.</>}
        intro={`${site.name} is a remote-first IT services company based in ${site.location}. We help startups, growing businesses and organisations build, modernise and maintain the websites, applications and systems they depend on.`}
        crumbs={[{ label: "About us" }]}
        aside={
          <div className="relative mx-auto h-[340px] w-full max-w-[480px]">
            <div className="absolute inset-0 overflow-hidden rounded-[180px_180px_28px_28px] border-8 border-white shadow-[0_30px_70px_rgba(12,18,45,0.2)]">
              <Image src="/images/team-office.jpg" alt="A team working together at computers in a bright office" fill priority sizes="480px" className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-bob rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-float)]">
              <p className="font-display text-lg font-extrabold">Remote-first</p>
              <p className="text-[13px] text-muted">Working with clients anywhere</p>
            </div>
          </div>
        }
      />

      <section className="container-ms grid gap-12 py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHead eyebrow="Who we are" title="Built around one simple idea." />
          <div className="reveal flex flex-col gap-4 text-[16px] leading-relaxed text-slate">
            <p>
              Good technology should make a business easier to run, not harder. Many companies end up with websites that don&apos;t bring in enquiries, tools that don&apos;t talk to each other and systems nobody fully understands.
            </p>
            <p>
              Mindsoft exists to fix that. We combine design, development and ongoing support so you have one accountable team, from the first conversation to long after launch.
            </p>
            <p>
              As a remote-first company, we work with clients across India and beyond through calls, shared project boards and regular demos, so distance never gets in the way of clear communication.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card-lift reveal flex flex-col gap-3 rounded-[22px] bg-navy p-7 text-white">
            <p className="eyebrow !text-aqua">Mission</p>
            <p className="font-display text-xl leading-snug font-bold">Help businesses build reliable technology that supports real growth.</p>
          </div>
          <div className="card-lift reveal flex flex-col gap-3 rounded-[22px] bg-[linear-gradient(150deg,#0A5C91,#127FA6_55%,#1AA6C9)] p-7 text-white">
            <p className="eyebrow !text-ice">Vision</p>
            <p className="font-display text-xl leading-snug font-bold">To be the first technology partner our clients think of, and the one they trust most.</p>
          </div>
          <div className="reveal flex flex-col gap-3 rounded-[22px] border border-line bg-white p-7 sm:col-span-2">
            <p className="eyebrow">What we do</p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {["Websites & e-commerce", "Custom web applications", "React, Next.js & Python", "Databases, APIs & CRM/ERP", "Automation & AI integration", "Cloud, maintenance & SEO"].map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-[15px]"><CheckIcon /> {x}</li>
              ))}
            </ul>
            <Link href="/services" className="mt-2 text-sm font-semibold text-ocean">Explore services →</Link>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-ms flex flex-col gap-10 py-20">
          <SectionHead eyebrow="Our values" title="How we work with every client." center />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.t} className="card-lift reveal flex flex-col gap-3 rounded-[22px] bg-white p-7 shadow-[var(--shadow-card)]">
                <span className="font-display text-4xl font-extrabold text-[#CDEBF6]">0{i + 1}</span>
                <h3 className="font-display text-xl font-bold">{v.t}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-ms grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="reveal relative h-[340px] overflow-hidden rounded-[28px]">
          <Image src="/images/team-discussion.jpg" alt="A team discussing a project around a laptop" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          <SectionHead eyebrow="Join us" title="Growing a team of curious builders." intro="We're building a team of React and Python developers, and we offer internships for students and freshers who want real project experience." />
          <div className="flex flex-wrap gap-3">
            <Link href="/careers" className="btn-primary">View careers</Link>
            <Link href="/careers/internships" className="btn-outline">Internships</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
