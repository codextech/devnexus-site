"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";

type PillarContentSectionProps = {
  title: string;
  intro: string;
  topicClusters: Array<{ title: string; description: string }>;
  relatedLinks: Array<{ href: string; label: string }>;
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
      className="group relative overflow-hidden rounded-[14px] border border-border bg-surface p-6 transition-colors hover:border-border-hi md:p-7"
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: EASE }}
    >
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-blue transition-transform duration-500 group-hover:scale-x-100" />
      <div className="mb-3 flex items-start gap-4">
        <span className="shrink-0 select-none font-display text-3xl font-bold leading-none text-fg/[0.08] md:text-4xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="pt-1 font-display text-base font-bold leading-snug text-fg md:text-lg">
          {cluster.title}
        </h3>
      </div>
      <div className="pl-[calc(2.5rem+1rem)]">
        <p
          className={cn(
            "text-sm leading-relaxed text-fg-muted transition-all duration-300",
            !expanded && "line-clamp-2",
          )}
        >
          {cluster.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-blue transition-colors hover:text-blue-press"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", expanded && "rotate-180")} />
        </button>
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
    <section className="border-t border-border bg-bg py-20 md:py-28">
      <Container>
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12"
          >
            <div className="mb-5">
              <Eyebrow label="Deep dive" />
            </div>
            <h2 className="max-w-3xl font-display text-xl font-bold leading-tight tracking-[-0.02em] text-fg md:text-2xl">
              {title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted line-clamp-2">
              {intro}
            </p>
          </motion.div>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {topicClusters.map((cluster, i) => (
              <ClusterCard key={cluster.title} cluster={cluster} index={i} isInView={isInView} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.4, ease: EASE }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="mr-2 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
              Related
            </span>
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-muted transition-colors hover:border-border-hi hover:text-fg"
              >
                {item.label}
                <ArrowRight className="h-3 w-3 -translate-x-1 text-blue opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
