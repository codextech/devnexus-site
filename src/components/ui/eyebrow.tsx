import { cn } from "@/lib/utils";

type EyebrowProps = {
  /** Optional section index, e.g. "02" */
  index?: string;
  label: string;
  className?: string;
};

/** Numbered mono section label: ── 02 / WHAT WE DO */
export function Eyebrow({ index, label, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]",
        className,
      )}
    >
      <span className="h-px w-6 bg-border-hi" aria-hidden="true" />
      {index ? <span className="text-blue">{index}</span> : null}
      <span className="text-fg-faint">{label}</span>
    </span>
  );
}
