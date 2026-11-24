import "server-only";
import { site, whatsappLink } from "./site";

/**
 * Branded HTML email building blocks (table-based, inline styles — safe for
 * Gmail, Outlook and Apple Mail). Every dynamic value is escaped with esc().
 */

const C = {
  navy: "#0C122D",
  ocean: "#0A5C91",
  ocean2: "#127FA6",
  cyan: "#3EC0D5",
  coral: "#FF8A5B",
  sky: "#E1F6FF",
  mist: "#F4FBFF",
  line: "#E3EEF5",
  slate: "#4A5470",
  muted: "#576078",
};
const FONT = "Arial,Helvetica,sans-serif";

export function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
const ml = (v: string) => esc(v).replace(/\r?\n/g, "<br>");

export function siteUrl(path = "") {
  return `${site.url.replace(/\/$/, "")}${path}`;
}

/** Logo image only when the site has a public https URL (email clients can't load localhost). */
function logo(size = 34) {
  const img = site.url.startsWith("https://")
    ? `<img src="${esc(siteUrl("/brand/logo-mark-512.png"))}" width="${size}" height="${size}" alt="" style="display:block;border:0;width:${size}px;height:${size}px">`
    : "";
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
${img ? `<td style="padding-right:10px;vertical-align:middle">${img}</td>` : ""}
<td style="vertical-align:middle;font-family:${FONT}"><div style="font-size:17px;font-weight:bold;color:${C.navy};letter-spacing:.2px">Mindsoft</div><div style="font-size:10px;letter-spacing:2.5px;color:${C.muted}">TECH SOLUTIONS</div></td>
</tr></table>`;
}

// ---------------- blocks ----------------

export const p = (text: string) =>
  `<p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.slate}">${ml(text)}</p>`;

/** Paragraph with trusted inline HTML (only pass already-escaped parts). */
export const pHtml = (html: string) =>
  `<p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.slate}">${html}</p>`;

export const b = (text: string) => `<strong style="color:${C.navy}">${esc(text)}</strong>`;

export const section = (title: string) =>
  `<div style="margin:26px 0 12px;font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:2px;color:${C.ocean};text-transform:uppercase">${esc(title)}</div>`;

export function highlight(label: string, value: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 6px;border:1px solid ${C.line};border-top:3px solid ${C.cyan};border-radius:12px;background:${C.mist}">
<tr><td style="padding:16px 18px;font-family:${FONT}">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="width:36px;height:36px;border-radius:10px;background:${C.ocean};color:#fff;text-align:center;font-size:16px;font-weight:bold">✓</td>
<td style="padding-left:12px"><div style="font-size:12px;color:${C.muted}">${esc(label)}</div><div style="font-size:16px;font-weight:bold;color:${C.navy}">${esc(value)}</div></td>
</tr></table></td></tr></table>`;
}

/** Two-column grid of label/value pairs (empty values are skipped). */
export function grid(items: [string, string | undefined | null][]) {
  const rows = items.filter(([, v]) => v);
  let html = "";
  for (let i = 0; i < rows.length; i += 2) {
    const cell = (pair?: [string, string | undefined | null]) =>
      pair
        ? `<td width="50%" style="padding:10px 12px;vertical-align:top;font-family:${FONT}"><div style="font-size:12px;color:${C.muted};margin-bottom:3px">${esc(pair[0])}</div><div style="font-size:14px;font-weight:bold;color:${C.navy};line-height:1.4">${ml(String(pair[1]))}</div></td>`
        : `<td width="50%"></td>`;
    html += `<tr>${cell(rows[i])}${cell(rows[i + 1])}</tr>`;
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-top:3px solid ${C.ocean};border-radius:12px;background:${C.mist};padding:6px">${html}</table>`;
}

/** Full-width label/value list for long answers (e.g. HR emails). */
export function list(items: [string, string | undefined | null][]) {
  const rows = items
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:9px 14px 9px 0;font-family:${FONT};font-size:13px;color:${C.muted};vertical-align:top;white-space:nowrap;border-bottom:1px solid ${C.line}">${esc(k)}</td><td style="padding:9px 0;font-family:${FONT};font-size:14px;color:${C.navy};vertical-align:top;border-bottom:1px solid ${C.line}">${ml(String(v))}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>`;
}

