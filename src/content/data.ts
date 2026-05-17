// ALL DATA HERE IS FICTIONAL — for a concept landing page only.
// No vehicles, leaderboards, prices, or tournaments described below
// correspond to real products, real people, or real events.

import type { Bi } from "@/components/LanguageProvider";

export type Vehicle = {
  id: string;
  code: string;       // model code on the chassis
  name: Bi;
  klass: Bi;
  origin: Bi;
  drive: Bi;
  topSpeed: number;   // km/h (fictional)
  zeroToHundred: number; // s
  handling: number;   // /100
  drift: number;      // /100
  signature: { en: string; zh: string };
  accent: string;     // tailwind color
  glow: string;       // CSS color for glow
};

export const VEHICLES: Vehicle[] = [
  {
    id: "phantom",  code: "VLX-01 PHANTOM",
    name: { en: "Phantom · 幻影",          zh: "幻影 · Phantom" },
    klass:{ en: "Electric Hypercar",        zh: "电动超跑" },
    origin:{ en: "Shenzhen · Bay District", zh: "深圳 · 湾区" },
    drive:{ en: "Quad-motor AWD",           zh: "四电机四驱" },
    topSpeed: 488, zeroToHundred: 1.9, handling: 92, drift: 70,
    signature: { en: "Silent assassin — most efficient hypercar in the bay class.",
                  zh: "无声刺客——湾区级别效率最高的超跑。" },
    accent: "magenta", glow: "rgba(255,45,141,0.55)",
  },
  {
    id: "kage",     code: "VLX-02 KAGE",
    name: { en: "Kage · 影",                zh: "影 · Kage" },
    klass:{ en: "Drift Coupe",              zh: "漂移轿跑" },
    origin:{ en: "Hong Kong · Tsim Sha Tsui", zh: "香港 · 尖沙咀" },
    drive:{ en: "RWD · twin-motor",         zh: "后驱 · 双电机" },
    topSpeed: 372, zeroToHundred: 2.4, handling: 88, drift: 99,
    signature: { en: "Built to slide. Wins more tournaments by drift score than top speed.",
                  zh: "为滑行而生。漂移分赢的赛事比极速多。" },
    accent: "cyan", glow: "rgba(0,240,255,0.55)",
  },
  {
    id: "tachyon",  code: "VLX-03 TACHYON",
    name: { en: "Tachyon · 超光",           zh: "超光 · Tachyon" },
    klass:{ en: "AI-Assist Supercar",       zh: "AI 辅助超跑" },
    origin:{ en: "Shanghai · Pudong",       zh: "上海 · 浦东" },
    drive:{ en: "Predictive AWD",           zh: "预测式四驱" },
    topSpeed: 415, zeroToHundred: 2.1, handling: 96, drift: 78,
    signature: { en: "Cockpit AI predicts your line three corners ahead.",
                  zh: "座舱 AI 预判你的三个弯之后。" },
    accent: "magenta", glow: "rgba(255,45,141,0.55)",
  },
  {
    id: "stratos",  code: "VLX-04 STRATOS",
    name: { en: "Stratos · 平流",           zh: "平流 · Stratos" },
    klass:{ en: "Hover-Concept",            zh: "悬浮概念车" },
    origin:{ en: "Shenzhen · Futian",       zh: "深圳 · 福田" },
    drive:{ en: "Mag-lev skirt",            zh: "磁悬浮裙板" },
    topSpeed: 520, zeroToHundred: 2.0, handling: 80, drift: 60,
    signature: { en: "Hovers 12 cm above the asphalt at speed. Banned in three series.",
                  zh: "高速时悬浮于路面 12 厘米。已被三个赛事系列禁用。" },
    accent: "cyan", glow: "rgba(0,240,255,0.55)",
  },
  {
    id: "lance",    code: "VLX-05 LANCE",
    name: { en: "Lance · 锋",               zh: "锋 · Lance" },
    klass:{ en: "Hyper-Bike",               zh: "超级机车" },
    origin:{ en: "Tokyo · Akihabara",       zh: "东京 · 秋叶原" },
    drive:{ en: "Single hub motor",         zh: "单轮毂电机" },
    topSpeed: 402, zeroToHundred: 1.7, handling: 99, drift: 50,
    signature: { en: "Threads traffic gaps a car can't even see.",
                  zh: "穿过汽车看不到的车流缝隙。" },
    accent: "acid",  glow: "rgba(216,255,58,0.55)",
  },
  {
    id: "monolith", code: "VLX-06 MONOLITH",
    name: { en: "Monolith · 巨碑",          zh: "巨碑 · Monolith" },
    klass:{ en: "Luxury Cyber-SUV",         zh: "豪华赛博 SUV" },
    origin:{ en: "Guangzhou · Tianhe",      zh: "广州 · 天河" },
    drive:{ en: "Hex-motor AWD",            zh: "六电机四驱" },
    topSpeed: 340, zeroToHundred: 2.7, handling: 75, drift: 45,
    signature: { en: "Concrete in motion. Wins highway pursuit by surviving everything.",
                  zh: "移动的混凝土。靠不被撞坏赢公路追逐。" },
    accent: "magenta", glow: "rgba(255,45,141,0.55)",
  },
];

