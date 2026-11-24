import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBand } from "@/components/site/PageHero";
import { Markdown } from "@/components/site/Markdown";
import { formatDate, getPost, publishedPosts } from "@/content/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Article not found" };
  return {
    title: p.title,
    description: p.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, ...(p.coverImage ? { images: [p.coverImage] } : {}) },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = publishedPosts().filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-[linear-gradient(180deg,#E1F6FF_0%,#fff_100%)]">
          <div className="container-ms flex max-w-[860px] flex-col gap-5 pt-10 pb-12">
            <Breadcrumbs items={[{ label: "Insights", href: "/blog" }, { label: p.title }]} />
            <p className="eyebrow">{p.category}</p>
            <h1 className="animate-rise font-display text-[34px] leading-[1.12] font-extrabold tracking-[-0.02em] sm:text-[46px]">{p.title}</h1>
            <p className="text-lg text-slate">{p.excerpt}</p>
            <p className="text-sm text-muted">
              By {site.name} · <time dateTime={p.date}>{formatDate(p.date, "long")}</time>
            </p>
          </div>
        </header>
        {p.coverImage && (
          <div className="container-ms max-w-[1000px]">
            <div className="relative h-[260px] overflow-hidden rounded-[28px] sm:h-[420px]">
              <Image src={p.coverImage} alt="" fill priority sizes="1000px" className="object-cover" />
            </div>
          </div>
        )}
        <div className="container-ms max-w-[760px] py-12">
          <Markdown>{p.body}</Markdown>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-mist">
          <div className="container-ms flex flex-col gap-6 py-16">
            <h2 className="font-display text-2xl font-extrabold">More insights</h2>
            <ul className="grid gap-5 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/blog/${m.slug}`} className="card-lift flex h-full flex-col gap-2 rounded-[20px] bg-white p-6">
                    <span className="text-[13px] text-muted">{m.category}</span>
                    <h3 className="font-display font-bold">{m.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/blog/${p.slug}`,
          }),
        }}
      />
    </>
  );
}
