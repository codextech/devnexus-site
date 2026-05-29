"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useCountUp } from "@/lib/use-count-up";
import { cn } from "@/lib/utils";

type MetricProps = {
  /** Numeric target that counts up on view, e.g. 3000, 340, 4.7 */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
};

/** Instrument-style readout: big value (counts up) + mono caps label. */
export function Metric({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  size = "md",
  className,
}: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const current = useCountUp(value, inView);
  const display = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-display font-bold leading-none tracking-[-0.02em] tabular-nums text-fg",
          sizeClasses[size],
        )}
      >
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
        {label}
      </span>
    </div>
  );
}
