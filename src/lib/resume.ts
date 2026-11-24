import "server-only";

/** Kept under Brevo's attachment limits so the email arrives reliably. */
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;

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

/** A safe attachment filename, e.g. "Resume - Priya Sharma.pdf". */
export function resumeFileName(fullName: string, ext: string) {
  const clean = fullName.replace(/[^\p{L}\p{N} .-]+/gu, "").trim().slice(0, 60) || "Candidate";
  return `Resume - ${clean}.${ext}`;
}
