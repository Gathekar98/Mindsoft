import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/site/PageHero";
import { DeviceArt } from "@/components/site/Art";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Work — Projects & Case Studies",
  description: "Projects and case studies from Mindsoft Tech Solutions: websites, web applications, e-commerce and business software.",
  alternates: { canonical: "/work" },
};

const sampleTypes = [
  { v: "store" as const, bg: "bg-[linear-gradient(135deg,#127FA6,#3EC0D5)]", tag: "E-commerce", t: "Online stores with payments and inventory", href: "/services/ecommerce-development" },
  { v: "app" as const, bg: "bg-[linear-gradient(135deg,#FF8A5B,#FFC857)]", tag: "CRM / ERP · Web app", t: "Internal tools that replace spreadsheets", href: "/services/crm-erp-solutions" },
  { v: "corporate" as const, bg: "bg-[linear-gradient(135deg,#1AA67A,#7FE3F0)]", tag: "Corporate website", t: "Fast, responsive sites that win enquiries", href: "/services/corporate-website-development" },
];

export default async function WorkPage({ searchParams }: { searchParams: Promise<{ industry?: string }> }) {
  const { industry } = await searchParams;
  const all = await db.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
  const industries = [...new Set(all.map((p) => p.industry))].sort();
  const projects = industry ? all.filter((p) => p.industry === industry) : all;

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects and case studies"
        intro="Real projects, explained: the challenge, what we built and the results. Case studies are published only with our clients' permission."
        crumbs={[{ label: "Work" }]}
      />

      {all.length === 0 ? (
        <section className="container-ms flex flex-col gap-10 pb-20">
          <div className="reveal rounded-[24px] border border-dashed border-[#CDEBF6] bg-mist p-8 sm:p-10">
            <h2 className="font-display text-2xl font-extrabold">Case studies are on their way</h2>
            <p className="mt-2 max-w-2xl text-slate">
              We&apos;re preparing detailed case studies as projects are completed and approved for sharing. In the meantime, here are the kinds of products we build. Ask us for examples relevant to your project.
            </p>
            <Link href="/contact" className="btn-primary mt-6">Ask for relevant examples</Link>
          </div>
          <SectionHead eyebrow="What we build" title="Sample project types" />
          <div className="grid gap-6 md:grid-cols-3">
            {sampleTypes.map((p) => (
              <Link key={p.v} href={p.href} className="card-lift reveal flex flex-col overflow-hidden rounded-[22px] bg-navy text-white">
                <div className={`flex h-[230px] items-end justify-center ${p.bg}`}><DeviceArt variant={p.v} /></div>
                <div className="flex flex-col gap-2 p-6">
                  <span className="text-[13px] font-semibold tracking-wide text-aqua uppercase">{p.tag} · Sample project type</span>
                  <h3 className="font-display text-xl font-bold">{p.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="container-ms flex flex-col gap-8 pb-20">
          {industries.length > 1 && (
            <nav aria-label="Filter by industry" className="flex flex-wrap gap-2">
              <Link href="/work" aria-current={!industry ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${!industry ? "bg-navy text-white" : "bg-mist text-slate"}`}>All</Link>
              {industries.map((i) => (
                <Link key={i} href={`/work?industry=${encodeURIComponent(i)}`} aria-current={industry === i ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${industry === i ? "bg-navy text-white" : "bg-mist text-slate"}`}>{i}</Link>
              ))}
            </nav>
          )}
          {projects.length === 0 ? (
            <p className="text-slate">No projects in this industry yet. <Link href="/work" className="font-semibold text-ocean">Show all</Link></p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link href={`/work/${p.slug}`} className="card-lift reveal flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white">
                    <div className="relative h-[220px] bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)]">
                      {p.coverImage ? <Image src={p.coverImage} unoptimized={p.coverImage.startsWith("http")} alt="" fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" /> : <div className="flex h-full items-end justify-center"><DeviceArt variant="app" /></div>}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <span className="text-[13px] font-semibold text-ocean-text uppercase">{p.industry}</span>
                      <h2 className="font-display text-xl font-bold">{p.title}</h2>
                      <p className="text-sm text-slate">{p.summary}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                        {p.services.slice(0, 3).map((s) => <li key={s} className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-ocean">{s}</li>)}
                      </ul>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <CtaBand />
    </>
  );
}
