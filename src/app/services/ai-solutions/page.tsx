import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { ServicePageContent } from "@/components/sections/service-page-content";
import { PillarContentSection } from "@/components/sections/pillar-content";
import { getServiceBySlug } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

const service = getServiceBySlug("ai-solutions")!;

export const metadata: Metadata = createMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/ai-solutions",
  keywords: [
    "AI solutions company",
    "custom AI development",
    "Python AI development services",
    "RAG pipeline development",
    "LLM integration services",
    "AI automation services",
    "AI analytics dashboards",
  ],
});

export default function AISolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.name,
              description: service.metaDescription,
              url: `${SITE.url}/services/ai-solutions`,
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
              { name: service.name, url: `${SITE.url}/services/ai-solutions` },
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
        title="AI Solutions Services for Automation, RAG, and Analytics"
        intro="DevNexus builds production AI systems that connect to your business workflows, data sources, and customer journeys. This pillar page covers the core capabilities teams need when adopting AI safely and profitably."
        topicClusters={[
          {
            title: "RAG and Knowledge Assistants",
            description:
              "We build retrieval-augmented generation systems that combine vector search, prompt orchestration, and guardrails so teams can query internal knowledge with reliable answers.",
          },
          {
            title: "Workflow Automation with AI",
            description:
              "From document processing to triage and routing, we design automations that reduce manual effort and connect to your CRM, ticketing, and ERP systems.",
          },
          {
            title: "LLM Integration and Evaluation",
            description:
              "We integrate OpenAI, Anthropic, and Bedrock models with robust evaluation pipelines so you can measure response quality, hallucination risk, and business impact.",
          },
          {
            title: "AI Dashboards and Decision Support",
            description:
              "We deliver AI-enabled analytics products that surface trends, recommend actions, and help teams move faster with confidence.",
          },
        ]}
        relatedLinks={[
          { href: "/work", label: "See AI Case Studies" },
          { href: "/services/agentic-ai", label: "Explore Agentic AI Workflows" },
          { href: "/services/voice-ai", label: "Explore Voice AI Agents" },
          { href: "/contact", label: "Talk to an AI Engineer" },
        ]}
      />

      <CTABanner
        title="Ready to Put AI to Work?"
        ctaLabel={service.cta}
      />
    </>
  );
}
