"use client";

import { motion } from "framer-motion";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

export default function CTA() {
  const { lang } = useLang();
  return (
    <section className="relative py-32 px-5 overflow-hidden">
      {/* horizontal streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[20, 45, 70].map((y, i) => (
          <span
            key={i}
            className="absolute streak"
            style={{
              top: `${y}%`,
              left: 0,
              right: 0,
              height: 2,
              background: i % 2 === 0
                ? "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.85) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(255,45,141,0.85) 50%, transparent 100%)",
              width: "40vw",
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${1.6 + (i % 2) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] tracking-widestest text-magenta-glow mb-6"
        >
          {T(COPY.cta.eyebrow, lang)}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl text-bone leading-tight tracking-tight"
        >
          {T(COPY.cta.title, lang)}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="/play"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-display tracking-widerer text-base text-bone skew-tag glow-pulse"
            style={{
              background: "linear-gradient(90deg, #ff0066 0%, #ff2d8d 100%)",
              ["--glow" as string]: "rgba(255,45,141,0.7)",
            }}
          >
            <span className="flex items-center gap-3"><span>▶</span><span>{T(COPY.cta.primary, lang)}</span></span>
          </a>
          <a
            href="#garage"
            className="inline-flex items-center gap-3 px-6 py-3.5 border border-cyan-400/70 font-mono tracking-widerer text-xs text-cyan-glow hover:bg-cyan-400/10 transition-colors"
          >
            <span>◇</span><span>{T(COPY.cta.secondary, lang)}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 font-mono text-[10px] text-line italic max-w-xl mx-auto"
        >
          {T(COPY.cta.note, lang)}
        </motion.div>
      </div>
    </section>
  );
}
