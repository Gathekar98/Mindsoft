import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" intro="Last updated: 25 November 2026." crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="container-ms max-w-[820px] pb-20">
        <div className="prose-ms">
          <h2>About these terms</h2>
          <p>These terms apply to your use of this website, operated by {site.name}, {site.location}. By using the website you agree to them.</p>

          <h2>Website content</h2>
          <p>Content on this website is for general information about our services. It does not form an offer or contract. Specific work is governed by a separate written proposal or agreement.</p>

          <h2>Quotes and proposals</h2>
          <p>Estimates given through the website are indicative. A project starts only after both parties agree a written scope, price and terms.</p>

          <h2>Intellectual property</h2>
          <p>The design, text and graphics of this website belong to {site.name} or are used under licence. Photographs are used under the Unsplash License. You may not copy them for commercial use without permission.</p>

          <h2>Acceptable use</h2>
          <p>Do not misuse forms, attempt to access restricted areas, upload harmful files or interfere with the website&apos;s operation.</p>

          <h2>Job applications</h2>
          <p>Vacancies listed on the website may be changed or withdrawn at any time. Submitting an application does not guarantee an interview or offer.</p>

          <h2>Liability</h2>
          <p>We work to keep the website accurate and available, but we do not guarantee it will be error-free or uninterrupted. To the extent permitted by law, we are not liable for losses arising from use of the website.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India. Courts in Pune, Maharashtra have jurisdiction.</p>

          <h2>Contact</h2>
          <p>{site.email}</p>
        </div>
      </section>
    </>
  );
}
