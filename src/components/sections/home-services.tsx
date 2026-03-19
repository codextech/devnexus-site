"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import {
  Globe,
  BrainCircuit,
  ArrowRight,
  Bot,
  Phone,
  Puzzle,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeUp } from "@/lib/animations";
import { useRef } from "react";

/* ── Data ── */

const pillars = [
  {
    icon: Globe,
    title: "Web & Mobile Development",
    headline: "Full-stack apps that convert",
    description:
      "Pixel-perfect interfaces backed by bulletproof architecture. We ship React, Next.js, and Python-powered apps that load fast, rank high, and turn visitors into customers.",
    href: "/services/web-and-mobile",
    image: "/images/section/svc-web-mobile.jpg",
    stats: [
      { value: "< 1s", label: "Avg. LCP" },
      { value: "99%", label: "Uptime SLA" },
      { value: "2 wk", label: "Sprint Cycle" },
    ],
    tags: ["Next.js", "React Native", "Python", "TypeScript"],
    accentColor: "#02A9F7",
  },
  {
    icon: BrainCircuit,
    title: "AI That Works — Not Just Demos",
    headline: "Production AI, not prototypes",
    description:
      "Generative AI, autonomous agents, and voice interfaces that go beyond proof-of-concept. Production AI that cuts costs, automates decisions, and gives your team superpowers.",
    href: "/services/ai-solutions",
    image: "/images/section/svc-ai-solutions.jpg",
    stats: [
      { value: "10+", label: "AI Agents Live" },
      { value: "< 3 wk", label: "To First Demo" },
      { value: "24/7", label: "Agent Uptime" },
    ],
    tags: ["OpenAI", "LangChain", "Voice AI", "RAG"],
    accentColor: "#06b6d4",
  },
];

const alsoDelivering = [
  { icon: Bot, label: "Agentic AI", href: "/services/agentic-ai" },
  { icon: Phone, label: "Voice AI Agents", href: "/services/voice-ai" },
  { icon: Puzzle, label: "Jira Marketplace Apps", href: "/services/jira-apps" },
];

/* ── Component ── */

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/[0.04] blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div {...fadeUp} ref={sectionRef}>
          <div className="svc-wrapper rounded-2xl overflow-hidden">

            {/* ── Row 1: Section heading ── */}
            <div className="svc-cell px-8 py-12 md:px-14 md:py-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
                    Our Pillars
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
                    <span className="svc-heading-primary">Web + AI.</span>{" "}
                    <span className="svc-heading-muted">One Team. Zero Gaps.</span>
                  </h2>
                  <p className="mt-4 text-sm md:text-base svc-subtitle max-w-xl leading-relaxed">
                    Most agencies do one or the other. We do both &mdash; so your product
                    is intelligent from day one, not bolted on later.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0 pb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase svc-status-text">
                    Your team is ready
                  </span>
                </div>
              </div>
            </div>

            {/* ── Row 2: Two service pillars side by side ── */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {pillars.map((pillar, i) => (
                <Link
                  key={pillar.href}
                  href={pillar.href}
                  className={`svc-cell group block ${
                    i === 0 ? "svc-cell-right" : ""
                  }`}
                >
                  <div className="p-7 md:p-10">
                    {/* ── Compact image ── */}
                    <motion.div
                      className="relative rounded-xl overflow-hidden h-[160px] md:h-[180px] mb-7"
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                    >
                      <Image
                        src={pillar.image}
                        alt={pillar.headline}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 svc-image-overlay" />
                      {/* Tags floating on image */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {pillar.tags.map((tag) => (
                          <span key={tag} className="svc-image-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Header: icon + label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center svc-icon-ring"
                        style={{
                          background: `linear-gradient(135deg, ${pillar.accentColor}22, ${pillar.accentColor}08)`,
                          border: `1px solid ${pillar.accentColor}30`,
                        }}
                      >
                        <pillar.icon className="w-4.5 h-4.5 text-brand-blue" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase svc-label-text">
                        {pillar.title}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-bold svc-heading-primary leading-snug mb-3">
                      {pillar.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-sm svc-subtitle leading-relaxed mb-7 max-w-md">
                      {pillar.description}
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {pillar.stats.map((stat) => (
                        <div key={stat.label} className="svc-stat-cell rounded-xl p-3 text-center">
                          <motion.span
                            className="block text-lg md:text-xl font-bold svc-stat-value"
                            initial={{ opacity: 0, filter: "blur(6px)" }}
                            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                            transition={{ delay: 0.3 + i * 0.15, duration: 0.5, type: "spring", stiffness: 150 }}
                          >
                            {stat.value}
                          </motion.span>
                          <span className="svc-stat-label text-[10px] font-medium tracking-wide uppercase mt-0.5 block">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA hint */}
                    <div className="flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs font-semibold text-brand-blue">Explore services</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Row 3: Also delivering ── */}
            <div className="svc-cell px-8 py-6 md:px-14 md:py-7">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase svc-label-muted shrink-0">
                  Also delivering
                </span>
                <div className="h-px flex-1 svc-divider-line hidden sm:block" />
                <div className="flex flex-wrap items-center gap-2">
                  {alsoDelivering.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/pill svc-also-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                    >
                      <item.icon className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" strokeWidth={2} />
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 svc-also-arrow opacity-0 -translate-x-1 group-hover/pill:opacity-100 group-hover/pill:translate-x-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Row 4: CTA strip ── */}
            <div className="svc-cell px-8 py-8 md:px-14 md:py-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold svc-heading-primary leading-snug">
                    Ready to ship your next product?
                  </h3>
                  <p className="mt-1.5 text-sm svc-subtitle max-w-lg">
                    Book a free strategy call &mdash; we&rsquo;ll map your idea to a concrete sprint plan in 30 minutes.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2.5 shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book a Free Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="flex items-center gap-1.5 text-[11px] svc-subtitle">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    No commitment required
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
