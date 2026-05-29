import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { TechStackRow } from "@/components/blocks/tech-stack-row";
import { CTABanner } from "@/components/blocks/cta-banner";
import { CaseStudyBody } from "@/components/sections/case-study-body";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
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
            articleSchema({
              title: frontmatter.title,
              description: frontmatter.excerpt,
              url: `${SITE.url}/work/${slug}`,
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

      {/* Hero */}
      <section className="bg-dark-900 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5 relative">
        <div className="absolute inset-0 section-gradient" />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="blue">{frontmatter.industry}</Badge>
              {frontmatter.services.map((s) => (
                <Badge key={s} variant="neutral">
                  {s}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              {frontmatter.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-dark-400 leading-relaxed">
              {frontmatter.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-dark-500">
              <span>Client: {frontmatter.client}</span>
              <span>Duration: {frontmatter.duration}</span>
              <span>Team: {frontmatter.teamSize}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 border-b border-white/5 relative">
        <div className="absolute inset-0 bg-dark-900/30" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {frontmatter.metrics.map((metric) => (
              <StatCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <CaseStudyBody content={content} />

            <div className="mt-12 pt-8 border-t border-white/5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-dark-500 mb-4">
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
