"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
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
          ? "hero-bg pt-36 pb-28 md:pt-48 md:pb-40 min-h-[94vh] flex items-center"
          : "hero-bg-page pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/5",
        className
      )}
    >
      {isHomepage && (
        <>
          {/* Subtle grid underlay */}
          <div className="absolute inset-0 grid-bg opacity-40" />

          {/* Aurora mesh — slow-drifting gradient orbs that blend */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[700px] h-[700px] rounded-full hero-orb-blue"
              animate={{
                x: ["-10%", "5%", "-10%"],
                y: ["-15%", "5%", "-15%"],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: "-20%", left: "10%" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full hero-orb-cyan"
              animate={{
                x: ["5%", "-8%", "5%"],
                y: ["0%", "-12%", "0%"],
                scale: [1.1, 0.95, 1.1],
              }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ top: "10%", right: "-5%" }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full hero-orb-purple"
              animate={{
                x: ["0%", "10%", "0%"],
                y: ["5%", "-8%", "5%"],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              style={{ bottom: "-10%", left: "30%" }}
            />
          </div>

          {/* Fine accent lines at edges */}
          <div className="absolute top-1/2 left-0 w-px h-48 bg-gradient-to-b from-transparent via-brand-blue/10 to-transparent" />
          <div className="absolute top-1/3 right-0 w-px h-64 bg-gradient-to-b from-transparent via-brand-cyan/8 to-transparent" />
        </>
      )}

      {!isHomepage && (
        <div className="absolute inset-0 section-gradient" />
      )}

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "max-w-4xl",
            isHomepage ? "mx-auto text-center" : "text-left"
          )}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={cn("mb-8", isHomepage && "flex justify-center")}
            >
              <span className="hero-eyebrow inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                {eyebrow}
              </span>
            </motion.div>
          )}

          <h1
            className={cn(
              "font-bold tracking-tight leading-[1.05] hero-title-text",
              isHomepage
                ? "text-[2.5rem] md:text-6xl lg:text-[5rem]"
                : "text-3xl md:text-4xl lg:text-5xl"
            )}
          >
            {renderTitle()}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className={cn(
              "mt-7 leading-relaxed hero-subtitle-text",
              isHomepage
                ? "text-lg md:text-xl mx-auto max-w-2xl"
                : "text-base md:text-lg max-w-2xl"
            )}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={cn(
              "mt-12 flex flex-col sm:flex-row gap-4",
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-20 md:mt-24"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4">
                {socialProof.map((item) => (
                  <span key={item} className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-blue/10">
                      <Check className="w-3 h-3 text-brand-blue" strokeWidth={3} />
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
