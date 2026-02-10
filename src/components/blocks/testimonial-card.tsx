"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <motion.blockquote
      {...fadeUp}
      className="p-8 rounded-2xl glass-card"
    >
      <p className="text-base md:text-lg text-dark-300 leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-6">
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-sm text-dark-500">
          {role}, {company}
        </p>
      </footer>
    </motion.blockquote>
  );
}
