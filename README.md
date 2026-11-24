# Mindsoft Tech Solutions — website

Company website for Mindsoft Tech Solutions (Pune, Maharashtra, India).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Zod · Brevo (email). **No database.**

## How it works

- **Contact & quote forms** → an email to the company inbox (`NOTIFY_EMAIL`) with all details, plus a confirmation email to the visitor.
- **Job applications** → an email to `CAREERS_EMAIL` (or `NOTIFY_EMAIL`) with the **resume attached**, plus a "application submitted successfully" email to the candidate.
- **Jobs, blog posts and case studies** live in simple files in `src/content/` — edit, commit and push; Netlify redeploys automatically.

## Quick start (local)

```bash
npm install
cp .env.example .env     # optional: add Brevo keys to send real emails
npm run dev              # http://localhost:3000
```

Without `BREVO_API_KEY`, forms still work locally and the emails are **printed in the terminal** instead of being sent.

## Managing content (no admin panel)

| What | File | How |
|---|---|---|
| Job openings & internships | `src/content/jobs.ts` | Set `status: "open"`, `"closed"` or `"draft"` (hidden). Copy a block to add a role. |
| Blog / Insights | `src/content/posts.ts` | Copy the example, set `published: true`, write the body in Markdown. |
| Work / case studies | `src/content/projects.ts` | Copy the example, set `published: true`. Real projects only. |
| Company details | `src/lib/site.ts` | Email, phone, WhatsApp, response time. |
| Services | `src/lib/services.ts` | Copy for the 16 service pages. |
| Logo & icons | `public/brand/logo-mark.svg` | Then run `npm run brand` to regenerate favicon and app icons. |

Search the code for `[CONFIRM` to find placeholders that still need real values.

## Deploying on Vercel

1. vercel.com → Add New → Project → Import `Gathekar98/Mindsoft` (framework: Next.js, detected automatically).
2. Environment Variables: `NEXT_PUBLIC_SITE_URL` (your live URL), `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `NOTIFY_EMAIL`, optionally `CAREERS_EMAIL`, `IP_HASH_SALT`.
3. Deploy. Every push to `main` redeploys automatically. Server code runs in Mumbai (`vercel.json` → `bom1`).

## Deploying on Netlify (alternative)

1. Netlify → **Add new project → Import from GitHub** → choose this repo. Build settings come from `netlify.toml`.
2. Add environment variables (Site configuration → Environment variables):
   `NEXT_PUBLIC_SITE_URL`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `NOTIFY_EMAIL`, optionally `CAREERS_EMAIL`, `IP_HASH_SALT`.
3. Deploy. Every push to `main` redeploys automatically.

## Security notes

- Server-side validation (Zod), hidden honeypot field, per-visitor rate limiting, optional Cloudflare Turnstile, explicit privacy consent.
- All visitor input is HTML-escaped before it is placed in emails.
- Resumes: max 4 MB, file type verified from the file's bytes (PDF/DOC/DOCX), never stored on the server — sent only as an email attachment.
- Brevo free plan: 300 emails/day (each submission sends 2).
