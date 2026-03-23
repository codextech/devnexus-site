import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { Container } from "@/components/ui/container";
import { ServicesGrid } from "@/components/sections/services-grid";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Software Development Services | Web, Mobile, AI & Jira",
  description:
    "Web & mobile development, AI solutions, agentic workflows, voice AI agents, and Jira integrations. Five practice areas, one team.",
  path: "/services",
  keywords: [
    "software development services",
    "AI development agency",
    "web and mobile development company",
    "agentic AI workflows",
    "Jira app development",
    "voice AI development",
    "custom software development",
    "Next.js React development agency",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Services", url: `${SITE.url}/services` },
            ])
          ),
        }}
      />

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
