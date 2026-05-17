"use client";

import { motion } from "framer-motion";
import { COPY } from "@/content/copy";
import { HUD } from "@/content/data";
import { useLang, T } from "./LanguageProvider";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pt-24 pb-12 px-5 overflow-hidden">
      {/* tagline strip */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-20 left-0 right-0 px-5"
      >
        <div className="mx-auto max-w-[1400px] flex items-center gap-3 font-mono text-[10px] tracking-widestest text-cyan-glow">
          <span className="inline-block w-2 h-2 bg-cyan-400 blip" />
          <span>{T(COPY.hero.tagline, lang)}</span>
          <span className="flex-1 hairline-h" />
        </div>
      </motion.div>

      {/* horizontal light streaks across the hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 35, 55, 75, 85].map((y, i) => (
          <span
            key={i}
            className="absolute streak"
            style={{
              top: `${y}%`,
              left: 0,
              right: 0,
              height: i % 2 === 0 ? 1 : 2,
              background: i % 2 === 0
                ? "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.85) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(255,45,141,0.85) 50%, transparent 100%)",
              width: "30vw",
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${1.4 + (i % 3) * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* MAIN content */}
      <div className="relative mx-auto max-w-[1400px] w-full">
        {/* MASSIVE bilingual title */}
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display tracking-tight text-bone leading-[0.88]"
            >
              <div
                className="text-[10vw] md:text-[7vw] lg:text-[6.5rem] xl:text-[7.5rem]"
                style={{
                  background: "linear-gradient(90deg, #ff79b3 0%, #9beeff 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 80px rgba(255,45,141,0.25)",
                }}
              >
                SHENZHEN BAY
              </div>
              <div className="text-[11vw] md:text-[8vw] lg:text-[7.5rem] xl:text-[9rem] text-magenta-glow mt-1 italic">
                VELOCITY
              </div>
              <div
                className="text-[7vw] md:text-[4vw] lg:text-[3.2rem] mt-3 text-cyan-glow"
                style={{ fontFamily: "Noto Sans SC, sans-serif", letterSpacing: "0.1em" }}
              >
                深 圳 湾 极 速
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-8 max-w-2xl text-base md:text-lg text-ash/85 leading-relaxed"
            >
              {T(COPY.hero.sub, lang)}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#modes"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 font-display tracking-widerer text-base text-bone skew-tag glow-pulse"
                style={{
                  background: "linear-gradient(90deg, #ff0066 0%, #ff2d8d 100%)",
                  ["--glow" as string]: "rgba(255,45,141,0.7)",
                }}
              >
                <span className="flex items-center gap-3">
                  <span>▶</span>
                  <span>{T(COPY.hero.cta, lang)}</span>
                </span>
              </a>
              <a
                href="#garage"
                className="inline-flex items-center gap-3 px-6 py-3 border border-cyan-400/70 font-mono tracking-widerer text-xs text-cyan-glow hover:bg-cyan-400/10 transition-colors"
              >
                <span>◇</span>
                <span>{T(COPY.hero.cta2, lang)}</span>
              </a>
            </motion.div>

            {/* next-event chip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="mt-10 inline-flex items-center gap-3 font-mono text-[10px] tracking-widerer text-ash/70"
            >
              <span className="text-line">{T(COPY.hero.next, lang)}</span>
              <span className="inline-block w-1.5 h-1.5 bg-acid-400 blip" />
              <span className="text-acid-glow">{T(COPY.hero.eventName, lang)}</span>
            </motion.div>
          </div>

          {/* HUD column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="glass glass-magenta corner-mag relative p-5">
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widerer text-magenta-glow mb-4">
                <span>HUD · TELEMETRY</span>
                <span className="text-line">VLX-01</span>
              </div>

              {/* big speed readout */}
              <div className="text-center">
                <div className="font-display text-7xl text-magenta-glow num leading-none italic">488</div>
                <div className="font-mono text-[10px] text-ash/60 tracking-widerer mt-2">KM/H · STOCK</div>
              </div>

              {/* speedometer arc */}
              <div className="my-5 relative h-20">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path d="M 10 90 A 90 90 0 0 1 190 90" fill="none" stroke="#222a4f" strokeWidth="2" />
                  <path d="M 10 90 A 90 90 0 0 1 170 25" fill="none" stroke="#ff2d8d" strokeWidth="3" strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 6px #ff2d8d)" }} />
                  {/* tick marks */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const a = Math.PI - (i / 10) * Math.PI;
                    const x1 = 100 + Math.cos(a) * 80;
                    const y1 = 90 - Math.sin(a) * 80;
                    const x2 = 100 + Math.cos(a) * 90;
                    const y2 = 90 - Math.sin(a) * 90;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00f0ff" strokeOpacity="0.6" strokeWidth="1" />;
                  })}
                  <circle cx="100" cy="90" r="4" fill="#ff79b3" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-xs">
                <Stat label="RPM"   v={HUD.rpm}  c="text-cyan-glow" />
                <Stat label="GEAR"  v={HUD.gear} c="text-acid-glow" />
                <Stat label="BOOST" v={HUD.boost} c="text-magenta-glow" />
                <Stat label="LAP"   v={HUD.lap}  c="text-cyan-glow" />
              </div>

              <div className="mt-4 pt-3 border-t border-line font-mono text-[10px] text-line">
                <div className="flex justify-between"><span>STAGE</span><span className="text-ash">Z-01 BRIDGE</span></div>
                <div className="flex justify-between"><span>WEATHER</span><span className="text-magenta-glow">HEAVY RAIN</span></div>
                <div className="flex justify-between"><span>TRAFFIC</span><span className="text-cyan-glow">HIGH</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom HUD strip — fake mini-map + concept badge */}
      <div className="relative mx-auto max-w-[1400px] w-full mt-12">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="glass glass-cyan p-3 font-mono text-[10px] tracking-widerer text-cyan-glow flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 bg-cyan-400 blip" />
            <span>GRID · 12 LOBBIES OPEN</span>
          </div>
          <div className="glass glass-magenta p-3 font-mono text-[10px] tracking-widerer text-magenta-glow flex items-center justify-center gap-3">
            <span>{T(COPY.conceptBadge, lang)}</span>
          </div>
          <div className="glass p-3 font-mono text-[10px] tracking-widerer text-ash flex items-center justify-end gap-3">
            <span className="text-line">REGION</span>
            <span className="text-bone">SHENZHEN · 22.5°N 113.9°E</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, v, c }: { label: string; v: string; c: string }) {
  return (
    <div className="bg-void/60 border border-line p-2">
      <div className="text-[9px] text-line tracking-widerer">{label}</div>
      <div className={`${c} num text-base mt-0.5`}>{v}</div>
    </div>
  );
}
