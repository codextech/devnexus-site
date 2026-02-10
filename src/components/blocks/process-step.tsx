"use client";

import { motion } from "motion/react";
import { staggerItem } from "@/lib/animations";

type ProcessStepProps = {
  number: number;
  title: string;
  description: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <motion.div {...staggerItem} className="relative flex gap-4 md:block md:text-center group">
      {/* Number circle */}
      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-sm md:mx-auto group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
        {number}
      </div>
      <div className="md:mt-5">
        <h3 className="text-base md:text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="mt-1 md:mt-2 text-sm text-dark-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
