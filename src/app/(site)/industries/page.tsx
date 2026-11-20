import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { ImageCard } from "@/components/site/ImageCard";
import { industries, industrySpans } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Websites, web apps and software for retail, healthcare, real estate, education, finance, logistics, manufacturing and startups.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Solutions shaped around how your industry works."
        intro="Every industry has its own workflows, customers and regulations. We take time to understand yours before recommending what to build."
        crumbs={[{ label: "Industries" }]}
      />
      <section className="container-ms pb-20">
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
                cta="Related service"
                className="min-h-[380px] w-full"
                priority={i < 2}
                sizes={industrySpans[i] ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              />
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Don't see your industry?" text="We work with businesses of many kinds. Tell us about yours and how you operate today." />
    </>
  );
}
