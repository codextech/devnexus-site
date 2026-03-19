"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/container";

const stats = [
  { value: "50+", label: "Products shipped" },
  { value: "98%", label: "Client satisfaction" },
  { value: "< 3wk", label: "To first prototype" },
  { value: "0", label: "Account managers" },
];

export function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 about-story-bg" />
      <div className="absolute -left-32 top-1/3 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.03] blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div ref={ref}>
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px w-8 bg-brand-blue" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
              Why We Exist
            </span>
            <div className="h-px flex-1 about-divider-line hidden sm:block" />
          </motion.div>

          {/* Lead statement — big, editorial */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold about-title leading-[1.25] max-w-4xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            We built DevNexus because too many agencies sell senior talent
            and deliver junior work.{" "}
            <span className="about-title-muted">
              The person on your discovery call should be the same person
              writing your code.
            </span>
          </motion.h2>

          {/* Supporting copy — two columns, concise */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mb-16">
            <motion.p
              className="text-sm md:text-base about-body leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              We specialize in two areas &mdash;{" "}
              <span className="about-highlight font-semibold">web &amp; mobile products</span> and{" "}
              <span className="about-highlight font-semibold">AI-powered systems</span> &mdash;
              because depth beats breadth when you&rsquo;re building software
              that needs to work at scale.
            </motion.p>
            <motion.p
              className="text-sm md:text-base about-body leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Our clients range from funded startups launching their first
              product to mid-market companies embedding AI into existing
              operations. The common thread: they need engineering
              leadership, not just engineering labor.
            </motion.p>
          </div>

          {/* Stats bar */}
          <motion.div
            className="about-stats-bar rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.55 + i * 0.08,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 150,
                  }}
                >
                  <p className="text-2xl md:text-3xl font-bold about-stat-value">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-medium about-stat-label mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
