"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { categories, servicesByCategory, type ServiceCategoryId } from "@/lib/services";
import { mainNav, site } from "@/lib/site";

const catIds = Object.keys(categories) as ServiceCategoryId[];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="bg-navy text-[13px] text-[#cfe3f1]">
        <div className="container-ms flex flex-wrap justify-between gap-x-4 gap-y-1 py-2">
          <span>Remote-first IT services · {site.location}</span>
          <span className="hidden sm:inline">
            {site.email} · {site.phone}
          </span>
        </div>
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-line bg-white/85 shadow-[0_10px_30px_rgba(12,18,45,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white"
        }`}
      >
        <div className="container-ms flex items-center justify-between gap-5 py-4">
          <div className="animate-rise">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            <div ref={megaRef} className="relative">
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="mega-services"
                onClick={() => setMegaOpen((v) => !v)}
                onMouseEnter={() => setMegaOpen(true)}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium hover:text-ocean-text ${
                  isActive("/services") ? "text-ocean-text" : ""
                }`}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
              {megaOpen && (
                <div
                  id="mega-services"
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute top-full left-1/2 mt-3 w-[min(1080px,92vw)] -translate-x-[38%] animate-rise rounded-[24px] border border-line bg-white p-6 shadow-[0_40px_80px_rgba(12,18,45,0.16)] [animation-duration:.35s]"
                >
                  <div className="grid grid-cols-4 gap-6">
                    {catIds.map((id) => (
                      <div key={id} className="flex flex-col gap-2">
                        <Link href={`/services#${id}`} className="font-display text-[15px] font-bold text-navy hover:text-ocean-text">
                          {categories[id].name}
                        </Link>
                        <p className="mb-1 text-[13px] leading-snug text-muted">{categories[id].blurb}</p>
                        <ul className="flex flex-col gap-0.5">
                          {servicesByCategory(id).map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="block rounded-lg px-2 py-1.5 text-[14px] text-slate hover:bg-mist hover:text-ocean-text"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist px-5 py-4">
                    <span className="text-sm text-slate">Not sure which service you need? Tell us the problem and we&apos;ll suggest an approach.</span>
                    <Link href="/quote" className="text-sm font-semibold text-ocean">
                      Get a free quote →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {mainNav
              .filter((n) => n.href !== "/services")
              .map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-[15px] font-medium whitespace-nowrap hover:text-ocean-text ${
                    isActive(n.href) ? "text-ocean-text" : ""
                  }`}
                >
                  {n.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/quote" className="btn-primary hidden !px-5 !py-3 whitespace-nowrap sm:inline-flex">
              Get a free quote
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-line bg-white xl:hidden">
            <nav aria-label="Mobile" className="container-ms flex flex-col gap-1 py-4">
              <details className="group rounded-xl">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-semibold">
                  Services
                  <span className="transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="flex flex-col gap-4 px-3 pb-3">
                  {catIds.map((id) => (
                    <div key={id}>
                      <p className="mb-1 text-xs font-bold tracking-widest text-ocean-text uppercase">{categories[id].name}</p>
                      {servicesByCategory(id).map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`} className="block py-1.5 text-[15px] text-slate">
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/services" className="text-sm font-semibold text-ocean">
                    All services →
                  </Link>
                </div>
              </details>
              {mainNav
                .filter((n) => n.href !== "/services")
                .map((n) => (
                  <Link key={n.href} href={n.href} className="rounded-xl px-3 py-3 text-base font-semibold">
                    {n.label}
                  </Link>
                ))}
              <Link href="/quote" className="btn-primary mt-3">
                Get a free quote
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