export type Mode = {
  id: string;
  tag: string;          // M01, M02...
  name: Bi;
  one: Bi;              // one-liner
  rules: Bi;
  vehicles: Bi;
  duration: Bi;
  difficulty: number;  // /5
  accent: "magenta" | "cyan" | "acid";
};

export const MODES: Mode[] = [
  { id: "street",   tag: "M01", name: { en: "Street", zh: "街头竞速" },
    one: { en: "Closed-block, no rules, single lap.", zh: "封街,无规则,一圈定胜负。" },
    rules: { en: "First across the line. Contact allowed.", zh: "先撞线者胜。允许碰撞。" },
    vehicles: { en: "Any class A or below", zh: "A 级及以下" },
    duration: { en: "~3 min", zh: "约 3 分钟" }, difficulty: 2, accent: "magenta" },
  { id: "drift",    tag: "M02", name: { en: "Drift", zh: "漂移挑战" },
    one: { en: "Angle, line, hold — score per zone.", zh: "角度、线、维持——逐段计分。" },
    rules: { en: "Judged on slip angle, throttle, line.", zh: "按打滑角、油门、走线评分。" },
    vehicles: { en: "Drift-class recommended", zh: "推荐漂移级别" },
    duration: { en: "2 min per run", zh: "每轮 2 分钟" }, difficulty: 4, accent: "cyan" },
  { id: "time",     tag: "M03", name: { en: "Time Attack", zh: "极速挑战" },
    one: { en: "Solo. Clock. Ghost of the leader.",   zh: "单人、时钟、领先者的幽灵。" },
    rules: { en: "Personal best across 3 sectors.",    zh: "三段计时取个人最佳。" },
    vehicles: { en: "Any",                              zh: "不限" },
    duration: { en: "~4 min",                           zh: "约 4 分钟" }, difficulty: 3, accent: "cyan" },
  { id: "pursuit",  tag: "M04", name: { en: "Highway Pursuit", zh: "公路追逐" },
    one: { en: "Outrun the AI fleet through 18 km of bridge.", zh: "在 18 公里大桥上甩开 AI 车队。" },
    rules: { en: "Survive 9 chase waves.",                       zh: "撑过 9 波追击。" },
    vehicles: { en: "SUV / hypercar classes",                    zh: "SUV / 超跑级别" },
    duration: { en: "~7 min",                                    zh: "约 7 分钟" }, difficulty: 4, accent: "magenta" },
  { id: "coast",    tag: "M05", name: { en: "Coastal Sprint", zh: "海岸冲刺" },
    one: { en: "Point-to-point along the bay edge.", zh: "沿湾边点到点。" },
    rules: { en: "Open route — pick your line through 6 zones.", zh: "开放线路——自选过 6 区。" },
    vehicles: { en: "Any",                                        zh: "不限" },
    duration: { en: "8–12 min",                                   zh: "8–12 分钟" }, difficulty: 3, accent: "acid" },
  { id: "team",     tag: "M06", name: { en: "Team Race", zh: "团队赛" },
    one: { en: "4-on-4. Slipstream, blocks, swap-leader strategy.", zh: "4 对 4。牵引、阻挡、轮换领跑。" },
    rules: { en: "Combined finishing positions.",                   zh: "累计完赛位次。" },
    vehicles: { en: "Mixed (1 from each class)",                    zh: "混编(各级一辆)" },
    duration: { en: "10 min",                                       zh: "10 分钟" }, difficulty: 5, accent: "magenta" },
  { id: "circuit",  tag: "M07", name: { en: "Neon Circuit Tournament", zh: "霓虹锦标" },
    one: { en: "Seasonal ladder. 8 stages. 1 champion.", zh: "赛季阶梯。8 站。1 位冠军。" },
    rules: { en: "Points across the 8-race series.",     zh: "8 站积分。" },
    vehicles: { en: "Class-locked per stage",             zh: "每站锁定级别" },
    duration: { en: "Season", zh: "整赛季" }, difficulty: 5, accent: "cyan" },
];

