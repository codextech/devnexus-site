import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { Container } from "@/components/ui/container";
import { ServicesGrid } from "@/components/sections/services-grid";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services | DevNexus",
  description:
    "Web & mobile development, AI solutions, agentic workflows, voice AI agents, and Jira integrations. Five practice areas, one team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Our Services"
        title="What We Build"
        subtitle="Five practice areas. One team. From prototype to production — we cover the full stack of modern software."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
      />

      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          <ServicesGrid />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
