"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Layers, Bot, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";
import { Tag } from "@/components/ui/tag";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function Node({
  icon: Icon,
  label,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  accent?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-[12px] border bg-surface px-4 py-3",
        accent ? "border-blue/40" : "border-border",
      )}
    >
      {accent && !reduce ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-blue/40"
          animate={{ opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-[8px] border",
          accent ? "border-blue/40 text-blue" : "border-border text-fg-muted",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-fg">
        {label}
      </span>
    </div>
  );
}

function Connector() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={pop}
      className="relative mx-auto my-1 h-6 w-px bg-border md:mx-3 md:my-0 md:h-px md:w-auto md:min-w-[2rem] md:flex-1"
    >
      {!reduce ? (
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue md:block"
          style={{ boxShadow: "0 0 8px var(--blue)" }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 1.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
        />
      ) : null}
    </motion.div>
  );
}

/** YOUR STACK → AGENT (acts across CRM·DB·Voice·Tools) → OUTCOME. */
export function AgentDiagram({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("flex flex-col items-stretch md:flex-row md:items-center", className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.div variants={pop}>
        <Node icon={Layers} label="Your stack" />
      </motion.div>
      <Connector />
      <motion.div variants={pop} className="flex flex-col items-center gap-3">
        <Node icon={Bot} label="Agent" accent />
        <div className="grid grid-cols-2 gap-2">
          <Tag>CRM</Tag>
          <Tag>Database</Tag>
          <Tag>Voice</Tag>
          <Tag>Tools</Tag>
        </div>
      </motion.div>
      <Connector />
      <motion.div variants={pop}>
        <Node icon={Target} label="Outcome" accent />
      </motion.div>
    </motion.div>
  );
}
