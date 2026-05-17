"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { ZONES } from "@/content/data";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

// stylized positions for each zone on an abstract bay map (percent coords)
const POSITIONS: Record<string, { x: number; y: number; color: string }> = {
  bridge:   { x: 38, y: 48, color: "#ff2d8d" },
  futian:   { x: 58, y: 28, color: "#00f0ff" },
  nanshan:  { x: 32, y: 32, color: "#d8ff3a" },
  shekou:   { x: 22, y: 60, color: "#ff2d8d" },
  ocean:    { x: 50, y: 62, color: "#00f0ff" },
  rooftops: { x: 66, y: 36, color: "#d8ff3a" },
  huaqiang: { x: 64, y: 22, color: "#9b80ff" },
  ridge:    { x: 80, y: 52, color: "#ff2d8d" },
};

export default function MapZones() {
  const { lang } = useLang();
  return (
    <section id="map" className="relative py-28 px-5">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          accent="cyan"
          eyebrow={T(COPY.map.eyebrow, lang)}
          title={
            <>
              {T(COPY.map.titleA, lang)}
              <span className="text-cyan-glow italic">{T(COPY.map.titleAcc, lang)}</span>
              {T(COPY.map.titleB, lang)}
            </>
          }
          sub={T(COPY.map.sub, lang)}
        />

        <div className="grid lg:grid-cols-12 gap-5">
          {/* stylized map */}
          <div className="lg:col-span-7">
            <div className="glass glass-cyan relative p-4">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widerer text-line mb-3">
                <span className="text-cyan-glow">◆ TACTICAL MAP · 战术地图</span>
                <span>22.5°N 113.9°E</span>
              </div>
              <div className="relative aspect-[16/9] bg-void border border-line overflow-hidden grid-bg">
                {/* coastline curve */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56" preserveAspectRatio="none">
                  {/* bay water */}
                  <path d="M 0 56 L 0 38 Q 18 30 30 38 Q 42 46 54 42 Q 70 35 86 44 Q 96 50 100 50 L 100 56 Z"
                        fill="#00f0ff" fillOpacity="0.04" stroke="#00f0ff" strokeOpacity="0.3" strokeWidth="0.18"
                        vectorEffect="non-scaling-stroke" />
                  {/* highway curves */}
                  <path d="M 8 32 Q 30 26 50 28 T 92 30" fill="none" stroke="#ff2d8d" strokeOpacity="0.6" strokeWidth="0.3"
                        strokeDasharray="0.8 1.2" vectorEffect="non-scaling-stroke" />
                  <path d="M 12 18 Q 40 16 65 22 T 95 18" fill="none" stroke="#9b80ff" strokeOpacity="0.45" strokeWidth="0.2"
                        strokeDasharray="0.4 0.8" vectorEffect="non-scaling-stroke" />
                </svg>

                {/* zones */}
                {ZONES.map((z, i) => {
                  const p = POSITIONS[z.id];
                  if (!p) return null;
                  return (
                    <motion.div
                      key={z.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      <div className="rounded-full blip"
                           style={{ width: 10, height: 10, background: p.color, boxShadow: `0 0 12px ${p.color}, 0 0 4px ${p.color}` }} />
                      <div className="absolute left-3 top-[-6px] whitespace-nowrap font-mono text-[10px] tracking-widerer">
                        <span style={{ color: p.color }}>{z.code}</span>
                        <span className="text-bone ml-2">{T(z.name, lang)}</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* corner brackets */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400/70" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400/70" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-400/70" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400/70" />
              </div>
            </div>
          </div>

          {/* zone list */}
          <div className="lg:col-span-5 space-y-2">
            {ZONES.map((z, i) => {
              const p = POSITIONS[z.id];
              return (
                <motion.div
                  key={z.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="glass p-3 flex gap-3"
                  style={{ borderLeft: `2px solid ${p?.color || "#ff2d8d"}` }}
                >
                  <span className="font-mono text-[10px] tracking-widerer w-12 shrink-0" style={{ color: p?.color }}>{z.code}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base text-bone leading-tight">{T(z.name, lang)}</div>
                    <div className="text-xs text-ash/75 leading-snug mt-1">{T(z.desc, lang)}</div>
                  </div>
                  <span className="font-mono text-[10px] text-line whitespace-nowrap self-start">{T(z.mode, lang)}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
