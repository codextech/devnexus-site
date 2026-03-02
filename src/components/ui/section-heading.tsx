"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      {...fadeUp}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] section-heading-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-dark-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
