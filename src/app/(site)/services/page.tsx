import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";
import { ServiceArt, categoryBg } from "@/components/site/Art";
import { categories, servicesByCategory, type ServiceCategoryId } from "@/lib/services";

export const metadata: Metadata = {
  title: "IT Services: Websites, Web Apps, Software & Cloud",
  description:
    "Website development, custom web applications, React and Python development, CRM/ERP, APIs, automation, cloud hosting, maintenance and SEO from Mindsoft Tech Solutions, Pune.",
  alternates: { canonical: "/services" },
};

const catIds = Object.keys(categories) as ServiceCategoryId[];

const models = [
  { t: "Fixed-scope project", d: "Defined features, timeline and price. Ideal for websites, MVPs and clearly scoped builds." },
  { t: "Monthly care plan", d: "Maintenance, updates, monitoring and a set amount of improvement work every month." },
  { t: "Dedicated developer", d: "A React or Python developer working as part of your team, on a monthly basis." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>One team for the technology your business runs on.</>}
        intro="From your first website to custom software, integrations and ongoing support. Explore our four service areas below, or tell us the problem and we'll suggest the right approach."
        crumbs={[{ label: "Services" }]}
      >
        <nav aria-label="Service areas" className="flex flex-wrap gap-2">
          {catIds.map((id) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-[#CDEBF6] bg-white px-4 py-2 text-sm font-semibold text-ocean hover:border-ocean">
              {categories[id].name}
            </a>
          ))}
        </nav>
      </PageHero>

      {catIds.map((id, idx) => (
        <section key={id} id={id} className={`scroll-mt-28 ${idx % 2 ? "bg-mist" : ""}`}>
          <div className="container-ms grid gap-10 py-20 lg:grid-cols-[1fr_2fr]">
            <div className="reveal flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
              <div className={`h-[180px] overflow-hidden rounded-[22px] ${categoryBg[id]}`}>
                <ServiceArt id={id} />
              </div>
              <p className="eyebrow">0{idx + 1} · Service area</p>
              <h2 className="font-display text-[30px] leading-tight font-extrabold">{categories[id].name}</h2>
              <p className="text-slate">{categories[id].blurb}</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {servicesByCategory(id).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="card-lift reveal flex h-full flex-col gap-3 rounded-[20px] border border-line bg-white p-6">
                    <h3 className="font-display text-lg font-bold">{s.name}</h3>
                    <p className="text-[15px] leading-relaxed text-slate">{s.short}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {s.tech.slice(0, 3).map((t) => (
                        <li key={t} className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-ocean">{t}</li>
                      ))}
                    </ul>
                    <span className="mt-auto pt-2 text-sm font-semibold text-ocean">
                      Learn more <span className="arrow">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="container-ms flex flex-col gap-10 py-20">
        <SectionHead eyebrow="Ways to work with us" title="Choose the engagement that fits your project." />
        <div className="grid gap-5 md:grid-cols-3">
          {models.map((m, i) => (
            <div key={m.t} className="card-lift reveal flex flex-col gap-3 rounded-[22px] border border-line bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)] font-display font-extrabold text-white">
                {String.fromCharCode(65 + i)}
              </span>
              <h3 className="font-display text-xl font-bold">{m.t}</h3>
              <p className="text-[15px] leading-relaxed text-slate">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Not sure which service you need?" text="Describe the problem you're trying to solve. We'll recommend the simplest approach and give you a clear estimate." />
    </>
  );
}