export type MapZone = {
  id: string; code: string; name: Bi; han: string; desc: Bi; mode: Bi;
};
export const ZONES: MapZone[] = [
  { id: "bridge",   code: "Z-01",  name: { en: "Shenzhen Bay Bridge",        zh: "深圳湾大桥" },     han: "Z-01", desc: { en: "5.5 km of suspended highway across the bay. Crosswind sectors.",   zh: "横跨海湾的 5.5 公里悬索公路。侧风路段。" },                 mode: { en: "Pursuit · Sprint", zh: "追逐 · 冲刺" } },
  { id: "futian",   code: "Z-02",  name: { en: "Futian Skyline",             zh: "福田天际线" },     han: "Z-02", desc: { en: "Financial district. Mirror towers. Holographic billboards reflect on wet asphalt.", zh: "金融区。镜面塔楼。霓虹广告牌倒映在湿路面上。" }, mode: { en: "Street",          zh: "街头" } },
  { id: "nanshan",  code: "Z-03",  name: { en: "Nanshan Tunnels",            zh: "南山隧道" },       han: "Z-03", desc: { en: "12 km of underground throughway. No GPS. Headlights only.",         zh: "12 公里地下通道。无 GPS,仅靠车灯。" },                       mode: { en: "Time Attack",     zh: "极速挑战" } },
  { id: "shekou",   code: "Z-04",  name: { en: "Shekou Harbor",              zh: "蛇口港" },         han: "Z-04", desc: { en: "Container stacks as walls. Crane shadows for cover.",                zh: "集装箱作墙,塔吊投影为障。" },                                mode: { en: "Drift",           zh: "漂移" } },
  { id: "ocean",    code: "Z-05",  name: { en: "Ocean Strip",                zh: "海岸快线" },       han: "Z-05", desc: { en: "Coastal carriageway. 9 km, 4 wide curves, salt spray on tires.",     zh: "海岸专线。9 公里、4 个大弯、轮胎上的盐雾。" },              mode: { en: "Coastal Sprint",  zh: "海岸冲刺" } },
  { id: "rooftops", code: "Z-06",  name: { en: "Rooftop Loop",               zh: "屋顶环" },         han: "Z-06", desc: { en: "Connected skyway across 14 buildings. Glass below, neon above.",     zh: "横跨 14 栋楼的天桥。脚下是玻璃,头上是霓虹。" },               mode: { en: "Time Attack",     zh: "极速挑战" } },
  { id: "huaqiang", code: "Z-07",  name: { en: "Huaqiang Grid",              zh: "华强网格" },       han: "Z-07", desc: { en: "Smart-city intersections. Lights talk to your car. Sometimes they lie.", zh: "智慧城市路网。红绿灯与车通讯——有时它们撒谎。" },          mode: { en: "Team Race",       zh: "团队赛" } },
  { id: "ridge",    code: "Z-08",  name: { en: "Western Ridge",              zh: "西脊山道" },       han: "Z-08", desc: { en: "Mountain switchbacks behind the bay. Storms roll in at 22:00.",       zh: "湾后山道的弯。22:00 雷雨准时滚来。" },                       mode: { en: "Drift · Pursuit", zh: "漂移 · 追逐" } },
];

