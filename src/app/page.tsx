import { Hero } from "@/components/blocks/hero";
import { LogoRow } from "@/components/blocks/logo-row";
import { ServicesSection } from "@/components/sections/home-services";
import { AiLayerSection } from "@/components/sections/home-ai-layer";
import { SelectedWorkCinematic } from "@/components/sections/home-selected-work-cinematic";
import { ProcessSection } from "@/components/sections/home-process";
import { CTABanner } from "@/components/blocks/cta-banner";
import { websiteSchema, organizationSchema, professionalServiceSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Full-Service Software Development Company | Web, Mobile & AI",
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
        eyebrow="SOFTWARE & AI ENGINEERING STUDIO"
        title="Software that thinks. Shipped every week."
        highlightWord="Shipped"
        subtitle="We pair production-grade web & mobile engineering with AI that actually works — agents, voice, and automation that move real metrics. Senior team, weekly demos, no black boxes."
        primaryCta={{ label: "Book a strategy call", href: "/contact" }}
        secondaryCta={{ label: "See selected work", href: "/work" }}
        proofStats={[
          { value: 3000, suffix: "+", label: "installs shipped" },
          { value: 340, prefix: "$", suffix: "K", label: "/ yr saved" },
          { value: 200, suffix: "+", label: "calls / day" },
          { value: 4.7, decimals: 1, suffix: "★", label: "avg rating" },
        ]}
      />

      <LogoRow />

      <ServicesSection />

      <AiLayerSection />

      <SelectedWorkCinematic />

      <ProcessSection />

      <CTABanner />
    </>
  );
}
