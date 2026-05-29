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
    "Next.js development agency",
    "React Native app development company",
    "Node.js API development services",
    "full stack web application development",
    "SaaS MVP development agency",
    "TypeScript web development company",
    "Next.js SaaS development",
    "React Native cross-platform app development",
    "Node.js backend development services",
    "web and mobile app development agency",
    "Next.js development company for startups",
    "custom web application development",
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
        title="Next.js, React Native & Node.js Development Services"
        intro="Getting a web or mobile product built isn't hard. Getting it built right — on time, without rework, by engineers who stay on the project — is. DevNexus gives startups and product teams a single full-stack team using Next.js, React Native, Node.js, and TypeScript, with working software delivered every two weeks."
        topicClusters={[
          {
            title: "Next.js Web Application Development",
            description:
              "We build full-stack web applications with Next.js App Router, TypeScript, and PostgreSQL. Every project ships with server-side rendering, optimized Core Web Vitals, structured data markup, and CI/CD pipelines configured from day one. SaaS platforms, admin dashboards, and customer-facing products — we build for performance and maintainability.",
          },
          {
            title: "React Native Cross-Platform App Development",
            description:
              "Our team ships production iOS and Android apps using React Native and Expo — a single codebase that performs natively on both platforms. We handle API integrations, push notifications, offline data sync, and App Store / Play Store submissions. Ideal for startups that need a polished mobile app without the cost of two separate teams.",
          },
          {
            title: "Node.js API and Backend Engineering",
            description:
              "We design and build REST and GraphQL APIs with Node.js, Express, and Fastify — backed by PostgreSQL, Redis, and cloud infrastructure on AWS or Vercel. Our backends are built to scale: rate limiting, queue-based processing, multi-tenant data isolation, and auth flows using JWTs and OAuth 2.0.",
          },
          {
            title: "MVP Development for Startups",
            description:
              "We scope, design, and ship focused MVPs in 6-10 weeks. Our process starts with a one-week discovery sprint to lock requirements, then two-week build sprints with working demos you can test each cycle. No black-box development — you see progress every 10 business days and hold us accountable to scope.",
          },
        ]}
        relatedLinks={[
          { href: "/work", label: "See Web and Mobile Case Studies" },
          { href: "/blog/next-js-vs-remix-2025", label: "Next.js vs Remix: Which to Choose?" },
          { href: "/services/ai-solutions", label: "Add AI to Your Product" },
          { href: "/services/agentic-ai", label: "Explore Agentic AI Workflows" },
          { href: "/services/jira-apps", label: "Need Jira Integration?" },
          { href: "/contact", label: "Discuss Your App Build" },
        ]}
      />

      <CTABanner
        title="Your next product launch starts here."
        ctaLabel="Get a Free Scoping Call"
      />
    </>
  );
}
