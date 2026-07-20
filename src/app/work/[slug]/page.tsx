import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CaseStudyHero } from "@/components/blocks/case-study-hero";
import { TechStackRow } from "@/components/blocks/tech-stack-row";
import { CTABanner } from "@/components/blocks/cta-banner";
import { CaseStudyBody } from "@/components/sections/case-study-body";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getCaseStudyBySlug(slug);
    return createMetadata({
      title: `${frontmatter.title} | Case Study`,
      description: frontmatter.excerpt,
      path: `/work/${slug}`,
      image: `${SITE.url}/og?title=${encodeURIComponent(frontmatter.title)}&type=case-study&tag=${encodeURIComponent(frontmatter.client)}`,
    });
  } catch {
    return {};
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  let data;
  try {
    data = getCaseStudyBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            caseStudySchema({
              title: frontmatter.title,
              description: frontmatter.excerpt,
              url: `${SITE.url}/work/${slug}`,
              client: frontmatter.client,
              industry: frontmatter.industry,
              services: frontmatter.services,
              metrics: frontmatter.metrics,
              publishedAt: frontmatter.publishedAt,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "Work", url: `${SITE.url}/work` },
              { name: frontmatter.title, url: `${SITE.url}/work/${slug}` },
            ])
          ),
        }}
      />

      {/* Hero — Precision Instrument page hero */}
      <CaseStudyHero
        industry={frontmatter.industry}
        services={frontmatter.services}
        title={frontmatter.title}
        excerpt={frontmatter.excerpt}
        client={frontmatter.client}
        duration={frontmatter.duration}
        teamSize={frontmatter.teamSize}
      />

      {/* Metrics — instrument readouts */}
      <section className="bg-bg py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-3">
            {frontmatter.metrics.map((metric) => (
              <div key={metric.label} className="bg-bg p-8 text-center">
                <p className="font-display text-3xl font-bold tracking-[-0.01em] text-fg md:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <CaseStudyBody content={content} />

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-faint">
                Tech Stack
              </h3>
              <TechStackRow items={frontmatter.techStack} />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Start a Similar Project"
        subtitle="Tell us about your challenge and we'll design a solution."
        ctaLabel="Book a Discovery Call"
      />
    </>
  );
}
