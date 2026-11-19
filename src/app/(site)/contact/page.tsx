import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Mindsoft Tech Solutions, a remote-first IT services company in Pune, Maharashtra, India. Send a message, request a quote or chat on WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappLink();
  const channels = [
    { t: "Email", v: site.email, href: site.email.includes("@") && !site.email.startsWith("[") ? `mailto:${site.email}` : undefined },
    { t: "Phone", v: site.phone, href: site.phone.startsWith("+") ? `tel:${site.phone.replace(/\s/g, "")}` : undefined },
    ...(wa ? [{ t: "WhatsApp", v: "Chat with us", href: wa }] : []),
    { t: "Location", v: `${site.location} · Remote-first` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about what you're building."
        intro={`Send us a message and we'll reply within ${site.responseTime}. For a detailed estimate, use our quote form.`}
        crumbs={[{ label: "Contact" }]}
      />
      <section className="container-ms grid gap-10 pb-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {channels.map((c) => (
            <div key={c.t} className="card-lift reveal flex flex-col gap-1 rounded-[20px] border border-line bg-white p-6">
              <span className="text-sm text-muted">{c.t}</span>
              {c.href ? (
                <a href={c.href} className="font-semibold text-ocean hover:underline" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.v}</a>
              ) : (
                <span className="font-semibold">{c.v}</span>
              )}
            </div>
          ))}
          <div className="reveal rounded-[20px] bg-mist p-6">
            <h2 className="font-display text-lg font-bold">What happens next?</h2>
            <ol className="mt-3 flex flex-col gap-2 text-[15px] text-slate">
              <li>1. We read your message and reply by email.</li>
              <li>2. If helpful, we schedule a short call.</li>
              <li>3. For projects, you receive a written proposal.</li>
            </ol>
            <Link href="/quote" className="mt-4 inline-block font-semibold text-ocean">Need a detailed quote? →</Link>
          </div>
        </div>
        <div className="rounded-[28px] bg-navy p-2">
          <div className="px-6 pt-6 pb-2 text-white">
            <h2 className="font-display text-2xl font-extrabold">Send us a message</h2>
          </div>
          <LeadForm type="CONTACT" sourcePage="/contact" />
        </div>
      </section>
    </>
  );
}
