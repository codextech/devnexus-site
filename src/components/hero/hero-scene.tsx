"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HeroPoster } from "./hero-poster";

// Lazy, client-only. The poster shows during SSR and while the chunk loads,
// so first paint is never blocked by WebGL.
const NeuralCanvas = dynamic(() => import("./neural-canvas"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Decides what fills the hero panel:
 *  - reduced-motion / no-WebGL / SSR → static poster (no canvas)
 *  - otherwise → live neural canvas, with a lighter node count on mobile.
 */
export function HeroScene() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(140);

  useEffect(() => {
    if (reduce) {
      setEnabled(false);
      return;
    }
    const mobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    setCount(mobile ? 80 : 140);
    setEnabled(hasWebGL());
  }, [reduce]);

  if (!enabled) return <HeroPoster />;
  return <NeuralCanvas count={count} />;
}
