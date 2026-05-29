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
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ["9deg", "-9deg"]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ["-11deg", "11deg"]), spring);
  // subtle counter-parallax for the layer behind the panel
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], ["10px", "-10px"]), spring);
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], ["10px", "-10px"]), spring);

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
      style={{ perspective: 1300 }}
    >
      {/* focal glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 58% 55% at 55% 42%, rgba(2,169,247,0.28) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* parallax blueprint layer behind */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 -z-[1] rounded-[24px]"
        style={{
          x: bgX,
          y: bgY,
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
        }}
      />

      {/* entrance */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
      >
        {/* gentle float */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* tilt */}
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
            {/* 3D render panel */}
            <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface shadow-2xl shadow-black/50">
              {/* glass inner highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-[20px]"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.12)" }}
              />
              <div className="relative aspect-[5/6]">
                <Image
                  src="/images/hero/hero-3d.jpg"
                  alt="DevNexus — software and AI engineering"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                />
                {/* sheen + bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue/10 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent" />
                {/* mono caption */}
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg/80">
                    Production systems
                  </span>
                </div>
              </div>
            </div>

            {/* floating metric card */}
            <div className="absolute -bottom-6 -left-5 sm:-left-9" style={{ transform: "translateZ(70px)" }}>
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-[12px] border border-border bg-surface/90 px-5 py-4 shadow-xl shadow-black/40 backdrop-blur"
              >
                <Metric value={99.9} decimals={1} suffix="%" label="uptime" size="sm" />
              </motion.div>
            </div>

            {/* status chip */}
            <div className="absolute -top-4 right-3 sm:right-6" style={{ transform: "translateZ(55px)" }}>
              <motion.div
                animate={reduce ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-1.5 shadow-lg shadow-black/30 backdrop-blur"
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

            {/* small proof chip */}
            <div className="absolute -right-4 bottom-10 hidden sm:block" style={{ transform: "translateZ(40px)" }}>
              <motion.div
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="rounded-[10px] border border-border bg-surface/90 px-3.5 py-2.5 shadow-lg shadow-black/30 backdrop-blur"
              >
                <Metric value={200} suffix="+" label="calls / day" size="sm" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
