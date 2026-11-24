import "server-only";
import { site } from "./site";

/**
 * Sends email through Brevo's HTTPS API (same approach as NexSkill Labs).
 * HTTPS works on Netlify and other hosts that block SMTP ports.
 *
 * Env:
 *   BREVO_API_KEY        Brevo → SMTP & API → API Keys
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
}

export function isMailConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export function inbox(kind: "leads" | "careers") {
  const notify = process.env.NOTIFY_EMAIL || "";
  return kind === "careers" ? process.env.CAREERS_EMAIL || notify : notify;
}

export async function sendMail({ to, subject, html, replyTo, attachments }: MailInput) {
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
      sender: { name: process.env.BREVO_SENDER_NAME || site.name, email: process.env.BREVO_SENDER_EMAIL },
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

// ---------------- templates ----------------

/** Escape user input before placing it in HTML email. */
export function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function multiline(value: string) {
  return esc(value).replace(/\r?\n/g, "<br>");
}

/** Branded email wrapper. `body` must already be escaped HTML. */
export function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4fbff;font-family:Arial,Helvetica,sans-serif;color:#0c122d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4fbff;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e3eef5">
<tr><td style="background:#0c122d;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold">${esc(site.name)}</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:20px;color:#0c122d">${esc(title)}</h1>
${body}
</td></tr>
<tr><td style="padding:16px 28px;background:#f4fbff;color:#576078;font-size:12px">${esc(site.name)} · ${esc(site.location)}</td></tr>
</table></td></tr></table></body></html>`;
}

/** A two-column details table. Values are escaped here. */
export function detailsTable(rows: [string, string | undefined | null][]) {
  const tr = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#576078;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;font-size:14px;vertical-align:top">${multiline(String(v))}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${tr}</table>`;
}

export function paragraph(text: string) {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#3a4460">${multiline(text)}</p>`;
}
