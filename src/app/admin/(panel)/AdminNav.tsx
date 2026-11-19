"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const active = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={active(l.href) ? "page" : undefined}
          className={`rounded-xl px-3.5 py-2.5 text-sm font-medium whitespace-nowrap ${active(l.href) ? "bg-white/12 text-white" : "text-on-dark hover:bg-white/6 hover:text-white"}`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
