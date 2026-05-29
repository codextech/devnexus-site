"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { fadeUp } from "@/lib/animations";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const trustSignals = ["Reply within 24h", "No commitment", "Free strategy call"];

export function CTABanner({
  title = "Have something that needs to ship?",
  subtitle = "Book a free strategy call. We’ll tell you exactly how we’d build it — scope, timeline, and what it costs.",
  ctaLabel = "Book a strategy call",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg py-24 md:py-32">
      <BlueprintGrid focus="50% 50%" />
      <Container className="relative z-10">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow label="Let's build" />
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-fg md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            {subtitle}
          </p>

          <div className="mt-9 flex justify-center">
            <Button href={ctaHref} size="lg" variant="primary" magnetic className="group">
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
            {trustSignals.map((signal, i) => (
              <span key={signal} className="flex items-center gap-4">
                {i > 0 ? <span className="h-1 w-1 rounded-full bg-border-hi" aria-hidden="true" /> : null}
                {signal}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
