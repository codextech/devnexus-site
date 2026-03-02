"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { useRef } from "react";

type Accent = "blue" | "cyan" | "violet" | "emerald" | "amber";

const accentMap: Record<
  Accent,
  { icon: string; glow: string; border: string; bg: string }
> = {
  blue: {
    icon: "text-brand-blue",
    glow: "rgba(2,169,247,0.35)",
    border: "rgba(2,169,247,0.25)",
    bg: "rgba(2,169,247,0.10)",
  },
  cyan: {
    icon: "text-brand-cyan",
    glow: "rgba(6,182,212,0.35)",
    border: "rgba(6,182,212,0.25)",
    bg: "rgba(6,182,212,0.10)",
  },
  violet: {
    icon: "text-violet-400",
    glow: "rgba(139,92,246,0.35)",
    border: "rgba(139,92,246,0.25)",
    bg: "rgba(139,92,246,0.10)",
  },
  emerald: {
    icon: "text-emerald-400",
    glow: "rgba(52,211,153,0.35)",
    border: "rgba(52,211,153,0.25)",
    bg: "rgba(52,211,153,0.10)",
  },
  amber: {
    icon: "text-amber-400",
    glow: "rgba(251,191,36,0.30)",
    border: "rgba(251,191,36,0.22)",
    bg: "rgba(251,191,36,0.08)",
  },
};

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accent?: Accent;
  className?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  accent = "blue",
  className,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const colors = accentMap[accent];

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, ${colors.glow}, transparent 70%)`
  );

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div {...staggerItem} ref={ref} onMouseMove={handleMouseMove}>
      <Link
        href={href}
        className={cn(
          "group relative block rounded-2xl p-px overflow-hidden transition-all duration-300 hover:scale-[1.02]",
          className
        )}
      >
        {/* Gradient border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlightBg }}
        />
        <div
          className="absolute inset-0 rounded-2xl service-card-border"
          style={
            {
              "--sc-border": colors.border,
              "--sc-glow": colors.glow,
            } as React.CSSProperties
          }
        />

        {/* Card body */}
        <div className="relative rounded-[15px] p-6 md:p-8 service-card-bg h-full">
          {/* Top accent line */}
          <div
            className="absolute top-0 left-6 right-6 h-px opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
            }}
          />

          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
            style={{ background: colors.bg }}
          >
            <Icon className={cn("w-6 h-6", colors.icon)} />
          </div>

          <h3 className="text-lg font-semibold mb-2 service-card-title">
            {title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 service-card-desc">
            {description}
          </p>

          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all",
              colors.icon
            )}
          >
            Learn more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
