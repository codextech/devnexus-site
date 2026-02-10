"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const pillars = [
  {
    icon: Globe,
    title: "Web & Mobile Development",
    description:
      "Pixel-perfect interfaces backed by bulletproof architecture. We ship React and Next.js apps that load fast, rank high, and turn visitors into customers — plus cross-platform mobile with React Native.",
    href: "/services/web-and-mobile",
    features: [
      { icon: Code2, label: "Next.js & React" },
      { icon: Smartphone, label: "React Native" },
      { icon: Zap, label: "Performance-first" },
    ],
    gradient: "from-brand-blue/20 to-brand-cyan/10",
    accent: "brand-blue",
  },
  {
    icon: BrainCircuit,
    title: "AI That Works — Not Just Demos",
    description:
      "Generative AI, autonomous agents, and voice interfaces that go beyond proof-of-concept. We build production AI that cuts operational costs, automates decision-making, and gives your team superpowers.",
    href: "/services/ai-solutions",
    features: [
      { icon: Bot, label: "Agentic AI Workflows" },
      { icon: Phone, label: "Voice AI Agents" },
      { icon: Layers, label: "RAG & Automation" },
    ],
    gradient: "from-brand-cyan/20 to-purple-500/10",
    accent: "brand-cyan",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 section-gradient" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="What We Build"
          title="Web + AI. One Team. Zero Gaps."
          subtitle="Most agencies do one or the other. We do both — so your product is intelligent from day one, not bolted on later."
        />

        <motion.div
          {...staggerContainer}
          className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div key={pillar.href} {...staggerItem}>
              <Link
                href={pillar.href}
                className="group block relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Background */}
                <div className="absolute inset-0 glass-card" />
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-8 md:p-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-${pillar.accent}/10 flex items-center justify-center mb-6 group-hover:bg-${pillar.accent}/20 transition-colors`}>
                    <pillar.icon className={`w-7 h-7 text-${pillar.accent}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-dark-400 leading-relaxed mb-8">
                    {pillar.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {pillar.features.map((feature) => (
                      <span
                        key={feature.label}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-dark-300 border border-white/5"
                      >
                        <feature.icon className="w-3.5 h-3.5 text-brand-blue" />
                        {feature.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:gap-3 transition-all">
                    Explore services <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional services link */}
        <motion.div {...fadeUp} className="mt-10 text-center">
          <p className="text-sm text-dark-500">
            Also delivering{" "}
            <Link href="/services/agentic-ai" className="text-dark-300 hover:text-brand-blue transition-colors underline underline-offset-4 decoration-dark-600 hover:decoration-brand-blue">
              Agentic AI
            </Link>
            ,{" "}
            <Link href="/services/voice-ai" className="text-dark-300 hover:text-brand-blue transition-colors underline underline-offset-4 decoration-dark-600 hover:decoration-brand-blue">
              Voice AI Agents
            </Link>
            , and{" "}
            <Link href="/services/jira-apps" className="text-dark-300 hover:text-brand-blue transition-colors underline underline-offset-4 decoration-dark-600 hover:decoration-brand-blue">
              Jira Marketplace Apps
            </Link>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
