"use server";

import { getPublicJob, isAcceptingApplications } from "@/content/jobs";
import { detailsTable, inbox, layout, paragraph, sendMail } from "@/lib/mailer";
import { RESUME_MAX_BYTES, detectResumeType, resumeFileName } from "@/lib/resume";
import { clientFingerprint, rateLimit, verifyTurnstile } from "@/lib/security";
import { site } from "@/lib/site";
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
  let resume: { buf: Buffer; ext: string } | null = null;
  if (!(file instanceof File) || file.size === 0) {
    fieldErrors.resume = "Please attach your resume (PDF, DOC or DOCX).";
  } else if (file.size > RESUME_MAX_BYTES) {
    fieldErrors.resume = "Resume must be 4 MB or smaller.";
  } else {
    const buf = Buffer.from(await file.arrayBuffer());
    const type = detectResumeType(buf, file.name);
    if (!type) fieldErrors.resume = "Resume must be a PDF, DOC or DOCX file.";
    else resume = { buf, ext: type.ext };
  }

  if (!parsed.success || !resume || Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: keep };
  }

  const job = getPublicJob(parsed.data.jobSlug);
  if (!job || !isAcceptingApplications(job)) {
    return { status: "error", message: "Sorry, this position is no longer accepting applications.", values: keep };
  }

  const d = parsed.data;
  const firstName = d.fullName.split(" ")[0];
  const received = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

  try {
    // 1) Application to HR with the resume attached
    await sendMail({
      to: inbox("careers"),
      replyTo: { email: d.email, name: d.fullName },
      subject: `New application: ${job.title} — ${d.fullName}`,
      attachments: [{ name: resumeFileName(d.fullName, resume.ext), content: resume.buf }],
      html: layout(
        `New application for ${job.title}`,
        detailsTable([
          ["Role", `${job.title} (${job.kind === "internship" ? "Internship" : "Job"})`],
          ["Name", d.fullName],
          ["Email", d.email],
          ["Mobile", d.phone],
          ["Location", d.location],
          ["Education", d.education],
          ["Experience", d.experience],
          ["Skills", d.skills],
          ["Portfolio", d.portfolioUrl],
          ["GitHub", d.githubUrl],
          ["LinkedIn", d.linkedinUrl],
          ["Cover letter", d.coverLetter],
          ["Received", received],
          ["Consent", "Candidate agreed to the Privacy Policy"],
        ]) + paragraph("\nThe resume is attached. Reply to this email to contact the candidate."),
      ),
    });
  } catch (err) {
    console.error("[submitApplication] notify failed:", err);
    return {
      status: "error",
      message: `Sorry, we couldn't submit your application right now. Please try again, or email your resume to ${site.email}.`,
      values: keep,
    };
  }

  // 2) Confirmation to the candidate (must not fail the submission)
  try {
    await sendMail({
      to: d.email,
      subject: `Application received: ${job.title} — ${site.name}`,
      html: layout(
        `Thank you for applying, ${firstName}!`,
        paragraph(
          `Your application for the ${job.title} position at ${site.name} has been submitted successfully.`,
        ) +
          paragraph(
            "What happens next:\n1. Our team reviews every application carefully.\n2. If your profile matches the role, we'll email you to schedule an interview.\n3. Shortlisted candidates may be asked to complete a short practical task.",
          ) +
          detailsTable([
            ["Role", job.title],
            ["Submitted", received],
          ]) +
          paragraph(`\nPlease don't reply with your resume again — we already have it.\n\nBest wishes,\nTeam ${site.shortName}`),
      ),
    });
  } catch (err) {
    console.error("[submitApplication] confirmation failed:", err);
  }

  return {
    status: "success",
    message: `Thank you, ${firstName}! Your application for ${job.title} has been submitted successfully. We've sent a confirmation email to ${d.email}.`,
  };
}
