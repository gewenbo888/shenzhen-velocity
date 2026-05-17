import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLAY · Shenzhen Bay Velocity",
  description: "Endless-runner prototype — dodge obstacles down the Shenzhen Bay highway. Arrow keys to steer, Space to boost.",
};

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
