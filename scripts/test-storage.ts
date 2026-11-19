/**
 * Smoke test for resume storage against the configured backend.
 *   node --conditions=react-server --env-file=.env.supabase node_modules/tsx/dist/cli.mjs scripts/test-storage.ts
 */
import { createRequire } from "node:module";

// Allow importing a "server-only" module from a plain Node script.
const req = createRequire(__filename);
req.cache[req.resolve("server-only")] = { exports: {} } as NodeJS.Module;

async function main() {
  const { deleteResume, readResume, saveResume } = await import("../src/lib/storage");
  const pdf = Buffer.from("%PDF-1.4\n% storage smoke test\n%%EOF");
  const key = await saveResume(pdf, "pdf", "application/pdf");
  console.log("uploaded:", key.replace(/[0-9a-f-]{36}/, "<uuid>"));

  const back = await readResume(key);
  console.log("downloaded matches:", back.equals(pdf));

  // The bucket must be private: an unauthenticated public URL must fail.
  const base = new URL(process.env.SUPABASE_URL!).origin;
  const pub = await fetch(`${base}/storage/v1/object/public/${process.env.SUPABASE_RESUME_BUCKET || "resumes"}/${key}`);
  console.log("public URL blocked:", !pub.ok, `(HTTP ${pub.status})`);

  await deleteResume(key);
  const gone = await readResume(key).then(() => false).catch(() => true);
  console.log("deleted:", gone);
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
