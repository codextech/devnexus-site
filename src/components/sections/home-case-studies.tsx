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
    slug: "tophealth-patient-intake",
    client: "TopHealth AI",
    industry: "Healthcare",
    services: ["AI Solutions", "Web & Mobile Development"],
    thumbnail: "/images/case-studies/tophealth.png",
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
    title: "Planning Poker & Agile Apps for Jira",
    slug: "agilepulse-jira-apps",
    client: "AgilePulse",
    industry: "Software / Agile Tooling",
    services: ["Jira Apps & Integrations", "Web & Mobile Development"],
    thumbnail: "/images/case-studies/agilepulse.png",
    duration: "12 weeks",
    teamSize: "3 engineers",
    excerpt:
      "Built a suite of Forge-based Jira apps — Planning Poker, Sprint Retros, Async Estimation — certified first try and loved by 3,000+ teams.",
    metrics: [
      { label: "installs across app suite", value: "3,000+" },
      { label: "average user rating", value: "4.7/5.0" },
      { label: "certification rejections", value: "0" },
    ],
    techStack: ["Atlassian Forge", "React", "Node.js"],
    publishedAt: "2025-08-20",
  },
  {
    title: "Autonomous Voice AI Outreach Agent",
    slug: "vapi-voice-ai-outreach-agent",
    client: "DevNexus Internal",
    industry: "AI / Sales Automation",
    services: ["Voice AI Agents", "Agentic AI Workflows"],
    thumbnail: "/images/case-studies/vapi-outreach.png",
    duration: "6 weeks",
    teamSize: "3 engineers",
    excerpt:
      "Built a fully autonomous voice AI agent that conducts outbound research calls, qualifies leads, and handles end-to-end outreach without human intervention.",
    metrics: [
      { label: "outreach calls per day", value: "200+" },
      { label: "qualification accuracy", value: "91%" },
      { label: "time saved vs manual outreach", value: "85%" },
    ],
    techStack: ["Vapi", "OpenAI GPT-4o", "Python", "FastAPI"],
    publishedAt: "2026-01-20",
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
