"use client";

import { motion } from "motion/react";
import {
  Users,
  BrainCircuit,
  Globe,
  Database,
  Smartphone,
  Code2,
  Phone,
  Layers,
  ArrowRight,
  Package,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp } from "@/lib/animations";

/* ── Layer data ── */
const techNodes = [
  { icon: Code2, label: "Next.js & React" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Database, label: "Cloud & APIs" },
  { icon: Globe, label: "Web Platforms" },
];

const aiNodes = [
  { icon: BrainCircuit, label: "Gen AI" },
  { icon: Phone, label: "Voice Agents" },
  { icon: Layers, label: "RAG Pipelines" },
  { icon: Package, label: "AI Automation" },
];


export function EcosystemSection() {
  const innerR = 130; // tech ring radius (px)
  const outerR = 225; // AI ring radius (px)

  return (
    <section className="py-20 md:py-32 relative overflow-hidden ecosystem-section">
      {/* Universe background layers */}
      <div className="absolute inset-0 ecosystem-bg" />
      <div className="absolute inset-0 ecosystem-stars" />
      {/* Nebula orbs */}
      <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full bg-brand-blue/[0.04] blur-[120px] ecosystem-nebula" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/[0.03] blur-[100px] ecosystem-nebula" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.02] blur-[150px] ecosystem-nebula" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="The Connected Stack"
          title="Everything Orbits Your Customer"
          subtitle="Technology and AI aren't separate line items — they're layers of one product your customer touches every day. We build them as one."
        />

        {/* ── Orbital visualization ── */}
        <motion.div
          {...fadeUp}
          className="mt-16 md:mt-24 relative mx-auto"
          style={{ height: 540, maxWidth: 640 }}
        >
          {/* ── SVG under-layer: rings, pulses & orbit dots ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 640 540"
            fill="none"
          >
            <defs>
              <filter id="orbit-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Clockwise path for inner ring */}
              <path
                id="inner-orbit"
                d={`M 320 ${270 - innerR} A ${innerR} ${innerR} 0 0 1 320 ${270 + innerR} A ${innerR} ${innerR} 0 0 1 320 ${270 - innerR}`}
              />
              {/* Counter-clockwise path for outer ring */}
              <path
                id="outer-orbit"
                d={`M 320 ${270 - outerR} A ${outerR} ${outerR} 0 0 0 320 ${270 + outerR} A ${outerR} ${outerR} 0 0 0 320 ${270 - outerR}`}
              />
            </defs>

            {/* Inner ring track */}
            <circle cx="320" cy="270" r={innerR} className="orbit-track-inner" strokeWidth="1" strokeDasharray="6 6" />
            {/* Outer ring track */}
            <circle cx="320" cy="270" r={outerR} className="orbit-track-outer" strokeWidth="1" strokeDasharray="4 8" />

            {/* Pulse rings from center */}
            {[1, 2, 3].map((i) => (
              <circle key={i} cx="320" cy="270" r="30" fill="none" stroke="rgba(2,169,247,0.08)" strokeWidth="1">
                <animate attributeName="r" values={`30;${80 + i * 60};30`} dur={`${3 + i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${3 + i}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Orbiting dots — inner ring (clockwise, matches CSS 40s) */}
            <circle r="3.5" fill="rgba(2,169,247,0.7)" filter="url(#orbit-glow)">
              <animateMotion dur="40s" repeatCount="indefinite">
                <mpath href="#inner-orbit" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="rgba(2,169,247,0.35)" filter="url(#orbit-glow)">
              <animateMotion dur="40s" begin="-20s" repeatCount="indefinite">
                <mpath href="#inner-orbit" />
              </animateMotion>
            </circle>

            {/* Orbiting dots — outer ring (counter-clockwise, matches CSS 55s) */}
            <circle r="3.5" fill="rgba(6,182,212,0.7)" filter="url(#orbit-glow)">
              <animateMotion dur="55s" repeatCount="indefinite">
                <mpath href="#outer-orbit" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="rgba(6,182,212,0.35)" filter="url(#orbit-glow)">
              <animateMotion dur="55s" begin="-27.5s" repeatCount="indefinite">
                <mpath href="#outer-orbit" />
              </animateMotion>
            </circle>
          </svg>

          {/* ── Rotating inner ring (Technology) ── */}
          <div
            className="orbit-ring orbit-ring-inner"
            style={{
              width: innerR * 2,
              height: innerR * 2,
              marginLeft: -innerR,
              marginTop: -innerR,
            }}
          >
            {techNodes.map((node, i) => {
              const angle = (360 / techNodes.length) * i - 90;
              const rad = (angle * Math.PI) / 180;
              return (
                <div
                  key={node.label}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * innerR}px)`,
                    top: `calc(50% + ${Math.sin(rad) * innerR}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="orbit-node-inner">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl orbit-node-card-inner flex items-center justify-center hover:scale-110 transition-all duration-300">
                        <node.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                      </div>
                      <span className="text-[10px] md:text-[11px] font-medium orbit-label-text whitespace-nowrap">
                        {node.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Rotating outer ring (AI) ── */}
          <div
            className="orbit-ring orbit-ring-outer"
            style={{
              width: outerR * 2,
              height: outerR * 2,
              marginLeft: -outerR,
              marginTop: -outerR,
            }}
          >
            {aiNodes.map((node, i) => {
              const angle = (360 / aiNodes.length) * i - 90;
              const rad = (angle * Math.PI) / 180;
              return (
                <div
                  key={node.label}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * outerR}px)`,
                    top: `calc(50% + ${Math.sin(rad) * outerR}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="orbit-node-outer">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl orbit-node-card-outer flex items-center justify-center hover:scale-110 transition-all duration-300">
                        <node.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-cyan" />
                      </div>
                      <span className="text-[10px] md:text-[11px] font-medium orbit-label-text whitespace-nowrap">
                        {node.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Center hub: Your Customers ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Multi-layer glow */}
              <div className="absolute -inset-4 bg-brand-blue/15 rounded-full blur-xl" />
              <div className="absolute -inset-2 bg-brand-cyan/10 rounded-full blur-md" />

              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-brand-blue via-brand-blue to-brand-cyan flex items-center justify-center shadow-2xl shadow-brand-blue/30 border-2 border-white/20">
                <Users className="w-7 h-7 md:w-9 md:h-9 text-white" />
              </div>

              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
                <span className="text-xs md:text-sm font-bold whitespace-nowrap tracking-tight ecosystem-hub-text">
                  Your Customers
                </span>
                <span className="text-[9px] md:text-[10px] font-medium gradient-text whitespace-nowrap">
                  at the center of everything
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Ring labels ── */}
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span className="text-[10px] font-semibold tracking-wide uppercase orbit-label-text">
              AI &amp; Intelligence Layer
            </span>
          </div>
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-[10px] font-semibold tracking-wide uppercase orbit-label-text">
              Technology Layer
            </span>
          </div>
        </motion.div>

        {/* ── Bottom narrative ── */}
        <motion.div
          {...fadeUp}
          className="mt-10 md:mt-14 max-w-2xl mx-auto text-center"
        >
          {/* Merge visual */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/15">
              <Globe className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-xs font-medium text-brand-blue">Web + Mobile</span>
            </div>
            <span className="text-dark-600 text-lg">+</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/15">
              <BrainCircuit className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-xs font-medium text-brand-cyan">AI Intelligence</span>
            </div>
            <span className="text-dark-600 text-lg">=</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 border border-white/10">
              <Package className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Products That Win</span>
            </div>
          </div>

          <p className="text-dark-400 leading-relaxed text-sm md:text-base">
            Your customers don&apos;t see &ldquo;a website&rdquo; and &ldquo;an AI feature&rdquo; — they see
            one product. The best digital experiences are built that way too.
            Technology and intelligence woven together from day one, not stitched on after.{" "}
            <span className="text-dark-200 font-medium">
              That&apos;s how you ship products your competitors can&apos;t copy.
            </span>
          </p>

          <motion.a
            href="/services"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-brand-blue hover:gap-3 transition-all"
            whileHover={{ x: 4 }}
          >
            See how we build this stack <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
