"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** Accepted for compatibility; cards are monochrome blue on-brand. */
  accent?: string;
  className?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const spotlight = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(2,169,247,0.12), transparent 70%)`,
  );

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }

  return (
    <motion.div {...staggerItem} ref={ref} onMouseMove={onMove}>
      <Link
        href={href}
        className={cn(
          "group relative block h-full overflow-hidden rounded-[14px] border border-border bg-surface p-6 transition-colors hover:border-border-hi md:p-8",
          className,
        )}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        <div className="relative">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[12px] border border-border text-blue transition-colors group-hover:border-blue/40">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="font-display text-lg font-bold text-fg">{title}</h3>
          <p className="mb-4 mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-blue transition-all group-hover:gap-3">
            Learn more <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
