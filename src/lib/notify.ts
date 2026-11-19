import "server-only";
import nodemailer from "nodemailer";

/**
 * Sends an internal notification email when SMTP is configured.
 * Never throws: a mail failure must not lose a saved submission.
 */
export async function notifyTeam(subject: string, lines: Record<string, string | null | undefined>) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_FROM, NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !NOTIFY_TO || !NOTIFY_FROM) return { sent: false as const, reason: "not-configured" };

  const text = Object.entries(lines)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 587),
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transport.sendMail({ from: NOTIFY_FROM, to: NOTIFY_TO, subject, text });
    return { sent: true as const };
  } catch (err) {
    console.error("[notify] email failed:", err);
    return { sent: false as const, reason: "error" };
  }
}
