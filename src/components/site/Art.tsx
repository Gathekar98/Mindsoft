/* Original inline illustrations used across the site (no external assets). */
import type { ServiceCategoryId } from "@/lib/services";

export function GlobeRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="g-globe" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#7FE3F0" />
          <stop offset="0.55" stopColor="#1A8EBF" />
          <stop offset="1" stopColor="#0A3E6E" />
        </radialGradient>
        <linearGradient id="g-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3EC0D5" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3EC0D5" />
          <stop offset="1" stopColor="#FF8A5B" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="250" r="235" fill="#D9F3FB" />
      <circle cx="250" cy="250" r="190" fill="#C3ECF7" />
      <circle cx="250" cy="250" r="150" fill="url(#g-globe)" />
      <g fill="none" stroke="#9BE6F2" strokeOpacity="0.55" strokeWidth="1.4" className="origin-center animate-spin-slow [transform-box:fill-box]">
        <ellipse cx="250" cy="250" rx="150" ry="50" />
        <ellipse cx="250" cy="250" rx="150" ry="100" />
        <ellipse cx="250" cy="250" rx="50" ry="150" />
        <ellipse cx="250" cy="250" rx="100" ry="150" />
      </g>
      <g className="origin-center animate-spin-mid [transform-box:view-box]">
        <ellipse cx="250" cy="250" rx="235" ry="70" fill="none" stroke="url(#g-ring)" strokeWidth="3" transform="rotate(-18 250 250)" />
        <circle cx="470" cy="180" r="9" fill="#FF8A5B" />
      </g>
    </svg>
  );
}

