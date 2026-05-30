"use client";

import { motion } from "motion/react";
import { ArrowRight, Search, ShieldCheck, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Metric } from "@/components/ui/metric";
import { Button } from "@/components/ui/button";
import { AgentCore } from "@/components/ai-layer/agent-core";
import { fadeUp } from "@/lib/animations";

const capabilities = [
  { icon: Search, title: "Researches", line: "Pulls context across your CRM, docs, and databases." },
  { icon: ShieldCheck, title: "Decides", line: "Acts within guardrails — approval gates on anything risky." },
  { icon: Workflow, title: "Acts & escalates", line: "Completes multi-step work, hands off to humans when it should." },
];

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

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          {/* Live 3D agent core (falls back to the labeled flow diagram) */}
          <motion.div
            {...fadeUp}
            className="flex items-center justify-center rounded-[14px] border border-border bg-surface p-8 md:p-12"
          >
            <AgentCore />
          </motion.div>

          {/* Capabilities + proof */}
          <motion.div
            {...fadeUp}
            className="flex flex-col justify-between gap-8 rounded-[14px] border border-border bg-surface p-8 md:p-10"
          >
            <ul className="space-y-5">
              {capabilities.map((c) => (
                <li key={c.title} className="flex gap-4">
                  <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-border text-blue">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-medium text-fg">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-fg-muted">{c.line}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-5 border-t border-border pt-6">
              <Metric value={200} suffix="+" label="calls / day" size="sm" />
              <Metric value={91} suffix="%" label="qualified" size="sm" />
              <Metric value={85} suffix="%" label="time saved" size="sm" />
            </div>

            <Button href="/services/agentic-ai" variant="link" className="group/btn px-0 text-[15px]">
              See how our agents work
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
