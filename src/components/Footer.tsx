"use client";

import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="relative border-t border-line bg-void/80 px-5 py-10">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4">
          <div className="font-display text-xl text-magenta-glow tracking-widerer">{T(COPY.brand, lang)}</div>
          <div className="font-mono text-[10px] tracking-widerer text-line mt-1">{T(COPY.brandSub, lang)}</div>
        </div>
        <div className="md:col-span-6">
          <div className="font-mono text-[10px] tracking-widerer text-magenta-glow flex items-center gap-2 mb-2">
            <span className="inline-block w-1.5 h-1.5 bg-magenta-400 blip" />
            <span>CONCEPT NOTICE · 概念声明</span>
          </div>
          <p className="text-xs text-ash/70 leading-relaxed">
            {T(COPY.footer.discNote, lang)}
          </p>
        </div>
        <div className="md:col-span-2 md:text-right font-mono text-[10px] tracking-widerer text-line">
          <a href="https://psyverse.fun" className="block hover:text-bone transition-colors">psyverse.fun</a>
          <a href="https://psyverse.fun/atlas.html" className="block mt-1 hover:text-bone transition-colors">atlas</a>
        </div>
      </div>
    </footer>
  );
}
