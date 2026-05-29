import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

/** Static mono micro-label in a hairline pill (tech stack, service tags). */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
