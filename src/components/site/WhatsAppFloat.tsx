import { whatsappLink } from "@/lib/site";

/** Floating WhatsApp button. Hidden until a WhatsApp number is set in src/lib/site.ts. */
export function WhatsAppFloat() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mindsoft on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 animate-ping-soft items-center justify-center rounded-full bg-mint shadow-[0_14px_30px_rgba(26,166,122,0.4)] transition-transform hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20l1.3-4A8 8 0 1 1 8 19z" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 9.5c.5 2 2 3.5 4 4l1-1 2 1c-.3 1.2-1.3 1.8-2.5 1.5-2.7-.7-4.8-2.8-5.5-5.5C7.7 8.3 8.3 7.3 9.5 7l1 2z" fill="#fff" />
      </svg>
    </a>
  );
}
