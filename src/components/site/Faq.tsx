/**
 * Accessible FAQ list using native <details>/<summary> (works without JavaScript)
 * plus FAQPage structured data for search engines.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items, withSchema = true }: { items: FaqItem[]; withSchema?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <details key={f.q} open={i === 0} className="group reveal overflow-hidden rounded-2xl border border-line bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-semibold text-navy sm:px-6 [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sky text-xl text-ocean transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="animate-rise px-5 pb-5 text-[15px] leading-relaxed text-slate [animation-duration:.4s] sm:px-6">{f.a}</p>
        </details>
      ))}
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
