import Link from "next/link";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="ms-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A5C91" />
          <stop offset="1" stopColor="#3EC0D5" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#ms-logo)" />
      <path
        d="M10 28V13l10 9 10-9v15"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Mindsoft Tech Solutions, home">
      <LogoMark />
      <span className="flex flex-col leading-[1.1]">
        <span className={`font-display text-xl font-extrabold ${dark ? "text-white" : "text-navy"}`}>Mindsoft</span>
        <span className={`text-[11px] tracking-[0.18em] ${dark ? "text-on-dark" : "text-muted"}`}>TECH SOLUTIONS</span>
      </span>
    </Link>
  );
}
