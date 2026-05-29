import Image from "next/image";
import { cn } from "@/lib/utils";

type FramedFigureProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16 / 10" — reserves space to avoid CLS. */
  aspect?: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Real screenshot in a hairline frame with an optional mono caption. */
export function FramedFigure({
  src,
  alt,
  aspect = "16 / 10",
  caption,
  sizes = "(max-width: 768px) 100vw, 700px",
  priority = false,
  className,
}: FramedFigureProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[14px] border border-border bg-surface",
        className,
      )}
    >
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
