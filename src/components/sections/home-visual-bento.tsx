"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Brain, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { value: "50+", label: "Products shipped" },
  { value: "< 3wk", label: "To first prototype" },
  { value: "100%", label: "Sprint demos delivered" },
];

export function VisualBentoSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900/30" />

      <Container className="relative z-10">
        {/* Heading */}
        <motion.div {...fadeUp} className="mb-10 md:mb-14">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-blue mb-3">
            What We Build
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl section-heading-text">
            Shipped fast.{" "}
            <span className="text-dark-400">Built to last.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5"
        >
          {/* ── Card 1: Product UI — large hero ── */}
          <motion.div
            {...staggerItem}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden h-72 md:h-[420px] lg:h-[460px] group"
          >
            <Image
              src="/images/section/Gemini_Generated_Image_1rdlmj1rdlmj1rdl.png"
              alt="Web and mobile product UI"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bento-img-overlay" />
            <div className="absolute top-0 right-0 w-56 h-56 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
              <p className="bento-card-label">Web & Mobile</p>
              <h3 className="bento-card-image-title">
                Interfaces your users
                <br className="hidden md:block" /> actually want to use.
              </h3>
              <p className="bento-card-image-body mt-2 max-w-sm hidden md:block">
                From pixel-perfect UIs to rock-solid APIs — we own the full
                stack.
              </p>
            </div>
          </motion.div>

          {/* ── Card 2: AI capability ── */}
          <motion.div
            {...staggerItem}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 lg:h-[460px] bento-ai-card"
          >
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bento-ai-grid" />

            <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
              <div className="bento-ai-icon-ring mb-5">
                <Brain className="w-5 h-5 text-brand-blue" />
              </div>
              <p className="bento-card-label">AI & Automation</p>
              <h3 className="bento-ai-title mt-1 mb-3">
                Intelligence built in,
                <br /> not bolted on.
              </h3>
              <p className="bento-ai-body">
                Voice agents, agentic workflows, LLM integrations —
                production-grade AI that ships and scales.
              </p>
              <div className="mt-auto pt-5 flex flex-wrap gap-2">
                {["LLM Agents", "Voice AI", "RAG", "Automation"].map((tag) => (
                  <span key={tag} className="bento-ai-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: Team image ── */}
          <motion.div
            {...staggerItem}
            className="lg:col-span-4 relative rounded-2xl overflow-hidden h-64 lg:h-[340px] group"
          >
            <Image
              src="/images/section/Gemini_Generated_Image_be37jtbe37jtbe37.png"
              alt="Senior DevNexus engineer"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bento-img-overlay" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="bento-card-label">Senior Engineers</p>
              <p className="bento-card-image-title text-base md:text-lg font-semibold">
                The same expert you meet is the one who ships your product.
              </p>
            </div>
          </motion.div>

          {/* ── Card 4: Track record / stats ── */}
          <motion.div
            {...staggerItem}
            className="lg:col-span-5 glass-card rounded-2xl p-7 md:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="bento-card-label-alt">Track Record</p>
              <p className="bento-stats-body mt-2">
                From wireframe to production — full-stack delivery with speed,
                clarity, and zero hand-off friction.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 bento-stats-divider">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="bento-stat-value">{stat.value}</p>
                  <p className="bento-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 5: Speed / process ── */}
          <motion.div
            {...staggerItem}
            className="lg:col-span-3 bento-speed-card rounded-2xl p-6 md:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="bento-ai-icon-ring mb-4">
                <Zap className="w-5 h-5 text-brand-blue" />
              </div>
              <p className="bento-speed-title">
                Ship faster than your roadmap.
              </p>
              <p className="bento-speed-body mt-2">
                Tight sprints. Daily async updates. Live previews from day one.
              </p>
            </div>
            <ul className="mt-6 space-y-2.5">
              {[
                "Discovery → Spec in 48h",
                "MVP in 3 weeks",
                "Iterates on feedback daily",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                  <p className="bento-speed-item">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
