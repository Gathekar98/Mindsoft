"use server";

import { detailsTable, inbox, layout, paragraph, sendMail } from "@/lib/mailer";
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

  try {
    // 1) Notify the company (reply goes straight to the visitor)
    await sendMail({
      to: inbox("leads"),
      replyTo: { email: d.email, name: d.name },
      subject: `${isQuote ? "New quote request" : "New enquiry"} from ${d.name}${serviceName ? ` — ${serviceName}` : ""}`,
      html: layout(
        isQuote ? "New quote request" : "New website enquiry",
        detailsTable([
          ["Name", d.name],
          ["Email", d.email],
          ["Phone", d.phone],
          ["Company", d.company],
          ["Service", serviceName],
          ["Budget", d.budget],
          ["Timeline", d.timeline],
          ["Message", d.message],
          ["Page", d.sourcePage],
          ["Received", received],
          ["Consent", "Visitor agreed to the Privacy Policy"],
        ]) + paragraph("\nReply to this email to respond directly to the visitor."),
      ),
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
      subject: isQuote ? `We received your quote request — ${site.name}` : `Thanks for contacting ${site.name}`,
      html: layout(
        `Thank you, ${firstName}!`,
        paragraph(
          isQuote
            ? `We've received your quote request${serviceName ? ` for ${serviceName}` : ""}. Our team will review the details and get back to you within ${site.responseTime} with questions, a suggested approach and an estimate.`
            : `We've received your message and will reply within ${site.responseTime}.`,
        ) +
          paragraph("Here's a copy of what you sent:") +
          detailsTable([
            ["Service", serviceName],
            ["Budget", d.budget],
            ["Timeline", d.timeline],
            ["Message", d.message],
          ]) +
          paragraph(`\nIf anything is urgent, you can reach us at ${site.email} or ${site.phone}.\n\n— Team ${site.shortName}`),
      ),
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
