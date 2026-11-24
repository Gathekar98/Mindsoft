import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { canAccess } from "@/lib/session";
import { LogoMark } from "@/components/site/Logo";
import { logoutAction } from "../actions/auth";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Mindsoft Admin" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const links = [
    { href: "/admin", label: "Dashboard", show: true },
    { href: "/admin/leads", label: "Leads & quotes", show: canAccess(session.role, "leads") },
    { href: "/admin/jobs", label: "Jobs", show: canAccess(session.role, "careers") },
    { href: "/admin/applications", label: "Applications", show: canAccess(session.role, "careers") },
    { href: "/admin/posts", label: "Blog posts", show: canAccess(session.role, "content") },
    { href: "/admin/projects", label: "Portfolio", show: canAccess(session.role, "content") },
    { href: "/admin/users", label: "Users", show: canAccess(session.role, "users") },
    { href: "/admin/account", label: "My account", show: true },
  ].filter((l) => l.show);

  return (
    <div className="min-h-dvh bg-mist lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-line bg-navy text-white lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-3 p-5">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoMark size={36} onDark />
            <span className="font-display font-extrabold">Mindsoft Admin</span>
          </Link>
          <Link href="/" className="text-xs text-on-dark hover:text-white lg:hidden">View site ↗</Link>
        </div>
        <AdminNav links={links.map(({ href, label }) => ({ href, label }))} />
        <div className="hidden flex-col gap-2 border-t border-[#1E2A5C] p-5 text-sm lg:absolute lg:bottom-0 lg:flex lg:w-full">
          <span className="truncate text-on-dark">{session.name}</span>
          <span className="text-xs text-aqua">{session.role}</span>
          <div className="mt-2 flex items-center justify-between">
            <Link href="/" className="text-on-dark hover:text-white">View site ↗</Link>
            <form action={logoutAction}><button type="submit" className="font-semibold text-white hover:text-aqua">Sign out</button></form>
          </div>
        </div>
      </aside>
      <main id="main" className="min-w-0 p-5 sm:p-8">
        {children}
        <form action={logoutAction} className="mt-10 lg:hidden"><button type="submit" className="text-sm font-semibold text-ocean">Sign out</button></form>
      </main>
    </div>
  );
}
