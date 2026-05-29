"use client";

import { motion } from "motion/react";
import { Target, Shield, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

const values = [
  { icon: Target, title: "Outcomes over output", description: "Every sprint is measured by what it ships to your users — not how many hours we log." },
  { icon: Shield, title: "No black boxes", description: "Working demos every two weeks. Shared Slack. Full visibility into every decision." },
  { icon: Zap, title: "Speed without shortcuts", description: "We move fast because we've done this before — not because we skip testing or docs." },
  { icon: Heart, title: "Built for the long run", description: "Codebases your next hire can understand and your team can maintain." },
];

const cellBorder = [
  "border-b border-border md:border-r",
  "border-b border-border",
  "border-b border-border md:border-r md:border-b-0",
  "",
];

export function AboutValues() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <Container>
        <motion.div {...fadeUp} className="mb-12 text-center">
          <div className="mb-5 flex justify-center">
            <Eyebrow label="Our values" />
          </div>
          <h2 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-fg md:text-3xl lg:text-4xl">
            How we operate
          </h2>
        </motion.div>

        <div className="overflow-hidden rounded-[14px] border border-border bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                className={cn("group p-7 md:p-9", cellBorder[i])}
              >
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-blue transition-colors group-hover:border-blue/40">
                  <item.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-lg font-bold text-fg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
