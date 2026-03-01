import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { ServicePageContent } from "@/components/sections/service-page-content";
import { getServiceBySlug } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

const service = getServiceBySlug("voice-ai")!;

export const metadata: Metadata = createMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/voice-ai",
  keywords: [
    "voice AI agent development",
    "conversational AI development company",
    "IVR AI replacement",
    "voice bot development services",
    "ElevenLabs integration agency",
    "Twilio voice AI development",
    "custom voice agent development",
    "AI phone agent development",
  ],
});

export default function VoiceAIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.name,
              description: service.metaDescription,
              url: `${SITE.url}/services/voice-ai`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(service.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Services", url: `${SITE.url}/services` },
              { name: service.name, url: `${SITE.url}/services/voice-ai` },
            ])
          ),
        }}
      />

      <Hero
        eyebrow={service.name}
        title={service.headline}
        subtitle={service.tagline}
        primaryCta={{ label: service.cta, href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/work" }}
      />

      <ServicePageContent service={service} />

      <CTABanner title="Ready to Build a Voice AI Agent?" ctaLabel={service.cta} />
    </>
  );
}
