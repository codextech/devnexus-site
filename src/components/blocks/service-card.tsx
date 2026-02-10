"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  className,
}: ServiceCardProps) {
  return (
    <motion.div {...staggerItem}>
      <Link
        href={href}
        className={cn(
          "group block p-6 md:p-8 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02]",
          className
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5 group-hover:bg-brand-blue/20 transition-colors">
          <Icon className="w-6 h-6 text-brand-blue" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-dark-400 leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue group-hover:gap-3 transition-all">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}
