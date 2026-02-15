import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { ServicePageContent } from "@/components/sections/service-page-content";
import { PillarContentSection } from "@/components/sections/pillar-content";
import { getServiceBySlug } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

const service = getServiceBySlug("web-and-mobile")!;

export const metadata: Metadata = createMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/web-and-mobile",
  keywords: [
    "web application development agency",
    "mobile app development company",
    "Next.js development services",
    "React Native app development",
    "Node backend development",
    "Python backend development",
    "full stack product development",
    "MVP to production engineering",
  ],
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
      <PillarContentSection
        title="Web and Mobile Development Services Built for Scale"
        intro="This pillar page explains how DevNexus designs, builds, and scales modern web and mobile products. We focus on product velocity, long-term maintainability, and measurable performance."
        topicClusters={[
          {
            title: "Next.js Web Application Development",
            description:
              "We build performant web applications with clean architecture, strong SEO foundations, and Core Web Vitals optimization for fast user experiences.",
          },
          {
            title: "React Native Mobile App Development",
            description:
              "Our team ships cross-platform iOS and Android apps with reliable API integrations, offline-ready experiences, and production monitoring.",
          },
          {
            title: "Full-Stack API and Platform Engineering",
            description:
              "We design scalable backends with Node.js and Python, secure auth flows, and data models that support product growth from MVP stage through enterprise usage.",
          },
          {
            title: "Product Iteration and Delivery",
            description:
              "Sprint-based delivery with clear roadmaps, QA gates, and deployment automation keeps your team shipping features without losing quality.",
          },
        ]}
        relatedLinks={[
          { href: "/work", label: "See Web and Mobile Case Studies" },
          { href: "/services/ai-solutions", label: "Add AI to Your Product" },
          { href: "/services/jira-apps", label: "Need Jira Integration?" },
          { href: "/contact", label: "Discuss Your App Build" },
        ]}
      />

      <CTABanner
        title="Ready to Build Your Product?"
        ctaLabel={service.cta}
      />
    </>
  );
}
