import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { ProcessSection } from "@/components/sections/home-process";
import { AboutStory } from "@/components/sections/about-story";
import { AboutValues } from "@/components/sections/about-values";
import { AboutTeam } from "@/components/sections/about-team";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "About DevNexus | Senior Engineers Who Ship Production Software",
  description:
    "DevNexus is a full-service software development company. Senior engineers, transparent process, real results — specializing in JavaScript, Node.js, Python, AI, and Atlassian.",
  path: "/about",
  keywords: [
    "software development company",
    "AI development company",
    "senior software engineers",
    "full-service software agency",
    "JavaScript Node.js Python development",
    "web and mobile development agency",
    "Atlassian development agency",
    "DevNexus team",
  ],
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "About", url: `${SITE.url}/about` },
            ])
          ),
        }}
      />

      <Hero
        eyebrow="About DevNexus"
        title="We're the Engineers Behind the Product"
        subtitle="A focused team of engineers who've shipped products used by millions — and treat yours with the same care."
        primaryCta={{ label: "Work With Us", href: "/contact" }}
      />

      <AboutStory />

      <AboutTeam />

      <AboutValues />

      <ProcessSection />

      <CTABanner
        title="Let's Talk About What You're Building"
        subtitle="30 minutes. No pitch deck. Just a real conversation about your product."
        ctaLabel="Book a Call"
      />
    </>
  );
}
