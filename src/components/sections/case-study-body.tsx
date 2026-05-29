"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

function parseMarkdown(content: string): string {
  const codeBlocks: string[] = [];
  let processed = content.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) => {
      const idx = codeBlocks.length;
      const langLabel = lang
        ? `<span class="text-xs font-mono text-blue/70 uppercase tracking-widest">${lang}</span>`
        : "";
      codeBlocks.push(
        `<div class="my-6 rounded-xl overflow-hidden border border-border bg-surface">` +
          (lang
            ? `<div class="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-2">${langLabel}</div>`
            : "") +
          `<pre class="overflow-x-auto p-4 text-sm font-mono text-fg-muted leading-relaxed"><code>${code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre></div>`
      );
      return `%%CODEBLOCK_${idx}%%`;
    }
  );

  processed = processed.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-surface-2 text-blue text-sm font-mono">$1</code>'
  );

  processed = processed.replace(
    /(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)*)/g,
    (table) => {
      const rows = table.trim().split("\n");
      const headers = rows[0]
        .split("|")
        .filter((_, i, a) => i > 0 && i < a.length - 1)
        .map((h) => `<th class="px-4 py-3 text-left text-sm font-semibold text-fg whitespace-nowrap">${h.trim()}</th>`)
        .join("");
      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cells = row
            .split("|")
            .filter((_, i, a) => i > 0 && i < a.length - 1)
            .map((c) => `<td class="px-4 py-3 text-sm text-fg-muted border-t border-border">${c.trim()}</td>`)
            .join("");
          return `<tr class="transition-colors hover:bg-surface-2/50">${cells}</tr>`;
        })
        .join("");
      return (
        `<div class="my-8 overflow-x-auto rounded-xl border border-border">` +
        `<table class="w-full text-left border-collapse">` +
        `<thead><tr class="bg-surface-2">${headers}</tr></thead>` +
        `<tbody>${bodyRows}</tbody>` +
        `</table></div>`
      );
    }
  );

  processed = processed.replace(/^---$/gm, '<hr class="border-border my-10" />');

  processed = processed
    .replace(/^### (.*$)/gm, '<h3 class="font-display text-lg font-bold text-fg mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="font-display text-xl md:text-2xl font-bold text-fg mt-12 mb-5 pb-2 border-b border-border">$1</h2>');

  processed = processed
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-fg">$1</strong>')
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  processed = processed.replace(
    /^>\s*(.*(?:\n>\s*.*)*)/gm,
    (_, match) => {
      const text = match.replace(/^>\s*/gm, "").replace(/\n/g, "<br/>");
      return `<blockquote class="border-l-2 border-blue pl-6 py-2 my-8 text-fg-muted italic">${text}</blockquote>`;
    }
  );

  processed = processed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue hover:text-blue-press underline underline-offset-2 transition-colors">$1</a>'
  );

  processed = processed
    .replace(/^\d+\.\s+(.*$)/gm, '<li class="ml-6 list-decimal text-fg-muted leading-relaxed">$1</li>')
    .replace(/^-\s+(.*$)/gm, '<li class="ml-6 list-disc text-fg-muted leading-relaxed">$1</li>');

  processed = processed
    .replace(/^(?!<[hbuplod%])((?!^$).+)$/gm, '<p class="text-fg-muted leading-relaxed mb-4">$1</p>')
    .replace(/<p class="[^"]*"><\/p>/g, "");

  processed = processed
    .replace(/(<li class="ml-6 list-disc[^"]*">.*?<\/li>\n?)+/g, '<ul class="space-y-2 my-4">$&</ul>')
    .replace(/(<li class="ml-6 list-decimal[^"]*">.*?<\/li>\n?)+/g, '<ol class="space-y-2 my-4">$&</ol>');

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
