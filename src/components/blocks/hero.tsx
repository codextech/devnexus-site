"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { WaveText } from "@/components/ui/wave-text";
import { RetroGrid } from "@/components/ui/retro-grid";
import { cn } from "@/lib/utils";

/* ── Reduced motion hook ── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ── Hero ── */

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "homepage" | "page";
  className?: string;
  highlightWord?: string;
  socialProof?: string[];
  background?: React.ReactNode;
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
  background,
}: HeroProps) {
  const isHomepage = variant === "homepage";
  const shouldReduce = usePrefersReducedMotion();

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
          ? "hero-veil min-h-screen flex items-center pt-36 pb-32 md:pt-48 md:pb-44"
          : "hero-bg-page pt-36 pb-20 md:pt-44 md:pb-24",
        className
      )}
    >
      {isHomepage && (
        <>
          {/* ── Dotted surface background ── */}
          <div className="absolute inset-0 hero-veil-gradient" />
          <DottedSurface className="z-[1]" />
          {/* Bottom fade into page */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] hero-silhouette z-[2]" />

          {/* ── Floating stats — bottom left ── */}
          <motion.div
            className="absolute bottom-14 left-8 md:left-16 z-20 hidden md:flex items-center gap-4"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduce ? 0 : 1.4, duration: 0.6 }}
          >
            <span className="text-5xl lg:text-6xl font-bold hero-stat-number">
              50+
            </span>
            <div className="w-px h-10 bg-white/30" />
            <span className="text-[11px] uppercase tracking-[0.2em] leading-tight hero-stat-label">
              products
              <br />
              shipped
            </span>
          </motion.div>

          {/* ── Floating stats — bottom right ── */}
          <motion.div
            className="absolute bottom-14 right-8 md:right-16 z-20 hidden md:flex items-center gap-4"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduce ? 0 : 1.6, duration: 0.6 }}
          >
            <span className="text-5xl lg:text-6xl font-bold hero-stat-number">
              98%
            </span>
            <div className="w-px h-10 bg-white/30" />
            <span className="text-[11px] uppercase tracking-[0.2em] leading-tight hero-stat-label">
              client
              <br />
              satisfaction
            </span>
          </motion.div>
        </>
      )}

      {!isHomepage && (
        <>
          <div className="absolute inset-0 hero-page-gradient" />
          {background ?? <RetroGrid angle={65} className="opacity-40" />}
          <div className="absolute bottom-0 left-0 right-0 h-px hero-page-divider" />
        </>
      )}

      <Container className="relative z-10">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: isHomepage ? 0.3 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            "max-w-4xl",
            isHomepage ? "mx-auto text-center" : "text-left"
          )}
        >
          {eyebrow && (
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: isHomepage ? 0.4 : 0.1, duration: 0.5 }}
              className={cn("mb-6", isHomepage && "flex justify-center")}
            >
              {isHomepage ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase",
                    "hero-eyebrow"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-brand-blue" />
                  {eyebrow}
                </span>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-brand-blue" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue">
                    {eyebrow}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          <h1
            className={cn(
              "tracking-tight leading-[1.05]",
              isHomepage
                ? "font-bold text-[2.5rem] md:text-6xl lg:text-[5rem] hero-title-text"
                : "font-bold text-3xl md:text-4xl lg:text-5xl hero-title-text"
            )}
          >
            {isHomepage && highlightWord ? (
              (() => {
                const idx = title.indexOf(highlightWord);
                if (idx === -1) return <WaveText text={title} />;
                const before = title.slice(0, idx);
                const after = title.slice(idx + highlightWord.length).trimStart();
                return (
                  <>
                    {before && <WaveText text={before} />}
                    <WaveText
                      text={highlightWord}
                      charClassName="gradient-text"
                    />
                    {after && (
                      <>
                        <br />
                        <WaveText text={after} className="font-bold" />
                      </>
                    )}
                  </>
                );
              })()
            ) : isHomepage ? (
              <WaveText text={title} />
            ) : (
              renderTitle()
            )}
          </h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHomepage ? 0.6 : 0.2, duration: 0.6 }}
            className={cn(
              "mt-5 leading-relaxed",
              isHomepage
                ? "text-lg md:text-xl mx-auto max-w-2xl hero-subtitle-text"
                : "text-base md:text-lg max-w-xl hero-subtitle-text"
            )}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHomepage ? 0.75 : 0.35, duration: 0.5 }}
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

          {isHomepage && socialProof && socialProof.length > 0 && (
            <motion.div
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="mt-20 md:mt-24"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4">
                {socialProof.map((item) => (
                  <span key={item} className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-blue/10">
                      <Check
                        className="w-3 h-3 text-brand-blue"
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-sm hero-proof-text font-medium">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>

      {isHomepage && (
        <div className="absolute bottom-0 left-0 right-0 h-36 hero-bottom-fade" />
      )}
    </section>
  );
}
