"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHead from "./SectionHead";
import { VEHICLES } from "@/content/data";
import { COPY } from "@/content/copy";
import { useLang, T } from "./LanguageProvider";
import CarSilhouette from "./CarSilhouette";

const ACC = (a: string) =>
  a === "magenta" ? { glow: "text-magenta-glow", bar: "#ff2d8d", glass: "glass-magenta", corner: "corner-mag" }
  : a === "cyan"  ? { glow: "text-cyan-glow",    bar: "#00f0ff", glass: "glass-cyan",    corner: "corner-cyan" }
  :                 { glow: "text-acid-glow",    bar: "#d8ff3a", glass: "",              corner: "" };

export default function Garage() {
  const { lang } = useLang();
  const [active, setActive] = useState(VEHICLES[0].id);
  const v = VEHICLES.find((x) => x.id === active)!;
  const a = ACC(v.accent);

  return (
    <section id="garage" className="relative py-28 px-5">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          accent="cyan"
          eyebrow={T(COPY.garage.eyebrow, lang)}
          title={
            <>
              {T(COPY.garage.titleA, lang)}
              <span className="text-cyan-glow italic">{T(COPY.garage.titleAcc, lang)}</span>
              {T(COPY.garage.titleB, lang)}
            </>
          }
          sub={T(COPY.garage.sub, lang)}
        />

        <div className="grid lg:grid-cols-12 gap-5">
          {/* selector */}
          <div className="lg:col-span-4">
            <div className="space-y-2">
              {VEHICLES.map((veh) => {
                const isActive = veh.id === active;
                const aa = ACC(veh.accent);
                return (
                  <button
                    key={veh.id}
                    onClick={() => setActive(veh.id)}
                    className={`w-full text-left px-4 py-3 transition-all flex items-center gap-3 ${isActive ? aa.glass + " glass" : "border border-line bg-carbon/40 hover:bg-carbon/70"}`}
                    style={isActive ? { borderLeft: `2px solid ${aa.bar}` } : undefined}
                  >
                    <span className={`font-mono text-[10px] tracking-widerer w-6 ${isActive ? aa.glow : "text-line"}`}>
                      {String(VEHICLES.indexOf(veh) + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-display text-lg leading-tight ${isActive ? aa.glow : "text-bone"}`}>
                        {T(veh.name, lang)}
                      </div>
                      <div className="font-mono text-[10px] text-ash/55 mt-0.5">{veh.code} · {T(veh.klass, lang)}</div>
                    </div>
                    <div className="font-mono text-[10px] num text-ash/60">{veh.topSpeed}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* detail */}
          <motion.div
            key={v.id + lang}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-8 glass ${a.glass} ${a.corner} relative p-6`}
          >
            <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
              <div>
                <div className="font-mono text-[10px] tracking-widerer text-line">{v.code}</div>
                <div className="font-display text-3xl text-bone leading-tight mt-1">{T(v.name, lang)}</div>
                <div className={`font-mono text-xs ${a.glow} mt-1`}>{T(v.klass, lang)}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-line">{T(COPY.garage.fields.top, lang)}</div>
                <div className={`font-display text-5xl ${a.glow} num italic leading-none`}>{v.topSpeed}</div>
                <div className="font-mono text-[10px] text-ash/55">KM/H</div>
              </div>
            </div>

            {/* car silhouette */}
            <div className="my-6 px-2">
              <CarSilhouette v={v} />
            </div>

            {/* stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              <Stat label={T(COPY.garage.fields.zh100, lang)}    value={`${v.zeroToHundred} s`} accent={a.glow} />
              <Stat label={T(COPY.garage.fields.drive, lang)}    value={T(v.drive, lang)}        accent="text-ash" />
              <Stat label={T(COPY.garage.fields.origin, lang)}   value={T(v.origin, lang)}       accent="text-ash" />
              <Stat label={T(COPY.garage.fields.klass, lang)}    value={T(v.klass, lang)}        accent="text-ash" />
            </div>

            {/* bars */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Bar label={T(COPY.garage.fields.handling, lang)} v={v.handling} color={a.bar} />
              <Bar label={T(COPY.garage.fields.drift, lang)}    v={v.drift}    color={a.bar} />
            </div>

            <div className={`mt-4 pt-3 border-t border-line text-sm leading-snug ${a.glow}`}>
              “{T(v.signature, lang)}”
            </div>
            <div className="mt-2 font-mono text-[10px] text-line">
              {T(COPY.garage.fields.stockNote, lang)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="border border-line bg-void/60 p-3">
      <div className="font-mono text-[9px] text-line tracking-widerer">{label}</div>
      <div className={`${accent} font-display text-sm md:text-base num mt-1 leading-tight`}>{value}</div>
    </div>
  );
}

function Bar({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="border border-line bg-void/60 p-3">
      <div className="flex justify-between font-mono text-[10px] tracking-widerer text-line mb-1.5">
        <span>{label}</span>
        <span className="text-bone num">{v}/100</span>
      </div>
      <div className="h-1.5 bg-line/40 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          className="h-full"
        />
      </div>
    </div>
  );
}
