"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
}: {
  title: string;
  highlightWord?: string;
  startDelay?: number;
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

  return (
    <>
      {segments.map((seg, si) => {
        if (seg.isHighlight) {
          const delay = charDelays[idx];
          idx += seg.text.length;
          return (
            <span
              key={si}
              className="gradient-text hero-char"
              style={{ animationDelay: `${delay.toFixed(3)}s` }}
            >
              {seg.text}
            </span>
          );
        }
        const chars = seg.text.split("").map((char) => {
          const delay = charDelays[idx];
          idx++;
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
          {/* Deep space gradient base */}
          <div className="absolute inset-0 hero-cosmos" />

          {/* Star field */}
          <div className="absolute inset-0 hero-stars" />

          {/* Central radial pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full hero-radial-pulse"
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Aurora mesh — slow-drifting gradient orbs */}
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
            {/* Extra indigo accent orb */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full hero-orb-indigo"
              animate={{
                x: ["-5%", "8%", "-5%"],
                y: ["0%", "10%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              style={{ top: "30%", left: "55%" }}
            />
          </div>

          {/* Animated horizontal light beam */}
          <motion.div
            className="absolute top-[38%] left-0 right-0 h-px hero-beam"
            animate={{ opacity: [0, 0.5, 0], scaleX: [0.3, 1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-[62%] left-0 right-0 h-px hero-beam"
            animate={{ opacity: [0, 0.3, 0], scaleX: [0.4, 1, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          {/* Floating particles */}
          {[
            { x: "12%", y: "22%", dur: 14, del: 0, size: 3 },
            { x: "78%", y: "18%", dur: 18, del: 2, size: 2 },
            { x: "25%", y: "72%", dur: 16, del: 4, size: 2.5 },
            { x: "85%", y: "65%", dur: 20, del: 1, size: 2 },
            { x: "50%", y: "30%", dur: 15, del: 3, size: 3.5 },
            { x: "65%", y: "80%", dur: 17, del: 5, size: 2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full hero-particle"
              style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.del,
              }}
            />
          ))}

          {/* Corner accent lines */}
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
            {isHomepage ? (
              <TypewriterTitle title={title} highlightWord={highlightWord} />
            ) : (
              renderTitle()
            )}
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
