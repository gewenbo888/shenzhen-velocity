"use client";

import { useLang, T } from "../LanguageProvider";

type GameStateLite = {
  status: "idle" | "running" | "over";
  speed: number;
  distance: number;
  score: number;
  boost: number;
  boostActive: boolean;
  best: number;
  laneTarget: number;
};

const COPY = {
  speed:    { en: "SPEED",    zh: "速度" },
  distance: { en: "DIST",     zh: "里程" },
  score:    { en: "SCORE",    zh: "得分" },
  best:     { en: "BEST",     zh: "纪录" },
  boost:    { en: "BOOST",    zh: "加速" },
  start:    { en: "PRESS  SPACE  TO START",     zh: "按 空格 开始" },
  startSub: { en: "← →  steer · SPACE  boost · R  restart", zh: "← →  控向 · 空格 加速 · R  重开" },
  startTouch: { en: "(or tap left / right on screen — double-tap to boost)", zh: "(或点击屏幕左/右,双击加速)" },
  gameOver: { en: "WRECKED.",    zh: "已撞毁。" },
  again:    { en: "PRESS SPACE TO RACE AGAIN", zh: "按 空格 再来一局" },
  exit:     { en: "← BACK TO GARAGE",  zh: "← 返回车库" },
  conceptBadge: { en: "PROTOTYPE BUILD · NOT THE FULL GAME", zh: "原型 · 非完整版本" },
};

const fmtDist = (m: number) => {
  if (m < 1000) return `${Math.floor(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
};
const fmtSpeed = (s: number) => Math.round(s * 5);  // arcade km/h scale

export default function HUD({ state }: { state: GameStateLite }) {
  const { lang, toggle } = useLang();
  const speedKmh = fmtSpeed(state.speed);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* top bar: back, brand, lang */}
      <div className="absolute top-0 left-0 right-0 px-5 py-3 flex items-center justify-between pointer-events-auto">
        <a
          href="/"
          className="font-mono text-[10px] tracking-widerer text-ash/70 hover:text-bone transition-colors"
        >
          {T(COPY.exit, lang)}
        </a>
        <div className="font-display tracking-widerer text-sm text-magenta-glow">SHENZHEN VELOCITY</div>
        <button
          onClick={toggle}
          className="px-3 py-1 border border-line hover:border-magenta-400 transition-colors flex items-center gap-1.5 font-mono text-[10px] tracking-widerer"
        >
          <span className={lang === "en" ? "text-magenta-glow" : "text-line"}>EN</span>
          <span className="text-line">/</span>
          <span className={lang === "zh" ? "text-magenta-glow" : "text-line"} style={{ fontFamily: "Noto Sans SC, sans-serif" }}>中</span>
        </button>
      </div>

      {/* bottom-left: speed / dist / score */}
      <div className="absolute bottom-6 left-6 flex items-end gap-4 font-mono">
        <Tile label={T(COPY.speed, lang)} value={`${speedKmh}`} unit="km/h" big color="text-magenta-glow" />
        <Tile label={T(COPY.distance, lang)} value={fmtDist(state.distance)} color="text-cyan-glow" />
        <Tile label={T(COPY.score, lang)} value={state.score.toLocaleString()} color="text-acid-glow" />
        <Tile label={T(COPY.best, lang)}  value={fmtDist(state.best)} color="text-ash" small />
      </div>

      {/* bottom-right: boost meter */}
      <div className="absolute bottom-6 right-6 w-48 font-mono">
        <div className="flex justify-between text-[10px] tracking-widerer text-line mb-1">
          <span className={state.boostActive ? "text-magenta-glow" : "text-line"}>{T(COPY.boost, lang)}</span>
          <span className="text-bone num">{Math.round(state.boost)}%</span>
        </div>
        <div className="h-2 bg-line/40 overflow-hidden">
          <div
            className="h-full transition-[width] duration-100"
            style={{
              width: `${state.boost}%`,
              background: state.boostActive
                ? "linear-gradient(90deg, #d8ff3a 0%, #ff2d8d 100%)"
                : "linear-gradient(90deg, #00f0ff 0%, #ff2d8d 100%)",
              boxShadow: state.boostActive
                ? "0 0 12px #ff2d8d, 0 0 24px #ff2d8d"
                : "0 0 6px rgba(0,240,255,0.5)",
            }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[9px] tracking-widerer text-line">
          <span>HOLD SPACE</span>
          <span>≥ 25% TO ENGAGE</span>
        </div>
      </div>

      {/* lane indicator (bottom center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 font-mono">
        {[-1, 0, 1].map((l) => (
          <span
            key={l}
            className="inline-block w-4 h-2.5"
            style={{
              background: l === state.laneTarget ? "#ff2d8d" : "#222a4f",
              boxShadow: l === state.laneTarget ? "0 0 10px #ff2d8d" : undefined,
            }}
          />
        ))}
      </div>

      {/* concept badge top-mid */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widestest text-line">
        {T(COPY.conceptBadge, lang)}
      </div>

      {/* start screen */}
      {state.status === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center bg-void/30 backdrop-blur-sm pointer-events-auto">
          <div className="text-center">
            <div className="font-display text-5xl md:text-7xl text-magenta-glow italic mb-3 tracking-tight">
              VELOCITY
            </div>
            <div className="font-display text-base md:text-lg text-ash tracking-widerer mb-8">
              {T({ en: "PROTOTYPE · ENDLESS RUN", zh: "原型 · 无尽奔跑" }, lang)}
            </div>
            <div className="font-mono text-sm tracking-widerer text-cyan-glow blip">
              {T(COPY.start, lang)}
            </div>
            <div className="mt-3 font-mono text-[11px] text-line">
              {T(COPY.startSub, lang)}
            </div>
            <div className="mt-2 font-mono text-[10px] text-line">
              {T(COPY.startTouch, lang)}
            </div>
          </div>
        </div>
      )}

      {/* game over */}
      {state.status === "over" && (
        <div className="absolute inset-0 flex items-center justify-center bg-void/50 backdrop-blur-sm pointer-events-auto">
          <div className="text-center">
            <div className="font-display text-5xl md:text-7xl italic mb-4 tracking-tight"
                 style={{ color: "#ff4d6a", textShadow: "0 0 30px rgba(255,77,106,0.7)" }}>
              {T(COPY.gameOver, lang)}
            </div>
            <div className="font-mono text-xs tracking-widerer text-ash mb-1">{T(COPY.score, lang)}</div>
            <div className="font-display text-5xl text-acid-glow num mb-6">{state.score.toLocaleString()}</div>
            <div className="font-mono text-xs tracking-widerer text-ash/70 mb-1">{T(COPY.best, lang)}</div>
            <div className="font-display text-2xl text-bone num mb-8">{fmtDist(state.best)}</div>
            <div className="font-mono text-sm tracking-widerer text-magenta-glow blip">
              {T(COPY.again, lang)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tile({
  label, value, unit, color, big, small,
}: { label: string; value: string; unit?: string; color: string; big?: boolean; small?: boolean }) {
  return (
    <div className="border border-line bg-void/65 px-3 py-2 backdrop-blur-sm">
      <div className="text-[9px] tracking-widerer text-line">{label}</div>
      <div className={`${color} num leading-none mt-1 ${big ? "text-4xl" : small ? "text-base" : "text-xl"} font-display italic`}>
        {value}
        {unit && <span className="ml-1 text-[10px] text-ash/55 not-italic">{unit}</span>}
      </div>
    </div>
  );
}
