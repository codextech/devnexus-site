import { createElement } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  /** Expose a 12-column grid for editorial layouts. */
  grid?: boolean;
};

// Rendered via createElement rather than <Component>: @react-three/fiber
// augments the global JSX namespace, which otherwise collapses a polymorphic
// element's `children` type to `never`. createElement sidesteps that check
// while keeping behaviour identical.
export function Container({
  children,
  className,
  as: Component = "div",
  grid = false,
}: ContainerProps) {
  return createElement(
    Component,
    {
      className: cn(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
        grid && "grid grid-cols-12 gap-x-6",
        className,
      ),
    },
    children,
  );
}
