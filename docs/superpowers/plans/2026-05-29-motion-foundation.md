# Motion Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add site-wide smooth inertia scroll (Lenis) and a full-replacement custom cursor (dot + lagging ring + contextual labels) to the existing DevNexus site, with complete reduced-motion / touch / keyboard fallbacks.

**Architecture:** Two new client providers mounted once at the root inside the existing `ThemeProvider`. `SmoothScrollProvider` wraps `lenis/react`'s `<ReactLenis root>` (no Zustand, no GSAP). `CustomCursor` reads hover intent through declarative `data-cursor` attributes via a single delegated `pointerover` listener — no global store. All existing Framer Motion reveals/parallax keep working because Lenis drives the real window scroll.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (`@theme inline`), `motion` (Framer Motion v12, imported as `motion/react`), and one new dependency: `lenis` (used via `lenis` core types + the `lenis/react` submodule).

---

## Verification approach (read before starting)

This repo has **no automated test harness** (no Jest/Vitest/Playwright in `package.json`), and the approved spec (§8) deliberately scoped dependencies to `lenis` only and set verification = **type-check + build + driven manual checks**. This slice is imperative DOM / requestAnimationFrame / motion code that unit tests would exercise poorly. So instead of TDD red-green steps, **every task's verification step is a concrete `tsc`/`build`/`dev` check with an expected result.** Do not add a test framework — that would contradict the approved spec.

Reference spec: `docs/superpowers/specs/2026-05-29-motion-foundation-design.md`.

---

## File structure

| File | Responsibility | Action |
|---|---|---|
| `package.json` | Add `lenis` dependency | Modify |
| `src/app/globals.css` | Neutralize native `scroll-behavior: smooth`; add `html.cursor-active { cursor: none }` rule | Modify |
| `src/lib/cursor.ts` | Typed `data-cursor` variants + label map + runtime guard | Create |
| `src/components/providers/smooth-scroll-provider.tsx` | Init Lenis, route-reset, anchor smooth-scroll, reduced-motion bail | Create |
| `src/components/ui/custom-cursor.tsx` | Dot + lagging ring + label; activation gate; pointer + hover delegation | Create |
| `src/app/layout.tsx` | Mount both providers inside `ThemeProvider` | Modify |
| `src/components/sections/home-selected-work.tsx` | Add `data-cursor="view"` to the 3 work-card links | Modify |
| `src/components/blocks/case-study-card.tsx` | Add `data-cursor="view"` to the card's root link | Modify |

---

## Task 1: Add `lenis` dependency and prepare global CSS

**Files:**
- Modify: `package.json`
- Modify: `src/app/globals.css:97-104` (the `html { scroll-behavior }` and `:focus-visible` region)

- [ ] **Step 1: Install lenis**

Run:
```bash
npm install lenis
```
Expected: `package.json` `dependencies` now contains `"lenis": "^1.x.x"`, install completes with no errors.

- [ ] **Step 2: Neutralize native smooth scroll**

Lenis explicitly conflicts with CSS `scroll-behavior: smooth`. In `src/app/globals.css`, change the `html` rule (currently lines 97-99):

```css
html {
  scroll-behavior: auto;
}
```

- [ ] **Step 3: Add the custom-cursor hide rule**

Immediately after the `:focus-visible` rule (currently ends line 104 in `src/app/globals.css`), add:

```css
/* ── Custom cursor: hide native pointer only while the JS cursor is mounted ──
   Class is added by CustomCursor on desktop fine-pointer + motion-allowed only.
   !important is required to beat Tailwind's cursor-* utilities. */
html.cursor-active,
html.cursor-active * {
  cursor: none !important;
}
```

- [ ] **Step 4: Verify the build still compiles**

