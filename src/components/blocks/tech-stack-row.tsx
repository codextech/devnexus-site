"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";

type TechStackRowProps = {
  items: string[];
};

export function TechStackRow({ items }: TechStackRowProps) {
  return (
    <motion.div {...fadeUp} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant="neutral">
          {item}
        </Badge>
      ))}
    </motion.div>
  );
}
