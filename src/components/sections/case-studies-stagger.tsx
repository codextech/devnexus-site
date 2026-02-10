"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";

export function CaseStudiesStagger({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      {...staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {children}
    </motion.div>
  );
}
