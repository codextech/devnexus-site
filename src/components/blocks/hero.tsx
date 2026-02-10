"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "homepage" | "page";
  className?: string;
  highlightWord?: string;
  /** Renders a tagline strip below CTAs on homepage */
  socialProof?: string[];
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "page",
  className,
  highlightWord,
  socialProof,
}: HeroProps) {
  const isHomepage = variant === "homepage";

  // Split title to highlight a word
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isHomepage
          ? "bg-dark-950 pt-32 pb-24 md:pt-44 md:pb-36 min-h-[92vh] flex items-center"
          : "bg-dark-900 pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/5",
        className
      )}
    >
      {/* Background effects for homepage */}
      {isHomepage && (
        <>
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-bg" />

          {/* Radial gradient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px]" />

          {/* Animated orbs */}
          <motion.div
            className="absolute top-32 left-[15%] w-2 h-2 rounded-full bg-brand-blue/40"
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-48 right-[20%] w-1.5 h-1.5 rounded-full bg-brand-cyan/50"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-[25%] w-1 h-1 rounded-full bg-brand-blue/30"
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          {/* Decorative line elements */}
          <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent" />
          <div className="absolute top-1/3 right-0 w-px h-48 bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent" />
        </>
      )}

      {/* Page variant subtle gradient */}
      {!isHomepage && (
        <div className="absolute inset-0 section-gradient" />
      )}

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "max-w-4xl",
            isHomepage ? "mx-auto text-center" : "text-left"
          )}
        >
          {/* Eyebrow badge */}
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={cn("mb-6", isHomepage && "flex justify-center")}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                <Sparkles className="w-3.5 h-3.5" />
                {eyebrow}
              </span>
            </motion.div>
          )}

          <h1
            className={cn(
              "font-bold tracking-tight leading-[1.08]",
              isHomepage
                ? "text-4xl md:text-5xl lg:text-7xl text-white"
                : "text-3xl md:text-4xl lg:text-5xl text-white"
            )}
          >
            {renderTitle()}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className={cn(
              "mt-6 leading-relaxed",
              isHomepage
                ? "text-lg md:text-xl text-dark-300 mx-auto max-w-2xl"
                : "text-base md:text-lg text-dark-300 max-w-2xl"
            )}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={cn(
              "mt-10 flex flex-col sm:flex-row gap-4",
              isHomepage ? "justify-center" : "justify-start"
            )}
          >
            <Button
              href={primaryCta.href}
              size="lg"
              variant="primary"
              className="group"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                size="lg"
                variant="outline"
              >
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>

          {/* Social proof strip for homepage */}
          {isHomepage && socialProof && socialProof.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-16 md:mt-20"
            >
              {/* Divider line */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-dark-600" />
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-dark-500">
                  Why teams choose us
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-dark-600" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {socialProof.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="text-sm md:text-base text-dark-400 font-medium">
                      {item}
                    </span>
                    {i < socialProof.length - 1 && (
                      <span className="text-dark-600 mx-1">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* Bottom gradient fade for homepage */}
      {isHomepage && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
      )}
    </section>
  );
}
