"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <motion.div
      {...fadeUp}
      className={cn("text-center p-6", className)}
    >
      <p className="text-4xl md:text-5xl font-bold gradient-text font-[family-name:var(--font-geist-mono)]">
        {value}
      </p>
      <p className="mt-2 text-sm text-dark-400">{label}</p>
    </motion.div>
  );
}
