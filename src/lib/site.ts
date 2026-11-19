/**
 * Company details shown across the site.
 *
 * Anything in [square brackets] is a placeholder that must be confirmed
 * before launch. Search the codebase for "[" + "CONFIRM" to find them all.
 */
export const site = {
  name: "Mindsoft Tech Solutions",
  shortName: "Mindsoft",
  tagline: "Websites, web apps and custom software for growing businesses.",
  description:
    "Mindsoft Tech Solutions is a remote-first IT services company in Pune, Maharashtra, India. We design, build and maintain websites, web applications and business software.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Pune, Maharashtra, India",
  // --- Placeholders: confirm before launch ---
  email: "[CONFIRM: hello@yourdomain.com]",
  phone: "[CONFIRM: +91 phone]",
  whatsapp: "", // digits only with country code, e.g. "919800000000". Empty hides WhatsApp links.
  bookingUrl: "", // e.g. a Calendly link. Empty sends visitors to /quote instead.
  responseTime: "[CONFIRM: 1 business day]",
  availability: "[CONFIRM: month year]",
  social: {
    linkedin: "",
    instagram: "",
    github: "",
  },
} as const;

export function whatsappLink(message = "Hi Mindsoft, I'd like to discuss a project.") {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Industries", href: "/industries" },
  { label: "Why us", href: "/why-choose-us" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Our process", href: "/process" },
  { label: "Why choose us", href: "/why-choose-us" },
  { label: "Technologies", href: "/technologies" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Internships", href: "/careers/internships" },
  { label: "Insights", href: "/blog" },
] as const;
