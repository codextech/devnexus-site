"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, fadeIn, clipReveal } from "@/lib/animations";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  /** Mono label text, e.g. "SELECTED WORK" */
  eyebrow?: string;
  /** Optional numeric prefix, e.g. "03" */
  index?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.div {...fadeIn} className="mb-5">
          <Eyebrow index={index} label={eyebrow} />
        </motion.div>
      ) : null}
      <motion.h2
        {...clipReveal}
        className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-fg md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          {...fadeUp}
          className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
