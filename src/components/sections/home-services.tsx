"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Globe, BrainCircuit, Bot, Phone, Puzzle, ArrowRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { fadeUp } from "@/lib/animations";

type Pillar = {
  name: string;
  line: string;
  href: string;
  icon: LucideIcon;
  tags: string[];
};

const pillars: Pillar[] = [
  {
    name: "Web & Mobile Development",
    line: "Software built to ship — web, mobile & APIs, owned end-to-end by senior engineers.",
    href: "/services/web-and-mobile",
    icon: Globe,
    tags: ["Next.js", "React Native", "Node.js"],
  },
  {
    name: "AI Solutions",
    line: "AI that actually works in production — RAG, automation, and analytics that move metrics.",
    href: "/services/ai-solutions",
    icon: BrainCircuit,
    tags: ["RAG", "Automation", "Analytics"],
  },
];

const more = [
  { name: "Agentic AI Workflows", line: "Agents that take action, not just chat.", href: "/services/agentic-ai", icon: Bot },
  { name: "Voice AI Agents", line: "Voice agents that sound like your best employee.", href: "/services/voice-ai", icon: Phone },
  { name: "Jira Apps & Integrations", line: "Jira apps that make workflows disappear.", href: "/services/jira-apps", icon: Puzzle },
];

export function ServicesSection() {
  return (
    <section className="bg-bg py-24 md:py-32">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="What we do"
          title="Web + AI. One team. Zero gaps."
          subtitle="Most agencies do one or the other. We engineer the product and the intelligence inside it — so nothing falls between teams."
          align="left"
        />

        {/* Hero pillars */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map((p) => (
            <motion.div key={p.name} {...fadeUp}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-[14px] border border-border bg-surface p-8 transition-colors hover:border-border-hi"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-blue">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-fg-faint opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.01em] text-fg">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-md text-fg-muted">{p.line}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Indexed rows */}
        <div className="mt-5 overflow-hidden rounded-[14px] border border-border bg-surface">
          {more.map((m, i) => (
            <motion.div key={m.name} {...fadeUp}>
              <Link
                href={m.href}
                className="group flex items-center gap-4 border-t border-border px-6 py-5 transition-colors first:border-t-0 hover:bg-surface-2 md:gap-6 md:px-8"
              >
                <span className="font-mono text-[12px] text-fg-faint">
                  {String(i + 3).padStart(2, "0")}
                </span>
                <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] border border-border text-fg-muted transition-colors group-hover:border-border-hi group-hover:text-blue">
                  <m.icon className="h-4 w-4" />
                </span>
                <span className="flex flex-1 flex-col md:flex-row md:items-baseline md:gap-4">
                  <span className="font-display text-lg font-medium text-fg">{m.name}</span>
                  <span className="text-sm text-fg-muted">{m.line}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-blue" />
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
