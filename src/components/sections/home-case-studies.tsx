"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/blocks/case-study-card";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import type { CaseStudyMeta } from "@/types/content";

const featuredStudies: CaseStudyMeta[] = [
  {
    title: "AI-Powered Patient Intake System",
    slug: "healthbridge-patient-intake",
    client: "HealthBridge",
    industry: "Healthcare",
    services: ["AI Solutions", "Web & Mobile Development"],
    thumbnail: "/images/case-studies/healthbridge.png",
    duration: "14 weeks",
    teamSize: "4 engineers",
    excerpt:
      "Reduced patient intake time by 68% across 23 urgent care clinics with AI-powered insurance card extraction.",
    metrics: [
      { label: "reduction in intake time", value: "68%" },
      { label: "data extraction accuracy", value: "94%" },
      { label: "annual savings", value: "$340K" },
    ],
    techStack: ["Next.js", "Python", "OpenAI", "HL7 FHIR"],
    publishedAt: "2025-03-15",
  },
  {
    title: "Agentic AI for Freight Dispatch",
    slug: "logitrack-freight-dispatch",
    client: "LogiTrack",
    industry: "Logistics",
    services: ["Agentic AI Workflows", "Voice AI Agents"],
    thumbnail: "/images/case-studies/logitrack.png",
    duration: "18 weeks",
    teamSize: "5 engineers",
    excerpt:
      "3.2x increase in loads dispatched per dispatcher with autonomous AI agents and voice check calls.",
    metrics: [
      { label: "increase in loads/dispatcher", value: "3.2x" },
      { label: "reduction in carrier rates", value: "22%" },
      { label: "check calls automated", value: "91%" },
    ],
    techStack: ["LangGraph", "Vapi", "Node.js", "Python"],
    publishedAt: "2025-06-01",
  },
  {
    title: "Jira Test Management App",
    slug: "nexaform-jira-test-management",
    client: "Nexaform",
    industry: "Software / DevOps",
    services: ["Jira Apps & Integrations", "Web & Mobile Development"],
    thumbnail: "/images/case-studies/nexaform.png",
    duration: "12 weeks",
    teamSize: "3 engineers",
    excerpt:
      "Built and launched a Forge-based Jira app achieving 1,200+ installations in 90 days.",
    metrics: [
      { label: "installs in 90 days", value: "1,200+" },
      { label: "average user rating", value: "4.6/5.0" },
      { label: "certification rejections", value: "0" },
    ],
    techStack: ["Atlassian Forge", "React", "Node.js"],
    publishedAt: "2025-08-20",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="absolute inset-0 section-gradient-bottom" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Proof, Not Promises"
          title="The Work Speaks for Itself"
          subtitle="Every engagement ships with measurable outcomes. Here's what that looks like."
        />

        <motion.div
          {...staggerContainer}
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button href="/work" variant="outline">
            View All Case Studies
          </Button>
        </div>
      </Container>
    </section>
  );
}