export function ServiceArt({ id }: { id: ServiceCategoryId }) {
  switch (id) {
    case "web":
      return (
        <svg viewBox="0 0 300 170" className="h-full w-full" aria-hidden="true">
          <rect x="40" y="25" width="170" height="112" rx="10" fill="#fff" />
          <rect x="40" y="25" width="170" height="16" rx="8" fill="#DDEFF7" />
          <rect x="54" y="53" width="80" height="9" rx="4" fill="#0C122D" />
          <rect x="54" y="69" width="110" height="6" rx="3" fill="#B8CCDA" />
          <rect x="54" y="81" width="90" height="6" rx="3" fill="#B8CCDA" />
          <rect x="54" y="99" width="44" height="16" rx="6" fill="#FF8A5B" />
          <rect x="150" y="51" width="46" height="66" rx="8" fill="#D5F3F8" />
          <rect x="200" y="57" width="58" height="96" rx="12" fill="#0C122D" />
          <rect x="206" y="67" width="46" height="78" rx="8" fill="#F4FBFF" />
          <rect x="212" y="75" width="30" height="6" rx="3" fill="#127FA6" />
          <rect x="212" y="87" width="34" height="26" rx="5" fill="#FFD0BE" />
        </svg>
      );
    case "engineering":
      return (
        <svg viewBox="0 0 300 170" className="h-full w-full" aria-hidden="true">
          <rect x="40" y="22" width="220" height="128" rx="12" fill="#151E45" />
          <circle cx="58" cy="38" r="4" fill="#FF8A5B" />
          <circle cx="72" cy="38" r="4" fill="#FFC857" />
          <circle cx="86" cy="38" r="4" fill="#3EC0D5" />
          <rect x="58" y="58" width="60" height="7" rx="3" fill="#3EC0D5" />
          <rect x="124" y="58" width="80" height="7" rx="3" fill="#56689B" />
          <rect x="72" y="74" width="90" height="7" rx="3" fill="#FF8A5B" />
          <rect x="72" y="90" width="120" height="7" rx="3" fill="#56689B" />
          <rect x="72" y="106" width="70" height="7" rx="3" fill="#7FE3F0" />
          <rect x="58" y="122" width="40" height="7" rx="3" fill="#3EC0D5" />
          <rect x="196" y="92" width="78" height="66" rx="12" fill="#3EC0D5" />
          <path d="M222 114l-10 11 10 11M248 114l10 11-10 11" fill="none" stroke="#0C122D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "systems":
      return (
        <svg viewBox="0 0 300 170" className="h-full w-full" aria-hidden="true">
          <ellipse cx="80" cy="52" rx="34" ry="11" fill="#127FA6" />
          <rect x="46" y="52" width="68" height="62" fill="#127FA6" />
          <ellipse cx="80" cy="114" rx="34" ry="11" fill="#0A5C91" />
          <ellipse cx="80" cy="52" rx="34" ry="11" fill="#3EC0D5" />
          <path d="M46 74c0 6 15 11 34 11s34-5 34-11M46 94c0 6 15 11 34 11s34-5 34-11" fill="none" stroke="#7FE3F0" strokeWidth="2" />
          <path d="M118 84 H 170" stroke="#0C122D" strokeWidth="3" strokeDasharray="6 6" className="animate-dash" />
          <rect x="170" y="52" width="90" height="64" rx="14" fill="#0C122D" />
          <text x="215" y="90" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="20" fill="#fff">
            API
          </text>
          <circle cx="215" cy="146" r="14" fill="#FF8A5B" />
          <path d="M215 116v16" stroke="#0C122D" strokeWidth="3" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 300 170" className="h-full w-full" aria-hidden="true">
          <path d="M90 106a30 30 0 0 1 6-59 40 40 0 0 1 76-6 28 28 0 0 1 34 27 22 22 0 0 1-4 38z" fill="#fff" stroke="#127FA6" strokeWidth="3" />
          <path d="M118 88l18-18 14 12 26-28" fill="none" stroke="#FF8A5B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="70" y="124" width="160" height="26" rx="8" fill="#0C122D" />
          <circle cx="86" cy="137" r="4" fill="#1AA67A" />
          <circle cx="100" cy="137" r="4" fill="#3EC0D5" />
          <rect x="150" y="133" width="66" height="8" rx="4" fill="#56689B" />
        </svg>
      );
  }
}

export const categoryBg: Record<ServiceCategoryId, string> = {
  web: "bg-[linear-gradient(135deg,#0A5C91,#3EC0D5)]",
  engineering: "bg-navy",
  systems: "bg-[linear-gradient(135deg,#FFE2D6,#FFF3E8)]",
  cloud: "bg-[linear-gradient(135deg,#D5F3F8,#ECFAFD)]",
};

export function WorkspaceArt() {
  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="g-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A5C91" />
          <stop offset="1" stopColor="#3EC0D5" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="480" height="400" rx="40" fill="#D5F3F8" />
      <circle cx="410" cy="100" r="46" fill="#FFE2D6" />
      <rect x="90" y="70" width="290" height="190" rx="16" fill="#0C122D" />
      <rect x="104" y="84" width="262" height="162" rx="8" fill="url(#g-screen)" />
      <rect x="122" y="104" width="110" height="12" rx="6" fill="#fff" />
      <rect x="122" y="126" width="160" height="8" rx="4" fill="#BFEAF5" />
      <rect x="122" y="142" width="130" height="8" rx="4" fill="#BFEAF5" />
      <rect x="122" y="166" width="70" height="24" rx="8" fill="#FF8A5B" />
      <rect x="262" y="156" width="88" height="74" rx="10" fill="#fff" fillOpacity="0.9" />
      <path d="M274 214l16-16 14 10 30-30" fill="none" stroke="#127FA6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="220" y="260" width="30" height="40" fill="#0C122D" />
      <rect x="170" y="296" width="130" height="12" rx="6" fill="#0C122D" />
      <rect x="60" y="320" width="400" height="16" rx="8" fill="#0A5C91" />
      <path d="M300 318 L 330 270 H 440 L 410 318 Z" fill="#56689B" />
      <path d="M318 312 L 340 278 H 430 L 408 312 Z" fill="#E6F6FB" />
      <rect x="70" y="270" width="44" height="50" rx="8" fill="#FF8A5B" />
      <path d="M92 270c-20-30-6-60 0-70 6 10 20 40 0 70zM92 268c-34-14-40-40-40-50 14 2 36 18 40 50zM92 268c30-18 36-40 36-50-14 4-34 22-36 50z" fill="#1AA67A" />
    </svg>
  );
}

