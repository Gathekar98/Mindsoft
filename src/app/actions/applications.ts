"use server";

import { db } from "@/lib/db";
import { notifyTeam } from "@/lib/notify";
import { clientFingerprint, rateLimit, verifyTurnstile } from "@/lib/security";
import { RESUME_MAX_BYTES, deleteResume, detectResumeType, saveResume } from "@/lib/storage";
import { applicationSchema, flattenErrors, type FormState } from "@/lib/validation";

const FIELDS = [
  "jobSlug", "fullName", "email", "phone", "location", "education", "experience",
  "skills", "portfolioUrl", "githubUrl", "linkedinUrl", "coverLetter", "consent",
];

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = formData.get(k);
    if (typeof v === "string") raw[k] = v;
  }
  const keep = { ...raw, consent: "" };

  if (formData.get("website")) return { status: "success", message: "Application received." };

  const { ipHash } = await clientFingerprint();
  if (!rateLimit(`apply:${ipHash}`, 4, 30 * 60 * 1000)) {
    return { status: "error", message: "Too many applications from this connection. Please try again later.", values: keep };
  }
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response") as string | null))) {
    return { status: "error", message: "Spam check failed. Please try again.", values: keep };
  }

  const parsed = applicationSchema.safeParse(raw);
  const fieldErrors = parsed.success ? {} : flattenErrors(parsed.error);

  // ---- Resume checks (size, real file type from bytes) ----
  const file = formData.get("resume");
  let resume: { buf: Buffer; ext: string; mime: string; name: string; size: number } | null = null;
  if (!(file instanceof File) || file.size === 0) {
    fieldErrors.resume = "Please attach your resume (PDF, DOC or DOCX).";
  } else if (file.size > RESUME_MAX_BYTES) {
    fieldErrors.resume = "Resume must be 5 MB or smaller.";
  } else {
    const buf = Buffer.from(await file.arrayBuffer());
    const type = detectResumeType(buf, file.name);
    if (!type) fieldErrors.resume = "Resume must be a PDF, DOC or DOCX file.";
    else resume = { buf, ext: type.ext, mime: type.mime, name: file.name.slice(0, 200), size: file.size };
  }

  if (!parsed.success || !resume || Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: keep };
  }

  const job = await db.job.findUnique({ where: { slug: parsed.data.jobSlug } });
  if (!job || job.status !== "PUBLISHED" || (job.closesAt && job.closesAt < new Date())) {
    return { status: "error", message: "Sorry, this position is no longer accepting applications.", values: keep };
  }

  const { jobSlug: _slug, consent: _consent, ...data } = parsed.data;
  void _slug;
  void _consent;

  let key: string | null = null;
  try {
    key = await saveResume(resume.buf, resume.ext, resume.mime);
    const app = await db.application.create({
      data: {
        ...data,
        jobId: job.id,
        resumeKey: key,
        resumeName: resume.name,
        resumeMime: resume.mime,
        resumeSize: resume.size,
        consentAt: new Date(),
        ipHash,
      },
    });
    await notifyTeam(`New application: ${job.title} — ${data.fullName}`, {
      Role: job.title,
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Location: data.location,
      "Admin link": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin/applications/${app.id}`,
    });
  } catch (err) {
    console.error("[submitApplication]", err);
    if (key) await deleteResume(key);
    return { status: "error", message: "Sorry, we couldn't save your application. Please try again.", values: keep };
  }

  return {
    status: "success",
    message: `Thank you, ${data.fullName.split(" ")[0]}! Your application for ${job.title} has been received. We'll contact you by email if you're shortlisted.`,
  };
}
