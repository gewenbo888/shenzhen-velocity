"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { MODES } from "@/content/data";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

const ACCENT = {
  magenta: { glow: "text-magenta-glow", bar: "#ff2d8d", glass: "glass-magenta" },
  cyan:    { glow: "text-cyan-glow",    bar: "#00f0ff", glass: "glass-cyan" },
  acid:    { glow: "text-acid-glow",    bar: "#d8ff3a", glass: "" },
};

export default function Modes() {
  const { lang } = useLang();
  return (
    <section id="modes" className="relative py-28 px-5">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          accent="magenta"
          eyebrow={T(COPY.modes.eyebrow, lang)}
          title={
            <>
              {T(COPY.modes.titleA, lang)}
              <span className="text-magenta-glow italic">{T(COPY.modes.titleAcc, lang)}</span>
              {T(COPY.modes.titleB, lang)}
            </>
          }
          sub={T(COPY.modes.sub, lang)}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {MODES.map((m, i) => {
            const a = ACCENT[m.accent];
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`glass ${a.glass} p-5 relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: a.bar, boxShadow: `0 0 12px ${a.bar}` }} />

                <div className="flex items-baseline justify-between mb-2 font-mono text-[10px] tracking-widerer text-line">
                  <span className={a.glow}>{m.tag}</span>
                  <DiffBar n={m.difficulty} color={a.bar} />
                </div>

                <div className="font-display text-2xl text-bone leading-tight mb-1">{T(m.name, lang)}</div>
                <div className="text-sm text-ash/85 leading-snug mb-4">{T(m.one, lang)}</div>

                <div className="space-y-2 font-mono text-[10px] text-ash/70">
                  <Row label={T(COPY.modes.fields.rules, lang)}    value={T(m.rules, lang)} />
                  <Row label={T(COPY.modes.fields.vehicles, lang)} value={T(m.vehicles, lang)} />
                  <Row label={T(COPY.modes.fields.duration, lang)} value={T(m.duration, lang)} accent={a.glow} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex gap-2 leading-snug">
      <span className="text-line w-20 shrink-0 tracking-widerer">{label}</span>
      <span className={accent || "text-ash/85"}>{value}</span>
    </div>
  );
}

function DiffBar({ n, color }: { n: number; color: string }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-2.5"
          style={{ background: i < n ? color : "#222a4f", opacity: i < n ? 1 : 0.5 }}
        />
      ))}
    </span>
  );
}
