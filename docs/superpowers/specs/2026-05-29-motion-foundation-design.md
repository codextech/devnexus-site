# Motion Foundation — Design Spec

- **Date:** 2026-05-29
- **Branch:** `rebranding`
- **Status:** Approved (design); pending implementation plan
- **Slice:** 1 of N in the Lusion-style enhancement program (see *Future slices*)

---

## 1. Background

DevNexus.co is an existing, production-ready Next.js 16 / React 19 / Tailwind v4 site that was just rebranded to a **"Precision Instrument"** aesthetic (dark-first `#0A0A0B`, single brand-blue accent `#02A9F7`, DM Sans / Space Grotesk / Geist Mono, hairline borders, mono eyebrows). It already implements ~70% of the "Lusion-style" interaction ingredients in 2D form via Framer Motion (`motion/react`): magnetic buttons (`use-magnetic.ts`), clip-reveal kinetic headlines, reveal-on-scroll (`whileInView` + a stagger library on `EASE [0.16,1,0.3,1]`), hover-reveal work cards, a logo marquee, and count-up metrics.

The "3D / WebGL Rebuild Brief" (lusion.co reference) reads as a greenfield rebuild, but the site is neither greenfield nor un-rebranded. A literal rebuild would discard the just-shipped rebrand, MDX content (3 case studies, 5 blog posts), 6 services with data, working SEO/JSON-LD, OG image generation, the contact API, and the dark/light theme system.

### Decisions locked during brainstorming

1. **Approach: Enhance in place.** Keep the brand, content, SEO, and existing components; add only the premium layer that is genuinely missing.
2. **First slice: Motion foundation.** Smooth inertia scroll + custom cursor + scroll access + reduced-motion/mobile fallbacks. Highest "expensive feel" ROI, low risk (touches no content), and it is the infrastructure later slices build on.
3. **Accent: keep brand blue `#02A9F7`.** No new accent; effects stay on-brand.
4. **Cursor: full replacement + labels** on desktop pointer devices. Touch / keyboard / reduced-motion always keep the native cursor.
5. **Dependency stack: Lean.** Add only `lenis`. Reuse Framer Motion for reveals and scrubbed parallax. Defer GSAP/ScrollTrigger and Zustand to the exact later slices that need them.

---

## 2. Goal & scope

Add the missing "expensive feel" layer **site-wide**, reusing what exists, adding exactly one dependency (`lenis`):

- Smooth inertia scroll (Lenis) on every route.
- Full-replacement custom cursor (dot + lagging ring + contextual labels), desktop-pointer only.
- Scroll access for current and future effects via Lenis's `useLenis` hook and the existing Framer Motion `useScroll`.
- Graceful, complete fallbacks for reduced-motion, touch, and keyboard users.

### Out of scope (deferred to later slices)

GSAP / ScrollTrigger, Zustand global store, the WebGL/R3F hero, route page-transition overlays, and the preloader/% counter. None of these are introduced here.

---

## 3. Architecture

Two new client providers mounted once at the root; **no global state store**.

```
src/app/layout.tsx (server component)
└─ <SmoothScrollProvider>        ← NEW (client): inits Lenis, RAF loop, route-reset, anchor capture
   ├─ <CustomCursor />           ← NEW (client): renders once; returns null on touch/keyboard/reduced-motion
   ├─ <Header /> <Footer />      ← unchanged
   └─ {children}                 ← all pages scroll smoothly; no per-page changes required
```

### 3.1 Smooth scroll

- Use **`lenis/react`'s `<ReactLenis root>`** — a submodule of the same `lenis` package (still one dependency), maintained, exposes a `useLenis` hook, and manages the requestAnimationFrame lifecycle for the App Router.
- The `SmoothScrollProvider` wraps `<ReactLenis root options={...}>` and adds:
  - **Route reset:** on `usePathname()` change, scroll to top immediately (`lenis.scrollTo(0, { immediate: true })`) so navigation does not inherit the previous page's scroll position.
  - **Anchor capture:** intercept clicks on in-page `#anchor` links and route them through `lenis.scrollTo(targetEl, { offset })` for smooth in-page jumps. External and cross-route links are untouched.
  - **Reduced-motion bail:** when `prefers-reduced-motion: reduce`, do **not** initialize Lenis at all — render children with native scroll. (Implemented by conditionally rendering `<ReactLenis>` vs. a passthrough fragment based on a client-side reduced-motion check.)

