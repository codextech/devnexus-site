"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Metric } from "@/components/ui/metric";
import { fadeUp, clipReveal } from "@/lib/animations";

const stats = [
  { value: 50, suffix: "+", label: "products shipped" },
  { value: 98, suffix: "%", label: "client satisfaction" },
  { value: 3, prefix: "<", suffix: "wk", label: "to first prototype" },
  { value: 0, label: "account managers" },
];

export function AboutStory() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <Container>
        <motion.div {...fadeUp} className="mb-10">
          <Eyebrow label="Why we exist" />
        </motion.div>

        <motion.h2
          {...clipReveal}
          className="mb-8 max-w-4xl font-display text-2xl font-bold leading-[1.25] tracking-[-0.02em] text-fg md:text-3xl lg:text-4xl"
        >
          We built DevNexus because too many agencies sell senior talent and
          deliver junior work.{" "}
          <span className="text-fg-faint">
            The person on your discovery call should be the same person writing
            your code.
          </span>
        </motion.h2>

        <div className="mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <motion.p {...fadeUp} className="leading-relaxed text-fg-muted">
            We specialize in two areas —{" "}
            <span className="font-medium text-fg">web &amp; mobile products</span>{" "}
            and <span className="font-medium text-fg">AI-powered systems</span> —
            because depth beats breadth when you&rsquo;re building software that
            needs to work at scale.
          </motion.p>
          <motion.p {...fadeUp} className="leading-relaxed text-fg-muted">
            Our clients range from funded startups launching their first product
            to mid-market companies embedding AI into existing operations. The
            common thread: they need engineering leadership, not just engineering
            labor.
          </motion.p>
        </div>

        {/* Stats — instrument readouts */}
        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 gap-8 rounded-[14px] border border-border bg-surface p-8 md:grid-cols-4 md:p-10"
        >
          {stats.map((s) => (
            <Metric
              key={s.label}
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              label={s.label}
              size="md"
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
