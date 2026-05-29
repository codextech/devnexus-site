"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

type FAQItem = { question: string; answer: string };
type FAQSectionProps = { items: FAQItem[]; className?: string };

function FAQAccordion({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-fg transition-colors group-hover:text-blue">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-fg-faint transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-fg-muted">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ items, className }: FAQSectionProps) {
  return (
    <motion.div {...fadeUp} className={cn("mx-auto max-w-3xl", className)}>
      {items.map((item, i) => (
        <FAQAccordion key={i} {...item} />
      ))}
    </motion.div>
  );
}
