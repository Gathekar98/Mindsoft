import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";
import { ServiceArt, categoryBg } from "@/components/site/Art";
import { Faq } from "@/components/site/Faq";
import { LeadForm } from "@/components/forms/LeadForm";
import { categories, getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Pune`,
    description: `${s.short} ${s.intro.split(". ")[0]}.`.slice(0, 160),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.name} | ${site.name}`, description: s.short },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "includes", label: "What's included" },
    { id: "process", label: "Process" },
    { id: "technology", label: "Technology" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      <PageHero
        eyebrow={categories[s.category].name}
        title={s.name}
        intro={s.intro}
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        aside={
          <div className={`relative mx-auto h-[260px] w-full max-w-[460px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_rgba(12,18,45,0.14)] ${categoryBg[s.category]}`}>
            <div className="absolute inset-0 animate-bob [animation-duration:8s]">
              <ServiceArt id={s.category} />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href={`/quote?service=${s.slug}`} className="btn-primary">Get a quote for this</Link>
          <a href="#enquire" className="btn-outline">Ask a question</a>
        </div>
      </PageHero>

      <nav aria-label="On this page" className="sticky top-[73px] z-30 border-y border-line bg-white/90 backdrop-blur-lg">
        <ul className="container-ms flex gap-1 overflow-x-auto py-2 text-sm font-medium whitespace-nowrap">
          {sections.map((x) => (
            <li key={x.id}>
              <a href={`#${x.id}`} className="block rounded-lg px-3 py-2 text-slate hover:bg-mist hover:text-ocean">{x.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="overview" className="container-ms grid scroll-mt-36 gap-10 py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHead eyebrow="Who it's for" title={`Is ${s.name.toLowerCase()} right for you?`} />
          <ul className="flex flex-col gap-3">
            {s.whoFor.map((w) => (
              <li key={w} className="reveal flex gap-3 text-[16px] text-slate">
                <CheckIcon className="mt-0.5" /> {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-1">
          {s.benefits.map((b, i) => (
            <div key={b.title} className="card-lift reveal flex gap-4 rounded-[20px] border border-line bg-white p-6">
              <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-[12px] font-display font-extrabold ${i === 1 ? "bg-coral text-navy" : "bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] text-white"}`}>
                {i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-[15px] text-slate">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="includes" className="scroll-mt-36 bg-mist">
        <div className="container-ms flex flex-col gap-10 py-20">
          <SectionHead eyebrow="What's included" title="What you get" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.includes.map((x) => (
              <li key={x} className="card-lift reveal flex items-start gap-3 rounded-[18px] bg-white p-5 shadow-[var(--shadow-card)]">
                <CheckIcon className="mt-0.5" />
                <span className="font-medium">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="container-ms flex scroll-mt-36 flex-col gap-10 py-20">
        <SectionHead eyebrow="How we deliver" title="Our process" />
        <ol className="relative grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {s.process.map((p, i) => (
            <li key={p.title} className="card-lift reveal flex flex-col gap-3 rounded-[20px] border border-line bg-white p-6">
              <span className={`flex h-12 w-12 items-center justify-center rounded-[14px] font-display font-extrabold ${i === Math.floor(s.process.length / 2) ? "bg-navy text-white" : "bg-sky text-ocean"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-slate">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="technology" className="scroll-mt-36 bg-navy text-white">
        <div className="container-ms flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="eyebrow !text-aqua">Technology</p>
            <h2 className="font-display text-[28px] font-extrabold">Tools we typically use</h2>
            <p className="text-on-dark">We recommend the stack that fits your needs, budget and team.</p>
          </div>
          <ul className="flex max-w-[640px] flex-wrap gap-2.5">
            {s.tech.map((t) => (
              <li key={t} className="rounded-xl border border-navy-line bg-navy-2 px-4 py-2.5 text-sm font-semibold">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="container-ms grid scroll-mt-36 gap-12 py-20 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-6">
          <SectionHead eyebrow="FAQ" title="Common questions" />
          <Faq items={s.faqs} />
        </div>
        <div id="enquire" className="scroll-mt-36 rounded-[28px] bg-navy p-2">
          <div className="px-6 pt-6 pb-2 text-white">
            <h2 className="font-display text-2xl font-extrabold">Ask about {s.name.toLowerCase()}</h2>
            <p className="mt-1 text-sm text-on-dark">We&apos;ll reply with answers and next steps.</p>
          </div>
          <LeadForm type="QUOTE" defaultService={s.slug} sourcePage={`/services/${s.slug}`} compact submitLabel="Send enquiry" />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mist">
          <div className="container-ms flex flex-col gap-8 py-20">
            <SectionHead eyebrow="Related services" title="You might also need" />
            <ul className="grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}`} className="card-lift reveal flex h-full flex-col gap-2 rounded-[20px] bg-white p-6 shadow-[var(--shadow-card)]">
                    <h3 className="font-display text-lg font-bold">{r.name}</h3>
                    <p className="text-sm text-slate">{r.short}</p>
                    <span className="mt-auto pt-2 text-sm font-semibold text-ocean">Learn more <span className="arrow">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand primary={{ label: "Get a free quote", href: `/quote?service=${s.slug}` }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.intro,
            serviceType: s.name,
            provider: { "@type": "Organization", name: site.name, url: site.url },
            areaServed: ["IN", "Worldwide"],
          }),
        }}
      />
    </>
  );
}
