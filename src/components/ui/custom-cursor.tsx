"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  CURSOR_LABELS,
  CURSOR_RING_SIZE,
  isCursorVariant,
  type CursorVariant,
} from "@/lib/cursor";

// Elements that trigger the "interactive" cursor even without an explicit
// data-cursor attribute.
const INTERACTIVE =
  "[data-cursor], a, button, [role='button'], input, textarea, select, label";

// The custom cursor is enabled only on desktop fine-pointer devices when the
// user hasn't requested reduced motion. Read via useSyncExternalStore so it is
// SSR-safe (server snapshot → false) and responds live if the user changes
// either setting (plugs in a mouse, toggles reduced motion).
const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToCapabilities(onChange: () => void) {
  const fine = window.matchMedia(FINE_POINTER);
  const reduced = window.matchMedia(REDUCED_MOTION);
  fine.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
  };
}

function getCursorEnabled() {
  return (
    window.matchMedia(FINE_POINTER).matches &&
    !window.matchMedia(REDUCED_MOTION).matches
  );
}

export function CustomCursor() {
  const active = useSyncExternalStore(
    subscribeToCapabilities,
    getCursorEnabled,
    () => false
  );
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  // Raw pointer position — the dot tracks this instantly.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // The ring lags behind with spring physics.
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  // Hide the native pointer only while the custom cursor is active. Cleanup
  // restores it if the user switches to reduced motion / a coarse pointer.
  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("cursor-active");
    return () => document.documentElement.classList.remove("cursor-active");
  }, [active]);

  // Track pointer movement, hover intent, and window enter/leave via delegation.
  useEffect(() => {
    if (!active) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (!el) {
        setVariant("default");
        return;
      }
      const explicit = el.getAttribute("data-cursor");
      setVariant(isCursorVariant(explicit) ? explicit : "link");
    };
    // relatedTarget === null means the pointer left the window entirely.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [active, x, y]);

  if (!active) return null;

  const label = CURSOR_LABELS[variant];
  const ringSize = CURSOR_RING_SIZE[variant];

  return (
    <>
      {/* Dot — tracks instantly. Centered via negative margins so motion's
          transform isn't fighting a Tailwind translate utility. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-blue"
        style={{ x, y, marginLeft: -3, marginTop: -3 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Ring — lags with spring; grows + shows a label on interactive targets.
          Size and the recentering margins animate together so it always stays
          centered on the pointer while growing/shrinking. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-blue text-blue"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          opacity: { type: "tween", duration: 0.2 },
        }}
      >
        {label ? (
          <motion.span
            key={variant}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="font-mono text-[10px] uppercase tracking-[0.12em]"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </>
  );
}