Run:
```bash
npm run build
```
Expected: build succeeds (the CSS change is inert until the cursor mounts; the dependency is unused so far but installed).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/app/globals.css
git commit -m "chore(motion): add lenis dep, neutralize native smooth-scroll, add cursor-hide rule"
```

---

## Task 2: Cursor constants module

**Files:**
- Create: `src/lib/cursor.ts`

- [ ] **Step 1: Create the module**

Create `src/lib/cursor.ts` with the full contents:

```ts
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
```

- [ ] **Step 2: Type-check the module**

Run:
```bash
npx tsc --noEmit
```
Expected: no type errors (this is the logic-verification gate for `cursor.ts`, in place of a unit test).

- [ ] **Step 3: Commit**

```bash
git add src/lib/cursor.ts
git commit -m "feat(motion): add typed data-cursor variant constants"
```

---

## Task 3: SmoothScrollProvider

**Files:**
- Create: `src/components/providers/smooth-scroll-provider.tsx`
- Modify: `src/app/layout.tsx:6-8` (imports) and `:136-140` (provider tree)

- [ ] **Step 1: Create the provider**

Create `src/components/providers/smooth-scroll-provider.tsx` with the full contents:

```tsx
"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Lenis feel — expo-out easing matching the site's EASE [0.16, 1, 0.3, 1].
// All values tunable here. ReactLenis drives requestAnimationFrame itself
// (autoRaf defaults to true) so no manual RAF loop is needed.
const lenisOptions = {
  duration: 1.1,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false, // native touch scrolling — expected on mobile
  orientation: "vertical" as const,
};

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Reset scroll to top on route change (App Router does not always do this
  // cleanly under a JS scroll layer).
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // Smooth in-page anchor links (href="#id").
  useEffect(() => {
    if (reduceMotion) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduceMotion]);

  // Reduced motion → native scroll, no Lenis.
  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 2: Wire it into the root layout (imports)**

In `src/app/layout.tsx`, add after the existing `Footer` import (line 5):

```tsx
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
```

> Note: `CustomCursor` does not exist yet (Task 4). This import will make the build fail until Task 4 is complete — that is expected. If you are executing strictly one task at a time and need a green build at the end of Task 3, add only the `SmoothScrollProvider` import now and add the `CustomCursor` import in Task 4. The provider tree below shows the final state.

- [ ] **Step 3: Wrap the provider tree**

In `src/app/layout.tsx`, replace the `ThemeProvider` block (currently lines 136-140):

```tsx
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
```

with:

```tsx
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
```

> `<ReactLenis root>` binds to the window/`<html>` and renders children without an extra wrapper element, so existing layout/markup is unaffected.

- [ ] **Step 4: Verify build + smooth scroll**

Run:
```bash
npm run build && npm run dev
```
Expected: build succeeds (after Task 4 supplies `CustomCursor`; if testing Task 3 alone, temporarily render `<SmoothScrollProvider>` without the `<CustomCursor />` line). In the browser at `http://localhost:3000`:
- Mouse-wheel scrolling on the home page glides with momentum/easing instead of jumping.
- Navigating home → `/work` → a case study resets scroll to the top each time.
- Clicking an in-page `#anchor` link glides smoothly with an 80px offset.

- [ ] **Step 5: Commit**

```bash
git add src/components/providers/smooth-scroll-provider.tsx src/app/layout.tsx
git commit -m "feat(motion): site-wide Lenis smooth scroll with route-reset and anchor handling"
```

---

## Task 4: CustomCursor component

**Files:**
- Create: `src/components/ui/custom-cursor.tsx`
- Depends on: `src/lib/cursor.ts` (Task 2), mounted in `src/app/layout.tsx` (Task 3)

- [ ] **Step 1: Create the component**

Create `src/components/ui/custom-cursor.tsx` with the full contents:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  CURSOR_LABELS,
  CURSOR_RING_SIZE,
  isCursorVariant,
  type CursorVariant,
} from "@/lib/cursor";

