"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { staggerItem } from "@/lib/animations";
import type { CaseStudyMeta } from "@/types/content";

type CaseStudyCardProps = {
  study: CaseStudyMeta;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <motion.div {...staggerItem}>
      <Link
        href={`/work/${study.slug}`}
        className="group block rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:scale-[1.02]"
      >
        {/* Thumbnail placeholder */}
        <div className="aspect-[16/10] bg-gradient-to-br from-brand-navy to-dark-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-brand-blue/10 transition-colors" />
          <span className="text-dark-500 text-sm font-medium relative z-10">
            {study.client}
          </span>
        </div>

        <div className="p-6">
          <Badge variant="blue">{study.industry}</Badge>
          <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-brand-blue transition-colors">
            {study.title}
          </h3>
          {study.metrics[0] && (
            <p className="mt-2 text-sm font-medium text-brand-blue font-[family-name:var(--font-geist-mono)]">
              {study.metrics[0].value} {study.metrics[0].label}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-dark-400 group-hover:text-brand-blue group-hover:gap-3 transition-all">
            Read case study <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
