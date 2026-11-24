import "server-only";
import { site } from "./site";

/**
 * Sends email through Brevo's HTTPS API (same approach as NexSkill Labs).
 * HTTPS works on Netlify and other hosts that block SMTP ports.
 * HTML templates live in ./email-templates.ts.
 *
 * Env:
 *   BREVO_API_KEY        Brevo → SMTP & API → API Keys (needs "Transactional emails" permission)
 *   BREVO_SENDER_EMAIL   a sender verified in Brevo (Settings → Senders)
 *   BREVO_SENDER_NAME    shown as the "From" name
 *   NOTIFY_EMAIL         inbox that receives enquiries
 *   CAREERS_EMAIL        inbox that receives job applications (defaults to NOTIFY_EMAIL)
 *
 * In local development without BREVO_API_KEY, emails are printed to the
 * terminal instead of being sent, so forms can be tested safely.
 */

export interface Attachment {
  name: string;
  content: Buffer;
}

interface MailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
  attachments?: Attachment[];
  senderName?: string;
}

export function isMailConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export function inbox(kind: "leads" | "careers") {
  const notify = process.env.NOTIFY_EMAIL || "";
  return kind === "careers" ? process.env.CAREERS_EMAIL || notify : notify;
}

export async function sendMail({ to, subject, html, replyTo, attachments, senderName }: MailInput) {
  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `\n[mailer:dev] Email NOT sent (BREVO_API_KEY not set)\n  To: ${to}\n  Subject: ${subject}\n  Attachments: ${
          attachments?.map((a) => `${a.name} (${Math.round(a.content.length / 1024)} KB)`).join(", ") || "none"
        }\n`,
      );
      return;
    }
    throw new Error("Email is not configured (BREVO_API_KEY / BREVO_SENDER_EMAIL missing).");
  }
  if (!to) throw new Error("No recipient configured (NOTIFY_EMAIL missing).");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName || process.env.BREVO_SENDER_NAME || site.name, email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      ...(replyTo ? { replyTo } : {}),
      ...(attachments?.length
        ? { attachment: attachments.map((a) => ({ name: a.name, content: a.content.toString("base64") })) }
        : {}),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API error (${res.status}): ${body.slice(0, 300)}`);
  }
}
