import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void:   "#02030a",
        carbon: "#070815",
        steel:  "#0d1024",
        wire:   "#161a36",
        line:   "#222a4f",
        ash:    "#bcc1d8",
        bone:   "#e8eaf5",
        magenta: { 400: "#ff2d8d", 500: "#ff0066", 600: "#cc0052" },
        cyan:    { 400: "#00f0ff", 500: "#00c8e6" },
        acid:    { 400: "#d8ff3a" },
        amber:   { 400: "#ffb13b" },
        red:     { 400: "#ff4d6a" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Orbitron", "sans-serif"],
        body:    ["var(--font-body)",    "Inter", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)",    "JetBrains Mono", "monospace"],
        han:     ["var(--font-han)",     "Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      letterSpacing: {
        widerer:   "0.18em",
        widestest: "0.32em",
      },
    },
  },
  plugins: [],
};
export default config;
