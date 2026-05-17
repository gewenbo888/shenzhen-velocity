"use client";

import { useEffect, useState } from "react";
import { useLang, T } from "./LanguageProvider";
import { COPY } from "@/content/copy";

export default function Nav() {
  const { lang, toggle } = useLang();
  const [active, setActive] = useState("hero");
  const [t, setT] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { threshold: 0.35 }
    );
    COPY.navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="bg-void/85 backdrop-blur-md border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 py-2.5 flex items-center gap-6 font-mono text-[10px] tracking-widerer text-ash">
          <a href="#hero" className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-magenta-400 blip" />
            <span className="text-bone font-display tracking-widerer text-sm">{T(COPY.brand, lang)}</span>
            <span className="text-line hidden sm:inline">{T(COPY.brandSub, lang)}</span>
          </a>
          <nav className="hidden md:flex items-center gap-3 ml-2">
            {COPY.navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`hover:text-magenta-glow transition-colors whitespace-nowrap ${
                  active === l.id ? "text-magenta-glow" : "text-ash/60"
                }`}
              >
                {T(l.label, lang)}
              </a>
            ))}
          </nav>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-3 text-[10px] num text-ash/70">
            <span className="text-line">22:00</span>
            <span className="text-cyan-glow">{t}</span>
            <span className="text-line">WX</span>
            <span className="text-magenta-glow">RAIN</span>
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="ml-2 px-3 py-1 border border-line hover:border-magenta-400 transition-colors flex items-center gap-1.5"
          >
            <span className={lang === "en" ? "text-magenta-glow" : "text-line"}>EN</span>
            <span className="text-line">/</span>
            <span className={lang === "zh" ? "text-magenta-glow" : "text-line"} style={{ fontFamily: "Noto Sans SC, sans-serif" }}>中</span>
          </button>
        </div>
      </div>
    </header>
  );
}
