"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export interface ImageCardProps {
  href: string;
  image: string;
  title: string;
  text?: string;
  tags?: string[];
  number?: string;
  icon?: string; // SVG path data (24x24 viewBox)
  cta?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Full-bleed photo card: image fills the card, a navy gradient keeps text readable,
 * a light glare follows the pointer, and the photo slowly zooms on hover.
 * The photo is decorative (alt=""), the title carries the meaning.
 */
export function ImageCard({
  href,
  image,
  title,
  text,
  tags = [],
  number,
  icon,
  cta = "Explore",
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
}: ImageCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      className={`group reveal relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[24px] bg-navy p-6 text-white shadow-[0_24px_50px_rgba(12,18,45,0.18)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_rgba(12,18,45,0.28)] sm:p-7 ${className}`}
    >
      {/* Photo */}
      <Image
        src={image}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="-z-30 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      {/* Readability gradient */}
      <span aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(7,11,31,0.25)_0%,rgba(7,11,31,0.35)_35%,rgba(7,11,31,0.82)_70%,rgba(7,11,31,0.95)_100%)]" />
      {/* Brand tint, stronger on hover */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(10,92,145,0.55),rgba(62,192,213,0.12)_55%,transparent_75%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Pointer glare */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,0.22), transparent 45%)" }}
      />

      {/* Top row */}
      <span className="flex items-start justify-between gap-3">
        {number ? <span className="font-display text-sm font-bold tracking-widest text-white/80">{number}</span> : <span />}
        {icon && (
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/25 bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d={icon} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </span>

      {/* Body */}
      <span className="relative flex flex-col gap-3">
        <h3 className="font-display text-[22px] leading-tight font-extrabold sm:text-2xl">{title}</h3>
        {text && <span className="max-w-[46ch] text-[15px] leading-relaxed text-[#E6ECF8]">{text}</span>}
        {tags.length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-full border border-white/20 bg-white/14 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                {t}
              </span>
            ))}
          </span>
        )}
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-aqua">
          {cta} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </span>
    </Link>
  );
}
