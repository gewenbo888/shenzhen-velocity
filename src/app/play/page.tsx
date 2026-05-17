"use client";

import dynamic from "next/dynamic";
import { LanguageProvider } from "@/components/LanguageProvider";

const Game = dynamic(() => import("@/components/play/Game"), { ssr: false });

export default function PlayPage() {
  return (
    <LanguageProvider>
      <main
        className="fixed inset-0 bg-void overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <Game />
      </main>
    </LanguageProvider>
  );
}
