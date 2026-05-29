"use client";

import { type MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";

const disabled = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches);

/**
 * Cursor-aware "magnetic" pull for a single element (the primary CTA).
 * No-op under prefers-reduced-motion or on coarse/touch pointers.
 * Spread `onMouseMove`/`onMouseLeave` and bind `x`/`y` to a motion
 * element's `style`. Reads `e.currentTarget`, so no ref is needed.
 */
export function useMagnetic(strength = 6) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 250, damping: 18, mass: 0.4 };
  const xSpring = useSpring(x, spring);
  const ySpring = useSpring(y, spring);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (disabled()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const clamp = (v: number) => Math.max(-1, Math.min(1, v)) * strength;
    x.set(clamp(relX));
    y.set(clamp(relY));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: xSpring, y: ySpring, onMouseMove, onMouseLeave };
}
