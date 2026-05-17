# Shenzhen Bay Velocity · 深圳湾极速

> Extreme racing across the future coastline. **A landing-page concept** for a fictional cyberpunk racing game — not a real shipping product.

A bilingual cinematic landing-page design study set across a fictional Shenzhen Bay. Six vehicle chassis, seven race modes, eight map zones, full HUD chrome, fake but cohesive leaderboard, ranked-tier ladder.

## Concept notice / 概念声明

This site is a **landing-page design study**. The game, vehicles, pilots, scores, tournaments, and lobbies described on it are all fictional. Not affiliated with any real automaker, racing league, or municipality.

本站为登陆页设计练习。其中描绘的游戏、车辆、车手、成绩、赛事、对局均为虚构,与任何真实车厂、联赛或城市机构无关。

## Sections

- **00 Hero** — massive bilingual title (SHENZHEN BAY VELOCITY · 深圳湾极速), START RACING / 开始竞速 CTA, HUD telemetry panel with animated speedometer
- **01 Modes** — 7 race modes (Street, Drift, Time Attack, Highway Pursuit, Coastal Sprint, Team Race, Neon Circuit), difficulty bars
- **02 Garage** — 6 vehicle chassis with SVG car silhouettes, stats (top speed, 0-100, handling, drift), interactive selector
- **03 Customization** — 7 categories (Paint / Underglow / Wheels / Aero / Holo Decals / Cabin / Engine FX) with sample swatches
- **04 Map** — Tactical map view of 8 zones across Shenzhen Bay + zone list with descriptions
- **05 Online & Ranked** — Fake leaderboard (8 rows) + 5-tier ranked ladder (APEX → ROOKIE)
- **CTA + Footer** — with explicit concept-site disclaimer in both languages

## Stack

- Next.js 14 (App Router)
- React Three Fiber — WebGL **highway floor** (perspective grid that scrolls toward camera) + low-poly **skyline silhouette** + **light streaks** (distant car headlights)
- Framer Motion — scroll reveals + animated counters + section transitions
- Tailwind — bespoke cyberpunk palette: void black, neon magenta `#ff2d8d`, electric cyan `#00f0ff`, acid yellow `#d8ff3a`
- Orbitron display + Inter body + JetBrains Mono HUD + Noto Sans SC for Han
- Pure SVG car silhouettes (six chassis types, per-vehicle path + accent glow)
- CSS rain layer + horizontal light streaks
- Bilingual EN/中 toggle from the start (LanguageProvider, localStorage, browser-locale fallback)

## Links

- **Live:** [shenzhen-velocity.psyverse.fun](https://shenzhen-velocity.psyverse.fun)
- **GitHub:** [github.com/gewenbo888/shenzhen-velocity](https://github.com/gewenbo888/shenzhen-velocity)

## About

Part of the [Psyverse](https://psyverse.fun) portfolio by [Gewenbo](https://psyverse.fun).
