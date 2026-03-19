"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Globe, BrainCircuit, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeUp } from "@/lib/animations";

const showcaseCards = [
  {
    label: "Web & Mobile",
    title: "Full-stack apps that convert",
    body: "React, Next.js, React Native, Python — pixel-perfect UIs backed by bulletproof APIs.",
    image: "/images/section/bento-web-mobile.jpg",
    href: "/services/web-and-mobile",
    icon: Globe,
    tags: ["Next.js", "React Native", "Python"],
  },
  {
    label: "AI & Automation",
    title: "Production AI, not demos",
    body: "Voice agents, agentic workflows, RAG pipelines — intelligence that ships and scales.",
    image: "/images/section/bento-ai-solutions.jpg",
    href: "/services/ai-solutions",
    icon: BrainCircuit,
    tags: ["LLM Agents", "Voice AI", "RAG"],
  },
  {
    label: "Your Team",
    title: "Senior engineers, start to ship",
    body: "The same expert you meet is the one who builds your product. No hand-offs, no juniors.",
    image: "/images/section/bento-team.jpg",
    href: "/about",
    icon: Users,
    tags: ["Dedicated Team", "Full Stack", "24/7 Async"],
  },
];

const stats = [
  { value: "50+", label: "Products shipped" },
  { value: "< 3wk", label: "To first prototype" },
  { value: "99%", label: "Client satisfaction" },
  { value: "24/7", label: "Async communication" },
];

export function VisualBentoSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/30" />

      <Container className="relative z-10">
        <motion.div {...fadeUp}>
          {/* ── Bento wrapper — single cohesive block ── */}
          <div className="bento-wrapper rounded-2xl overflow-hidden">

            {/* ── Row 1: Section heading ── */}
            <div className="bento-cell px-8 py-12 md:px-14 md:py-16 text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
                What We Build
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
                <span className="bento-heading-primary">Shipped fast.</span>{" "}
                <span className="bento-heading-muted">Built to last.</span>
              </h2>
              <p className="mt-4 text-sm md:text-base bento-subtitle max-w-xl mx-auto leading-relaxed">
                Full-stack web, mobile, and AI &mdash; built by senior engineers
                who ship every sprint.
              </p>
            </div>

            {/* ── Row 2: Three showcase image cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {showcaseCards.map((card, i) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className={`bento-cell group relative overflow-hidden h-[300px] md:h-[340px] block ${
                    i < showcaseCards.length - 1 ? "bento-cell-right" : ""
                  }`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bento-image-overlay" />
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-center gap-2 mb-2.5">
                      <card.icon className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/50">
                        {card.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/55 mt-1.5 leading-relaxed line-clamp-2">
                      {card.body}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {card.tags.map((tag) => (
                        <span key={tag} className="bento-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Hover arrow */}
                    <div className="mt-3 flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs font-semibold text-brand-blue">Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Row 3: Testimonial strip ── */}
            <div className="bento-cell px-8 py-8 md:px-14 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <span className="text-3xl md:text-4xl font-bold bento-quote-mark leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-base md:text-lg font-medium bento-quote-text leading-relaxed -mt-2">
                  Speed of execution is critical for scaling startups. DevNexus
                  rebuilt our entire platform in 8 weeks &mdash; build times went from
                  months of planning to live demos every sprint.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold bento-quote-author">
                    Founder
                  </p>
                  <p className="text-xs bento-quote-company font-medium">
                    TopHealth AI
                  </p>
                </div>
                <Link
                  href="/work"
                  className="w-10 h-10 rounded-full bento-arrow-btn flex items-center justify-center group"
                >
                  <ArrowRight className="w-4 h-4 bento-arrow-icon group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* ── Row 4: Stats + CTA ── */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Stats — 2 cols on desktop */}
              <div className="bento-cell bento-cell-right p-6 md:p-8 md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl md:text-3xl font-bold bento-stat-value">
                        {stat.value}
                      </p>
                      <p className="text-[11px] font-medium bento-stat-label mt-1 uppercase tracking-wide">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA — 1 col on desktop */}
              <div className="bento-cell p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold bento-heading-primary leading-snug">
                  Get started with
                  <br />
                  DevNexus.
                </h3>
                <p className="text-sm bento-subtitle mt-2">
                  One conversation is all it takes.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-brand-blue hover:gap-3 transition-all group"
                >
                  Book a free call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
