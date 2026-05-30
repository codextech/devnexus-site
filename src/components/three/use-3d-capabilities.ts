"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

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
 * Shared gate for decorative 3D scenes. `enabled` is false on the server, under
 * reduced-motion, and where WebGL is unavailable — callers render a static
 * fallback in those cases. `isMobile` re-evaluates if the viewport crosses the
 * mobile breakpoint, so scenes can scale their detail down. No setState-in-effect.
 */
export function use3DCapabilities() {
  const reduce = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, serverFalse);
  const webglOk = useSyncExternalStore(noSubscribe, getWebGL, serverFalse);
  return { enabled: !reduce && webglOk, isMobile };
}
