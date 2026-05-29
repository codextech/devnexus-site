"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Metric } from "@/components/ui/metric";
import { Button } from "@/components/ui/button";
import { AgentDiagram } from "@/components/blocks/agent-diagram";
import { fadeUp } from "@/lib/animations";

export function AiLayerSection() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="The AI layer"
          title="Not chatbots. Systems that do the work."
          subtitle="We design agentic systems that plug into your stack — researching, deciding, and acting across your tools, with humans where they matter."
          align="left"
        />

        <motion.div
          {...fadeUp}
          className="mt-12 rounded-[14px] border border-border bg-surface p-8 md:p-12"
        >
          <AgentDiagram />
        </motion.div>

        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="grid grid-cols-3 gap-6 rounded-[14px] border border-border bg-surface px-8 py-7">
            <Metric value={200} suffix="+" label="calls / day" size="sm" />
            <Metric value={91} suffix="%" label="qualification" size="sm" />
            <Metric value={85} suffix="%" label="time saved" size="sm" />
          </div>
          <Button href="/services/agentic-ai" variant="link" className="group/btn px-2 md:px-6">
            See how our agents work
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
