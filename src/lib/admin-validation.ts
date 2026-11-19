import { z } from "zod";

/** "one item per line" textarea → string[] */
export const lines = z
  .string()
  .optional()
  .transform((v) => (v ?? "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, 40));

/** comma-separated input → string[] */
export const csv = z
  .string()
  .optional()
  .transform((v) => (v ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 20));

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, "Slug must be at least 3 characters")
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only");

export const imagePath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/images/") || /^https:\/\/[^\s]+$/.test(v), "Use a path like /images/photo.jpg or an https:// URL")
  .transform((v) => v || null);

const optionalDate = z
  .string()
  .optional()
  .transform((v) => (v ? new Date(v) : null))
  .refine((d) => d === null || !Number.isNaN(d.getTime()), "Invalid date");

export const jobSchema = z.object({
  title: z.string().trim().min(3).max(120),
  slug,
  kind: z.enum(["JOB", "INTERNSHIP"]),
  department: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(120),
  employmentType: z.string().trim().min(2).max(120),
  experience: z.string().trim().min(1).max(120),
  summary: z.string().trim().min(20, "Summary should be at least 20 characters").max(600),
  responsibilities: lines,
  requirements: lines,
  niceToHave: lines,
  qualifications: lines,
  benefits: lines,
  closesAt: optionalDate,
});

export const postSchema = z.object({
  title: z.string().trim().min(5).max(160),
  slug,
  category: z.string().trim().min(2).max(60),
  excerpt: z.string().trim().min(20).max(300),
  body: z.string().trim().min(50, "Article body should be at least 50 characters").max(60000),
  coverImage: imagePath,
});

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug,
  client: z.string().trim().max(120).transform((v) => v || null),
  industry: z.string().trim().min(2).max(80),
  services: csv,
  techStack: csv,
  summary: z.string().trim().min(20).max(400),
  challenge: z.string().trim().min(20).max(20000),
  solution: z.string().trim().min(20).max(20000),
  results: z.string().trim().min(10).max(20000),
  coverImage: imagePath,
  liveUrl: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Enter a full URL")
    .transform((v) => v || null),
  featured: z.string().optional().transform((v) => v === "on"),
});

export const userSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(200),
  role: z.enum(["ADMIN", "HR", "SALES", "EDITOR"]),
  password: z.string().min(10, "Temporary password must be at least 10 characters").max(200),
});