export function steps(items: { t: string; d: string }[]) {
  return items
    .map(
      (s, i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px"><tr>
<td width="44" style="vertical-align:top"><div style="width:34px;height:34px;line-height:34px;border-radius:17px;background:${C.ocean};color:#fff;text-align:center;font-family:${FONT};font-size:13px;font-weight:bold">${String(i + 1).padStart(2, "0")}</div></td>
<td style="vertical-align:top;font-family:${FONT}"><div style="font-size:15px;font-weight:bold;color:${C.navy};margin:6px 0 3px">${esc(s.t)}</div><div style="font-size:14px;line-height:1.55;color:${C.slate}">${esc(s.d)}</div></td>
</tr></table>`,
    )
    .join("");
}

export function buttons(items: { label: string; href: string; primary?: boolean }[]) {
  const cells = items
    .map((btn) =>
      btn.primary
        ? `<td style="padding:0 10px 10px 0"><a href="${esc(btn.href)}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:${C.ocean};color:#ffffff;font-family:${FONT};font-size:14px;font-weight:bold;text-decoration:none">${esc(btn.label)} &rarr;</a></td>`
        : `<td style="padding:0 10px 10px 0"><a href="${esc(btn.href)}" style="display:inline-block;padding:10px 20px;border-radius:10px;border:2px solid ${C.ocean};color:${C.ocean};font-family:${FONT};font-size:14px;font-weight:bold;text-decoration:none">${esc(btn.label)}</a></td>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px"><tr>${cells}</tr></table>`;
}

export function cards(items: { t: string; d: string; href: string; initial: string }[]) {
  const cells = items
    .map(
      (c) => `<td width="${Math.floor(100 / items.length)}%" style="padding:0 5px;vertical-align:top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-top:3px solid ${C.ocean};border-radius:12px;background:${C.mist}"><tr><td style="padding:14px;font-family:${FONT}">
<div style="width:34px;height:34px;line-height:34px;border-radius:10px;background:${C.ocean};color:#fff;text-align:center;font-size:15px;font-weight:bold;margin-bottom:10px">${esc(c.initial)}</div>
<div style="font-size:14px;font-weight:bold;color:${C.navy};margin-bottom:4px">${esc(c.t)}</div>
<div style="font-size:12px;line-height:1.5;color:${C.muted};margin-bottom:10px">${esc(c.d)}</div>
<a href="${esc(c.href)}" style="font-size:12px;font-weight:bold;color:${C.ocean};text-decoration:none">Explore &rarr;</a>
</td></tr></table></td>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 -5px"><tr>${cells}</tr></table>`;
}

export function signoff(team: string, contactLabel: string, email: string) {
  return `<div style="margin-top:26px;font-family:${FONT};font-size:15px;color:${C.slate}">Best regards,<br><strong style="color:${C.navy}">${esc(team)}</strong><br><span style="font-size:13px;color:${C.muted}">${esc(contactLabel)} · <a href="mailto:${esc(email)}" style="color:${C.ocean};text-decoration:none">${esc(email)}</a></span></div>`;
}

// ---------------- document shell ----------------

export function emailShell(opts: { preheader: string; eyebrow: string; title: string; body: string; footerNote: string }) {
  const wa = whatsappLink();
  const contact = [
    [siteUrl().replace(/^https?:\/\//, ""), siteUrl()],
    [site.email, `mailto:${site.email}`],
    [site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
    ...(wa ? [["WhatsApp us", wa]] : []),
  ]
    .map(([label, href]) => `<a href="${esc(href)}" style="color:${C.slate};text-decoration:none">${esc(label)}</a>`)
    .join(`<span style="color:${C.line}"> &nbsp;|&nbsp; </span>`);

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(opts.title)}</title></head>
<body style="margin:0;padding:0;background:#eef3f7">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef3f7;padding:28px 10px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${C.line}">
<tr><td style="height:5px;line-height:5px;font-size:0;background:${C.ocean};background-image:linear-gradient(90deg,${C.ocean},${C.cyan},${C.coral})">&nbsp;</td></tr>
<tr><td style="padding:22px 32px;border-bottom:1px solid ${C.line}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td>${logo()}</td>
<td align="right" style="font-family:${FONT};font-size:12px;color:${C.muted}">Software development &amp; IT services</td>
</tr></table></td></tr>
<tr><td style="padding:28px 32px 32px">
<div style="font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:2px;color:${C.ocean};text-transform:uppercase;margin-bottom:8px">${esc(opts.eyebrow)}</div>
<h1 style="margin:0 0 18px;font-family:${FONT};font-size:24px;line-height:1.25;color:${C.navy}">${esc(opts.title)}</h1>
${opts.body}
</td></tr>
<tr><td style="padding:24px 32px;background:${C.mist};border-top:1px solid ${C.line};font-family:${FONT}">
${logo(28)}
<div style="margin:12px 0 4px;font-size:14px;font-weight:bold;color:${C.navy}">Websites, web apps &amp; custom software.</div>
<div style="font-size:13px;line-height:1.6;color:${C.muted};margin-bottom:12px">${esc(site.description)}</div>
<div style="font-size:13px;line-height:1.8">${contact}</div>
<div style="margin-top:14px;padding-top:12px;border-top:1px solid ${C.line};font-size:11px;color:${C.muted}">© ${new Date().getFullYear()} ${esc(site.name)} · ${esc(site.location)} · ${esc(opts.footerNote)}</div>
</td></tr>
</table></td></tr></table></body></html>`;
}

/** "Get to know us" cards shared by candidate and visitor emails. */
export function getToKnowUs() {
  return (
    section("Get to know us") +
    cards([
      { t: "About us", d: "Who we are and how we work.", href: siteUrl("/about"), initial: "A" },
      { t: "How we work", d: "Our process, step by step.", href: siteUrl("/process"), initial: "P" },
      { t: "Open roles", d: "Other positions at Mindsoft.", href: siteUrl("/careers"), initial: "R" },
    ])
  );
}
