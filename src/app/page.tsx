import { Hero } from "@/components/blocks/hero";
import { LogoBar } from "@/components/blocks/logo-bar";
import { ServicesSection } from "@/components/sections/home-services";
import { EcosystemSection } from "@/components/sections/home-ecosystem";
import { CaseStudiesSection } from "@/components/sections/home-case-studies";
import { ProcessSection } from "@/components/sections/home-process";
import { WhySection } from "@/components/sections/home-why";
import { CTABanner } from "@/components/blocks/cta-banner";
import { websiteSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema()),
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

      {/* <CaseStudiesSection /> */}

      <ProcessSection />

      <WhySection />

      <CTABanner />
    </>
  );
}