/** Device mock-ups for "What we build" sample cards. */
export function DeviceArt({ variant }: { variant: "store" | "app" | "corporate" }) {
  if (variant === "store")
    return (
      <svg viewBox="0 0 320 210" className="h-[200px] w-auto" aria-hidden="true">
        <rect x="40" y="20" width="240" height="160" rx="10" fill="#0C122D" />
        <rect x="50" y="30" width="220" height="140" rx="4" fill="#F4FBFF" />
        <rect x="60" y="40" width="60" height="8" rx="4" fill="#0C122D" />
        <rect x="60" y="58" width="60" height="60" rx="6" fill="#FFD0BE" />
        <rect x="130" y="58" width="60" height="60" rx="6" fill="#D5F3F8" />
        <rect x="200" y="58" width="60" height="60" rx="6" fill="#E8F7EF" />
        <rect x="60" y="126" width="40" height="6" rx="3" fill="#56689B" />
        <rect x="130" y="126" width="40" height="6" rx="3" fill="#56689B" />
        <rect x="200" y="126" width="40" height="6" rx="3" fill="#56689B" />
        <rect x="60" y="142" width="50" height="16" rx="5" fill="#FF8A5B" />
        <path d="M20 180h280l-14 14H34z" fill="#1E2A5C" />
      </svg>
    );
  if (variant === "app")
    return (
      <svg viewBox="0 0 320 210" className="h-[200px] w-auto" aria-hidden="true">
        <rect x="40" y="20" width="240" height="160" rx="10" fill="#0C122D" />
        <rect x="50" y="30" width="220" height="140" rx="4" fill="#F4FBFF" />
        <rect x="50" y="30" width="44" height="140" fill="#0C122D" />
        <rect x="58" y="44" width="28" height="6" rx="3" fill="#3EC0D5" />
        <rect x="58" y="58" width="28" height="6" rx="3" fill="#56689B" />
        <rect x="58" y="72" width="28" height="6" rx="3" fill="#56689B" />
        <rect x="104" y="42" width="156" height="10" rx="5" fill="#C7D7E3" />
        <rect x="104" y="62" width="74" height="48" rx="8" fill="#D5F3F8" />
        <rect x="186" y="62" width="74" height="48" rx="8" fill="#FFE2D6" />
        <rect x="104" y="118" width="156" height="8" rx="4" fill="#C7D7E3" />
        <rect x="104" y="132" width="156" height="8" rx="4" fill="#C7D7E3" />
        <rect x="104" y="146" width="110" height="8" rx="4" fill="#C7D7E3" />
        <path d="M20 180h280l-14 14H34z" fill="#1E2A5C" />
      </svg>
    );
  return (
    <svg viewBox="0 0 320 210" className="h-[200px] w-auto" aria-hidden="true">
      <rect x="60" y="30" width="140" height="180" rx="14" fill="#0C122D" />
      <rect x="68" y="40" width="124" height="170" rx="8" fill="#F4FBFF" />
      <rect x="78" y="52" width="70" height="9" rx="4" fill="#0C122D" />
      <rect x="78" y="70" width="104" height="54" rx="8" fill="#1AA67A" />
      <rect x="78" y="132" width="104" height="6" rx="3" fill="#C7D7E3" />
      <rect x="78" y="144" width="80" height="6" rx="3" fill="#C7D7E3" />
      <rect x="78" y="160" width="46" height="16" rx="6" fill="#127FA6" />
      <rect x="214" y="70" width="70" height="140" rx="14" fill="#0C122D" />
      <rect x="220" y="80" width="58" height="130" rx="9" fill="#F4FBFF" />
      <rect x="226" y="92" width="36" height="7" rx="3" fill="#0C122D" />
      <rect x="226" y="106" width="46" height="36" rx="6" fill="#FFD0BE" />
      <rect x="226" y="162" width="30" height="12" rx="4" fill="#127FA6" />
    </svg>
  );
}
