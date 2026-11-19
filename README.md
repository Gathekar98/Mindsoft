# Mindsoft Tech Solutions — website

Marketing site, lead capture, careers and admin dashboard for Mindsoft Tech Solutions (Pune, Maharashtra, India).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma 6 · Zod · signed-cookie admin sessions (jose + bcrypt).

## Quick start (local)

```bash
npm install
cp .env.example .env        # then fill SESSION_SECRET, IP_HASH_SALT, SEED_ADMIN_PASSWORD
npm run db:start            # terminal 1: local Postgres on :5433 (no install needed)
npm run db:migrate          # terminal 2: create tables
npm run db:seed             # first admin user + 4 draft vacancies
npm run dev                 # http://localhost:3000
```

`npm run db:start` uses the `embedded-postgres` package to run a real PostgreSQL 17 server from `./.pgdata`. It is for development only.

## Project structure

```
prisma/              schema.prisma, migrations, seed.ts
scripts/db.ts        local dev database
src/app/(site)/      public pages (header/footer layout)
src/app/actions/     server actions: leads (contact/quote), applications (careers)
src/components/      site/ (header, footer, art, FAQ…), forms/
src/lib/             site config, services content, validation, auth, storage, security
src/middleware.ts    protects /admin
public/images/       photos (Unsplash License)
```

## Content you must confirm before launch

Search the code for `[CONFIRM` — contact details, response-time promise, availability badge, budget bands, job salary/stipend details. Company details live in `src/lib/site.ts`; service copy lives in `src/lib/services.ts`. Vacancies are seeded as **DRAFT** and stay hidden until published in the admin panel.

## Security notes

- Forms: server-side Zod validation, honeypot field, per-IP rate limiting (IP stored only as a salted hash), optional Cloudflare Turnstile, explicit privacy consent.
- Resumes: max 5 MB, type checked from file bytes (PDF/DOC/DOCX), stored outside `public/` and only downloadable by signed-in HR/Admin users.
- Admin: httpOnly signed session cookie, role checks (ADMIN, HR, SALES, EDITOR) on every page and action, `noindex` headers.

## Deployment

1. Create a managed Postgres database (Neon, Supabase, AWS RDS…) and set `DATABASE_URL` (with `sslmode=require`).
2. Set all variables from `.env.example` in your host. Use long random values for `SESSION_SECRET` and `IP_HASH_SALT`.
3. Run `npm run db:deploy` then `npm run db:seed` once.
4. **Resume storage:** on a VPS/Docker host, point `UPLOAD_DIR` to a persistent private volume. On serverless hosts (Vercel), replace the functions in `src/lib/storage.ts` with a private S3/R2 bucket — local disk there is not persistent.
5. Rate limiting is in-memory; with multiple instances, switch `src/lib/security.ts` to Redis/Upstash.
6. Configure SMTP variables to receive email alerts for new leads and applications (optional — everything is saved to the database either way).
