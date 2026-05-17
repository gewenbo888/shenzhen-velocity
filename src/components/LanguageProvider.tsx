"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "zh";
export type Bi = { en: string; zh: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("sv-lang");
    if (saved === "zh" || saved === "en") { setLang(saved); return; }
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("zh")) setLang("zh");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("sv-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);
  const toggle = () => setLang(lang === "en" ? "zh" : "en");
  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}
export const useLang = () => useContext(LangContext);
export function T(o: Bi, lang: Lang): string { return lang === "zh" ? o.zh : o.en; }
