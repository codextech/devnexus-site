"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

function parseMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl md:text-2xl font-semibold text-white mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Blockquotes (multi-line)
    .replace(
      /^>\s*(.*(?:\n>\s*.*)*)/gm,
      (_, match) => {
        const text = match.replace(/^>\s*/gm, "").replace(/\n/g, "<br/>");
        return `<blockquote class="border-l-4 border-brand-blue pl-6 py-2 my-8 text-dark-400 italic">${text}</blockquote>`;
      }
    )
    // Ordered lists
    .replace(/^\d+\.\s+(.*$)/gm, '<li class="ml-6 list-decimal text-dark-300 leading-relaxed">$1</li>')
    // Unordered lists
    .replace(/^-\s+(.*$)/gm, '<li class="ml-6 list-disc text-dark-300 leading-relaxed">$1</li>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[hbluo])((?!^$).+)$/gm, '<p class="text-dark-300 leading-relaxed mb-4">$1</p>')
    // Remove empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, "")
    // Wrap consecutive list items in ul/ol
    .replace(
      /(<li class="ml-6 list-disc[^"]*">.*?<\/li>\n?)+/g,
      '<ul class="space-y-2 my-4">$&</ul>'
    )
    .replace(
      /(<li class="ml-6 list-decimal[^"]*">.*?<\/li>\n?)+/g,
      '<ol class="space-y-2 my-4">$&</ol>'
    );
}

export function CaseStudyBody({ content }: { content: string }) {
  const html = parseMarkdown(content);

  return (
    <motion.div
      {...fadeUp}
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
