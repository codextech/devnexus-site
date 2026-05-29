"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Globe, BrainCircuit, Bot, Phone, Puzzle, ArrowRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { EASE } from "@/lib/animations";

type Pillar = {
  index: string;
  name: string;
  line: string;
  href: string;
  icon: LucideIcon;
  gets: string[];
  tags: string[];
};

const pillars: Pillar[] = [
  {
    index: "01",
    name: "Web & Mobile Development",
    line: "Software built to ship — owned end-to-end by senior engineers who never go dark.",
    href: "/services/web-and-mobile",
    icon: Globe,
    gets: ["Full-stack web & mobile apps", "APIs & third-party integrations", "Performance & Core Web Vitals"],
    tags: ["Next.js", "React Native", "Node.js"],
  },
  {
    index: "02",
    name: "AI Solutions",
    line: "AI that actually works in production — not demos that fall over on real data.",
    href: "/services/ai-solutions",
    icon: BrainCircuit,
    gets: ["RAG & document intelligence", "Workflow & data automation", "Analytics that drive decisions"],
    tags: ["RAG", "Automation", "Analytics"],
  },
];

const more = [
  { name: "Agentic AI Workflows", line: "Agents that take action, not just chat.", href: "/services/agentic-ai", icon: Bot },
  { name: "Voice AI Agents", line: "Voice agents that sound like your best employee.", href: "/services/voice-ai", icon: Phone },
  { name: "Jira Apps & Integrations", line: "Jira apps that make workflows disappear.", href: "/services/jira-apps", icon: Puzzle },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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
        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {pillars.map((p) => (
            <motion.div key={p.name} variants={item}>
              <Link
                href={p.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-hi"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-blue transition-transform duration-500 group-hover:scale-x-100" />
                <span className="pointer-events-none absolute right-6 top-4 font-display text-6xl font-bold leading-none text-fg/[0.045]">
                  {p.index}
                </span>

                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-border text-blue transition-colors group-hover:border-blue/40">
                  <p.icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.01em] text-fg">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-md text-fg-muted">{p.line}</p>

                <ul className="mt-6 space-y-2.5">
                  {p.gets.map((g) => (
                    <li key={g} className="flex items-center gap-3 text-sm text-fg-muted">
                      <span className="h-px w-3 flex-shrink-0 bg-blue" aria-hidden="true" />
                      {g}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-7">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Indexed rows */}
        <motion.div
          className="mt-5 overflow-hidden rounded-[14px] border border-border bg-surface"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {more.map((m, i) => (
            <motion.div key={m.name} variants={item}>
              <Link
                href={m.href}
                className="group relative flex items-center gap-4 border-t border-border px-6 py-5 transition-colors first:border-t-0 hover:bg-surface-2 md:gap-6 md:px-8"
              >
                <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-blue transition-transform duration-300 group-hover:scale-y-100" />
                <span className="font-mono text-[12px] text-fg-faint transition-colors group-hover:text-blue">
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
        </motion.div>
      </Container>
    </section>
  );
}
