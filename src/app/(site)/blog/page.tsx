import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights — Practical Guides for Business Owners",
  description: "Practical articles on websites, web apps, software, automation and growing your business with technology, from Mindsoft Tech Solutions.",
  alternates: { canonical: "/blog" },
};

const covers = ["bg-[linear-gradient(135deg,#D5F3F8,#ECFAFD)]", "bg-[linear-gradient(135deg,#FFE9DF,#FFF3E8)]", "bg-[linear-gradient(135deg,#E8F7EF,#F3FBF7)]"];

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const all = await db.post.findMany({ where: { status: "PUBLISHED" }, orderBy: { publishedAt: "desc" } });
  const cats = [...new Set(all.map((p) => p.category))].sort();
  const posts = category ? all.filter((p) => p.category === category) : all;

  return (
    <>
      <PageHero eyebrow="Insights" title="Practical guides for business owners" intro="Plain-language articles on websites, software, automation and making smart technology decisions." crumbs={[{ label: "Insights" }]} />
      <section className="container-ms flex flex-col gap-8 pb-20">
        {cats.length > 1 && (
          <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Link href="/blog" aria-current={!category ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${!category ? "bg-navy text-white" : "bg-mist text-slate"}`}>All</Link>
            {cats.map((c) => (
              <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} aria-current={category === c ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === c ? "bg-navy text-white" : "bg-mist text-slate"}`}>{c}</Link>
            ))}
          </nav>
        )}
        {posts.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#CDEBF6] bg-mist p-10">
            <h2 className="font-display text-2xl font-extrabold">Articles coming soon</h2>
            <p className="mt-2 max-w-xl text-slate">We&apos;re writing practical guides on websites, software and automation. Check back soon.</p>
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.id}>
                <Link href={`/blog/${p.slug}`} className="card-lift reveal flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white">
                  <div className={`relative h-[180px] ${covers[i % covers.length]}`}>
                    {p.coverImage && <Image src={p.coverImage} unoptimized={p.coverImage.startsWith("http")} alt="" fill sizes="(max-width:768px) 100vw, 400px" className="object-cover" />}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <span className="text-[13px] text-muted">
                      {p.category} · <time dateTime={p.publishedAt?.toISOString()}>{p.publishedAt?.toLocaleDateString("en-IN", { dateStyle: "medium" })}</time>
                    </span>
                    <h2 className="font-display text-lg leading-snug font-bold">{p.title}</h2>
                    <p className="text-sm text-slate">{p.excerpt}</p>
                    <span className="mt-auto pt-2 text-sm font-semibold text-ocean">Read article <span className="arrow">→</span></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaBand />
    </>
  );
}
