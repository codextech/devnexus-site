"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Cursor-reveal wordmark. A faint outline draws in on mount; moving the cursor
 * over it reveals a brand-blue→cyan gradient through a radial mask. Adapted from
 * the nurui hover-footer effect to the DevNexus palette + display font, and to
 * this project's token system (the site's dark theme isn't Tailwind `dark:`,
 * so strokes use semantic tokens rather than dark: variants).
 */
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase", className)}
      style={{ fontFamily: "var(--font-display), sans-serif" }}
    >
      <defs>
        <linearGradient
          id="dn-textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#02A9F7" />
              <stop offset="35%" stopColor="#06b6d4" />
              <stop offset="65%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="dn-revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="dn-textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#dn-revealMask)" />
        </mask>
      </defs>

      {/* Faint static outline */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-fg/[0.12] text-7xl font-bold"
        style={{ opacity: hovered ? 0.45 : 0.2 }}
      >
        {text}
      </text>

      {/* Brand-blue outline that draws in on mount */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-blue/60 text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Gradient revealed through the cursor mask */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#dn-textGradient)"
        strokeWidth="0.3"
        mask="url(#dn-textMask)"
        className="fill-transparent text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

/** Subtle brand-blue radial glow that sits behind the footer wordmark. */
export const FooterBackgroundGradient = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 120%, transparent 45%, rgba(2,169,247,0.10) 100%)",
      }}
    />
  );
};
