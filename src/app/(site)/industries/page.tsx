import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Websites, web apps and software for retail, healthcare, real estate, education, finance, logistics, manufacturing and startups.",
  alternates: { canonical: "/industries" },
};

const industries = [
  { n: "Retail & E-commerce", tint: "bg-sky", c: "#0A5C91", d: "M4 9l2-5h12l2 5M4 9h16v11H4zM9 20v-6h6v6", needs: ["Online stores and catalogues", "Inventory and order management", "Payment and shipping integrations"], svc: "ecommerce-development" },
  { n: "Healthcare & Clinics", tint: "bg-coral-soft", c: "#B3471F", d: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z", needs: ["Appointment booking", "Patient-friendly websites", "Secure internal tools"], svc: "custom-web-application-development" },
  { n: "Real Estate", tint: "bg-sky", c: "#0A5C91", d: "M3 10l9-6 9 6M5 10v9h14v-9M9 19v-5h6v5", needs: ["Property listing sites", "Lead capture and CRM", "Site-visit scheduling"], svc: "crm-erp-solutions" },
  { n: "Education & Training", tint: "bg-mint-soft", c: "#167A55", d: "M3 8l9-4 9 4-9 4zM7 10v5c3 2 7 2 10 0v-5", needs: ["Course and admission websites", "Student portals", "Online assessments"], svc: "custom-software-development" },
  { n: "Finance & Professional Services", tint: "bg-sky", c: "#0A5C91", d: "M3 20h18M6 20V10M10 20V6M14 20v-8M18 20V4", needs: ["Corporate websites", "Client portals", "Calculators and reporting"], svc: "corporate-website-development" },
  { n: "Logistics & Transport", tint: "bg-sun-soft", c: "#8A5A00", d: "M3 17h2l2-6h8l2 6h4M7 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0", needs: ["Shipment tracking", "Driver and fleet tools", "Integrations with partners"], svc: "api-development-integrations" },
  { n: "Manufacturing", tint: "bg-coral-soft", c: "#B3471F", d: "M3 20V10l6 4V10l6 4V6h6v14z", needs: ["ERP and inventory", "Dealer portals", "Production dashboards"], svc: "crm-erp-solutions" },
  { n: "Startups & SaaS", tint: "bg-mint-soft", c: "#167A55", d: "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2 8 12.7 4 8.8l5.5-.8z", needs: ["MVPs and prototypes", "Scalable SaaS platforms", "Dedicated developers"], svc: "full-stack-development" },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Solutions shaped around how your industry works."
        intro="Every industry has its own workflows, customers and regulations. We take time to understand yours before recommending what to build."
        crumbs={[{ label: "Industries" }]}
      />
      <section className="container-ms grid gap-5 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((i) => (
          <div key={i.n} className={`card-lift reveal flex flex-col gap-5 rounded-[24px] p-7 ${i.tint}`}>
            <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true">
              <path d={i.d} fill="none" stroke={i.c} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <h2 className="font-display text-lg font-bold">{i.n}</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-slate">
              {i.needs.map((n) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
            <Link href={`/services/${i.svc}`} className="mt-auto text-sm font-semibold text-ocean">Related service →</Link>
          </div>
        ))}
      </section>
      <CtaBand title="Don't see your industry?" text="We work with businesses of many kinds. Tell us about yours and how you operate today." />
    </>
  );
}
