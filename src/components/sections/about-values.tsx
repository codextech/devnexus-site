"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Target, Shield, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";

const values = [
  {
    icon: Target,
    title: "Outcomes Over Output",
    description:
      "Every sprint is measured by what it ships to your users — not how many hours we log.",
  },
  {
    icon: Shield,
    title: "No Black Boxes",
    description:
      "Working demos every two weeks. Shared Slack. Full visibility into every decision.",
  },
  {
    icon: Zap,
    title: "Speed Without Shortcuts",
    description:
      "We move fast because we've done this before — not because we skip testing or docs.",
  },
  {
    icon: Heart,
    title: "Built for the Long Run",
    description:
      "Codebases your next hire can understand and your team can maintain.",
  },
];

export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 about-values-bg" />

      <Container className="relative z-10">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
              Our Values
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold about-title leading-tight">
              How We Operate
            </h2>
          </motion.div>

          {/* Values grid — bento style */}
          <div className="about-values-wrapper rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  className={`about-value-cell p-7 md:p-9 group ${
                    i % 2 === 0 ? "about-value-cell-right" : ""
                  } ${i < 2 ? "about-value-cell-bottom" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="w-10 h-10 rounded-xl about-value-icon flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold about-title mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm about-body leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
