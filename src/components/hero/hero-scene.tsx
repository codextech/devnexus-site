"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { HeroPoster } from "./hero-poster";

// Lazy, client-only. The poster shows during SSR and while the chunk loads,
// so first paint is never blocked by WebGL.
const NeuralCanvas = dynamic(() => import("./neural-canvas"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

const MOBILE_QUERY = "(pointer: coarse), (max-width: 768px)";

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getMobile() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

// WebGL support doesn't change within a session — compute once and cache so the
// useSyncExternalStore snapshot stays referentially stable across renders.
let webglSupport: boolean | null = null;
function getWebGL() {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noSubscribe = () => () => {};
const serverFalse = () => false;

/**
 * Decides what fills the hero panel:
 *  - reduced-motion / no-WebGL / SSR → static poster (no canvas)
 *  - otherwise → live neural canvas, with a lighter node count on mobile.
 *
 * Inputs are read via hooks / useSyncExternalStore (no setState-in-effect), so
 * it's SSR-safe (server → poster) and re-evaluates if the viewport crosses the
 * mobile breakpoint at runtime.
 */
export function HeroScene() {
  const reduce = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, serverFalse);
  const webglOk = useSyncExternalStore(noSubscribe, getWebGL, serverFalse);

  if (reduce || !webglOk) return <HeroPoster />;
  return <NeuralCanvas count={isMobile ? 80 : 140} />;
}
