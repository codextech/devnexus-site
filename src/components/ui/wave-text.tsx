"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface WaveTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function WaveText({ text, className, charClassName }: WaveTextProps) {
  return (
    <motion.span
      className={cn("inline-block cursor-pointer", className)}
      whileHover="hover"
      initial="initial"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={cn("inline-block", charClassName)}
          style={char === " " ? { width: "0.3em" } : undefined}
          variants={{
            initial: {
              y: 0,
              scale: 1,
            },
            hover: {
              y: -4,
              scale: 1.1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.03,
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
