"use client";

import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { LEADERBOARD, RANKS } from "@/content/data";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";

const tierColor = (tag: string) => RANKS.find((r) => r.tag === tag)?.color || "#bcc1d8";

export default function Online() {
  const { lang } = useLang();
  return (
    <section id="online" className="relative py-28 px-5">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          accent="magenta"
          eyebrow={T(COPY.online.eyebrow, lang)}
          title={
            <>
              {T(COPY.online.titleA, lang)}
              <span className="text-magenta-glow italic">{T(COPY.online.titleAcc, lang)}</span>
              {T(COPY.online.titleB, lang)}
            </>
          }
          sub={T(COPY.online.sub, lang)}
        />

        <div className="grid lg:grid-cols-12 gap-5">
          {/* leaderboard */}
          <div className="lg:col-span-8">
            <div className="font-mono text-[10px] tracking-widerer text-line mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-magenta-400 blip" />
              <span className="text-magenta-glow">{T(COPY.online.lbHead, lang)}</span>
              <span className="flex-1 hairline-h" />
            </div>
            <div className="glass glass-magenta overflow-hidden">
              <div className="grid grid-cols-12 gap-3 px-4 py-2 border-b border-line font-mono text-[10px] tracking-widerer text-line">
                <div className="col-span-1">#</div>
                <div className="col-span-2">{T(COPY.online.cols.rank, lang)}</div>
                <div className="col-span-3">{T(COPY.online.cols.pilot, lang)}</div>
                <div className="col-span-3 hidden md:block">{T(COPY.online.cols.vehicle, lang)}</div>
                <div className="col-span-1 hidden md:block">{T(COPY.online.cols.mode, lang)}</div>
                <div className="col-span-5 md:col-span-2 text-right">{T(COPY.online.cols.score, lang)}</div>
              </div>
              {LEADERBOARD.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-line/60 last:border-0 hover:bg-magenta-500/5 transition-colors items-center"
                >
                  <div className="col-span-1 font-display text-lg num"
                       style={{ color: row.rank <= 3 ? tierColor(row.tag) : "#bcc1d8" }}>
                    {row.rank}
                  </div>
                  <div className="col-span-2">
                    <span
                      className="font-mono text-[9px] tracking-widerer px-1.5 py-0.5"
                      style={{ color: tierColor(row.tag), border: `1px solid ${tierColor(row.tag)}88` }}
                    >
                      {row.tag}
                    </span>
                  </div>
                  <div className="col-span-3 font-display text-sm text-bone truncate">{row.pilot}</div>
                  <div className="col-span-3 font-mono text-xs text-ash/70 hidden md:block truncate">{row.vehicle}</div>
                  <div className="col-span-1 font-mono text-[10px] text-line hidden md:block">{T(row.mode, lang)}</div>
                  <div className="col-span-5 md:col-span-2 text-right font-mono text-sm text-magenta-glow num">{row.score}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-3 font-mono text-[10px] text-line italic">
              {T(COPY.online.fictional, lang)}
            </div>
          </div>

          {/* tier ladder */}
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-widerer text-line mb-3">
              <span className="text-cyan-glow">◇</span> {T(COPY.online.tierHead, lang)}
            </div>
            <div className="space-y-2">
              {RANKS.map((r, i) => (
                <motion.div
                  key={r.tag}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass p-4 flex items-center gap-4"
                  style={{ borderLeft: `2px solid ${r.color}` }}
                >
                  <span className="font-display text-2xl italic" style={{ color: r.color, textShadow: `0 0 12px ${r.color}55` }}>
                    {r.tag}
                  </span>
                  <span className="flex-1 hairline-h" />
                  <span className="font-mono text-[10px] tracking-widerer text-ash/70">{r.range}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
