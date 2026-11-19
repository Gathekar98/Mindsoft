"use server";

import { db } from "@/lib/db";
import { notifyTeam } from "@/lib/notify";
import { clientFingerprint, rateLimit, verifyTurnstile } from "@/lib/security";
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

  const { ipHash, userAgent } = await clientFingerprint();
  if (!rateLimit(`lead:${ipHash}`, 5, 10 * 60 * 1000)) {
    return { status: "error", message: "Too many submissions. Please wait a few minutes and try again.", values: keep };
  }

  if (!(await verifyTurnstile(formData.get("cf-turnstile-response") as string | null))) {
    return { status: "error", message: "Spam check failed. Please try again.", values: keep };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
      values: keep,
    };
  }

  const { consent: _consent, ...data } = parsed.data;
  void _consent;

  try {
    const lead = await db.lead.create({
      data: { ...data, consentAt: new Date(), ipHash, userAgent },
    });

    await notifyTeam(`New ${data.type === "QUOTE" ? "quote request" : "enquiry"} from ${data.name}`, {
      Type: data.type,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Company: data.company,
      Service: data.service,
      Budget: data.budget,
      Timeline: data.timeline,
      Message: data.message,
      "Admin link": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/admin/leads/${lead.id}`,
    });
  } catch (err) {
    console.error("[submitLead]", err);
    return {
      status: "error",
      message: "Sorry, something went wrong saving your message. Please try again or email us directly.",
      values: keep,
    };
  }

  return {
    status: "success",
    message:
      data.type === "QUOTE"
        ? "Thanks! Your request has been received. We'll review it and reply with next steps."
        : "Thanks for getting in touch! We'll reply as soon as we can.",
  };
}
