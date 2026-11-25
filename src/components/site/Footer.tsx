import Link from "next/link";
import { Logo } from "./Logo";
import { companyLinks, site, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";

const featured = [
  "business-website-development",
  "custom-web-application-development",
  "ecommerce-development",
  "react-nextjs-development",
  "python-backend-development",
  "crm-erp-solutions",
  "website-maintenance-support",
];

export function Footer() {
  const wa = whatsappLink();
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="bg-ink text-on-dark">
      <div className="container-ms flex flex-col gap-10 pt-16 pb-7">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo dark />
            <p className="max-w-xs text-sm leading-relaxed">
              Websites, web applications and software for growing businesses. Remote-first, based in {site.location}.
            </p>
            <ul className="flex flex-col gap-1 text-sm">
              <li>{site.email}</li>
              <li>{site.phone}</li>
              {wa && (
                <li>
                  <a href={wa} className="text-aqua hover:underline" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <ul className="flex gap-3 text-sm">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} className="capitalize hover:text-white" target="_blank" rel="noopener noreferrer">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <FooterCol title="Services">
            {featured.map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return <FooterLink key={slug} href={`/services/${slug}`} label={s.name} />;
            })}
            <FooterLink href="/services" label="All services →" />
          </FooterCol>

          <FooterCol title="Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} {...l} />
            ))}
          </FooterCol>

          <FooterCol title="Get started">
            <FooterLink href="/quote" label="Request a quote" />
            <FooterLink href="/contact" label="Contact us" />
            <FooterLink href="/work" label="Our work" />
            <FooterLink href="/faqs" label="FAQs" />
          </FooterCol>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-[#1e2a5c] pt-6 text-[13px] sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 text-sm">
      <h2 className="mb-1 text-[15px] font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-white">
      {label}
    </Link>
  );
}
