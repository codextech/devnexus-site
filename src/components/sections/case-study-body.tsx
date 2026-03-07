"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

function parseMarkdown(content: string): string {
  // Extract and protect code blocks before other processing
  const codeBlocks: string[] = [];
  let processed = content.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const idx = codeBlocks.length;
      const langLabel = lang
        ? `<span class="text-xs font-mono text-brand-blue/70 uppercase tracking-widest">${lang}</span>`
        : "";
      codeBlocks.push(
        `<div class="my-6 rounded-xl overflow-hidden border border-white/8 bg-dark-900">` +
          (lang
            ? `<div class="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-dark-800">${langLabel}</div>`
            : "") +
          `<pre class="overflow-x-auto p-4 text-sm font-mono text-dark-200 leading-relaxed"><code>${code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre></div>`
      );
      return `%%CODEBLOCK_${idx}%%`;
    }
  );

  // Inline code
  processed = processed.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-dark-800 text-brand-blue text-sm font-mono">$1</code>'
  );

  // Markdown tables
  processed = processed.replace(
    /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/g,
    (table) => {
      const rows = table.trim().split("\n");
      const headers = rows[0]
        .split("|")
        .filter((_, i, a) => i > 0 && i < a.length - 1)
        .map((h) => `<th class="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap">${h.trim()}</th>`)
        .join("");
      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .filter((_, i, a) => i > 0 && i < a.length - 1)
            .map((c) => `<td class="px-4 py-3 text-sm text-dark-300 border-t border-white/5">${c.trim()}</td>`)
            .join("");
          return `<tr class="hover:bg-white/2 transition-colors">${cells}</tr>`;
        })
        .join("");
      return (
        `<div class="my-8 overflow-x-auto rounded-xl border border-white/8">` +
        `<table class="w-full text-left border-collapse">` +
        `<thead><tr class="bg-dark-800">${headers}</tr></thead>` +
        `<tbody>${bodyRows}</tbody>` +
        `</table></div>`
      );
    }
  );

  // Horizontal rule
  processed = processed.replace(/^---$/gm, '<hr class="border-white/8 my-10" />');

  // Headers
  processed = processed
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl md:text-2xl font-semibold text-white mt-12 mb-5 pb-2 border-b border-white/8">$1</h2>');

  // Bold + italic
  processed = processed
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Blockquotes
  processed = processed.replace(
    /^>\s*(.*(?:\n>\s*.*)*)/gm,
    (_, match) => {
      const text = match.replace(/^>\s*/gm, "").replace(/\n/g, "<br/>");
      return `<blockquote class="border-l-4 border-brand-blue pl-6 py-2 my-8 text-dark-400 italic">${text}</blockquote>`;
    }
  );

  // Links
  processed = processed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-brand-blue hover:text-brand-blue-hover underline underline-offset-2 transition-colors">$1</a>'
  );

  // Lists
  processed = processed
    .replace(/^\d+\.\s+(.*$)/gm, '<li class="ml-6 list-decimal text-dark-300 leading-relaxed">$1</li>')
    .replace(/^-\s+(.*$)/gm, '<li class="ml-6 list-disc text-dark-300 leading-relaxed">$1</li>');

  // Paragraphs
  processed = processed
    .replace(/^(?!<[hbuplod%])((?!^$).+)$/gm, '<p class="text-dark-300 leading-relaxed mb-4">$1</p>')
    .replace(/<p class="[^"]*"><\/p>/g, "");

  // Wrap lists
  processed = processed
    .replace(/(<li class="ml-6 list-disc[^"]*">.*?<\/li>\n?)+/g, '<ul class="space-y-2 my-4">$&</ul>')
    .replace(/(<li class="ml-6 list-decimal[^"]*">.*?<\/li>\n?)+/g, '<ol class="space-y-2 my-4">$&</ol>');

  // Restore code blocks
  codeBlocks.forEach((block, idx) => {
    processed = processed.replace(`%%CODEBLOCK_${idx}%%`, block);
  });

  return processed;
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
