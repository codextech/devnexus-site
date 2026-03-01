import { Hero } from "@/components/blocks/hero";
import { LogoBar } from "@/components/blocks/logo-bar";
import { ServicesSection } from "@/components/sections/home-services";
import { EcosystemSection } from "@/components/sections/home-ecosystem";
import { CaseStudiesSection } from "@/components/sections/home-case-studies";
import { ProcessSection } from "@/components/sections/home-process";
import { WhySection } from "@/components/sections/home-why";
import { CTABanner } from "@/components/blocks/cta-banner";
import { websiteSchema, organizationSchema, professionalServiceSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "AI Software Development Agency | Web, Mobile & AI | DevNexus",
  description:
    "DevNexus is an AI-first software development agency. We build Next.js web apps, React Native mobile apps, agentic AI workflows, voice AI agents, and Jira integrations — for funded startups and enterprises.",
  path: "/",
  keywords: [
    "AI software development agency",
    "web development agency",
    "Next.js development agency",
    "agentic AI development",
    "voice AI agent development",
    "Jira app development company",
    "custom software development Pakistan",
    "React Native mobile app development",
    "LLM integration agency",
    "AI automation company",
  ],
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema()),
        }}
      />

      <Hero
        variant="homepage"
        eyebrow="Web + AI Agency"
        title="Software That Thinks. Interfaces That Convert."
        highlightWord="Thinks."
        subtitle="We pair beautiful web & mobile products with intelligent AI — so your business doesn't just keep up, it pulls ahead."
        primaryCta={{ label: "Start Your Project", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
        socialProof={[
          "Trusted by funded startups & enterprises",
          "Transparent weekly demos",
          "From idea to launch in weeks",
        ]}
      />

      <LogoBar />

      <ServicesSection />

      <EcosystemSection />

      <CaseStudiesSection />

      <ProcessSection />

      <WhySection />

      <CTABanner />
    </>
  );
}
