import type { Metadata } from "next";
import { CheckIcon, PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a free quote for a website, web application, e-commerce store or custom software from Mindsoft Tech Solutions.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preset = service && getService(service) ? service : undefined;

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us about your project."
        intro="The more you share, the more accurate our first estimate will be. There's no obligation, and your details are kept private."
        crumbs={[{ label: "Request a quote" }]}
      />
      <section className="container-ms grid gap-10 pb-20 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] border border-line shadow-[var(--shadow-card)]">
          <LeadForm type="QUOTE" defaultService={preset} sourcePage="/quote" />
        </div>
        <aside className="flex flex-col gap-5 self-start lg:sticky lg:top-28">
          <div className="rounded-[24px] bg-navy p-7 text-white">
            <h2 className="font-display text-xl font-bold">What you&apos;ll get</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-on-dark">
              {["A reply within " + site.responseTime, "Clarifying questions, if needed", "A suggested approach and technology", "A written estimate and timeline"].map((x) => (
                <li key={x} className="flex gap-2.5"><CheckIcon /> {x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] bg-mist p-7">
            <h2 className="font-display text-lg font-bold">Helpful to include</h2>
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-slate">
              <li>What the website or software should do</li>
              <li>Who will use it</li>
              <li>Examples you like</li>
              <li>Existing systems to connect with</li>
              <li>Deadlines or launch dates</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
