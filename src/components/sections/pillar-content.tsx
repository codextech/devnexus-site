"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PillarContentSectionProps = {
  title: string;
  intro: string;
  topicClusters: Array<{
    title: string;
    description: string;
  }>;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

function ClusterCard({
  cluster,
  index,
  isInView,
}: {
  cluster: { title: string; description: string };
  index: number;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      className="svc-cluster-card rounded-2xl overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.15 + index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-blue/30 via-brand-blue/10 to-transparent" />

      <div className="p-6 md:p-7">
        {/* Number + Title */}
        <div className="flex items-start gap-4 mb-3">
          <span className="text-3xl md:text-4xl font-bold text-brand-blue/20 leading-none select-none shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-base md:text-lg font-bold svc-pg-title leading-snug pt-1">
            {cluster.title}
          </h3>
        </div>

        {/* Description — truncated with expand */}
        <div className="pl-[calc(2.5rem+1rem)]">
          <p
            className={cn(
              "text-sm svc-pg-muted leading-relaxed transition-all duration-300",
              !expanded && "line-clamp-2"
            )}
          >
            {cluster.description}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors cursor-pointer"
          >
            {expanded ? "Show less" : "Read more"}
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function PillarContentSection({
  title,
  intro,
  topicClusters,
  relatedLinks,
}: PillarContentSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 svc-pg-alt-bg" />
      <div className="absolute -right-20 top-0 w-[400px] h-[400px] rounded-full bg-brand-blue/[0.03] blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div ref={ref}>
          {/* Header — compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-brand-blue" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
                Deep Dive
              </span>
              <div className="h-px flex-1 pillar-divider-line hidden sm:block" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold svc-pg-title leading-tight max-w-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm svc-pg-muted leading-relaxed max-w-2xl line-clamp-2">
              {intro}
            </p>
          </motion.div>

          {/* Topic clusters — 2x2 grid with large numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {topicClusters.map((cluster, i) => (
              <ClusterCard
                key={cluster.title}
                cluster={cluster}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Related links — inline with label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase svc-pg-muted mr-2 shrink-0">
              Related
            </span>
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group svc-related-link inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300"
              >
                {item.label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-blue" />
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
