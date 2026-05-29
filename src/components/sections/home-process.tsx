"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp } from "@/lib/animations";

const steps = [
  {
    title: "Discovery",
    desc: "We map scope, architecture, and a fixed plan — in week one.",
    badge: "Week 1",
  },
  {
    title: "Build",
    desc: "Two-week sprints with working demos you can touch. No black boxes.",
    badge: "Weekly demos",
  },
  {
    title: "Launch",
    desc: "We ship to production — documented, tested, and monitored.",
    badge: "Go-live",
  },
  {
    title: "Maintain",
    desc: "We own it and evolve it — features, monitoring, and support.",
    badge: "Ongoing",
  },
];

export function ProcessSection() {
  return (
    <section className="border-t border-border bg-bg py-24 md:py-32">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="How we work"
          title="Senior engineers. Weekly demos. No black boxes."
          align="left"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fadeUp}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em] text-fg">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
              <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
                {s.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
