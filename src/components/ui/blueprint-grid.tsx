"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";

type BlueprintGridProps = {
  className?: string;
  /** Grid cell size in px. */
  size?: number;
  /** Radial mask focus, e.g. "50% 35%". */
  focus?: string;
};

/**
 * Signature backdrop: a faint ruler grid that draws in once on mount and
 * fades at the edges via a radial mask. Decorative, non-interactive.
 * Place as the first child of a `relative` section; keep content above it.
 */
export function BlueprintGrid({
  className,
  size = 48,
  focus = "50% 35%",
}: BlueprintGridProps) {
  const reduce = useReducedMotion();
  const mask = `radial-gradient(ellipse 78% 72% at ${focus}, #000 28%, transparent 82%)`;

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </motion.div>
  );
}
