"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Globe, BrainCircuit, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

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
        {/* Heading */}
        <motion.div {...fadeUp} className="mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-blue mb-3">
            What We Build
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl section-heading-text">
            Shipped fast.{" "}
            <span className="text-dark-400">Built to last.</span>
          </h2>
        </motion.div>

        {/* Showcase grid — 3 clean cards */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {showcaseCards.map((card) => (
            <motion.div key={card.href} {...staggerItem}>
              <Link
                href={card.href}
                className="group block relative rounded-2xl overflow-hidden h-[420px] md:h-[480px] bento-showcase-card"
              >
                {/* Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bento-showcase-overlay" />

                {/* Content pinned to bottom — frosted glass panel */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 flex flex-col bento-showcase-glass">
                  {/* Icon + label */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bento-showcase-icon-ring">
                      <card.icon className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                    </div>
                    <span className="bento-card-label mb-0">{card.label}</span>
                  </div>

                  {/* Title */}
                  <h3 className="bento-card-image-title text-xl md:text-2xl font-bold leading-snug">
                    {card.title}
                  </h3>

                  {/* Body */}
                  <p className="bento-card-image-body mt-2 text-sm leading-relaxed">
                    {card.body}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {card.tags.map((tag) => (
                      <span key={tag} className="bento-showcase-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-5 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-semibold text-brand-blue">
                      Learn more
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-blue group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip — clean horizontal bar */}
        <motion.div
          {...fadeUp}
          className="mt-10 md:mt-14 bento-stats-strip rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i < stats.length - 1 ? "bento-stats-strip-divider" : ""}`}
              >
                <p className="bento-stat-value text-2xl md:text-3xl">{stat.value}</p>
                <p className="bento-stat-label mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
