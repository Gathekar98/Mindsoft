import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

/**
 * Private resume storage on local disk, outside /public.
 * Files are only readable through the authenticated admin download route.
 *
 * For serverless hosting (e.g. Vercel) replace these three functions with an
 * S3-compatible bucket (AWS S3, Cloudflare R2) using private objects and
 * short-lived signed URLs. The rest of the app only uses the storage key.
 */
const ROOT = path.resolve(process.env.UPLOAD_DIR ?? "./storage/resumes");

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

export async function saveResume(buf: Buffer, ext: string) {
  const now = new Date();
  const key = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}.${ext}`;
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

export async function readResume(key: string) {
  return readFile(safePath(key));
}

export async function deleteResume(key: string) {
  await unlink(safePath(key)).catch(() => undefined);
}

/** Make a filename safe for a Content-Disposition header. */
export function safeDownloadName(name: string) {
  return name.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "resume";
}
