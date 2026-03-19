"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  Globe,
  BrainCircuit,
  ArrowRight,
  Code2,
  Smartphone,
  Zap,
  Bot,
  Phone,
  Layers,
  Puzzle,
  CalendarCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";
import { useRef, type MouseEvent } from "react";

const pillars = [
  {
    icon: Globe,
    title: "Web & Mobile\nDevelopment",
    description:
      "Pixel-perfect interfaces backed by bulletproof architecture. We ship React, Next.js, and Python-powered apps that load fast, rank high, and turn visitors into customers.",
    href: "/services/web-and-mobile",
    stats: [
      { value: "< 1s", label: "Avg. LCP" },
      { value: "99%", label: "Uptime SLA" },
      { value: "2 wk", label: "Sprint Cycle" },
    ],
    features: [
      { icon: Code2, label: "Next.js & React" },
      { icon: Smartphone, label: "React Native" },
      { icon: Zap, label: "Python APIs" },
    ],
    gradient: "from-brand-blue via-brand-blue/80 to-brand-cyan",
    glowColor: "rgba(2, 169, 247, 0.35)",
    accentColor: "#02A9F7",
  },
  {
    icon: BrainCircuit,
    title: "AI That Works —\nNot Just Demos",
    description:
      "Generative AI, autonomous agents, and voice interfaces that go beyond proof-of-concept. Production AI that cuts costs, automates decisions, and gives your team superpowers.",
    href: "/services/ai-solutions",
    stats: [
      { value: "10+", label: "AI Agents in Production" },
      { value: "< 3 wk", label: "To First Demo" },
      { value: "24/7", label: "Agent Uptime" },
    ],
    features: [
      { icon: Bot, label: "Agentic AI" },
      { icon: Phone, label: "Voice AI" },
      { icon: Layers, label: "RAG Pipelines" },
    ],
    gradient: "from-brand-cyan via-purple-500/80 to-violet-500",
    glowColor: "rgba(6, 182, 212, 0.35)",
    accentColor: "#06b6d4",
  },
];

const alsoDelivering = [
  { icon: Bot, label: "Agentic AI", href: "/services/agentic-ai" },
  { icon: Phone, label: "Voice AI Agents", href: "/services/voice-ai" },
  { icon: Puzzle, label: "Jira Marketplace Apps", href: "/services/jira-apps" },
];

function PillarCard({
  pillar,
}: {
  pillar: (typeof pillars)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const spotlightX = useTransform(smoothX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(smoothY, (v) => `${v * 100}%`);

  function handleMouse(e: MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div {...staggerItem} style={{ perspective: 900 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="group relative rounded-3xl overflow-hidden pillar-card-bg transition-shadow duration-500"
      >
        {/* Top gradient accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${pillar.accentColor}, transparent)`,
          }}
        />

        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x} ${y}, ${pillar.glowColor}, transparent 60%)`
            ),
          }}
        />

        <div className="pillar-card-border absolute inset-0 rounded-3xl pointer-events-none" />

        <Link href={pillar.href} className="block relative">
          <div className="relative p-8 md:p-10 lg:p-12">
            <div className="flex items-center justify-end mb-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg`}>
                <pillar.icon className="w-6 h-6 pillar-icon-white" strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-[1.1] pillar-title-text whitespace-pre-line mb-5">
              {pillar.title}
            </h3>

            <p className="pillar-body-text leading-relaxed max-w-lg mb-10">
              {pillar.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {pillar.stats.map((stat) => (
                <div key={stat.label} className="pillar-stat-card rounded-2xl p-4 text-center">
                  <span className={`block text-xl md:text-2xl font-bold bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                  <span className="pillar-stat-label text-[11px] font-medium tracking-wide uppercase mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {pillar.features.map((feature) => (
                <FeaturePill key={feature.label} icon={feature.icon} label={feature.label} />
              ))}
            </div>

            <div className="flex items-center gap-3 group/cta">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${pillar.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}>
                <ArrowRight className="w-4 h-4 pillar-icon-white group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="pillar-cta-text text-sm font-semibold tracking-wide group-hover:tracking-wider transition-all">
                Explore services
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function FeaturePill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="pillar-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium">
      <Icon className="w-3.5 h-3.5 text-brand-blue" strokeWidth={2} />
      {label}
    </span>
  );
}

function AlsoDeliveringPill({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group/pill pillar-also-pill inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
    >
      <Icon className="w-4 h-4 text-brand-blue flex-shrink-0" strokeWidth={2} />
      <span>{label}</span>
      <ArrowRight className="w-3.5 h-3.5 pillar-also-pill-arrow opacity-0 -translate-x-1 group-hover/pill:opacity-100 group-hover/pill:translate-x-0 transition-all duration-300" />
    </Link>
  );
}

export function ServicesSection() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/[0.04] blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Our Pillars"
          title="Web + AI. One Team. Zero Gaps."
          subtitle="Most agencies do one or the other. We do both — so your product is intelligent from day one, not bolted on later."
        />

        <motion.div
          {...staggerContainer}
          className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.href} pillar={pillar} />
          ))}
        </motion.div>

        {/* Also delivering — styled pill links */}
        <motion.div {...fadeUp} className="mt-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase pillar-also-text mb-5">
            Also delivering
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {alsoDelivering.map((item) => (
              <AlsoDeliveringPill
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
              />
            ))}
          </div>
        </motion.div>

        {/* Conversion strip — lead capture CTA */}
        <motion.div
          {...fadeUp}
          className="mt-20 md:mt-24 pillar-conversion-strip rounded-2xl p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase pillar-conversion-status">
                  Taking new projects
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold pillar-title-text">
                Ready to ship your next product?
              </h3>
              <p className="mt-2 pillar-body-text text-sm max-w-lg">
                Book a free strategy call — we&apos;ll map your idea to a concrete sprint plan in 30 minutes.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <Button href="/contact" size="lg" variant="primary" className="group">
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book a Free Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <span className="flex items-center gap-1.5 text-xs pillar-body-text">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No commitment required
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
