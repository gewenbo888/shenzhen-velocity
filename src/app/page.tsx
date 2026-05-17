"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Modes from "@/components/Modes";
import Garage from "@/components/Garage";
import Customization from "@/components/Customization";
import MapZones from "@/components/MapZones";
import Online from "@/components/Online";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Background = dynamic(() => import("@/components/Background"), { ssr: false });

export default function Page() {
  return (
    <LanguageProvider>
      <Background />
      <Nav />
      <main className="relative">
        <Hero />
        <Ticker />
        <Modes />
        <Garage />
        <Customization />
        <MapZones />
        <Online />
        <CTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
