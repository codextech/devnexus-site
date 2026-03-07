import { Hero } from "@/components/blocks/hero";
import { LogoBar } from "@/components/blocks/logo-bar";
import { ServicesSection } from "@/components/sections/home-services";
import { VisualBentoSection } from "@/components/sections/home-visual-bento";
import { EcosystemSection } from "@/components/sections/home-ecosystem";
import { CaseStudiesSection } from "@/components/sections/home-case-studies";
import { SuccessStorySection } from "@/components/sections/home-success-story";
import { ProcessSection } from "@/components/sections/home-process";
import { WhySection } from "@/components/sections/home-why";
import { CTABanner } from "@/components/blocks/cta-banner";
import { websiteSchema, organizationSchema, professionalServiceSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Full-Service Software Development Company | Web, Mobile & AI | DevNexus",
  description:
    "DevNexus is a full-service software development company specializing in JavaScript, Node.js, Python, AI solutions, and mobile apps. From web platforms to agentic AI workflows — we build software that scales.",
  path: "/",
  keywords: [
    "full-service software development company",
    "custom software development agency",
    "web and mobile development company",
    "AI software development agency",
    "Node.js development company",
    "Python development agency",
    "JavaScript development company",
    "agentic AI development",
    "voice AI agent development",
    "Jira app development company",
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
        subtitle="We pair beautiful web & mobile products with intelligent AI — so your business ships faster, scales without friction, and outbuilds the competition."
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

      <VisualBentoSection />

      <ProcessSection />

      <SuccessStorySection />

      <EcosystemSection />

      <CaseStudiesSection />

      {/* <WhySection /> */}

      <CTABanner />
    </>
  );
}
