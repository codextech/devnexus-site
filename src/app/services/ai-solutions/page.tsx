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
    "RAG pipeline development company",
    "LangChain development services",
    "LlamaIndex development agency",
    "custom LLM integration services",
    "retrieval augmented generation development",
    "Python AI development services",
    "LLM integration for business",
    "custom AI agent development",
    "OpenAI integration services",
    "Anthropic Claude integration",
    "AI automation development company",
    "document intelligence development",
    "vector search development",
    "pgvector development services",
    "AI workflow automation agency",
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
        title="RAG Pipelines, LLM Integration & AI Automation Services"
        intro="DevNexus builds production AI systems using Python, LangChain, LlamaIndex, and LangGraph — connected to your real data sources, not just demos. We work with product teams and enterprises who need AI that delivers measurable outcomes: faster workflows, lower manual effort, and decisions backed by real data."
        topicClusters={[
          {
            title: "RAG Pipeline Development with LangChain & LlamaIndex",
            description:
              "We design and build retrieval-augmented generation (RAG) systems that let your teams query internal documents, knowledge bases, and structured data with reliable, grounded answers. Our RAG pipelines use pgvector, Pinecone, or Weaviate for vector search — combined with LangChain or LlamaIndex for orchestration, chunking strategies, and reranking. We include evaluation pipelines from the start so you can measure answer quality, not just ship and hope.",
          },
          {
            title: "LLM Integration with OpenAI, Anthropic & AWS Bedrock",
            description:
              "We integrate GPT-4, Claude, Mistral, and AWS Bedrock models into your existing products and workflows via clean, maintainable Python APIs. Integration includes prompt engineering, structured output parsing, fallback logic, rate limiting, and cost tracking. We build evaluation harnesses that measure hallucination rate, latency, and task-specific performance — so you can upgrade models without breaking production.",
          },
          {
            title: "AI Workflow Automation and Document Intelligence",
            description:
              "We design AI-powered automations that process documents, extract structured data, classify content, and route work to the right systems or people. Built with Python, FastAPI, and n8n — connected to your CRM, ticketing system, or ERP via REST APIs. Common use cases: automated patient intake processing, invoice extraction, contract review triage, and support ticket classification.",
          },
          {
            title: "AI Analytics and Decision Support Systems",
            description:
              "We build AI-enabled analytics products that surface anomalies, predict outcomes, and recommend next-best actions — delivered as dashboards or embedded directly into your SaaS product. Built on Python data pipelines, PostgreSQL, and Next.js frontend — with model monitoring that alerts when prediction quality degrades in production.",
          },
        ]}
        relatedLinks={[
          { href: "/work", label: "See AI Case Studies" },
          { href: "/blog/how-to-build-agentic-ai-workflows", label: "How to Build Agentic AI Workflows" },
          { href: "/blog/ai-agents-replacing-web-dev-workflows-2026", label: "AI Agents in Dev Workflows (2026)" },
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
