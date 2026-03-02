"use client";

import { motion } from "motion/react";
import { Users, Layers, Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const differentiators = [
  {
    icon: Users,
    title: "Your Team, Not a Black Box",
    description:
      "The people on the discovery call are the people writing your code. One team, direct access, full accountability.",
  },
  {
    icon: Layers,
    title: "Web + AI in One Team",
    description:
      "Most agencies outsource the AI piece. We build both — one codebase, one communication channel, zero friction.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "You see every sprint, every demo, every dollar. Working software every two weeks — not status updates.",
  },
];

export function WhySection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-dark-900/30" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="The DevNexus Difference"
          title="Your Last Agency Switch"
          subtitle="We've heard the horror stories. Here's why teams land here and stay."
        />

        <motion.div
          {...staggerContainer}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              {...staggerItem}
              className="text-center p-8 rounded-2xl glass-card group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-blue/20 transition-colors">
                <item.icon className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-dark-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