### 3.2 Custom cursor — no store, declarative opt-in

- The cursor reads hover intent through **declarative `data-cursor` attributes**, detected by a **single delegated `pointerover` / `pointerout` listener on `document`**. Any element opts in with `data-cursor="view"` (etc.); components stay fully decoupled and nothing imports a store.
- Default interactive elements (`a`, `button`, `[role="button"]`, inputs) trigger the "grow" state automatically without needing an attribute. Labels appear only when a `data-cursor` value maps to one.

### 3.3 Scroll-reactive effects

- Keep using Framer Motion `useScroll` / `useTransform` (already in the codebase) for component-level scroll progress. Lenis drives the real window scroll position and still fires native `scroll` events, so **all existing `whileInView` reveals and `useScroll` parallax keep working unchanged** — including the `HeroVisual` mouse-parallax tilt and the `Header` scroll-state listener. No migration of existing motion code is required.

---

## 4. Component specifications

### 4.1 `SmoothScrollProvider` — `src/components/providers/smooth-scroll-provider.tsx`

- **Purpose:** Initialize and own smooth scroll for the whole app; reset scroll on navigation; smooth in-page anchors; disable cleanly under reduced-motion.
- **Props:** `{ children: React.ReactNode }`.
- **Depends on:** `lenis/react` (`ReactLenis`, `useLenis`), `next/navigation` (`usePathname`), Framer Motion `useReducedMotion`.
- **Lenis options (single config object, all tunable):**
  - `duration: 1.1`
  - `easing`: expo-out style matching the site's `EASE` feel, e.g. `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - `smoothWheel: true`
  - `syncTouch: false` (native touch scrolling — expected on mobile)
  - `orientation: 'vertical'`
- **Behavior contract:** When reduced-motion is on, the component renders `children` directly (no Lenis). When off, it wraps with `<ReactLenis root>` and registers the route-reset effect + anchor click handler.

### 4.2 `CustomCursor` — `src/components/ui/custom-cursor.tsx`

- **Purpose:** Replace the native pointer on desktop with a dot + lagging ring + contextual label.
- **Activation gate (all must pass, checked client-side in `useEffect`):** `matchMedia('(pointer: fine)')` matches **and** reduced-motion is off. Otherwise the component returns `null` and the native cursor remains. Returns `null` during SSR and on first client render until the effect confirms activation (prevents hydration mismatch).
- **Rendering when active:**
  - Adds class `cursor-active` to `<html>` (CSS sets `cursor: none`). Removes it on unmount.
  - **Dot:** small (~6px) brand-blue dot tracking the pointer instantly (MotionValue x/y set on `pointermove`).
  - **Ring:** ~32px brand-blue stroked circle following with spring lag (`useSpring` of the same MotionValues).
  - **Label:** small mono-caps text that fades in next to/inside the ring when the active `data-cursor` state has a label.
- **State machine (via delegated `pointerover`/`pointerout` on `document`):**

  | Target | Ring size | Label |
  |---|---|---|
  | Default (empty space) | ~32px | none |
  | `a`, `button`, `[role="button"]`, inputs, `data-cursor="link"` | ~48px, subtle fill | none |
  | `data-cursor="view"` (work / case-study cards) | ~72px | "View" |
  | `data-cursor="play"` (future video/showreel) | ~72px | "Play" |

- **Performance:** all motion via Framer Motion `MotionValue` + `useSpring`; **no per-frame React re-renders**. State (`view`/`link`/default) is the only thing held in React state and changes only on hover transitions. Cursor hides when the pointer leaves the window and reappears on re-entry.
- **Color:** dot and ring use brand blue `#02A9F7` (no `mix-blend` so the brand color stays accurate on the dark background).

### 4.3 Cursor constants — `src/lib/cursor.ts`

