import type { Bi } from "@/components/LanguageProvider";

export const COPY = {
  brand: { en: "SHENZHEN VELOCITY", zh: "深圳湾极速" },
  brandSub: { en: "VLX · concept landing", zh: "VLX · 概念站" },

  navLinks: [
    { id: "hero",    label: { en: "00 / HERO",    zh: "00 / 首屏" } },
    { id: "modes",   label: { en: "01 / MODES",   zh: "01 / 模式" } },
    { id: "garage",  label: { en: "02 / GARAGE",  zh: "02 / 车库" } },
    { id: "custom",  label: { en: "03 / CUSTOM",  zh: "03 / 改装" } },
    { id: "map",     label: { en: "04 / MAP",     zh: "04 / 地图" } },
    { id: "online",  label: { en: "05 / ONLINE",  zh: "05 / 联机" } },
  ] as { id: string; label: Bi }[],

  hero: {
    tagline: { en: "EXTREME RACING ACROSS THE FUTURE COASTLINE", zh: "未来海岸线上的极限竞速" },
    titleEn: "Shenzhen Bay Velocity",
    titleZh: "深圳湾极速",
    sub: {
      en: "Eight zones. Six vehicles. Seven modes. One coastline, drawn entirely at 200 km/h. The new street-racing operating system for the bay.",
      zh: "八个区,六种车,七种模式。整条海岸,以 200 km/h 的速度被重新画过。湾区街头竞速的新操作系统。",
    },
    cta:    { en: "START RACING",  zh: "开始竞速" },
    cta2:   { en: "OPEN GARAGE",   zh: "进入车库" },
    next:   { en: "NEXT EVENT", zh: "下一场" },
    eventName: { en: "Bridge Run · Friday 22:00", zh: "大桥之夜 · 周五 22:00" },
  },

  conceptBadge: {
    en: "CONCEPT LANDING · NOT A SHIPPING PRODUCT",
    zh: "概念站点 · 非真实在售产品",
  },

  modes: {
    eyebrow: { en: "01 / RACE MODES", zh: "01 / 赛事模式" },
    titleA:  { en: "Seven ways to ",  zh: "七种" },
    titleAcc:{ en: "burn the city",   zh: "燃烧城市" },
    titleB:  { en: ".",               zh: "的方式。" },
    sub: {
      en: "From a single closed-block sprint to a season-long ladder. Pick the loadout, pick the weather, pick the lane.",
      zh: "从一段封街冲刺,到整赛季的阶梯。挑装备、挑天气、挑车道。",
    },
    fields: {
      rules:    { en: "RULES",    zh: "规则" },
      vehicles: { en: "VEHICLES", zh: "车辆" },
      duration: { en: "DURATION", zh: "时长" },
      diff:     { en: "DIFFICULTY", zh: "难度" },
    },
  },

  garage: {
    eyebrow: { en: "02 / GARAGE", zh: "02 / 车库" },
    titleA:  { en: "Six chassis. ", zh: "六种底盘," },
    titleAcc:{ en: "infinite trim", zh: "无限改装" },
    titleB:  { en: ".",             zh: "。" },
    sub: {
      en: "Every chassis is a different philosophy. The Phantom thinks in efficiency. The Kage thinks in slip angle. The Stratos refuses to touch the ground.",
      zh: "每一种底盘,都是一种哲学。幻影想着效率,影想着打滑角,平流根本不肯碰地面。",
    },
    fields: {
      klass:   { en: "CLASS",     zh: "级别" },
      origin:  { en: "ORIGIN",    zh: "产地" },
      drive:   { en: "DRIVETRAIN",zh: "驱动" },
      top:     { en: "TOP SPEED", zh: "极速" },
      zh100:   { en: "0–100 KM/H", zh: "0–100 km/h" },
      handling:{ en: "HANDLING",  zh: "操控" },
      drift:   { en: "DRIFT",     zh: "漂移" },
      stockNote:{ en: "Stock spec — tune as you please.",  zh: "原厂数据——任你调校。" },
    },
  },

  custom: {
    eyebrow: { en: "03 / CUSTOMIZATION", zh: "03 / 改装系统" },
    titleA:  { en: "Make it ",      zh: "把它做到" },
    titleAcc:{ en: "unmistakable",  zh: "一眼认出" },
    titleB:  { en: ".",             zh: "。" },
    sub: {
      en: "Seven categories, hundreds of options. Walk into a lobby and the rest of the grid will know it's you before you reach the line.",
      zh: "七大门类,数百种选项。进入大厅时,其他车手在你到达起跑线之前,就知道这是你。",
    },
    optionsLabel: { en: "OPTIONS",  zh: "选项" },
    sampleLabel:  { en: "SAMPLE",   zh: "示例" },
  },

  map: {
    eyebrow: { en: "04 / THE MAP", zh: "04 / 赛区地图" },
    titleA:  { en: "Eight zones. ",      zh: "八个区。" },
    titleAcc:{ en: "One coastline.",     zh: "一条海岸线。" },
    titleB:  { en: "",                   zh: "" },
    sub: {
      en: "From the suspended deck of the bay bridge to the rain-soaked rooftops above Futian. Each zone has its own weather, its own crowd, its own house rule.",
      zh: "从海湾大桥的悬空桥面,到雨中的福田屋顶。每个区有自己的天气、自己的观众、自己的家法。",
    },
    fields: {
      mode: { en: "BEST MODE", zh: "推荐模式" },
    },
  },

  online: {
    eyebrow: { en: "05 / ONLINE & RANKED", zh: "05 / 联机 · 积分赛" },
    titleA:  { en: "Earn a tier. ",        zh: "争一个段位," },
    titleAcc:{ en: "Defend it.",           zh: "守一个段位。" },
    titleB:  { en: "",                     zh: "" },
    sub: {
      en: "Five tiers, weekly decay, season resets every 12 weeks. Replays and leaderboards are public; reputations are not.",
      zh: "五个段位,每周衰减,每 12 周赛季重置。回放与榜单公开;名声不公开。",
    },
    lbHead:    { en: "LIVE LEADERBOARD · GLOBAL", zh: "实时榜 · 全球" },
    tierHead:  { en: "RANKED TIERS",              zh: "积分段位" },
    cols: {
      rank:     { en: "RANK",    zh: "排名" },
      pilot:    { en: "PILOT",   zh: "车手" },
      vehicle:  { en: "VEHICLE", zh: "车辆" },
      mode:     { en: "MODE",    zh: "模式" },
      score:    { en: "RESULT",  zh: "成绩" },
    },
    fictional: {
      en: "All pilots, vehicles, and scores on this page are fictional. Concept-only.",
      zh: "本页所有车手、车辆与成绩均为虚构。仅为概念。",
    },
  },

  // CTA strip near bottom
  cta: {
    eyebrow: { en: "READY?", zh: "准备好了?" },
    title: { en: "Pick a chassis. Pick a zone. Drive.", zh: "选一辆车。选一个区。出发。" },
    primary: { en: "START RACING", zh: "开始竞速" },
    secondary: { en: "OPEN GARAGE", zh: "进入车库" },
    note: {
      en: "Buttons here are visual — this is a concept landing page, not a playable client.",
      zh: "按钮仅作视觉演示——本站是概念页,非可玩客户端。",
    },
  },

  footer: {
    discNote: {
      en: "Shenzhen Bay Velocity is a fictional racing-game concept built as a landing-page design study. No real game, vehicles, leaderboards, or tournaments exist behind this site. Not affiliated with any real automaker, league, or municipality.",
      zh: "《深圳湾极速》是一个虚构的赛车游戏概念,作为登陆页设计练习而制作。本站背后并不存在真实的游戏、车辆、榜单或赛事。与任何真实的车厂、联赛或城市机构无关。",
    },
  },
};
