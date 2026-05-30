"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 220, damping: 22, mass: 0.5 };

/**
 * A navigational card that reacts to the cursor: a subtle 3D tilt toward the
 * pointer plus a brand-blue spotlight glow that follows it. Carries the "View"
 * cursor. Tilt/glow are disabled under reduced-motion (and never fire on touch,
 * where there's no pointer move) — the card still works as a plain link.
 */
export function InteractiveCard({
  href,
  className,
  children,
  tilt = 6,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  tilt?: number;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [tilt, -tilt]), SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-tilt, tilt]), SPRING);
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(2,169,247,0.13), transparent 60%)`;

  // Cache the rect on enter so pointermove doesn't force a layout read each frame.
  const rectRef = useRef<DOMRect | null>(null);
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="h-full" style={reduce ? undefined : { perspective: 1100 }}>
      <motion.div
        className="h-full"
        style={
          reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        <Link
          href={href}
          data-cursor="view"
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={reset}
          className={cn("group relative block h-full overflow-hidden", className)}
        >
          {!reduce ? (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: glow }}
            />
          ) : null}
          {children}
        </Link>
      </motion.div>
    </div>
  );
}
