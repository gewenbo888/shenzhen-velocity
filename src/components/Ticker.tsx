"use client";

import { TICKER } from "@/content/data";
import { useLang, T } from "./LanguageProvider";

export default function Ticker() {
  const { lang } = useLang();
  const list = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div className="border-y border-line bg-carbon/80 backdrop-blur-sm overflow-hidden">
      <div className="flex ticker-track whitespace-nowrap py-2 font-mono text-[11px] tracking-widerer text-ash">
        {list.map((s, i) => (
          <span key={i} className="px-6 flex items-center gap-2">
            <span className="text-magenta-400">▸</span>
            <span>{T(s, lang)}</span>
            <span className="text-line mx-3">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
