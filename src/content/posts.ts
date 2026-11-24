/**
 * Blog / Insights articles.
 *
 * HOW TO ADD AN ARTICLE: copy the example below into the `posts` array,
 * set `published: true`, write the body in Markdown, then commit and push.
 * Cover images go in public/images and are referenced as "/images/file.jpg".
 */

export interface Post {
  slug: string; // URL: /blog/<slug>
  title: string;
  excerpt: string; // 1–2 sentences for the list page and search results
  category: string; // e.g. "Websites", "Web apps", "Automation"
  date: string; // YYYY-MM-DD
  coverImage?: string;
  published: boolean;
  body: string; // Markdown
}

/*
Example:
  {
    slug: "small-business-website-checklist",
    title: "What should a small-business website include?",
    excerpt: "A practical checklist of pages and features that help a small business win enquiries online.",
    category: "Websites",
    date: "2026-12-01",
    coverImage: "/images/svc-web.jpg",
    published: true,
    body: `
## Start with your customer
Explain who you help and how in the first screen...

## Must-have pages
- Home
- Services
- About
- Contact
`,
  },
*/
export const posts: Post[] = [];

export function publishedPosts() {
  return posts.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return publishedPosts().find((p) => p.slug === slug) ?? null;
}

export function formatDate(d: string, style: "medium" | "long" = "medium") {
  return new Date(`${d}T00:00:00+05:30`).toLocaleDateString("en-IN", { dateStyle: style });
}
