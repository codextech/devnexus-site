"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
  className?: string;
};

function FAQAccordion({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item-border">
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-base font-medium faq-question-text group-hover:text-brand-blue transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 faq-chevron flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm faq-answer-text leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ items, className }: FAQSectionProps) {
  return (
    <motion.div {...fadeUp} className={cn("max-w-3xl mx-auto", className)}>
      {items.map((item, i) => (
        <FAQAccordion key={i} {...item} />
      ))}
    </motion.div>
  );
}
