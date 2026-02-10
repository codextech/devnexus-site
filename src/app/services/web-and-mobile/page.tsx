import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { ServicePageContent } from "@/components/sections/service-page-content";
import { getServiceBySlug } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

const service = getServiceBySlug("web-and-mobile")!;

export const metadata: Metadata = createMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/web-and-mobile",
});

export default function WebAndMobilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.name,
              description: service.metaDescription,
              url: `${SITE.url}/services/web-and-mobile`,
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
              { name: service.name, url: `${SITE.url}/services/web-and-mobile` },
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

      <CTABanner
        title="Ready to Build Your Product?"
        ctaLabel={service.cta}
      />
    </>
  );
}
