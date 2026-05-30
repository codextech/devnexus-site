"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { fadeUp } from "@/lib/animations";

type Props = {
  industry: string;
  services: string[];
  title: string;
  excerpt: string;
  client: string;
  duration: string;
  teamSize: string;
};

/**
 * Case-study hero in the Precision Instrument page-hero language (matches the
 * About / Services / Work heroes), with case-study-specific badges + meta.
 */
export function CaseStudyHero({
  industry,
  services,
  title,
  excerpt,
  client,
  duration,
  teamSize,
}: Props) {
  const tags = [industry, ...services];
  const meta = [
    { label: "Client", value: client },
    { label: "Duration", value: duration },
    { label: "Team", value: teamSize },
  ];

  return (
    <section className="relative overflow-hidden bg-bg pt-32 pb-16 md:pt-40 md:pb-20">
      <BlueprintGrid focus="18% 55%" />
      <Container className="relative z-10">
        <motion.div {...fadeUp} className="max-w-3xl">
          <Eyebrow label="Case study" />

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-fg md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            {excerpt}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  {m.label}
                </dt>
                <dd className="mt-1 text-sm text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </Container>
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </section>
  );
}