// Selector for elements that should trigger the "interactive" cursor even
// without an explicit data-cursor attribute.
const INTERACTIVE =
  "[data-cursor], a, button, [role='button'], input, textarea, select, label";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");

  // Raw pointer position (dot tracks instantly).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Ring lags behind with spring physics.
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  // Activation gate: desktop fine pointer AND motion allowed. Decided on the
  // client in an effect so SSR/first render returns null (no hydration drift).
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setActive(true);
    document.documentElement.classList.add("cursor-active");
    return () => document.documentElement.classList.remove("cursor-active");
  }, []);

  // Track pointer movement + hover intent via delegation.
  useEffect(() => {
    if (!active) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (!el) {
        setVariant("default");
        return;
      }
      const explicit = el.getAttribute("data-cursor");
      setVariant(isCursorVariant(explicit) ? explicit : "link");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, [active, x, y]);

  if (!active) return null;

  const label = CURSOR_LABELS[variant];
  const ringSize = CURSOR_RING_SIZE[variant];

  return (
    <>
      {/* Dot — tracks instantly. Centered via negative margins so we don't
          fight motion's transform with Tailwind translate utilities. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-blue"
        style={{ x, y, marginLeft: -3, marginTop: -3 }}
      />
      {/* Ring — lags with spring; grows + shows a label on interactive targets. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-blue text-blue"
        style={{
          x: ringX,
          y: ringY,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
            {label}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
```

> The `marginLeft`/`marginTop` change with `ringSize`, so re-centering happens automatically as the ring grows. Movement uses `MotionValue`/`useSpring` only — variant state is the single React re-render trigger, and it only changes on hover transitions, not per frame.

- [ ] **Step 2: Confirm the import is present in layout**

Ensure `src/app/layout.tsx` imports and renders `<CustomCursor />` (added in Task 3, Step 2-3). If you deferred the import in Task 3, add it now:

```tsx
import { CustomCursor } from "@/components/ui/custom-cursor";
```

- [ ] **Step 3: Verify build + cursor behavior**

Run:
```bash
npm run build && npm run dev
```
Expected: build succeeds. In the browser on a desktop pointer:
- The native cursor is hidden; a small blue dot tracks the pointer instantly and a blue ring follows with a slight lag.
- Hovering any `<a>`/`<button>` grows the ring (to ~48px); no label.
- The ring re-centers correctly as it grows (stays centered on the pointer).

- [ ] **Step 4: Verify reduced-motion and touch fallbacks**

In Chrome DevTools:
- **Reduced motion:** Rendering tab → "Emulate CSS prefers-reduced-motion: reduce" → reload. Expected: native cursor returns (no custom cursor), and scrolling is native (no Lenis momentum).
- **Touch:** Device toolbar → a mobile device → reload. Expected: native cursor (no custom cursor element), native touch scrolling.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/custom-cursor.tsx src/app/layout.tsx
git commit -m "feat(motion): full-replacement custom cursor (dot + lagging ring + labels)"
```

---

## Task 5: `data-cursor="view"` on work cards

**Files:**
- Modify: `src/components/sections/home-selected-work.tsx:45-47` and `:103-105`
- Modify: `src/components/blocks/case-study-card.tsx` (root link element)

- [ ] **Step 1: Add data-cursor to the featured home work card**

In `src/components/sections/home-selected-work.tsx`, the featured `<Link>` currently starts (lines 45-47):

```tsx
          <Link
            href="/work/tophealth-patient-intake"
            className="group grid overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi lg:grid-cols-2"
          >
```

Add the attribute:

```tsx
          <Link
            href="/work/tophealth-patient-intake"
            data-cursor="view"
            className="group grid overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi lg:grid-cols-2"
          >
```

- [ ] **Step 2: Add data-cursor to the compact home work cards**

In the same file, the compact-pair `<Link>` currently starts (lines 103-105):

```tsx
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi"
              >
```

Add the attribute:

```tsx
              <Link
                href={c.href}
                data-cursor="view"
                className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-colors hover:border-border-hi"
              >
```

- [ ] **Step 3: Add data-cursor to the case-study card**

Open `src/components/blocks/case-study-card.tsx`. Find the outermost clickable element (the `<Link>` / anchor that wraps the whole card) and add `data-cursor="view"` to it, alongside its existing props. Example shape (match the actual attributes already present — only add `data-cursor="view"`):

```tsx
    <Link href={`/work/${study.slug}`} data-cursor="view" className={/* existing classes */}>
```

- [ ] **Step 4: Verify the "View" label appears**

Run:
```bash
npm run dev
```
Expected: on the home page "Selected work" section and the `/work` grid, hovering a project card grows the ring to ~72px and shows the mono-caps label **"View"**. Hovering a plain button/link still shows only the grown ring with no label.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/home-selected-work.tsx src/components/blocks/case-study-card.tsx
git commit -m "feat(motion): opt work cards into the 'View' cursor via data-cursor"
```

---

## Task 6: Full verification pass

**Files:** none (verification only; commit only if a tweak is needed).

- [ ] **Step 1: Clean production build**

Run:
```bash
npm run build
```
Expected: build completes with **no errors and no hydration warnings**.

- [ ] **Step 2: Type + lint check**

Run:
```bash
npx tsc --noEmit && npm run lint
```
Expected: no type errors; lint passes (or only pre-existing warnings unrelated to the new files).

- [ ] **Step 3: Behavioral pass (desktop)**

Run `npm run dev` and confirm on a desktop pointer:
- Smooth momentum scroll across the home page and at least one long page (`/blog` or a case study) — not sluggish for reading.
- Cursor: dot instant, ring lags, grows on links/buttons, shows "View" on work cards.
- Route change (home → work → case study → blog) resets scroll to top each time.
- An in-page anchor link glides smoothly.

- [ ] **Step 4: Fallback pass**

- DevTools → emulate `prefers-reduced-motion: reduce` → native scroll + native cursor.
- DevTools → device toolbar (mobile) → native touch scroll + native cursor, no custom-cursor DOM nodes.

- [ ] **Step 5: Lighthouse spot-check**

Run a Lighthouse Performance audit (desktop) on the home page. Expected: no meaningful regression versus the pre-change baseline (the RAF loop and two fixed cursor nodes are cheap). Note the score in the PR/summary.

- [ ] **Step 6: Use the verify skill**

Invoke the `verify` (or `run`) skill to drive the real app and confirm the desktop behavioral pass end-to-end before declaring the slice complete.

---

## Self-review

**1. Spec coverage** (against `2026-05-29-motion-foundation-design.md`):
- §3.1 smooth scroll, route reset, anchor capture, reduced-motion bail → Task 3. ✓
- §3.2 cursor via `data-cursor` delegation, no store → Tasks 2, 4, 5. ✓
- §3.3 existing Framer Motion untouched → no migration tasks (correct); verified in Task 6 Step 3. ✓
- §4.1 Lenis options (duration 1.1, expo easing, smoothWheel, syncTouch:false, vertical) → Task 3 Step 1. ✓
- §4.2 activation gate, dot+ring+label, state table, MotionValue/spring, brand blue → Task 4. ✓
- §4.3 cursor constants module → Task 2. ✓
- §5 files (providers, cursor, cursor.ts, layout, globals.css cursor rule + scroll-behavior, work cards, package.json) → Tasks 1-5. ✓
- §6 add `lenis` only → Task 1. ✓
- §7 reduced-motion/touch/SSR → Tasks 3, 4 + verified Task 4 Step 4 / Task 6 Step 4. ✓
- §8 verification plan → Task 6. ✓

**2. Placeholder scan:** All code blocks are complete. The one non-literal edit (case-study-card root link, Task 5 Step 3) gives an exact attribute + exact target with an example, because the file's other attributes vary and must be preserved — instruction is unambiguous. No TBD/TODO.

**3. Type consistency:** `CursorVariant`, `CURSOR_LABELS`, `CURSOR_RING_SIZE`, `isCursorVariant` defined in Task 2 are used with matching names/signatures in Task 4. `LenisRef` and `lenisRef.current?.lenis?.scrollTo(...)` consistent within Task 3. `data-cursor="view"` matches the `"view"` member of `CURSOR_VARIANTS`. ✓
