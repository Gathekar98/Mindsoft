import { z } from "zod";

const trimmed = (max: number) => z.string().trim().max(max);

const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s\-()]{6,19}$/, "Enter a valid phone number, e.g. +91 98765 43210");

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v), "Enter a full URL starting with https://")
  .optional()
  .transform((v) => (v ? v : undefined));

const consent = z.literal("on", { errorMap: () => ({ message: "Please agree so we can store and respond to your details." }) });

export const budgetOptions = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000 +",
  "Not sure yet",
] as const;

export const experienceOptions = ["Fresher", "Less than 1 year", "1–2 years", "3–5 years", "6–9 years", "10+ years"] as const;
export const noticeOptions = ["Immediately", "Within 15 days", "30 days", "60 days", "90 days or more"] as const;

export const timelineOptions =["As soon as possible", "Within a month", "1–3 months", "Just exploring"] as const;

export const leadSchema = z
  .object({
    type: z.enum(["CONTACT", "QUOTE"]),
    name: trimmed(100).min(2, "Please enter your name"),
    email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
    phone: z.union([phone, z.literal("")]).optional().transform((v) => v || undefined),
    company: trimmed(150).optional().transform((v) => v || undefined),
    service: trimmed(100).optional().transform((v) => v || undefined),
    budget: trimmed(60).optional().transform((v) => v || undefined),
    timeline: trimmed(60).optional().transform((v) => v || undefined),
    message: trimmed(4000).min(10, "Please tell us a little more (at least 10 characters)"),
    sourcePage: trimmed(200).optional(),
    consent,
  })
  .superRefine((v, ctx) => {
    if (v.type === "QUOTE" && !v.service) {
      ctx.addIssue({ code: "custom", path: ["service"], message: "Choose what you need help with" });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

export const applicationSchema = z.object({
  jobSlug: trimmed(120).min(1),
  fullName: trimmed(100).min(2, "Please enter your full name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  phone,
  location: trimmed(120).min(2, "Please enter your city"),
  education: trimmed(300).min(2, "Please enter your highest qualification"),
  experience: z.enum(experienceOptions, { errorMap: () => ({ message: "Choose your experience" }) }),
  noticePeriod: z.enum(noticeOptions, { errorMap: () => ({ message: "Choose your notice period" }) }),
  currentCompany: trimmed(150).optional().transform((v) => v || undefined),
  expectedSalary: trimmed(80).optional().transform((v) => v || undefined),
  skills: trimmed(500).min(2, "List your key skills"),
  portfolioUrl: optionalUrl,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  coverLetter: trimmed(5000).optional().transform((v) => v || undefined),
  consent,
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

/** Shape returned by every public form action. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

export function flattenErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
