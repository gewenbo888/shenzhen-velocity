"use client";

import type { Vehicle } from "@/content/data";

const PATHS: Record<string, string> = {
  // hypercar low wedge
  phantom:
    "M 20 60 L 50 38 Q 95 24 165 24 Q 215 24 250 36 Q 275 44 282 54 L 285 60 L 285 64 L 270 66 L 248 66 Q 244 78 236 78 Q 228 78 224 66 L 80 66 Q 76 78 68 78 Q 60 78 56 66 L 35 64 L 20 60 Z",
  // drift coupe — slightly higher rear
  kage:
    "M 22 62 L 60 40 Q 100 30 160 30 Q 220 30 260 42 Q 280 50 282 60 L 282 66 L 268 68 L 250 68 Q 246 80 238 80 Q 230 80 226 68 L 84 68 Q 80 80 72 80 Q 64 80 60 68 L 36 66 L 22 62 Z",
  // AI supercar — pointed nose
  tachyon:
    "M 18 60 L 48 36 Q 92 22 160 22 Q 220 22 256 34 Q 280 42 287 56 L 290 62 L 290 65 L 272 67 L 250 67 Q 246 78 238 78 Q 230 78 226 67 L 80 67 Q 76 78 68 78 Q 60 78 56 67 L 34 65 L 18 60 Z",
  // hover — flat skirt, no wheels
  stratos:
    "M 22 56 L 60 36 Q 100 26 160 26 Q 220 26 262 38 Q 285 48 290 60 L 290 64 L 285 68 L 25 68 L 22 56 Z",
  // bike — different proportions
  lance:
    "M 60 60 L 100 36 Q 130 30 170 32 Q 210 36 230 46 L 240 56 L 240 62 Q 232 70 224 70 Q 216 70 212 62 L 110 62 Q 106 72 96 72 Q 86 72 82 62 L 60 60 Z",
  // SUV — taller, boxy
  monolith:
    "M 22 64 L 30 30 L 90 20 L 220 22 L 270 36 L 285 50 L 290 62 L 290 66 L 270 68 L 248 68 Q 244 80 236 80 Q 228 80 224 68 L 84 68 Q 80 80 72 80 Q 64 80 60 68 L 36 66 L 22 64 Z",
};

const WHEELS: Record<string, [number, number][]> = {
  phantom:  [[68, 66], [236, 66]],
  kage:     [[72, 68], [238, 68]],
  tachyon:  [[68, 67], [238, 67]],
  stratos:  [],
  lance:    [[96, 72], [224, 72]],
  monolith: [[72, 68], [236, 68]],
};

export default function CarSilhouette({ v }: { v: Vehicle }) {
  const path = PATHS[v.id] || PATHS.phantom;
  const wheels = WHEELS[v.id] || [];
  const color = v.glow;
  const accent = v.accent === "magenta" ? "#ff79b3" : v.accent === "cyan" ? "#9beeff" : "#eaff8a";
  return (
    <svg viewBox="0 0 310 100" className="w-full h-auto" aria-hidden>
      {/* ground glow */}
      <defs>
        <radialGradient id={`g-${v.id}`} cx="50%" cy="100%" r="60%">
          <stop offset="0" stopColor={accent} stopOpacity="0.45" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`b-${v.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.95" />
          <stop offset="0.6" stopColor={accent} stopOpacity="0.5" />
          <stop offset="1" stopColor="#02030a" stopOpacity="1" />
        </linearGradient>
      </defs>

      <ellipse cx="155" cy="92" rx="140" ry="6" fill={`url(#g-${v.id})`} />

      {/* body */}
      <path d={path} fill={`url(#b-${v.id})`} stroke={accent} strokeWidth="0.7"
            style={{ filter: `drop-shadow(0 0 12px ${color})` }} />

      {/* window strip */}
      <path d={path} fill="none" stroke="#02030a" strokeWidth="0.4" opacity="0.6" transform="translate(0,-4)" />

      {/* underglow */}
      <ellipse cx="155" cy="82" rx="130" ry="3" fill={accent} opacity="0.35" />

      {/* wheels */}
      {wheels.map(([wx, wy], i) => (
        <g key={i}>
          <circle cx={wx} cy={wy} r="9" fill="#02030a" stroke={accent} strokeWidth="0.8" />
          <circle cx={wx} cy={wy} r="4" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.7" />
          <circle cx={wx} cy={wy} r="1.5" fill={accent} />
        </g>
      ))}

      {/* headlight beam */}
      <path d={`M 285 56 L 308 50 L 308 62 L 285 64 Z`} fill={accent} opacity="0.35" />
      <line x1="285" y1="58" x2="308" y2="55" stroke={accent} strokeWidth="0.6" />
    </svg>
  );
}
