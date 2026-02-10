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

/* ── Positions: evenly distribute nodes around a circle ── */
function nodeStyle(index: number, total: number, radius: number) {
  const angle = (360 / total) * index - 90; // start from top
  const rad = (angle * Math.PI) / 180;
  return {
    left: `calc(50% + ${Math.cos(rad) * radius}px)`,
    top: `calc(50% + ${Math.sin(rad) * radius}px)`,
    transform: "translate(-50%, -50%)",
  } as React.CSSProperties;
}

export function EcosystemSection() {
  const innerR = 130; // tech ring radius (px)
  const outerR = 225; // AI ring radius (px)

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-blue/[0.03] rounded-full blur-[150px]" />

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
          {/* ── SVG under-layer: rings + glow pulses ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 640 540"
            fill="none"
          >
            {/* Inner ring (tech) */}
            <circle cx="320" cy="270" r={innerR} stroke="rgba(2,169,247,0.12)" strokeWidth="1" strokeDasharray="6 6" />
            {/* Outer ring (AI) */}
            <circle cx="320" cy="270" r={outerR} stroke="rgba(6,182,212,0.10)" strokeWidth="1" strokeDasharray="4 8" />

            {/* Pulse rings from center */}
            {[1, 2, 3].map((i) => (
              <circle key={i} cx="320" cy="270" r="30" fill="none" stroke="rgba(2,169,247,0.08)" strokeWidth="1">
                <animate attributeName="r" values={`30;${80 + i * 60};30`} dur={`${3 + i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur={`${3 + i}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Connecting spokes: center → inner ring nodes */}
            {techNodes.map((_, i) => {
              const angle = ((360 / techNodes.length) * i - 90) * (Math.PI / 180);
              return (
                <line
                  key={`spoke-${i}`}
                  x1="320"
                  y1="270"
                  x2={320 + Math.cos(angle) * innerR}
                  y2={270 + Math.sin(angle) * innerR}
                  stroke="rgba(2,169,247,0.06)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Connecting arcs: inner → outer (subtle) */}
            {aiNodes.map((_, i) => {
              const aOuter = ((360 / aiNodes.length) * i - 90) * (Math.PI / 180);
              const aInner = ((360 / techNodes.length) * (i % techNodes.length) - 90) * (Math.PI / 180);
              return (
                <line
                  key={`arc-${i}`}
                  x1={320 + Math.cos(aInner) * innerR}
                  y1={270 + Math.sin(aInner) * innerR}
                  x2={320 + Math.cos(aOuter) * outerR}
                  y2={270 + Math.sin(aOuter) * outerR}
                  stroke="rgba(6,182,212,0.04)"
                  strokeWidth="1"
                />
              );
            })}
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
                  className="absolute orbit-node-inner"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * innerR}px)`,
                    top: `calc(50% + ${Math.sin(rad) * innerR}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-brand-blue/15 backdrop-blur-sm border border-brand-blue/20 flex items-center justify-center shadow-lg shadow-brand-blue/10 hover:bg-brand-blue/25 hover:scale-110 transition-all duration-300">
                      <node.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-blue" />
                    </div>
                    <span className="text-[10px] md:text-[11px] font-medium text-dark-500 whitespace-nowrap">
                      {node.label}
                    </span>
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
                  className="absolute orbit-node-outer"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * outerR}px)`,
                    top: `calc(50% + ${Math.sin(rad) * outerR}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-brand-cyan/12 backdrop-blur-sm border border-brand-cyan/15 flex items-center justify-center shadow-lg shadow-brand-cyan/10 hover:bg-brand-cyan/20 hover:scale-110 transition-all duration-300">
                      <node.icon className="w-5 h-5 md:w-6 md:h-6 text-brand-cyan" />
                    </div>
                    <span className="text-[10px] md:text-[11px] font-medium text-dark-500 whitespace-nowrap">
                      {node.label}
                    </span>
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
              <div className="absolute -inset-6 bg-brand-blue/15 rounded-full blur-2xl" />
              <div className="absolute -inset-3 bg-brand-cyan/10 rounded-full blur-lg" />

              <div className="relative w-22 h-22 md:w-26 md:h-26 rounded-full bg-gradient-to-br from-brand-blue via-brand-blue to-brand-cyan flex items-center justify-center shadow-2xl shadow-brand-blue/30 border-2 border-white/20">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span className="text-sm md:text-base font-bold text-white whitespace-nowrap tracking-tight">
                  Your Customers
                </span>
                <span className="text-[11px] md:text-xs font-medium gradient-text whitespace-nowrap">
                  at the center of everything
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Ring labels ── */}
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span className="text-[10px] font-semibold tracking-wide uppercase text-dark-500">
              AI &amp; Intelligence Layer
            </span>
          </div>
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-[10px] font-semibold tracking-wide uppercase text-dark-500">
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
              <Package className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">Products That Win</span>
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
