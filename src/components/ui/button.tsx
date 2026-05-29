"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/lib/use-magnetic";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "white"
  | "link";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  /** Cursor-aware pull — reserve for the page's single primary CTA. */
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

const variants: Record<Variant, string> = {
  primary:
    "bg-blue text-[#04121a] hover:bg-blue-press shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]",
  secondary:
    "bg-transparent text-fg border border-border hover:bg-surface hover:border-border-hi",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface",
  outline:
    "bg-transparent text-fg-muted border border-border hover:border-blue hover:text-blue",
  white: "bg-white text-[#0A0A0B] hover:bg-fg/90 shadow-sm",
  link: "text-fg hover:text-blue",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const mag = useMagnetic(6);
  const isMagnetic = magnetic && variant === "primary";

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-colors duration-200 cursor-pointer",
    variant === "link" ? "gap-1.5" : "rounded-[10px]",
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );

  const core = href ? (
    <Link
      href={href}
      className={classes}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );

  if (!isMagnetic) return core;

  return (
    <motion.div
      className="inline-flex"
      style={{ x: mag.x, y: mag.y }}
      onMouseMove={mag.onMouseMove}
      onMouseLeave={mag.onMouseLeave}
    >
      {core}
    </motion.div>
  );
}
