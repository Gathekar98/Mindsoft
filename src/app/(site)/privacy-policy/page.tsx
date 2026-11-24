import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" intro="Last updated: [CONFIRM: date]. This is a starting template; have it reviewed by a legal professional before launch." crumbs={[{ label: "Privacy Policy" }]} />
      <section className="container-ms max-w-[820px] pb-20">
        <div className="prose-ms">
          <h2>Who we are</h2>
          <p>{site.name} (&quot;we&quot;, &quot;us&quot;) is an IT services company based in {site.location}. This policy explains how we handle personal information collected through this website.</p>

          <h2>What we collect</h2>
          <ul>
            <li><strong>Enquiries and quote requests:</strong> name, email, phone (optional), company (optional), project details, budget and timeline (optional).</li>
            <li><strong>Job applications:</strong> name, contact details, location, education, experience, skills, profile links, cover letter and resume.</li>
            <li><strong>Technical data:</strong> your IP address is checked briefly in memory to prevent spam and abuse. It is not stored.</li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your enquiry and prepare proposals.</li>
            <li>To assess job applications and contact candidates.</li>
            <li>To protect the website from spam and misuse.</li>
          </ul>
          <p>We do not sell your personal information or use it for unrelated marketing without your consent.</p>

          <h2>Legal basis and consent</h2>
          <p>We process your information with your consent, which you give when submitting a form, and to take steps at your request before entering into a contract. We aim to handle personal data in line with India&apos;s Digital Personal Data Protection Act, 2023. [CONFIRM with legal adviser]</p>

          <h2>How long we keep it</h2>
          <p>Enquiries are kept for up to [CONFIRM: 24 months]. Job applications and resumes are kept for up to [CONFIRM: 12 months] after the hiring decision, then deleted, unless you ask us to keep them for future roles.</p>

          <h2>Security</h2>
          <p>Form submissions are not stored on this website. They are sent securely (over HTTPS, through our email provider Brevo) to our company inbox, which only authorised staff can access. Resumes arrive as email attachments and are handled the same way. You also receive a confirmation email.</p>

          <h2>Sharing</h2>
          <p>We use trusted service providers for hosting, email and security. They process data only on our instructions. We may disclose information if required by law.</p>

          <h2>Your rights</h2>
          <p>You can ask to access, correct or delete your personal information, or withdraw consent, by emailing {site.email}.</p>

          <h2>Cookies</h2>
          <p>This website uses only cookies that are strictly necessary for it to work (for example, security features of our hosting provider). We do not use advertising cookies. [Update if analytics are added.]</p>

          <h2>Contact</h2>
          <p>Questions about this policy: {site.email}.</p>
        </div>
      </section>
    </>
  );
}
