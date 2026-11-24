"use server";

import { getPublicJob, isAcceptingApplications } from "@/content/jobs";
import { b, buttons, emailShell, getToKnowUs, grid, highlight, list, p, pHtml, section, signoff, siteUrl, steps } from "@/lib/email-templates";
import { inbox, sendMail } from "@/lib/mailer";
import { RESUME_MAX_BYTES, detectResumeType, resumeFileName } from "@/lib/resume";
import { clientFingerprint, rateLimit, verifyTurnstile } from "@/lib/security";
import { site } from "@/lib/site";
import { applicationSchema, flattenErrors, type FormState } from "@/lib/validation";

const FIELDS = [
  "jobSlug", "fullName", "email", "phone", "location", "education", "experience", "noticePeriod",
  "currentCompany", "expectedSalary", "skills", "portfolioUrl", "githubUrl", "linkedinUrl", "coverLetter", "consent",
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

  // ---- Résumé checks (size, real file type from bytes) ----
  const file = formData.get("resume");
  let resume: { buf: Buffer; ext: string; original: string } | null = null;
  if (!(file instanceof File) || file.size === 0) {
    fieldErrors.resume = "Please attach your résumé (PDF, DOC or DOCX).";
  } else if (file.size > RESUME_MAX_BYTES) {
    fieldErrors.resume = "Résumé must be 4 MB or smaller.";
  } else {
    const buf = Buffer.from(await file.arrayBuffer());
    const type = detectResumeType(buf, file.name);
    if (!type) fieldErrors.resume = "Résumé must be a PDF, DOC or DOCX file.";
    else resume = { buf, ext: type.ext, original: file.name.slice(0, 120) };
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
  const attachmentName = resumeFileName(d.fullName, resume.ext);
  const received = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
  const careersEmail = inbox("careers") || site.email;
  const roleUrl = siteUrl(`/careers/${job.slug}`);

  // 1) Application to HR with the résumé attached
  try {
    await sendMail({
      to: inbox("careers"),
      replyTo: { email: d.email, name: d.fullName },
      subject: `New application: ${job.title} — ${d.fullName}`,
      attachments: [{ name: attachmentName, content: resume.buf }],
      html: emailShell({
        preheader: `${d.fullName} applied for ${job.title} · ${d.experience} · notice ${d.noticePeriod}`,
        eyebrow: "New application",
        title: `${d.fullName} applied for ${job.title}`,
        footerNote: "Sent from the careers page",
        body:
          grid([
            ["Role", job.title],
            ["Team", job.team],
            ["Experience", d.experience],
            ["Notice period", d.noticePeriod],
            ["Current city", d.location],
            ["Résumé", `${attachmentName} (attached)`],
          ]) +
          section("Candidate details") +
          list([
            ["Name", d.fullName],
            ["Email", d.email],
            ["Mobile", d.phone],
            ["Current role", d.currentCompany],
            ["Expected salary", d.expectedSalary],
            ["Education", d.education],
            ["Key skills", d.skills],
            ["Portfolio", d.portfolioUrl],
            ["GitHub", d.githubUrl],
            ["LinkedIn", d.linkedinUrl],
            ["Why a good fit", d.coverLetter],
            ["Received", received],
            ["Consent", "Agreed to the Privacy Policy"],
          ]) +
          `<div style="height:16px"></div>` +
          buttons([
            { label: `Reply to ${firstName}`, href: `mailto:${d.email}?subject=${encodeURIComponent(`Your application for ${job.title}`)}`, primary: true },
            { label: "View the role", href: roleUrl },
          ]),
      }),
    });
  } catch (err) {
    console.error("[submitApplication] notify failed:", err);
    return {
      status: "error",
      message: `Sorry, we couldn't submit your application right now. Please try again, or email your résumé to ${careersEmail}.`,
      values: keep,
    };
  }

  // 2) Confirmation to the candidate (must not fail the submission)
  try {
    await sendMail({
      to: d.email,
      senderName: `${site.shortName} Careers`,
      replyTo: { email: careersEmail, name: `${site.shortName} Careers` },
      subject: `Your application for ${job.title} has been received`,
      html: emailShell({
        preheader: `Thanks for applying, ${firstName}. Here's what happens next.`,
        eyebrow: "Careers",
        title: "Thank you for applying",
        footerNote: `You received this email because you applied for a role at ${site.shortName}.`,
        body:
          p(`Dear ${firstName},`) +
          pHtml(
            `Thank you for applying for the ${b(job.title)} role at ${b(site.name)}. Your application has been received and is now with our hiring team, who review every application personally.`,
          ) +
          highlight("You will hear from us", "Within a few days") +
          section("Your application") +
          grid([
            ["Role", job.title],
            ["Team", job.team],
            ["Work mode", job.workMode],
            ["Experience", d.experience],
            ["Notice period", d.noticePeriod],
            ["Résumé", resume.original],
          ]) +
          section("What happens next") +
          steps([
            { t: "We review your application", d: "Someone from our team goes through your résumé, experience and answers." },
            { t: "If it's a match, we'll call you", d: "We'll reach out to set up a short intro call to get to know you." },
            { t: "You'll hear back from us", d: "Whatever the outcome, we'll get back to you within a few days." },
          ]) +
          buttons([
            { label: "View open roles", href: siteUrl("/careers"), primary: true },
            { label: "See the role", href: roleUrl },
          ]) +
          `<p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#576078">Want to add a portfolio link or an updated résumé? Simply reply to this email.</p>` +
          getToKnowUs() +
          signoff(`Team ${site.shortName}`, "Careers", careersEmail),
      }),
    });
  } catch (err) {
    console.error("[submitApplication] confirmation failed:", err);
  }

  return {
    status: "success",
    message: `Thank you, ${firstName}! Your application for ${job.title} has been submitted successfully. We've sent a confirmation email to ${d.email}.`,
  };
}
