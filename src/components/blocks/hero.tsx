"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Metric } from "@/components/ui/metric";
import { BlueprintGrid } from "@/components/ui/blueprint-grid";
import { HeroVisual } from "@/components/blocks/hero-visual";
import { clipReveal, fadeUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ProofStat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: "homepage" | "page";
  className?: string;
  highlightWord?: string;
  proofStats?: ProofStat[];
  background?: React.ReactNode;
};

function renderTitle(title: string, highlightWord?: string) {
  if (!highlightWord) return title;
  const idx = title.indexOf(highlightWord);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-blue">{highlightWord}</span>
      {title.slice(idx + highlightWord.length)}
    </>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "page",
  className,
  highlightWord,
  proofStats,
  background,
}: HeroProps) {
  const isHomepage = variant === "homepage";

  if (isHomepage) {
    return (
      <section
        className={cn(
          "relative overflow-hidden bg-bg pt-32 pb-20 md:pt-40 md:pb-28",
          className,
        )}
      >
        <BlueprintGrid focus="26% 42%" />
        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div>
            {eyebrow ? (
              <motion.div {...fadeIn}>
                <Eyebrow label={eyebrow} />
              </motion.div>
            ) : null}
            <motion.h1
              {...clipReveal}
              className="mt-6 font-display text-[2.75rem] font-bold leading-[1.04] tracking-[-0.025em] text-fg sm:text-6xl lg:text-[5rem]"
            >
              {renderTitle(title, highlightWord)}
            </motion.h1>
            <motion.p
              {...fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl"
            >
              {subtitle}
            </motion.p>
            <motion.div {...fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={primaryCta.href} size="lg" variant="primary" magnetic className="group">
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              {secondaryCta ? (
                <Button
                  href={secondaryCta.href}
                  variant="link"
                  className="group/btn px-2 text-[15px]"
                >
                  {secondaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              ) : null}
            </motion.div>
            </div>

            <div className="lg:pl-2">
              <HeroVisual />
            </div>
          </div>

          {proofStats && proofStats.length > 0 ? (
            <motion.div
              {...fadeUp}
              className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 md:mt-20 md:grid-cols-4"
            >
              {proofStats.map((s) => (
                <Metric
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  size="md"
                />
              ))}
            </motion.div>
          ) : null}
        </Container>
      </section>
    );
  }

  // ── Page (inner) variant ──
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-bg pt-32 pb-16 md:pt-40 md:pb-20",
        className,
      )}
    >
      {background ?? <BlueprintGrid focus="18% 55%" />}
      <Container className="relative z-10">
        <motion.div {...fadeUp} className="max-w-3xl">
          {eyebrow ? <Eyebrow label={eyebrow} /> : null}
          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-fg md:text-4xl lg:text-5xl">
            {renderTitle(title, highlightWord)}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryCta.href} size="lg" variant="primary">
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button href={secondaryCta.href} size="lg" variant="secondary">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </motion.div>
      </Container>
      <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </section>
  );
}
