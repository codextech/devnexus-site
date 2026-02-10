"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStep } from "@/components/blocks/process-step";
import { staggerContainer } from "@/lib/animations";

const steps = [
  {
    title: "Discovery",
    description:
      "We start by understanding your business, your users, and the outcome you need — not just the feature list.",
  },
  {
    title: "Architecture",
    description:
      "We design the system before writing code. The right foundation now saves six figures later.",
  },
  {
    title: "Build & Ship",
    description:
      "Two-week sprints with working demos every cycle. You see progress, not slide decks.",
  },
  {
    title: "Scale & Support",
    description:
      "We launch it, monitor it, and iterate. Your growth is our growth.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 md:py-32 relative border-t border-white/5">
      <div className="absolute inset-0 bg-dark-900/30" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From First Call to First Users — Fast"
          subtitle="A battle-tested process that turns ambiguity into shipped product."
        />

        <motion.div
          {...staggerContainer}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
        >
          {steps.map((step, i) => (
            <ProcessStep
              key={step.title}
              number={i + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
