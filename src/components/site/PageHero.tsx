import Link from "next/link";
import { site } from "@/lib/site";

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail with BreadcrumbList structured data. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${dark ? "text-on-dark" : "text-muted"}`}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={dark ? "hover:text-white" : "hover:text-ocean"}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-navy"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              ...(c.href ? { item: new URL(c.href, site.url).toString() } : {}),
            })),
          }),
        }}
      />
    </nav>
  );
}

/** Standard inner-page hero in the Ocean Horizon style. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#E1F6FF_0%,#F4FBFF_70%,#fff_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.3),transparent_70%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-[360px] w-[360px] animate-drift rounded-full bg-[radial-gradient(circle,rgba(255,138,91,0.16),transparent_70%)] [animation-direction:reverse]" />
      <div className={`container-ms relative grid gap-10 pt-10 pb-16 lg:pb-20 ${aside ? "items-center lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        <div className="flex max-w-[760px] flex-col gap-5">
          <div className="animate-rise">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow animate-rise [animation-delay:.08s]">{eyebrow}</p>
          <h1 className="animate-rise font-display text-[36px] leading-[1.1] font-extrabold tracking-[-0.02em] [animation-delay:.16s] sm:text-[48px]">
            {title}
          </h1>
          {intro && <div className="animate-rise text-lg leading-relaxed text-slate [animation-delay:.24s]">{intro}</div>}
          {children && <div className="animate-rise [animation-delay:.32s]">{children}</div>}
        </div>
        {aside && <div className="animate-rise [animation-delay:.3s]">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, center = false, dark = false }: { eyebrow: string; title: string; intro?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`reveal flex max-w-[720px] flex-col gap-3 ${center ? "mx-auto items-center text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "!text-aqua" : ""}`}>{eyebrow}</p>
      <h2 className="h-section">{title}</h2>
      {intro && <p className={dark ? "text-on-dark" : "text-slate"}>{intro}</p>}
    </div>
  );
}

/** Closing call-to-action band used at the bottom of most pages. */
export function CtaBand({
  title = "Have a project in mind?",
  text = "Tell us what you need. We'll reply with questions, a suggested approach and an estimate.",
  primary = { label: "Get a free quote", href: "/quote" },
  secondary = { label: "Contact us", href: "/contact" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="container-ms py-20">
      <div className="reveal relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-navy p-8 text-white sm:p-12 lg:flex-row lg:items-center">
        <div aria-hidden="true" className="absolute -right-20 -bottom-28 h-96 w-96 animate-drift rounded-full bg-[radial-gradient(circle,rgba(62,192,213,0.45),transparent_70%)]" />
        <div className="relative flex max-w-[620px] flex-col gap-3">
          <h2 className="font-display text-[30px] leading-tight font-extrabold sm:text-[36px]">{title}</h2>
          <p className="text-on-dark">{text}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <Link href={primary.href} className="btn-primary">{primary.label}</Link>
          <Link href={secondary.href} className="btn-light">{secondary.label}</Link>
        </div>
      </div>
    </section>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className={`flex-none ${className}`}>
      <circle cx="12" cy="12" r="11" fill="#D5F3F8" />
      <path d="M7 12.5l3.2 3L17 9" fill="none" stroke="#0A6C9E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
