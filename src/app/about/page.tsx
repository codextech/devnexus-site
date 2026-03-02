import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/blocks/hero";
import { CTABanner } from "@/components/blocks/cta-banner";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessSection } from "@/components/sections/home-process";
import { WhySection } from "@/components/sections/home-why";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { AboutValues } from "@/components/sections/about-values";

export const metadata: Metadata = createMetadata({
  title: "About DevNexus | Expert Software & AI Development Agency",
  description:
    "DevNexus is an expert-led software agency specializing in Python, JavaScript, AI, and Atlassian solutions. Learn about our team, values, and approach.",
  path: "/about",
  keywords: [
    "software development agency",
    "AI development company",
    "expert software engineers",
    "Python JavaScript agency",
    "web development team",
    "Atlassian development agency",
    "software agency about",
    "DevNexus team",
  ],
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE.url },
              { name: "About", url: `${SITE.url}/about` },
            ])
          ),
        }}
      />

      <Hero
        eyebrow="About DevNexus"
        title="We're the Engineers Behind the Product"
        subtitle="A focused team of engineers who've shipped products used by millions — and treat yours with the same care."
        primaryCta={{ label: "Work With Us", href: "/contact" }}
      />

      {/* Story */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 section-gradient" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Why We Exist"
              align="left"
              className="mb-8"
            />
            <div className="space-y-5 text-dark-300 leading-relaxed text-base md:text-lg">
              <p>
                We started DevNexus after watching the same pattern play out
                too many times: a company hires an agency, gets a polished
                sales pitch, then discovers the actual work is done by junior
                developers they&apos;ve never met. The result is software that
                looks fine in demos but falls apart under real users.
              </p>
              <p>
                We built the opposite model. The person on the discovery
                call is the same person writing your code — no handoffs,
                no middlemen. We specialize in two areas —
                <span className="text-white font-medium"> web &amp; mobile products</span> and
                <span className="text-white font-medium"> AI-powered systems</span> —
                because depth beats breadth when you&apos;re building
                software that needs to work at scale.
              </p>
              <p>
                Our clients range from funded startups launching their first
                product to mid-market companies embedding AI into existing
                operations. The common thread: they need engineering
                leadership, not just engineering labor.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="The Team"
            title="Engineers, Not Account Managers"
            subtitle="Small by design. Every person you work with is a senior engineer who's shipped production software."
            className="mb-12 md:mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/team/Gemini_Generated_Image_8enz948enz948enz.png"
                alt="DevNexus engineer at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
              <p className="absolute bottom-4 left-5 text-sm font-medium text-white/80">
                Senior engineer, deep in the build
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/team/Gemini_Generated_Image_lesspdlesspdless.png"
                alt="DevNexus team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent" />
              <p className="absolute bottom-4 left-5 text-sm font-medium text-white/80">
                The team, working through a hard problem
              </p>
            </div>
          </div>
        </Container>
      </section>

      <AboutValues />

      <ProcessSection />

      <WhySection />

      <CTABanner
        title="Let's Talk About What You're Building"
        subtitle="30 minutes. No pitch deck. Just a real conversation about your product."
        ctaLabel="Book a Call"
      />
    </>
  );
}
