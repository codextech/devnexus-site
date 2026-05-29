// Declarative cursor variants. Elements opt in with data-cursor="view" etc.
// The CustomCursor component reads these via event delegation.

export const CURSOR_VARIANTS = ["default", "link", "view", "play"] as const;

export type CursorVariant = (typeof CURSOR_VARIANTS)[number];

/** Label shown inside the ring for a given variant (null = no label). */
export const CURSOR_LABELS: Record<CursorVariant, string | null> = {
  default: null,
  link: null,
  view: "View",
  play: "Play",
};

/** Ring diameter in px for a given variant. */
export const CURSOR_RING_SIZE: Record<CursorVariant, number> = {
  default: 32,
  link: 48,
  view: 72,
  play: 72,
};

/** Narrow an arbitrary attribute string to a known CursorVariant. */
export function isCursorVariant(value: string | null): value is CursorVariant {
  return value !== null && (CURSOR_VARIANTS as readonly string[]).includes(value);
}
