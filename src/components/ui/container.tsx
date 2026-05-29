import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  /** Expose a 12-column grid for editorial layouts. */
  grid?: boolean;
};

export function Container({
  children,
  className,
  as: Component = "div",
  grid = false,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
        grid && "grid grid-cols-12 gap-x-6",
        className,
      )}
    >
      {children}
    </Component>
  );
}
