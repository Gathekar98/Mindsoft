import "server-only";
import { db } from "./db";
import { services } from "./services";

export const staticRoutes = [
  { path: "/", label: "Home", group: "Main" },
  { path: "/about", label: "About us", group: "Company" },
  { path: "/process", label: "Our process", group: "Company" },
  { path: "/why-choose-us", label: "Why choose us", group: "Company" },
  { path: "/technologies", label: "Technologies", group: "Company" },
  { path: "/industries", label: "Industries we serve", group: "Company" },
  { path: "/services", label: "All services", group: "Services" },
  { path: "/work", label: "Work & case studies", group: "Main" },
  { path: "/careers", label: "Careers", group: "Careers" },
  { path: "/careers/internships", label: "Internships", group: "Careers" },
  { path: "/blog", label: "Insights", group: "Main" },
  { path: "/contact", label: "Contact us", group: "Main" },
  { path: "/quote", label: "Request a quote", group: "Main" },
  { path: "/faqs", label: "FAQs", group: "Main" },
  { path: "/privacy-policy", label: "Privacy Policy", group: "Legal" },
  { path: "/terms", label: "Terms & Conditions", group: "Legal" },
  { path: "/sitemap", label: "Sitemap", group: "Legal" },
];

/** Every public URL, including database-driven pages. */
export async function allPublicRoutes() {
  const [jobs, posts, projects] = await Promise.all([
    db.job.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, title: true, updatedAt: true } }),
    db.post.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, title: true, updatedAt: true } }),
    db.project.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, title: true, updatedAt: true } }),
  ]);
  return [
    ...staticRoutes.map((r) => ({ ...r, updatedAt: undefined as Date | undefined })),
    ...services.map((s) => ({ path: `/services/${s.slug}`, label: s.name, group: "Services", updatedAt: undefined })),
    ...jobs.map((j) => ({ path: `/careers/${j.slug}`, label: j.title, group: "Careers", updatedAt: j.updatedAt })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, label: p.title, group: "Insights", updatedAt: p.updatedAt })),
    ...projects.map((p) => ({ path: `/work/${p.slug}`, label: p.title, group: "Work", updatedAt: p.updatedAt })),
  ];
}
