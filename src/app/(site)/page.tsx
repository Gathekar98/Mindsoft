import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { RotatingWord } from "@/components/site/RotatingWord";
import { DeviceArt, GlobeRing, WorkspaceArt } from "@/components/site/Art";
import { Faq } from "@/components/site/Faq";
import { ImageCard } from "@/components/site/ImageCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { categories, serviceLabel, servicesByCategory, type ServiceCategoryId } from "@/lib/services";
import { industries, industrySpans } from "@/lib/industries";
import { generalFaqs } from "@/lib/faqs";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const tech = [
  "React.js", "Next.js", "TypeScript", "Python", "Django", "FastAPI", "PostgreSQL", "MySQL",
  "Tailwind CSS", "REST APIs", "AWS", "Docker", "Node.js", "Figma", "Git", "Vercel", "Redis", "LLM APIs",
];

const catIds = Object.keys(categories) as ServiceCategoryId[];

export default function HomePage() {
  const wa = whatsappLink();

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#E1F6FF_0%,#F4FBFF_65%,#fff_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute top-16 -left-32 h-[420px] w-[420px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.35),transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-16 h-[460px] w-[460px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,138,91,0.22),transparent_70%)] [animation-direction:reverse] [animation-duration:18s]" />

        <div className="container-ms relative grid items-center gap-12 pt-14 pb-24 lg:grid-cols-2 lg:pt-20 lg:pb-28">
          <div className="flex flex-col gap-6">
            <span className="inline-flex animate-rise items-center gap-2.5 self-start rounded-full border border-[#CDEBF6] bg-white px-4 py-2 text-sm font-medium text-ocean">
              <span className="h-2.5 w-2.5 animate-ping-soft rounded-full bg-mint" />
              Now taking new projects · {site.availability}
            </span>
            <h1 className="animate-rise font-display text-[40px] leading-[1.08] font-extrabold tracking-[-0.02em] [animation-delay:.12s] sm:text-[52px] xl:text-[60px]">
              We build <RotatingWord words={["websites", "web apps", "software", "automations"]} />
              that move your business forward.
            </h1>
            <p className="max-w-[560px] animate-rise text-lg leading-relaxed text-slate [animation-delay:.24s]">
              Websites, web apps, business software and AI-assisted automation for startups and growing businesses, designed, built and supported by one remote-first team in Pune.
            </p>
            <div className="flex animate-rise flex-wrap gap-3.5 [animation-delay:.36s]">
              <Link href="/quote" className="btn-primary">Get a free quote</Link>
              <Link href={site.bookingUrl || "/contact"} className="btn-outline">Book a free call</Link>
              <Link href="/services" className="btn px-2 text-ocean">Explore services →</Link>
            </div>
            <ul className="flex animate-rise flex-wrap gap-x-6 gap-y-2 text-sm text-[#3A4460] [animation-delay:.48s]">
              {["Written quote before we start", "Regular progress demos", "You own the code"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-[540px] animate-rise [animation-delay:.3s] sm:h-[540px]">
            <GlobeRing className="absolute top-1/2 left-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 sm:w-[500px]" />
            <div className="absolute top-1/2 left-1/2 h-[360px] w-[290px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[180px_180px_28px_28px] border-8 border-white shadow-[0_30px_70px_rgba(12,18,45,0.25)] sm:h-[430px] sm:w-[340px]">
              <Image
                src="/images/team-review-screen.jpg"
                alt="A team reviewing a project together on a computer screen"
                fill
                priority
                sizes="(max-width: 640px) 290px, 340px"
                className="object-cover object-[30%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,92,145,0)_55%,rgba(10,92,145,0.55))]" />
            </div>
            <HeroChip className="top-6 left-0" delay="0s" tint="bg-ice" label="Websites & E-commerce" icon="M3 4h18v14H3zM8 21h8" color="#0A5C91" />
            <HeroChip className="top-24 right-0" delay="1.2s" tint="bg-coral-soft" label="Web Apps & Software" icon="M8 7l-5 5 5 5M16 7l5 5-5 5" color="#B3471F" />
            <HeroChip className="bottom-16 left-2" delay="2.4s" tint="bg-mint-soft" label="AI & Automation" icon="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" color="#167A55" />
            <HeroChip className="right-3 bottom-6" delay="3.6s" dark label="Maintenance & Support" icon="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" color="#7FE3F0" />
          </div>
        </div>
      </section>

      {/* ---------------- TECH MARQUEE ---------------- */}
      <section aria-labelledby="tech-heading" className="flex flex-col items-center gap-6 pb-16">
        <h2 id="tech-heading" className="eyebrow">Technologies we work with</h2>
        <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee gap-3.5 hover:[animation-play-state:paused]">
            {[...tech, ...tech].map((t, i) => (
              <li key={i} aria-hidden={i >= tech.length} className="rounded-xl border border-line bg-white px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-[#3A4460]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="bg-mist">
        <div className="container-ms flex flex-col gap-12 py-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[660px] flex-col gap-3">
              <p className="eyebrow">What we do</p>
              <h2 className="h-section">Everything your business runs on, from one team.</h2>
              <p className="text-base text-slate">Four service areas, sixteen services. Pick one, or let us handle the whole thing.</p>
            </div>
            <Link href="/services" className="font-semibold text-ocean">View all services →</Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {catIds.map((id, i) => (
              <ImageCard
                key={id}
                href={`/services#${id}`}
                image={categories[id].image}
                icon={categories[id].icon}
                number={`0${i + 1}`}
                title={categories[id].name}
                text={categories[id].blurb}
                tags={servicesByCategory(id).map((s) => serviceLabel(s.slug))}
                cta={`${servicesByCategory(id).length} services`}
                className="min-h-[480px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EXTENDED TEAM ---------------- */}
      <section className="container-ms flex flex-col gap-10 py-24">
        <div className="reveal flex max-w-[700px] flex-col gap-3">
          <p className="eyebrow">Beyond the launch</p>
          <h2 className="h-section">Your extended tech team, month after month.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-lift reveal relative flex flex-col gap-5 overflow-hidden rounded-[26px] bg-navy p-8 text-white sm:p-9">
            <div aria-hidden="true" className="absolute -top-16 -right-16 h-60 w-60 animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.45),transparent_70%)]" />
            <span className="relative self-start rounded-full bg-[#1E2A5C] px-3 py-1.5 text-[13px] font-semibold text-aqua">Maintenance &amp; Support</span>
            <h3 className="relative font-display text-[26px] leading-tight font-extrabold">Keep your website or app secure, updated and improving.</h3>
            <ul className="relative grid gap-2.5 text-sm text-on-dark sm:grid-cols-2">
              {["Updates & security patches", "Daily backups", "Uptime monitoring", "Small changes each month", "Speed & SEO checks", "Priority bug fixes"].map((t) => (
                <li key={t}>✓ {t}</li>
              ))}
            </ul>
            <Link href="/services/website-maintenance-support" className="btn relative mt-auto self-start bg-cyan text-navy hover:bg-aqua">
              See care plans →
            </Link>
          </div>
          <div className="card-lift reveal flex flex-col gap-5 rounded-[26px] border border-[#CDEBF6] bg-[linear-gradient(150deg,#E1F6FF,#fff)] p-8 sm:p-9">
            <div className="relative h-[190px] overflow-hidden rounded-[18px]">
              <Image src="/images/developer-at-work.jpg" alt="A developer writing code on a monitor in a modern office" fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover object-[center_62%]" />
            </div>
            <span className="self-start rounded-full border border-[#CDEBF6] bg-white px-3 py-1.5 text-[13px] font-semibold text-ocean">Dedicated developers</span>
            <h3 className="font-display text-[26px] leading-tight font-extrabold">Add a React or Python developer to your team.</h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <DevChip gradient="from-ocean to-cyan" title="React.js / Next.js" sub="Frontend, dashboards, web apps" />
              <DevChip gradient="from-coral to-[#FFC857]" title="Python" sub="APIs, backends, automation" />
            </div>
            <Link href="/quote?service=full-stack-development" className="btn mt-auto self-start bg-navy text-white hover:bg-navy-2">
              Hire a developer →
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- COMMITMENTS ---------------- */}
      <section className="relative overflow-hidden bg-ocean text-white">
        <Image src="/images/team-office.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 animate-shift bg-[linear-gradient(135deg,rgba(10,70,120,0.94),rgba(18,127,166,0.86)_50%,rgba(10,92,145,0.92))] bg-[length:200%_200%] [animation-duration:16s]" />
        <div className="container-ms relative flex flex-col gap-10 py-24">
          <div className="reveal flex flex-col items-center gap-3 text-center">
            <p className="eyebrow !text-ice">Our commitments</p>
            <h2 className="h-section">What you can count on, every project.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { big: "Fast", title: "Quick replies", text: `We aim to reply to every enquiry within ${site.responseTime}.` },
              { big: "Written", title: "Scope and quote first", text: "Agreed deliverables and cost before any work begins." },
              { big: "Demos", title: "See progress regularly", text: "Working builds to review, not just status emails." },
              { big: "Yours", title: "You own everything", text: "Code, designs and accounts handed over to you." },
            ].map((c) => (
              <div key={c.title} className="card-lift reveal flex flex-col gap-3 rounded-[22px] border border-white/30 bg-white/12 p-7 backdrop-blur-sm">
                <span className="font-display text-[32px] font-extrabold">{c.big}</span>
                <h3 className="text-[17px] font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-[#E3F6FB]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- INDUSTRIES ---------------- */}
      <section className="container-ms flex flex-col gap-10 py-24">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="eyebrow">Industries</p>
            <h2 className="h-section">Built for businesses like yours.</h2>
          </div>
          <Link href="/industries" className="font-semibold text-ocean">All industries →</Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <li key={ind.slug} className={`flex ${industrySpans[i]}`}>
              <ImageCard
                href={`/services/${ind.service}`}
                image={ind.image}
                icon={ind.icon}
                number={String(i + 1).padStart(2, "0")}
                title={ind.name}
                text={ind.blurb}
                tags={ind.tags}
                cta="See how we help"
                className="w-full"
                sizes={industrySpans[i] ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- THREE STEPS ---------------- */}
      <section className="bg-mist">
        <div className="container-ms grid items-center gap-14 py-24 lg:grid-cols-2">
          <div className="reveal relative pb-16">
            <div className="relative h-[360px] overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(12,18,45,0.16)] sm:h-[440px]">
              <Image src="/images/team-discussion.jpg" alt="A team discussing a project around a laptop" fill sizes="(max-width:1024px) 100vw, 600px" className="object-cover object-[40%_center]" />
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold shadow-[0_10px_24px_rgba(12,18,45,0.15)]">
              <span className="h-2 w-2 animate-ping-soft rounded-full bg-mint" />
              Free 30-minute discovery call
            </div>
            <div className="absolute right-0 bottom-0 w-[44%] animate-bob overflow-hidden rounded-[22px] border-[6px] border-white bg-ice shadow-[0_24px_50px_rgba(12,18,45,0.2)] [animation-duration:7s] sm:-right-3">
              <WorkspaceArt />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="reveal flex flex-col gap-3">
              <p className="eyebrow">How it works</p>
              <h2 className="h-section">From first call to launch in three steps.</h2>
            </div>
            <ol className="flex flex-col gap-3.5">
              {[
                { n: "01", c: "bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] text-white", t: "Free discovery call", d: "Tell us what you need. We ask the right questions and suggest the simplest way to get there." },
                { n: "02", c: "bg-coral text-navy", t: "Clear proposal & plan", d: "A written scope, timeline, technology choice and quote, with milestones you approve." },
                { n: "03", c: "bg-navy text-white", t: "Build, launch & support", d: "Regular demos while we build, a careful launch, then ongoing care as you grow." },
              ].map((s) => (
                <li key={s.n} className="card-lift reveal flex gap-4 rounded-[18px] bg-white p-5 shadow-[0_10px_30px_rgba(12,18,45,0.06)]">
                  <span className={`flex h-13 w-13 flex-none items-center justify-center rounded-[14px] font-display text-lg font-extrabold ${s.c}`}>{s.n}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[17px] font-semibold">{s.t}</h3>
                    <p className="text-sm leading-relaxed text-slate">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/process" className="font-semibold text-ocean">See our full process →</Link>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT WE BUILD ---------------- */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute -top-24 -right-24 h-[480px] w-[480px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(18,127,166,0.55),transparent_70%)] [animation-duration:16s]" />
        <div className="container-ms relative flex flex-col gap-11 py-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="flex max-w-[660px] flex-col gap-3">
              <p className="eyebrow !text-aqua">Our work</p>
              <h2 className="h-section">What we build</h2>
              <p className="text-on-dark">Client case studies will appear here once projects are approved for sharing. These are the kinds of products we deliver.</p>
            </div>
            <Link href="/work" className="font-semibold text-aqua">View work →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { v: "store" as const, bg: "bg-[linear-gradient(135deg,#127FA6,#3EC0D5)]", tag: "E-commerce", t: "Online stores with payments and inventory", href: "/services/ecommerce-development" },
              { v: "app" as const, bg: "bg-[linear-gradient(135deg,#FF8A5B,#FFC857)]", tag: "CRM / ERP · Web app", t: "Internal tools that replace spreadsheets", href: "/services/crm-erp-solutions" },
              { v: "corporate" as const, bg: "bg-[linear-gradient(135deg,#1AA67A,#7FE3F0)]", tag: "Corporate website", t: "Fast, responsive sites that win enquiries", href: "/services/corporate-website-development" },
            ].map((p) => (
              <Link key={p.v} href={p.href} className="card-lift reveal flex flex-col overflow-hidden rounded-[22px] bg-navy-2">
                <div className={`flex h-[230px] items-end justify-center ${p.bg}`}>
                  <DeviceArt variant={p.v} />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <span className="text-[13px] font-semibold tracking-wide text-aqua uppercase">{p.tag} · Sample project type</span>
                  <h3 className="font-display text-xl font-bold">{p.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ + CAREERS ---------------- */}
      <section className="container-ms grid items-start gap-10 py-24 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-6">
          <div className="reveal flex flex-col gap-3">
            <p className="eyebrow">FAQ</p>
            <h2 className="h-section !text-[36px]">Questions people ask before working with us</h2>
          </div>
          <Faq items={generalFaqs.slice(0, 5)} />
          <Link href="/faqs" className="font-semibold text-ocean">More questions →</Link>
        </div>
        <div className="reveal relative flex flex-col gap-4 overflow-hidden rounded-[26px] bg-[linear-gradient(150deg,#0A5C91,#127FA6_55%,#1AA6C9)] text-white">
          <div className="relative h-[210px]">
            <Image src="/images/team-celebrating.jpg" alt="A happy team celebrating a result at their desk" fill sizes="(max-width:1024px) 100vw, 480px" className="object-cover object-[center_30%]" />
          </div>
          <div className="relative flex flex-col gap-4 p-8 pt-2">
            <svg aria-hidden="true" viewBox="0 0 220 220" className="absolute -right-8 -bottom-8 w-[220px] animate-spin-slow [animation-duration:30s]">
              <circle cx="110" cy="110" r="100" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="8 10" />
              <circle cx="110" cy="110" r="60" fill="#fff" fillOpacity="0.08" />
            </svg>
            <p className="eyebrow !text-white">Careers &amp; internships</p>
            <h2 className="font-display text-[28px] leading-tight font-extrabold">Grow your career with Mindsoft.</h2>
            <p className="text-[15px] leading-relaxed text-[#E3F6FB]">React.js and Python roles for developers, and internships for students and freshers.</p>
            <ul className="flex flex-wrap gap-2 text-[13px]">
              {["React.js Developer", "Python Developer", "Internships"].map((t) => (
                <li key={t} className="rounded-full bg-white/20 px-3 py-1.5">{t}</li>
              ))}
            </ul>
            <Link href="/careers" className="btn-light relative mt-2 self-start">View careers →</Link>
          </div>
        </div>
      </section>

      {/* ---------------- FINAL CTA + QUOTE ---------------- */}
      <section className="container-ms pb-24" aria-labelledby="cta-heading">
        <div className="reveal relative grid gap-12 overflow-hidden rounded-[32px] bg-navy p-7 text-white sm:p-12 lg:grid-cols-2 lg:p-14">
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-96 w-96 animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.45),transparent_70%)]" />
          <div className="relative flex flex-col gap-5">
            <p className="eyebrow !text-aqua">Let&apos;s build it together</p>
            <h2 id="cta-heading" className="h-section">Have a project in mind?</h2>
            <p className="leading-relaxed text-on-dark">Share a few details. We&apos;ll reply with questions, a suggested approach and an estimate.</p>
            <ul className="flex flex-col gap-3">
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-navy-2 px-4 py-3.5 font-semibold hover:bg-[#1E2A5C]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-mint" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 20l1.3-4A8 8 0 1 1 8 19z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></svg>
                    </span>
                    Chat on WhatsApp
                  </a>
                </li>
              )}
              <li>
                <Link href={site.bookingUrl || "/contact"} className="flex items-center gap-3 rounded-2xl bg-navy-2 px-4 py-3.5 font-semibold hover:bg-[#1E2A5C]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ocean-2" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="#fff" strokeWidth="2" /><path d="M8 3v4M16 3v4M4 10h16" stroke="#fff" strokeWidth="2" /></svg>
                  </span>
                  Book a free 30-minute call
                </Link>
              </li>
              <li className="text-sm text-on-dark">Or email {site.email}</li>
            </ul>
          </div>
          <div className="relative">
            <LeadForm type="QUOTE" sourcePage="/" compact />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: site.name,
            url: site.url,
            description: site.description,
            areaServed: ["IN", "Worldwide"],
            address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
          }),
        }}
      />
    </>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#D5F3F8" />
      <path d="M7 12.5l3.2 3L17 9" fill="none" stroke="#0A6C9E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroChip({ className, delay, tint, dark, label, icon, color }: { className: string; delay: string; tint?: string; dark?: boolean; label: string; icon: string; color: string }) {
  return (
    <div className={`absolute animate-bob ${className}`} style={{ animationDelay: delay }}>
      <div className={`flex items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-sm font-semibold shadow-[var(--shadow-float)] ${dark ? "bg-navy text-white" : "bg-white"}`}>
        <span className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${dark ? "bg-[#1E2A5C]" : tint}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d={icon} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {label}
      </div>
    </div>
  );
}

function DevChip({ gradient, title, sub }: { gradient: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white px-3.5 py-3 shadow-[0_8px_20px_rgba(12,18,45,0.06)]">
      <span className={`h-9 w-9 flex-none rounded-full bg-gradient-to-br ${gradient}`} aria-hidden="true" />
      <span className="flex flex-col">
        <span className="text-[15px] font-semibold">{title}</span>
        <span className="text-[13px] text-muted">{sub}</span>
      </span>
    </div>
  );
}