- Tiny module exporting typed `data-cursor` values and their label mapping, e.g. `const CURSOR = { view: 'View', play: 'Play', link: undefined } as const`, plus a helper to read the label for a given value. Keeps attribute strings DRY and type-safe; no runtime state.

---

## 5. Files

**New**
- `src/components/providers/smooth-scroll-provider.tsx`
- `src/components/ui/custom-cursor.tsx`
- `src/lib/cursor.ts`

**Touched**
- `src/app/layout.tsx` — wrap `{children}` (and Header/Footer) with `<SmoothScrollProvider>`; mount `<CustomCursor />`.
- `src/app/globals.css` — add `html.cursor-active { cursor: none }` (and `html.cursor-active a, html.cursor-active button { cursor: none }`); ensure no global `scroll-behavior: smooth` that would fight Lenis.
- Work / case-study card components (e.g. `src/components/sections/home-selected-work.tsx`, `src/app/work` grid card) — add `data-cursor="view"`.
- `package.json` — add `lenis`.

---

## 6. Dependencies

- **Add:** `lenis` (latest). Used via both `lenis` core (types/instance) and its `lenis/react` submodule. No other runtime dependency added.
- **Reuse:** `motion` / `framer-motion` (already present) for MotionValues, springs, `useReducedMotion`, `useScroll`.

---

## 7. Reduced-motion / mobile / SSR (mandatory)

- `prefers-reduced-motion: reduce` → Lenis not initialized (native scroll); `CustomCursor` returns `null` (native cursor). Existing Framer Motion reveals already respect reduced-motion.
- Coarse pointer / touch (`(pointer: fine)` fails) → no custom cursor; Lenis runs with `syncTouch: false` so touch scrolling stays native.
- Keyboard users → native cursor unaffected; focus states and tab order unchanged by this slice.
- SSR-safe: both providers are client components; the cursor renders `null` on the server and until client media/reduced-motion checks pass inside `useEffect`.

---

## 8. Verification plan

No automated test harness exists in this repo, so the bar is build + driven manual verification:

1. `npm run build` passes clean — **no hydration warnings**.
2. `npm run dev`, then confirm on desktop pointer:
   - Smooth inertia scroll feels right across home + an inner page (not sluggish on long blog/case-study pages).
   - Cursor: dot tracks instantly, ring lags; grows on buttons/links; shows "View" over work cards.
   - Route change (e.g. home → work → case study) resets scroll to top.
   - In-page anchor link glides smoothly.
3. Emulate **touch** (DevTools device mode) → native cursor, native touch scroll, no Lenis wheel smoothing artifacts.
4. Emulate **reduced-motion** (OS setting or DevTools rendering emulation) → Lenis off (native scroll), native cursor.
5. Quick Lighthouse pass to confirm no perf regression from the RAF loop / cursor.

The `verify` / `run` skill will drive the real app to confirm the above before the work is claimed complete.

---

## 9. Risks & mitigations

- **Lenis + App Router scroll restoration conflict** → handle explicitly via `usePathname` route-reset; rely on `lenis/react` for RAF lifecycle.
- **Hydration mismatch from client-only cursor** → render `null` until `useEffect` confirms activation; never branch on `window`/media during render.
- **Smooth scroll feeling sluggish on long reading pages** → conservative `duration` (1.1) and `syncTouch: false`; value is centralized and tunable; revisit after manual pass.
- **Header's existing native scroll listener** → unaffected (Lenis fires native scroll events); left as-is to keep the change surface small. Optional future migration to `useLenis`.
- **Double cursor flash on load** → activation gate returns `null` until confirmed, and `cursor-active` class is only added when the custom cursor mounts.

---

## 10. Future slices (not built here)

1. **WebGL hero** — R3F particle/shader scene replacing the static hero JPEG; preloader with % counter. Introduces Zustand for canvas↔DOM state and the visual-companion-assisted art-direction decisions.
2. **Scroll choreography** — GSAP/ScrollTrigger pinned/scrubbed sections where Framer Motion `useScroll` is insufficient.
3. **Page transitions** — route-change overlay / WebGL wipe.
4. **Featured-work depth, About kinetic intro, etc.** — per the original brief, layered onto this foundation.
