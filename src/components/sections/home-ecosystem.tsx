"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
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

/* ── Layout constants ── */
const CX = 320;
const CY = 270;
const INNER_R = 135;
const OUTER_R = 228;

function nodePos(radius: number, idx: number, total: number, offsetDeg = -90) {
  const angle = (360 / total) * idx + offsetDeg;
  const rad = (angle * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * radius, y: CY + Math.sin(rad) * radius };
}

/* ═══════════════════════════════════════════════════
   Desktop: SVG constellation with animated connections
   ═══════════════════════════════════════════════════ */
function DesktopVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const techPos = techNodes.map((_, i) => nodePos(INNER_R, i, techNodes.length));
  const aiPos = aiNodes.map((_, i) => nodePos(OUTER_R, i, aiNodes.length, -45));

  return (
    <div
      ref={ref}
      className="hidden md:block mt-16 md:mt-24 relative mx-auto"
      style={{ height: 540, maxWidth: 640 }}
    >
      {/* ── SVG layer: tracks, connections, particles ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 640 540"
        fill="none"
      >
        <defs>
          <linearGradient id="eco-grad-blue" gradientUnits="userSpaceOnUse" x1={CX} y1={CY} x2={CX + INNER_R} y2={CY}>
            <stop offset="0%" stopColor="rgba(2,169,247,0.04)" />
            <stop offset="100%" stopColor="rgba(2,169,247,0.25)" />
          </linearGradient>
          <linearGradient id="eco-grad-cyan" gradientUnits="userSpaceOnUse" x1={CX} y1={CY} x2={CX + OUTER_R} y2={CY}>
            <stop offset="0%" stopColor="rgba(6,182,212,0.03)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.2)" />
          </linearGradient>
          <filter id="eco-glow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ring tracks — scale in */}
        <motion.circle
          cx={CX} cy={CY} r={INNER_R}
          className="eco-track-inner" strokeWidth="1" strokeDasharray="4 6" fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <motion.circle
          cx={CX} cy={CY} r={OUTER_R}
          className="eco-track-outer" strokeWidth="1" strokeDasharray="3 8" fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Pulse rings from center */}
        {[1, 2, 3].map((n) => (
          <circle key={n} cx={CX} cy={CY} r="22" fill="none" className="eco-pulse-ring" strokeWidth="1">
            <animate attributeName="r" values={`22;${65 + n * 55}`} dur={`${3 + n * 0.7}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0" dur={`${3 + n * 0.7}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Connection lines: center → tech nodes (draw on scroll) */}
        {techPos.map((p, i) => (
          <motion.path
            key={`tc-${i}`}
            d={`M ${CX} ${CY} L ${p.x} ${p.y}`}
            stroke="url(#eco-grad-blue)" strokeWidth="1" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.7, ease: "easeOut" }}
          />
        ))}

        {/* Connection lines: center → AI nodes (draw on scroll) */}
        {aiPos.map((p, i) => (
          <motion.path
            key={`ac-${i}`}
            d={`M ${CX} ${CY} L ${p.x} ${p.y}`}
            stroke="url(#eco-grad-cyan)" strokeWidth="1" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.55 + i * 0.1, duration: 0.8, ease: "easeOut" }}
          />
        ))}

        {/* Data-flow particles — tech connections */}
        {techPos.map((p, i) => (
          <g key={`tp-${i}`}>
            <circle r="2" fill="rgba(2,169,247,0.7)" filter="url(#eco-glow)">
              <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={`M ${CX} ${CY} L ${p.x} ${p.y}`} />
              <animate attributeName="opacity" values="0;0.8;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="1.5" fill="rgba(2,169,247,0.35)">
              <animateMotion dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" path={`M ${p.x} ${p.y} L ${CX} ${CY}`} begin={`${1 + i * 0.2}s`} />
              <animate attributeName="opacity" values="0;0.45;0" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${1 + i * 0.2}s`} />
            </circle>
          </g>
        ))}

        {/* Data-flow particles — AI connections */}
        {aiPos.map((p, i) => (
          <g key={`ap-${i}`}>
            <circle r="2" fill="rgba(6,182,212,0.65)" filter="url(#eco-glow)">
              <animateMotion dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" path={`M ${CX} ${CY} L ${p.x} ${p.y}`} />
              <animate attributeName="opacity" values="0;0.7;0" dur={`${2.8 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle r="1.5" fill="rgba(6,182,212,0.3)">
              <animateMotion dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" path={`M ${p.x} ${p.y} L ${CX} ${CY}`} begin={`${1.3 + i * 0.2}s`} />
              <animate attributeName="opacity" values="0;0.4;0" dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" begin={`${1.3 + i * 0.2}s`} />
            </circle>
          </g>
        ))}
      </svg>

      {/* ── Tech nodes (inner ring) ── */}
      {techNodes.map((node, i) => {
        const p = techPos[i];
        return (
          <motion.div
            key={node.label}
            className="absolute z-10"
            style={{
              left: `${(p.x / 640) * 100}%`,
              top: `${(p.y / 540) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.55 + i * 0.12,
              duration: 0.5,
              type: "spring",
              stiffness: 220,
              damping: 18,
            }}
          >
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-12 h-12 rounded-xl eco-node-inner flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <node.icon className="w-5 h-5 text-brand-blue" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] font-semibold eco-label whitespace-nowrap tracking-wide">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* ── AI nodes (outer ring) ── */}
      {aiNodes.map((node, i) => {
        const p = aiPos[i];
        return (
          <motion.div
            key={node.label}
            className="absolute z-10"
            style={{
              left: `${(p.x / 640) * 100}%`,
              top: `${(p.y / 540) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.75 + i * 0.12,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
          >
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-12 h-12 rounded-xl eco-node-outer flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <node.icon className="w-5 h-5 text-brand-cyan" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] font-semibold eco-label whitespace-nowrap tracking-wide">
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* ── Center hub ── */}
      <div
        className="absolute z-20"
        style={{
          left: `${(CX / 640) * 100}%`,
          top: `${(CY / 540) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 150, damping: 15 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-5 bg-brand-blue/[0.12] rounded-full blur-xl" />
            <div className="absolute -inset-3 bg-brand-cyan/[0.08] rounded-full blur-md" />
            <div className="relative w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-full bg-gradient-to-br from-brand-blue via-brand-blue to-brand-cyan flex items-center justify-center shadow-2xl shadow-brand-blue/30 border-2 border-white/20">
              <Users className="w-8 h-8 md:w-9 md:h-9 text-white" />
            </div>
          </motion.div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-xs md:text-sm font-bold whitespace-nowrap tracking-tight eco-hub-text">
              Your Customers
            </span>
            <span className="text-[9px] md:text-[10px] font-medium text-brand-blue/60 whitespace-nowrap">
              at the center of everything
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Ring legend ── */}
      <motion.div
        className="absolute top-[3%] left-1/2 -translate-x-1/2 flex items-center gap-6"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-blue" />
          <span className="text-[10px] font-semibold tracking-wide uppercase eco-label">Technology Layer</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-cyan" />
          <span className="text-[10px] font-semibold tracking-wide uppercase eco-label">AI &amp; Intelligence</span>
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Mobile: clean stacked layout with connection flow
   ═══════════════════════════════════════════════════ */
function MobileVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="md:hidden mt-14">
      {/* Customer hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-brand-blue/[0.12] rounded-full blur-lg" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-xl shadow-brand-blue/25 border-2 border-white/15">
            <Users className="w-7 h-7 text-white" />
          </div>
        </motion.div>
        <span className="mt-3 text-sm font-bold eco-hub-text">Your Customers</span>
        <span className="text-[10px] font-medium text-brand-blue/60">at the center</span>
      </motion.div>

      {/* Connecting line */}
      <motion.div
        className="w-px h-8 mx-auto eco-mobile-line"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{ transformOrigin: "top" }}
      />

      {/* Technology layer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-brand-blue" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-blue">
            Technology Layer
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {techNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
              className="flex items-center gap-3 p-3.5 rounded-xl eco-mobile-card-inner"
            >
              <node.icon className="w-5 h-5 text-brand-blue shrink-0" strokeWidth={1.8} />
              <span className="text-xs font-medium eco-label">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Connecting line */}
      <motion.div
        className="w-px h-8 mx-auto eco-mobile-line my-4"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{ transformOrigin: "top" }}
      />

      {/* AI layer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-brand-cyan" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-cyan">
            AI &amp; Intelligence Layer
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {aiNodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75 + i * 0.07, duration: 0.4 }}
              className="flex items-center gap-3 p-3.5 rounded-xl eco-mobile-card-outer"
            >
              <node.icon className="w-5 h-5 text-brand-cyan shrink-0" strokeWidth={1.8} />
              <span className="text-xs font-medium eco-label">{node.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Section export
   ═══════════════════════════════════════════════════ */
export function EcosystemSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden ecosystem-section">
      {/* Hero-style layered background */}
      <div className="absolute inset-0 eco-veil-gradient" />

      {/* Aurora blob — left */}
      <motion.div
        className="absolute eco-aurora-blob"
        style={{ left: "-8%", top: "10%", width: 550, height: 550 }}
        animate={{
          y: [-20, 20, -20],
          x: [-8, 12, -8],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora blob — right */}
      <motion.div
        className="absolute eco-aurora-blob-cyan"
        style={{ right: "-5%", bottom: "5%", width: 450, height: 450 }}
        animate={{
          y: [15, -15, 15],
          x: [10, -10, 10],
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Dot grid — right half */}
      <div className="absolute right-0 top-0 w-[50%] h-full eco-dot-grid" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] eco-bottom-fade" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="The Connected Stack"
          title="Everything Orbits Your Customer"
          subtitle="Technology and AI aren&rsquo;t separate line items — they&rsquo;re layers of one product your customer touches every day. We build them as one."
        />

        <DesktopVisualization />
        <MobileVisualization />

        {/* ── Bottom narrative ── */}
        <motion.div
          {...fadeUp}
          className="mt-12 md:mt-16 max-w-2xl mx-auto text-center"
        >
          {/* Merge equation */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
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
