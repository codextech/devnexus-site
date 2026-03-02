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

        <div className="p-6">
          <Badge variant="blue">{study.industry}</Badge>
          <h3 className="mt-3 text-lg font-semibold group-hover:text-brand-blue transition-colors">
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
