"use client";

import { motion, useReducedMotion } from "motion/react";
import { Layers, Bot, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

function Node({
  icon: Icon,
  label,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[12px] border bg-surface px-4 py-3",
        accent ? "border-blue/40" : "border-border",
      )}
    >
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
    <div className="relative mx-auto my-1 h-6 w-px bg-border md:mx-3 md:my-0 md:h-px md:w-auto md:min-w-[2rem] md:flex-1">
      {!reduce ? (
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue md:block"
          style={{ boxShadow: "0 0 8px var(--blue)" }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
        />
      ) : null}
    </div>
  );
}

/** YOUR STACK → AGENT (acts across CRM·DB·Voice·Tools) → OUTCOME. */
export function AgentDiagram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch md:flex-row md:items-center",
        className,
      )}
    >
      <Node icon={Layers} label="Your stack" />
      <Connector />
      <div className="flex flex-col items-center gap-3">
        <Node icon={Bot} label="Agent" accent />
        <div className="grid grid-cols-2 gap-2">
          <Tag>CRM</Tag>
          <Tag>Database</Tag>
          <Tag>Voice</Tag>
          <Tag>Tools</Tag>
        </div>
      </div>
      <Connector />
      <Node icon={Target} label="Outcome" accent />
    </div>
  );
}
