"use client";

import Image from "next/image";
import { type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Metric } from "@/components/ui/metric";
import { EASE } from "@/lib/animations";

const spring = { stiffness: 150, damping: 18, mass: 0.4 };

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ["7deg", "-7deg"]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ["-9deg", "9deg"]), spring);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: 1200 }}
    >
      {/* soft focal glow — the hero's single accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-12 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 60% 40%, rgba(2,169,247,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* entrance */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      >
        {/* tilt */}
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          {/* product window */}
          <div className="overflow-hidden rounded-[16px] border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full border border-border-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-border-hi" />
              <span className="h-2.5 w-2.5 rounded-full border border-border-hi" />
              <span className="ml-3 font-mono text-[11px] tracking-[0.04em] text-fg-faint">
                devnexus.co — production
              </span>
            </div>
            <div className="relative aspect-[16/11]">
              <Image
                src="/images/hero/dashboard.jpg"
                alt="DevNexus-built product dashboard in production"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
            </div>
          </div>

          {/* floating metric card */}
          <div className="absolute -bottom-6 -left-5 sm:-left-8" style={{ transform: "translateZ(60px)" }}>
            <motion.div
              animate={reduce ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[12px] border border-border bg-surface/90 px-5 py-4 shadow-xl shadow-black/30 backdrop-blur"
            >
              <Metric value={99.9} decimals={1} suffix="%" label="uptime" size="sm" />
            </motion.div>
          </div>

          {/* status chip */}
          <div className="absolute -top-4 right-4 sm:right-6" style={{ transform: "translateZ(40px)" }}>
            <motion.div
              animate={reduce ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-1.5 shadow-lg shadow-black/20 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                ) : null}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
                Shipping weekly
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
