"use client";

import { use3DCapabilities } from "@/components/three/use-3d-capabilities";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { SelectedWorkSection } from "@/components/sections/home-selected-work";

/**
 * Selected-work centerpiece.
 *  - desktop + motion-allowed + WebGL → the full-screen, scroll-pinned cinematic
 *    showcase (GSAP timeline kept in sync with Lenis).
 *  - reduced-motion / no-WebGL / SSR → the static card section (real content,
 *    SEO-friendly, no scroll hijack). This is also the first-paint render, so
 *    there's no hydration mismatch — the cinematic swaps in after hydration and
 *    the layout shift happens below the fold on load.
 */
export function SelectedWorkCinematic() {
  const { enabled } = use3DCapabilities();
  if (!enabled) return <SelectedWorkSection />;
  return <CinematicHero />;
}
