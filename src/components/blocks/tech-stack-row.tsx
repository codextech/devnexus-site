"use client";

import { motion } from "motion/react";
import { Tag } from "@/components/ui/tag";
import { fadeUp } from "@/lib/animations";

export function TechStackRow({ items }: { items: string[] }) {
  return (
    <motion.div {...fadeUp} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </motion.div>
  );
}
