"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through words with a slide-up animation.
 * Screen readers get the full list once instead of constant changes.
 */
export function RotatingWord({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="inline-block overflow-hidden pb-1 align-bottom">
        <span key={i} className="text-gradient inline-block animate-word">
          {words[i]}
        </span>
      </span>
    </>
  );
}
