/**
 * Portfolio / case studies for the Work page.
 *
 * Only add REAL projects, and name the client only with their written permission.
 * HOW TO ADD: copy the example into `projects`, set `published: true`, commit and push.
 * Text fields support Markdown.
 */

export interface Project {
  slug: string; // URL: /work/<slug>
  title: string;
  client?: string;
  industry: string;
  services: string[];
  techStack: string[];
  summary: string;
  challenge: string;
  solution: string;
  results: string; // only results you can verify
  coverImage?: string; // "/images/file.jpg"
  liveUrl?: string;
  featured?: boolean;
  date: string; // YYYY-MM-DD
  published: boolean;
}

/*
Example:
  {
    slug: "clinic-booking-platform",
    title: "Online booking for a multi-location clinic",
    industry: "Healthcare",
    services: ["Web App", "UI/UX Design"],
    techStack: ["Next.js", "Python", "PostgreSQL"],
    summary: "A booking system that replaced phone-only appointments.",
    challenge: "Patients could only book by phone...",
    solution: "We built...",
    results: "Bookings moved online...",
    coverImage: "/images/ind-healthcare.jpg",
    date: "2026-12-01",
    published: true,
  },
*/
export const projects: Project[] = [];

export function publishedProjects() {
  return projects
    .filter((p) => p.published)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.date.localeCompare(a.date));
}

export function getProject(slug: string) {
  return publishedProjects().find((p) => p.slug === slug) ?? null;
}
