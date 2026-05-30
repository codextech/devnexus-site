"use client";

import dynamic from "next/dynamic";
import { use3DCapabilities } from "@/components/three/use-3d-capabilities";
import { HeroPoster } from "./hero-poster";

// Lazy, client-only. The poster shows during SSR and while the chunk loads,
// so first paint is never blocked by WebGL.
const NeuralCanvas = dynamic(() => import("./neural-canvas"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

/**
 * Decides what fills the hero panel:
 *  - reduced-motion / no-WebGL / SSR → static poster (no canvas)
 *  - otherwise → live neural canvas, with a lighter node count on mobile.
 */
export function HeroScene() {
  const { enabled, isMobile } = use3DCapabilities();

  if (!enabled) return <HeroPoster />;
  return <NeuralCanvas count={isMobile ? 80 : 140} />;
}
