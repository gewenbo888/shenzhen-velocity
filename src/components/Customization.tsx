"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { CUSTOM } from "@/content/data";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

export default function Customization() {
  const { lang } = useLang();
  return (
    <section id="custom" className="relative py-28 px-5">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          accent="acid"
          eyebrow={T(COPY.custom.eyebrow, lang)}
          title={
            <>
              {T(COPY.custom.titleA, lang)}
              <span className="text-acid-glow italic">{T(COPY.custom.titleAcc, lang)}</span>
              {T(COPY.custom.titleB, lang)}
            </>
          }
          sub={T(COPY.custom.sub, lang)}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CUSTOM.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass p-4 relative overflow-hidden"
              style={{ borderColor: `${c.accent}40` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                   style={{ background: c.accent, boxShadow: `0 0 12px ${c.accent}` }} />

              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] tracking-widestest" style={{ color: c.accent }}>{c.tag}</span>
                <span className="font-mono text-[10px] text-line">{T(COPY.custom.optionsLabel, lang)} · <span className="text-bone num">{c.opts}</span></span>
              </div>
              <div className="font-display text-xl text-bone leading-tight mb-3">{T(c.name, lang)}</div>

              <div className="font-mono text-[10px] text-line tracking-widerer">{T(COPY.custom.sampleLabel, lang)}</div>
              <div className="text-sm text-ash/85 leading-snug mt-1">{T(c.example, lang)}</div>

              {/* color swatches for some categories */}
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span
                    key={j}
                    className="inline-block w-4 h-4"
                    style={{
                      background:
                        j === 0 ? c.accent :
                        j === 1 ? "#ff2d8d" :
                        j === 2 ? "#00f0ff" :
                        j === 3 ? "#d8ff3a" :
                        j === 4 ? "#9b80ff" :
                                  "#bcc1d8",
                      boxShadow: j === 0 ? `0 0 8px ${c.accent}` : undefined,
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
