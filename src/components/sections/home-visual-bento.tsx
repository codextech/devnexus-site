"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  BrainCircuit,
  Bot,
  Phone,
  Puzzle,
  Users,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/* ── Data ── */

const FEATURES = [
  {
    id: "ai-solutions",
    label: "AI Solutions",
    icon: BrainCircuit,
    image: "/images/section/bento-ai-solutions.jpg",
    description: "Production AI that cuts costs and automates decisions.",
    href: "/services/ai-solutions",
  },
    {
    id: "web-mobile",
    label: "Web & Mobile",
    icon: Globe,
    image: "/images/section/bento-web-mobile.jpg",
    description: "Full-stack apps that convert visitors into customers.",
    href: "/services/web-and-mobile",
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    icon: Bot,
    image: "/images/section/svc-ai-solutions.jpg",
    description: "Multi-agent orchestration for complex workflows.",
    href: "/services/agentic-ai",
  },
  {
    id: "team",
    label: "Your Team",
    icon: Users,
    image: "/images/section/bento-team.jpg",
    description: "Senior engineers from first sprint to scale.",
    href: "/about",
  },
];

const stats = [
  { value: "50+", label: "Products shipped" },
  { value: "< 3wk", label: "To first prototype" },
  { value: "99%", label: "Client satisfaction" },
  { value: "24/7", label: "Async communication" },
];

const AUTO_PLAY_INTERVAL = 2500;
const ITEM_HEIGHT = 60;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* ── Component ── */

export function VisualBentoSection() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient" />

      <Container className="relative z-10">
        {/* ── Section heading ── */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-blue mb-4">
            What We Build
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
            <span className="carousel-heading-primary">Shipped fast.</span>{" "}
            <span className="carousel-heading-muted">Built to last.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base carousel-subtitle max-w-xl mx-auto leading-relaxed">
            Full-stack web, mobile, and AI &mdash; built by senior engineers
            who ship every sprint.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl flex flex-col lg:flex-row min-h-[550px] lg:aspect-[16/8] carousel-wrapper">

            {/* ── Left: Label list ── */}
            <div className="w-full lg:w-[38%] min-h-[300px] md:min-h-[380px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-14 lg:pl-14 bg-brand-blue">
              {/* Top/bottom fades */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-blue via-brand-blue/80 to-transparent z-40" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-blue via-brand-blue/80 to-transparent z-40" />

              <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
                {FEATURES.map((feature, index) => {
                  const isActive = index === currentIndex;
                  const distance = index - currentIndex;
                  const wrappedDistance = wrap(
                    -(FEATURES.length / 2),
                    FEATURES.length / 2,
                    distance,
                  );
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={feature.id}
                      style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                      animate={{
                        y: wrappedDistance * ITEM_HEIGHT,
                        opacity: 1 - Math.abs(wrappedDistance) * 0.3,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 22,
                        mass: 1,
                      }}
                      className="absolute flex items-center justify-start"
                    >
                      <button
                        onClick={() => handleChipClick(index)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className={cn(
                          "relative flex items-center gap-3.5 px-6 md:px-8 py-3 rounded-full transition-all duration-500 text-left group border cursor-pointer",
                          isActive
                            ? "bg-white text-brand-blue border-white z-10"
                            : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-colors duration-500 shrink-0",
                            isActive ? "text-brand-blue" : "text-white/40",
                          )}
                          strokeWidth={2}
                        />
                        <span className="font-semibold text-sm tracking-tight whitespace-nowrap">
                          {feature.label}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Card stack ── */}
            <div className="flex-1 min-h-[420px] md:min-h-[500px] lg:h-full relative carousel-card-bg flex items-center justify-center py-14 md:py-20 lg:py-14 px-6 md:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l carousel-card-border">
              <div className="relative w-full max-w-[380px] aspect-[4/5] flex items-center justify-center">
                {FEATURES.map((feature, index) => {
                  const status = getCardStatus(index);
                  const isActive = status === "active";
                  const isPrev = status === "prev";
                  const isNext = status === "next";

                  return (
                    <motion.div
                      key={feature.id}
                      initial={false}
                      animate={{
                        x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                        scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                        opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                        rotate: isPrev ? -3 : isNext ? 3 : 0,
                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-6 carousel-card-frame origin-center"
                      style={{
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.label}
                        fill
                        className={cn(
                          "object-cover transition-all duration-700",
                          isActive
                            ? "grayscale-0 blur-0"
                            : "grayscale blur-[2px] brightness-75",
                        )}
                        sizes="(max-width: 768px) 90vw, 380px"
                      />

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-x-0 bottom-0 p-8 pt-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                          >
                            <div className="carousel-card-badge px-3.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] w-fit mb-3">
                              {index + 1} &middot; {feature.label}
                            </div>
                            <p className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-md tracking-tight">
                              {feature.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-10 md:mt-14 max-w-6xl mx-auto">
          <div className="carousel-stats-bar rounded-2xl px-8 py-7 md:px-14 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-6 flex-1">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-bold carousel-stat-value">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium carousel-stat-label mt-1 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-blue text-white text-sm font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/50 hover:scale-105 transition-all duration-300 group shrink-0"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
