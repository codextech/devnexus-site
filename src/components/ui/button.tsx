import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
);

const variants = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-hover shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30",
  secondary:
    "bg-dark-800 text-dark-100 hover:bg-dark-700 border border-dark-600 hover:border-dark-500",
  ghost: "text-dark-300 hover:text-white hover:bg-white/5",
  outline:
    "border border-dark-500 text-dark-200 hover:border-brand-blue hover:text-brand-blue bg-transparent",
  white:
    "bg-white text-dark-950 hover:bg-dark-50 shadow-lg",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