export type CustomCat = { tag: string; name: Bi; opts: number; example: Bi; accent: string };
export const CUSTOM: CustomCat[] = [
  { tag: "PAINT",   name: { en: "Paint & livery",     zh: "车漆 · 涂装" },   opts: 240, example: { en: "Chameleon flake, bio-luminescent, brushed-titanium", zh: "变色片、生物冷光、拉丝钛" },             accent: "#ff2d8d" },
  { tag: "NEON",    name: { en: "Underglow",           zh: "底光" },           opts: 36,  example: { en: "Single-zone, multi-zone, audio-reactive",            zh: "单区、多区、音频联动" },                  accent: "#00f0ff" },
  { tag: "WHEELS",  name: { en: "Wheels",              zh: "轮毂" },           opts: 64,  example: { en: "Hex-spoke, turbofan, mag-lev disc",                  zh: "六辐、涡扇、磁悬浮盘" },                  accent: "#d8ff3a" },
  { tag: "AERO",    name: { en: "Aero kit",            zh: "空力套件" },       opts: 18,  example: { en: "Active wing, splitter array, vortex generators",      zh: "主动尾翼、分流板组、涡流发生器" },          accent: "#ff2d8d" },
  { tag: "DECAL",   name: { en: "Holo decals",         zh: "全息贴" },         opts: 92,  example: { en: "Sigils, sponsor wraps, your handle in 3D",            zh: "符印、赞助商套色、你的 ID 立体投影" },      accent: "#00f0ff" },
  { tag: "CABIN",   name: { en: "Cabin lighting",      zh: "座舱灯效" },       opts: 22,  example: { en: "Ambient zones, instrument hue, gear-shift flash",     zh: "氛围分区、仪表色调、换挡闪烁" },          accent: "#d8ff3a" },
  { tag: "FX",      name: { en: "Engine FX",           zh: "动力特效" },       opts: 14,  example: { en: "Exhaust plume color, boost shockwave style",          zh: "尾焰颜色、加速冲击波样式" },               accent: "#ff2d8d" },
];

// FAKE leaderboard — clearly fictional usernames + tier labels
export type LBRow = { rank: number; tag: string; pilot: string; vehicle: string; mode: Bi; score: string };
export const LEADERBOARD: LBRow[] = [
  { rank: 1, tag: "APEX",  pilot: "@silent.kage",    vehicle: "VLX-02 KAGE",    mode: { en: "Drift",      zh: "漂移" },     score: "98,420 pts" },
  { rank: 2, tag: "APEX",  pilot: "@phantom_07",     vehicle: "VLX-01 PHANTOM", mode: { en: "Pursuit",    zh: "追逐" },     score: "01:47.832"  },
  { rank: 3, tag: "APEX",  pilot: "@tachy.bay",      vehicle: "VLX-03 TACHYON", mode: { en: "Time Attack",zh: "极速挑战" }, score: "01:48.011"  },
  { rank: 4, tag: "ELITE", pilot: "@grid.dancer",    vehicle: "VLX-04 STRATOS", mode: { en: "Street",     zh: "街头" },     score: "01:49.604"  },
  { rank: 5, tag: "ELITE", pilot: "@nightsong",      vehicle: "VLX-02 KAGE",    mode: { en: "Drift",      zh: "漂移" },     score: "92,300 pts" },
  { rank: 6, tag: "ELITE", pilot: "@lance.threader", vehicle: "VLX-05 LANCE",   mode: { en: "Sprint",     zh: "冲刺" },     score: "06:21.114"  },
  { rank: 7, tag: "PRO",   pilot: "@blue.line",      vehicle: "VLX-06 MONOLITH",mode: { en: "Team",       zh: "团队" },     score: "TEAM W"     },
  { rank: 8, tag: "PRO",   pilot: "@coast.runner",   vehicle: "VLX-01 PHANTOM", mode: { en: "Coastal",    zh: "海岸" },     score: "09:58.402"  },
];

export const RANKS = [
  { tag: "APEX",  range: "TOP 1%",    color: "#ff2d8d" },
  { tag: "ELITE", range: "TOP 5%",    color: "#00f0ff" },
  { tag: "PRO",   range: "TOP 15%",   color: "#d8ff3a" },
  { tag: "RIDER", range: "TOP 50%",   color: "#bcc1d8" },
  { tag: "ROOKIE",range: "ALL",       color: "#727a8e" },
];

// Hero HUD stats — purely cosmetic / fake telemetry
export const HUD = {
  km:    "488 km/h",
  rpm:   "12,400",
  gear:  "7",
  boost: "92%",
  lap:   "01:47.832",
};

// Ticker
export const TICKER: Bi[] = [
  { en: "SHENZHEN BAY VELOCITY · v0.1",    zh: "深圳湾极速 · v0.1" },
  { en: "RAIN INCOMING · 22:00",           zh: "降雨临近 · 22:00" },
  { en: "GRID OPEN · 12 LOBBIES",          zh: "对局开放 · 12 个" },
  { en: "AI TRAFFIC DENSITY: HIGH",        zh: "AI 车流密度:高" },
  { en: "TONIGHT'S CIRCUIT: BRIDGE → FUTIAN", zh: "今晚赛道:大桥 → 福田" },
  { en: "WEATHER: HEAVY MIST · WET ROADS",  zh: "天气:浓雾 · 湿滑路面" },
  { en: "DRONE REPLAYS LIVE",               zh: "无人机回放直播中" },
];
