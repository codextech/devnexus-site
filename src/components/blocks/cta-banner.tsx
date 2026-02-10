"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CTABanner({
  title = "Let's Build the Thing Your Competitors Wish They Had",
  subtitle = "One conversation is all it takes. Tell us the problem — we'll show you what's possible.",
  ctaLabel = "Start a Conversation",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-cyan" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[100px]" />

      <Container className="relative z-10">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10">
            <Button href={ctaHref} variant="white" size="lg" className="group">
              {ctaLabel}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
