import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const TITLE_EN = "Shenzhen Bay Velocity · Cyberpunk Racing Concept";
const TITLE_ZH = "深圳湾极速 · 赛博朋克竞速概念";
const DESC =
  "A bilingual cinematic landing-page concept for a fictional AAA street-racing game set across Shenzhen Bay — six vehicles, seven race modes, eight zones, full HUD chrome.";

export const metadata: Metadata = {
  metadataBase: new URL("https://shenzhen-velocity.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "shenzhen", "racing", "cyberpunk", "concept site", "AAA racing landing",
    "hypercar", "street racing", "drift", "neon", "cyberpunk city",
    "深圳湾", "极速", "赛博朋克", "电动超跑", "霓虹", "概念站",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    title: TITLE_EN,
    description: "Eight zones. Six vehicles. Seven modes. One coastline, drawn entirely at 200 km/h.",
    url: "https://shenzhen-velocity.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_EN,
    description: "深圳湾极速 — extreme racing across the future coastline.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#02030a" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org", "@type": "WebSite",
              name: TITLE_EN, alternateName: TITLE_ZH, description: DESC,
              url: "https://shenzhen-velocity.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author:    { "@type": "Person",       name: "Gewenbo",  url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-void text-ash">
        {children}
        <Script
          src="https://analytics-dashboard-two-blue.vercel.app/tracker.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
