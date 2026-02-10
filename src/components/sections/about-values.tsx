"use client";

import { motion } from "motion/react";
import { Target, Shield, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const values = [
  {
    icon: Target,
    title: "Outcomes Over Output",
    description:
      "We don't bill for busy work. Every sprint is measured by what it ships to your users — not how many hours we log.",
  },
  {
    icon: Shield,
    title: "No Black Boxes",
    description:
      "You get a working demo every two weeks, a shared Slack channel, and full visibility into every architectural decision.",
  },
  {
    icon: Zap,
    title: "Speed Without Shortcuts",
    description:
      "We move fast because we've done this before — not because we skip testing, security, or documentation.",
  },
  {
    icon: Heart,
    title: "Built for the Long Run",
    description:
      "We're not optimizing for a quick handoff. We build codebases your next hire can understand and your team can maintain.",
  },
];

export function AboutValues() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative border-y border-white/5">
      <div className="absolute inset-0 bg-dark-900/30" />
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Our Values"
          title="How We Operate"
          subtitle="Four principles that show up in every line of code, every client call, and every deadline."
        />

        <motion.div
          {...staggerContainer}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {values.map((item) => (
            <motion.div
              key={item.title}
              {...staggerItem}
              className="flex gap-4 p-6 rounded-2xl glass-card"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-dark-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
