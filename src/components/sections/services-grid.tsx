"use client";

import { motion } from "motion/react";
import { Globe, BrainCircuit, Bot, Phone, Puzzle } from "lucide-react";
import { ServiceCard } from "@/components/blocks/service-card";
import { staggerContainer } from "@/lib/animations";

const allServices = [
  {
    icon: Globe,
    title: "Web & Mobile Development",
    description:
      "Production-grade apps in React, Next.js, and React Native that your users actually want to use.",
    href: "/services/web-and-mobile",
    accent: "blue" as const,
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Custom automation, RAG pipelines, and analytics dashboards that turn your data into decisions.",
    href: "/services/ai-solutions",
    accent: "cyan" as const,
  },
  {
    icon: Bot,
    title: "Agentic AI Workflows",
    description:
      "Autonomous AI agents that handle multi-step processes so your team can focus on strategy.",
    href: "/services/agentic-ai",
    accent: "violet" as const,
  },
  {
    icon: Phone,
    title: "Voice AI Agents",
    description:
      "Conversational voice interfaces that replace hold music with instant resolution.",
    href: "/services/voice-ai",
    accent: "emerald" as const,
  },
  {
    icon: Puzzle,
    title: "Jira Apps & Integrations",
    description:
      "Atlassian Marketplace apps and custom integrations that make your workflows disappear.",
    href: "/services/jira-apps",
    accent: "amber" as const,
  },
];

export function ServicesGrid() {
  return (
    <motion.div
      {...staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
    >
      {allServices.map((service) => (
        <ServiceCard key={service.href} {...service} />
      ))}
    </motion.div>
  );
}
