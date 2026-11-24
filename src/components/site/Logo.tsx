import Image from "next/image";
import Link from "next/link";

/**
 * Mindsoft logo mark (public/brand/logo-mark.svg).
 * On dark backgrounds it sits on a white tile so the navy shape stays visible.
 */
export function LogoMark({ size = 40, onDark = false }: { size?: number; onDark?: boolean }) {
  const img = (
    <Image
      src="/brand/logo-mark.svg"
      alt=""
      width={onDark ? Math.round(size * 0.78) : size}
      height={onDark ? Math.round(size * 0.78) : size}
      unoptimized
      priority
      aria-hidden="true"
    />
  );
  if (!onDark) return img;
  return (
    <span className="flex items-center justify-center rounded-[12px] bg-white" style={{ width: size, height: size }} aria-hidden="true">
      {img}
    </span>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Mindsoft Tech Solutions, home">
      <LogoMark onDark={dark} size={dark ? 42 : 44} />
      <span className="flex flex-col leading-[1.1]">
        <span className={`font-display text-xl font-extrabold ${dark ? "text-white" : "text-navy"}`}>Mindsoft</span>
        <span className={`text-[11px] tracking-[0.18em] ${dark ? "text-on-dark" : "text-muted"}`}>TECH SOLUTIONS</span>
      </span>
    </Link>
  );
}
