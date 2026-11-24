"use server";

import { b, buttons, emailShell, getToKnowUs, grid, highlight, list, p, pHtml, section, signoff, siteUrl, steps } from "@/lib/email-templates";
import { inbox, sendMail } from "@/lib/mailer";
import { clientFingerprint, rateLimit, verifyTurnstile } from "@/lib/security";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { flattenErrors, leadSchema, type FormState } from "@/lib/validation";

const FIELDS = ["type", "name", "email", "phone", "company", "service", "budget", "timeline", "message", "sourcePage", "consent"];

export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = formData.get(k);
    if (typeof v === "string") raw[k] = v;
  }
  const keep = { ...raw, consent: "" };

  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! We'll be in touch soon." };
  }

  const { ipHash } = await clientFingerprint();
  if (!rateLimit(`lead:${ipHash}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many submissions. Please wait a few minutes and try again.", values: keep };
  }

  if (!(await verifyTurnstile(formData.get("cf-turnstile-response") as string | null))) {
    return { status: "error", message: "Spam check failed. Please try again.", values: keep };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors: flattenErrors(parsed.error), values: keep };
  }

  const d = parsed.data;
  const isQuote = d.type === "QUOTE";
  const serviceName = d.service === "not-sure" ? "Not sure yet" : d.service ? getService(d.service)?.name ?? d.service : undefined;
  const firstName = d.name.split(" ")[0];
  const received = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

  // 1) Notify the company (reply goes straight to the visitor)
  try {
    await sendMail({
      to: inbox("leads"),
      replyTo: { email: d.email, name: d.name },
      subject: `${isQuote ? "New quote request" : "New enquiry"} from ${d.name}${serviceName ? ` — ${serviceName}` : ""}`,
      html: emailShell({
        preheader: `${d.name}${d.company ? ` (${d.company})` : ""} · ${serviceName ?? "General enquiry"}`,
        eyebrow: isQuote ? "New quote request" : "New enquiry",
        title: `${d.name} ${isQuote ? "requested a quote" : "sent a message"}`,
        footerNote: `Sent from ${d.sourcePage || "the website"}`,
        body:
          grid([
            ["Service", serviceName ?? "General enquiry"],
            ["Budget", d.budget],
            ["Timeline", d.timeline],
            ["Company", d.company],
          ]) +
          section("Message") +
          p(d.message) +
          section("Contact details") +
          list([
            ["Name", d.name],
            ["Email", d.email],
            ["Phone", d.phone],
            ["Page", d.sourcePage],
            ["Received", received],
            ["Consent", "Agreed to the Privacy Policy"],
          ]) +
          `<div style="height:16px"></div>` +
          buttons([{ label: `Reply to ${firstName}`, href: `mailto:${d.email}?subject=${encodeURIComponent(`Re: your ${isQuote ? "quote request" : "enquiry"} — ${site.name}`)}`, primary: true }]),
      }),
    });
  } catch (err) {
    console.error("[submitLead] notify failed:", err);
    return {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please try again, or email us directly at ${site.email}.`,
      values: keep,
    };
  }

  // 2) Confirmation to the visitor (a failure here must not fail the submission)
  try {
    await sendMail({
      to: d.email,
      replyTo: { email: inbox("leads") || site.email, name: site.name },
      subject: isQuote ? `We received your quote request — ${site.name}` : `Thanks for contacting ${site.name}`,
      html: emailShell({
        preheader: `Thanks, ${firstName}. We've received your ${isQuote ? "quote request" : "message"}.`,
        eyebrow: isQuote ? "Quote request" : "Contact",
        title: `Thank you, ${firstName}`,
        footerNote: `You received this email because you contacted ${site.shortName} through our website.`,
        body:
          pHtml(
            isQuote
              ? `We've received your quote request${serviceName ? ` for ${b(serviceName)}` : ""}. Our team will review the details and get back to you with questions, a suggested approach and an estimate.`
              : `We've received your message and our team will get back to you soon.`,
          ) +
          highlight("You will hear from us", "Within a few business days") +
          section("What you sent") +
          grid([
            ["Service", serviceName ?? "General enquiry"],
            ["Budget", d.budget],
            ["Timeline", d.timeline],
            ["Company", d.company],
          ]) +
          `<div style="height:10px"></div>` +
          p(d.message) +
          section("What happens next") +
          steps([
            { t: "We review your requirements", d: "Someone from our team reads your message carefully." },
            { t: "A short discovery call", d: "If helpful, we'll schedule a call to understand your goals." },
            { t: "A clear written proposal", d: "You receive scope, timeline and an estimate in writing." },
          ]) +
          buttons([
            { label: "Explore our services", href: siteUrl("/services"), primary: true },
            { label: "How we work", href: siteUrl("/process") },
          ]) +
          getToKnowUs() +
          signoff(`Team ${site.shortName}`, "Sales", inbox("leads") || site.email),
      }),
    });
  } catch (err) {
    console.error("[submitLead] confirmation failed:", err);
  }

  return {
    status: "success",
    message: isQuote
      ? "Thanks! Your request has been received. We've sent a confirmation to your email and will reply with next steps."
      : "Thanks for getting in touch! We've sent a confirmation to your email and will reply soon.",
  };
}
