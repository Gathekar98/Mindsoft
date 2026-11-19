import { NextResponse, type NextRequest } from "next/server";
import type { LeadStatus, Prisma } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { canAccess } from "@/lib/session";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Escape a CSV cell and neutralise spreadsheet formula injection. */
function cell(v: unknown) {
  let s = v instanceof Date ? v.toISOString() : String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session || !canAccess(session.role, "leads")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sp = req.nextUrl.searchParams;
  const status = sp.get("status");
  const type = sp.get("type");
  const q = sp.get("q");
  const where: Prisma.LeadWhereInput = {
    ...(status ? { status: status as LeadStatus } : {}),
    ...(type === "QUOTE" || type === "CONTACT" ? { type } : {}),
    ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }] } : {}),
  };
  const leads = await db.lead.findMany({ where, orderBy: { createdAt: "desc" } });

  const cols = ["createdAt", "type", "status", "name", "email", "phone", "company", "service", "budget", "timeline", "message", "sourcePage"] as const;
  const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => cell(l[c])).join(","))].join("\r\n");

  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mindsoft-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
