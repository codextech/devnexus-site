"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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

/* ── AI typewriter title ── */

type Segment = { text: string; isHighlight: boolean };

function buildSegments(title: string, hw?: string): Segment[] {
  if (!hw) return [{ text: title, isHighlight: false }];
  const i = title.indexOf(hw);
  if (i === -1) return [{ text: title, isHighlight: false }];
  const s: Segment[] = [];
  if (i > 0) s.push({ text: title.slice(0, i), isHighlight: false });
  s.push({ text: hw, isHighlight: true });
  const a = title.slice(i + hw.length);
  if (a) s.push({ text: a, isHighlight: false });
  return s;
}

function TypewriterTitle({
  title,
  highlightWord,
  startDelay = 0.7,
  lineBreakAfterHighlight = false,
}: {
  title: string;
  highlightWord?: string;
  startDelay?: number;
  lineBreakAfterHighlight?: boolean;
}) {
  const [cursorDone, setCursorDone] = useState(false);
  const segments = useMemo(
    () => buildSegments(title, highlightWord),
    [title, highlightWord]
  );

  const charDelays = useMemo(() => {
    let t = startDelay;
    return title.split("").map((c) => {
      const pause = c === "." ? 0.1 : c === " " ? 0.02 : 0;
      t += 0.02 + Math.random() * 0.015 + pause;
      return t;
    });
  }, [title, startDelay]);

  const typingEnd = charDelays[charDelays.length - 1] + 0.35;

  useEffect(() => {
    const id = setTimeout(() => setCursorDone(true), typingEnd * 1000 + 1200);
    return () => clearTimeout(id);
  }, [typingEnd]);

  let idx = 0;
  let passedHighlight = false;

  return (
    <>
      {segments.map((seg, si) => {
        if (seg.isHighlight) {
          const delay = charDelays[idx];
          idx += seg.text.length;
          passedHighlight = true;
          return (
            <Fragment key={si}>
              <span
                className="gradient-text hero-char"
                style={{ animationDelay: `${delay.toFixed(3)}s` }}
              >
                {seg.text}
              </span>
              {lineBreakAfterHighlight && <br />}
            </Fragment>
          );
        }

        const isAfterHighlight = lineBreakAfterHighlight && passedHighlight;
        const chars = seg.text.split("").map((char, ci) => {
          const delay = charDelays[idx];
          idx++;
          // Skip leading space on second line
          if (isAfterHighlight && ci === 0 && char === " ") return null;
          return (
            <span
              key={idx}
              className="hero-char"
              style={{ animationDelay: `${delay.toFixed(3)}s` }}
            >
              {char}
            </span>
          );
        });

        if (isAfterHighlight) {
          return (
            <span key={si} className="font-bold">
              {chars}
            </span>
          );
        }
        return <Fragment key={si}>{chars}</Fragment>;
      })}
      <motion.span
        className="hero-cursor"
        animate={cursorDone ? { opacity: 0 } : undefined}
        transition={cursorDone ? { duration: 0.4 } : undefined}
      />
    </>
  );
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
          : "hero-bg-page pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/5",
        className
      )}
    >
      {isHomepage && (
        <>
          {/* ── Diagonal wipe reveal ── */}
          <motion.div
            className="absolute inset-0"
            initial={
              shouldReduce
                ? false
                : { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }
            }
            animate={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Sky-to-indigo gradient base */}
            <div className="absolute inset-0 hero-veil-gradient" />

            {/* Aurora blob — left, purple/magenta glow */}
            <motion.div
              className="absolute hero-aurora-blob"
              style={{ left: "-5%", top: "15%", width: 600, height: 600 }}
              animate={
                shouldReduce
                  ? {}
                  : {
                      y: [-25, 25, -25],
                      x: [-10, 15, -10],
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Data dot grid — right */}
            <div className="absolute right-0 top-0 w-[55%] h-full hero-dot-grid" />

            {/* Dark silhouette — center bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] hero-silhouette" />
          </motion.div>

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
        <div className="absolute inset-0 section-gradient" />
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
              className={cn("mb-8", isHomepage && "flex justify-center")}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase",
                  "hero-eyebrow"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full animate-pulse",
                    "bg-brand-blue"
                  )}
                />
                {eyebrow}
              </span>
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
            {isHomepage ? (
              <TypewriterTitle
                title={title}
                highlightWord={highlightWord}
                lineBreakAfterHighlight
              />
            ) : (
              renderTitle()
            )}
          </h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isHomepage ? 0.6 : 0.25, duration: 0.6 }}
            className={cn(
              "mt-7 leading-relaxed",
              isHomepage
                ? "text-lg md:text-xl mx-auto max-w-2xl hero-subtitle-text"
                : "text-base md:text-lg max-w-2xl hero-subtitle-text"
            )}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isHomepage ? 0.75 : 0.4, duration: 0.5 }}
            className={cn(
              "mt-12 flex flex-col sm:flex-row gap-4",
              isHomepage ? "justify-center" : "justify-start"
            )}
          >
            {isHomepage ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
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
