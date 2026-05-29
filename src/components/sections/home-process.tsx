"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE } from "@/lib/animations";

const steps = [
  { title: "Discovery", desc: "Scope & architecture — locked in week one.", badge: "Week 1" },
  { title: "Build", desc: "Two-week sprints. Demos you can touch.", badge: "Weekly demos" },
  { title: "Launch", desc: "Shipped to production — tested & monitored.", badge: "Go-live" },
  { title: "Maintain", desc: "We own it and evolve it over time.", badge: "Ongoing" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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

        <div className="relative mt-16">
          {/* Horizontal track (desktop) */}
          <div className="absolute left-0 right-0 top-[21px] hidden h-px bg-border md:block" aria-hidden="true" />
          <motion.div
            className="absolute left-0 right-0 top-[21px] hidden h-px origin-left bg-gradient-to-r from-blue to-blue/30 md:block"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          />

          <motion.div
            className="grid gap-12 md:grid-cols-4 md:gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={item} className="relative flex flex-col">
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg">
                  <span className="font-mono text-sm font-medium text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.01em] text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
                <span className="mt-4 inline-block w-fit rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                  {s.badge}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
