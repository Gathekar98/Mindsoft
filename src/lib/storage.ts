import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

/**
 * Private resume storage.
 *
 * - Production (Netlify/serverless): a PRIVATE Supabase Storage bucket, used when
 *   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set. Files are never public;
 *   the server downloads them with the secret key for signed-in HR/Admin users.
 * - Local development: files on disk in UPLOAD_DIR (outside /public).
 *
 * The rest of the app only deals with the storage key.
 */
const ROOT = path.resolve(process.env.UPLOAD_DIR ?? "./storage/resumes");

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/+$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_RESUME_BUCKET || "resumes";
const useSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY);

function supabaseHeaders(extra: Record<string, string> = {}) {
  const key = SUPABASE_KEY!;
  // New-style secret keys (sb_secret_…) go in `apikey`; legacy service_role JWTs also as Bearer.
  return {
    apikey: key,
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
    ...extra,
  };
}

function objectUrl(key: string) {
  if (!/^[\w\-/.]+$/.test(key) || key.includes("..")) throw new Error("Invalid storage key");
  return `${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(BUCKET)}/${key}`;
}

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const SIGNATURES: { mime: string; ext: string; test: (b: Buffer) => boolean }[] = [
  { mime: "application/pdf", ext: "pdf", test: (b) => b.subarray(0, 5).toString("latin1") === "%PDF-" },
  // DOCX is a ZIP container: "PK\x03\x04"
  {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ext: "docx",
    test: (b) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04,
  },
  // Legacy DOC (OLE2)
  {
    mime: "application/msword",
    ext: "doc",
    test: (b) => b.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])),
  },
];

/** Detects the real file type from its bytes, ignoring the browser-supplied type. */
export function detectResumeType(buf: Buffer, originalName: string) {
  const ext = originalName.split(".").pop()?.toLowerCase();
  const match = SIGNATURES.find((s) => s.test(buf));
  if (!match) return null;
  // A .docx must also be named .docx (other ZIP files share the signature).
  if (match.ext === "docx" && ext !== "docx") return null;
  return match;
}

export async function saveResume(buf: Buffer, ext: string, mime: string) {
  const now = new Date();
  const key = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;

  if (useSupabase) {
    const res = await fetch(objectUrl(key), {
      method: "POST",
      headers: supabaseHeaders({ "Content-Type": mime, "x-upsert": "false" }),
      body: new Uint8Array(buf),
    });
    if (!res.ok) throw new Error(`Resume upload failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
    return key;
  }

  const full = path.join(ROOT, key);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, buf, { flag: "wx" });
  return key;
}

function safePath(key: string) {
  const full = path.resolve(ROOT, key);
  if (!full.startsWith(ROOT + path.sep)) throw new Error("Invalid storage key");
  return full;
}

export async function readResume(key: string): Promise<Buffer> {
  if (useSupabase) {
    const res = await fetch(objectUrl(key), { headers: supabaseHeaders(), cache: "no-store" });
    if (!res.ok) throw new Error(`Resume download failed (${res.status})`);
    return Buffer.from(await res.arrayBuffer());
  }
  return readFile(safePath(key));
}

export async function deleteResume(key: string) {
  if (useSupabase) {
    await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(BUCKET)}`, {
      method: "DELETE",
      headers: supabaseHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ prefixes: [key] }),
    }).catch(() => undefined);
    return;
  }
  await unlink(safePath(key)).catch(() => undefined);
}

/** Make a filename safe for a Content-Disposition header. */
export function safeDownloadName(name: string) {
  return name.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "resume";
}
