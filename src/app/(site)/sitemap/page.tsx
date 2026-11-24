import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { allPublicRoutes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "All pages on the Mindsoft Tech Solutions website.",
  alternates: { canonical: "/sitemap" },
};

const order = ["Main", "Company", "Services", "Careers", "Work", "Insights", "Legal"];

export default function SitemapPage() {
  const routes = allPublicRoutes();
  const groups = order
    .map((g) => ({ g, items: routes.filter((r) => r.group === g) }))
    .filter((x) => x.items.length);

  return (
    <>
      <PageHero eyebrow="Sitemap" title="All pages" crumbs={[{ label: "Sitemap" }]} />
      <section className="container-ms grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ g, items }) => (
          <div key={g}>
            <h2 className="mb-3 font-display text-lg font-bold">{g}</h2>
            <ul className="flex flex-col gap-2">
              {items.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="text-slate hover:text-ocean hover:underline">{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
