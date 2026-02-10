import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "blue" | "cyan" | "neutral";
  children: React.ReactNode;
  className?: string;
};

const variants = {
  blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
  cyan: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
  neutral: "bg-dark-700 text-dark-300 border-dark-600",
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border font-[family-name:var(--font-geist-mono)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
