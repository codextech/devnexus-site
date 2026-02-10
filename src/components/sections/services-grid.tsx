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
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Custom automation, RAG pipelines, and analytics dashboards that turn your data into decisions.",
    href: "/services/ai-solutions",
  },
  {
    icon: Bot,
    title: "Agentic AI Workflows",
    description:
      "Autonomous AI agents that handle multi-step processes so your team can focus on strategy.",
    href: "/services/agentic-ai",
  },
  {
    icon: Phone,
    title: "Voice AI Agents",
    description:
      "Conversational voice interfaces that replace hold music with instant resolution.",
    href: "/services/voice-ai",
  },
  {
    icon: Puzzle,
    title: "Jira Apps & Integrations",
    description:
      "Atlassian Marketplace apps and custom integrations that make your workflows disappear.",
    href: "/services/jira-apps",
  },
];

export function ServicesGrid() {
  return (
    <motion.div
      {...staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {allServices.map((service) => (
        <ServiceCard key={service.href} {...service} />
      ))}
    </motion.div>
  );
}
