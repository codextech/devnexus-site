"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const trustSignals = [
  { icon: Clock, text: "Reply within 24h" },
  { icon: ShieldCheck, text: "No commitment" },
  { icon: CalendarCheck, text: "Free strategy call" },
];

export function CTABanner({
  title = "Let\u2019s Build the Thing Your Competitors Wish They Had",
  subtitle = "One conversation is all it takes. Tell us the problem \u2014 we\u2019ll show you what\u2019s possible.",
  ctaLabel = "Start a Conversation",
  ctaHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient background — keeps from-brand-blue for light theme :has() selector */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-cyan" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-white/5 rounded-full blur-[80px]" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <Container className="relative z-10">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          {/* Availability indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Taking new projects
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            {title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed">
            {subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={ctaHref} variant="white" size="lg" className="group cta-banner-btn">
              <Sparkles className="w-4 h-4 mr-2" />
              {ctaLabel}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {trustSignals.map((signal) => (
              <span key={signal.text} className="flex items-center gap-2">
                <signal.icon className="w-3.5 h-3.5 text-white/50" strokeWidth={2} />
                <span className="text-xs text-white/60 font-medium">
                  {signal.text}
                </span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
