import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Markdown } from "@/components/site/Markdown";
import { getProject, publishedProjects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return { title: `${p.title} — Case Study`, description: p.summary.slice(0, 160), alternates: { canonical: `/work/${p.slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero eyebrow={`Case study · ${p.industry}`} title={p.title} intro={p.summary} crumbs={[{ label: "Work", href: "/work" }, { label: p.title }]} />
      {p.coverImage && (
        <div className="container-ms">
          <div className="relative h-[280px] overflow-hidden rounded-[28px] sm:h-[460px]">
            <Image src={p.coverImage} alt={`${p.title} project screenshot`} fill priority sizes="(max-width:1240px) 100vw, 1200px" className="object-cover" />
          </div>
        </div>
      )}
      <section className="container-ms grid gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          {[["The challenge", p.challenge], ["Our solution", p.solution], ["Results", p.results]].map(([t, body]) => (
            <div key={t} className="reveal">
              <h2 className="mb-3 font-display text-2xl font-extrabold">{t}</h2>
              <Markdown>{body}</Markdown>
            </div>
          ))}
        </div>
        <aside className="flex flex-col gap-5 self-start rounded-[24px] bg-mist p-7 lg:sticky lg:top-28">
          {p.client && <Info k="Client" v={p.client} />}
          <Info k="Industry" v={p.industry} />
          <div>
            <p className="text-sm text-muted">Services</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">{p.services.map((s) => <li key={s} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ocean">{s}</li>)}</ul>
          </div>
          <div>
            <p className="text-sm text-muted">Technology</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">{p.techStack.map((s) => <li key={s} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium">{s}</li>)}</ul>
          </div>
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">Visit live site ↗</a>}
        </aside>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-sm text-muted">{k}</p>
      <p className="font-semibold">{v}</p>
    </div>
  );
}
