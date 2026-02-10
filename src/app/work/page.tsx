import type { Metadata } from "next";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { Container } from "@/components/ui/container";
import { CaseStudyCard } from "@/components/blocks/case-study-card";
import { CaseStudiesStagger } from "@/components/sections/case-studies-stagger";
import { getAllCaseStudies } from "@/lib/content";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Our Work | Case Studies",
  description:
    "See how DevNexus delivers results. Case studies featuring AI solutions, web development, voice agents, and Jira integrations with real metrics.",
  path: "/work",
});

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return (
    <>
      <Hero
        eyebrow="Our Work"
        title="Real Results From Real Projects"
        subtitle="We measure success by the outcomes we create. Here's proof."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
      />

      <section className="py-16 md:py-24 lg:py-32">
        <Container>
          <CaseStudiesStagger>
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </CaseStudiesStagger>
        </Container>
      </section>

      <CTABanner
        title="Want Results Like These?"
        subtitle="Tell us about your project and we'll show you what's possible."
        ctaLabel="Start a Project"
      />
    </>
  );
}
