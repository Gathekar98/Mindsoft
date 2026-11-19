import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { canAccess } from "@/lib/session";
import { db } from "@/lib/db";
import { readResume, safeDownloadName } from "@/lib/storage";

export const dynamic = "force-dynamic";

/** Authenticated resume download for HR/Admin only. Files are never publicly reachable. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || !canAccess(session.role, "careers")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const app = await db.application.findUnique({ where: { id }, select: { resumeKey: true, resumeName: true, resumeMime: true } });
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const buf = await readResume(app.resumeKey);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": app.resumeMime,
        "Content-Disposition": `attachment; filename="${safeDownloadName(app.resumeName)}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "File missing" }, { status: 404 });
  }
}
