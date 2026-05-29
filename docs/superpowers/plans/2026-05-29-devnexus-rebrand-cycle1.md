# DevNexus Rebrand — Cycle 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the DevNexus design-system foundation and homepage in the "Precision Instrument" direction (graphite + surgical electric-blue, typography-led, hairline borders, instrument-readout metrics, precise motion).

**Architecture:** Token-first. Rebuild theming as semantic CSS variables (`:root` + `html.light`) mapped through Tailwind v4 `@theme`, retiring the homepage `!important` override soup. Build a small disciplined component kit, then assemble the 8-section homepage from it. Inner-page CSS blocks are retained untouched so existing routes keep rendering.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 (`@theme`), Framer Motion (`motion`), Lucide icons, `next/font/google`. Optional accelerator: 21st.dev **Magic MCP** (`mcp__magic__*`) — pull blocks, then heavily customize to this spec.

**Spec:** `docs/superpowers/specs/2026-05-29-devnexus-rebrand-design.md`

---

## Verification loop (applies to every task)

This is a visual marketing build; the user designated dev-server renders as the source of truth. The TDD test-loop is replaced by:

1. **Build** the change.
2. **Typecheck:** `npx tsc --noEmit` → expect no errors.
3. **Lint:** `npm run lint` → expect no new errors.
4. **Visual self-review:** with `npm run dev` running, review the affected route in **both themes** and at **375 / 768 / 1024 / 1440px**. Check against the relevant spec section.
5. **Commit** with a focused message (`Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`).
6. At **★ MILESTONE** tasks: report to the user what was built before continuing.

A dev server runs in the background throughout: `npm run dev` (Next.js, port 3000).

---

## File structure (what gets created / modified)

**Create**
- `src/components/ui/eyebrow.tsx` — numbered mono section label (`02 / WHAT WE DO`)
- `src/components/ui/tag.tsx` — static mono badge / pill
- `src/components/ui/metric.tsx` — instrument readout value + count-up + mono label
- `src/components/ui/framed-figure.tsx` — hairline-framed image + mono caption
- `src/components/ui/blueprint-grid.tsx` — signature draw-in background
- `src/components/blocks/agent-diagram.tsx` — informative flow diagram (single traveling pulse)
- `src/components/blocks/logo-row.tsx` — static gridded grayscale logo proof row
- `src/components/sections/home-ai-layer.tsx` — "Built for the AI era" band
- `src/components/sections/home-selected-work.tsx` — featured + 2 compact case studies
- `src/lib/use-count-up.ts` — count-up hook (in-view, reduced-motion aware)
- `src/lib/use-magnetic.ts` — magnetic/cursor-aware hook for the primary CTA

**Modify**
- `src/app/globals.css` — token system rebuild; retire homepage `!important` overrides (keep inner-page blocks)
- `src/app/layout.tsx` — add Space Grotesk as `--font-display`
- `src/lib/animations.ts` — expo easing, refined `fadeUp`, `clipReveal`, stagger presets
- `src/components/ui/button.tsx` — 3 variants @ 10px radius, magnetic primary
- `src/components/ui/section-heading.tsx` — numbered eyebrow + clip-reveal title
- `src/components/ui/container.tsx` — 1200px max, grid helpers
- `src/components/ui/theme-toggle.tsx` — hairline icon button restyle
- `src/components/blocks/header.tsx` — minimal precise nav
- `src/components/blocks/footer.tsx` — editorial footer
- `src/components/blocks/hero.tsx` — Precision Instrument hero
- `src/components/blocks/cta-banner.tsx` — graphite closer
- `src/components/sections/home-services.tsx` — index treatment
- `src/components/sections/home-process.tsx` — spec timeline restyle
- `src/app/page.tsx` — new section order; drop retired sections

**Retire from homepage** (kept on disk until Cycle 1 verified, then deleted): `home-visual-bento.tsx`, `home-success-story.tsx`, `home-case-studies.tsx`. (`home-ecosystem.tsx`, `home-why.tsx` already commented out.)

---

## PHASE 0 — Foundation (tokens + motion)

### Task 1: Theming token system + Space Grotesk

**Files:** Modify `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1 — Add the display font.** In `layout.tsx`, import `Space_Grotesk` from `next/font/google` with `variable: "--font-display"`, weights `["500","700"]`, subset latin. Add `spaceGrotesk.variable` to the `<body>` className alongside the existing DM Sans + Geist Mono variables. Do **not** touch the FOUC script or theme provider.

- [ ] **Step 2 — Rebuild the token layer in `globals.css`.** Replace the `@theme inline` literal block with semantic CSS variables. Define defaults on `:root` (dark) and overrides under `html.light`. Map Tailwind `@theme` to the variables so utilities resolve to vars (not baked literals):

```css
:root {
  --bg: #0A0A0B;        --surface: #131316;   --surface-2: #1B1B1F;
  --border: rgba(255,255,255,.08);  --border-hi: rgba(255,255,255,.16);
  --text: #FAFAFA;      --text-muted: #A1A1A6; --text-faint: #6B6B70;
  --blue: #02A9F7;      --blue-press: #0288C7; --blue-tint: rgba(2,169,247,.10);
  --font-display: var(--font-display); /* from next/font */
}
html.light {
  --bg: #FBFBFA;        --surface: #FFFFFF;    --surface-2: #F4F4F2;
  --border: rgba(0,0,0,.09);  --border-hi: rgba(0,0,0,.16);
  --text: #0A0A0B;      --text-muted: #56565C; --text-faint: #8A8A90;
}
@theme {
  --color-bg: var(--bg); --color-surface: var(--surface); --color-surface-2: var(--surface-2);
  --color-border: var(--border); --color-border-hi: var(--border-hi);
  --color-text: var(--text); --color-text-muted: var(--text-muted); --color-text-faint: var(--text-faint);
  --color-blue: var(--blue); --color-blue-press: var(--blue-press);
  --font-display: var(--font-display); --font-sans: var(--font-dm-sans); --font-mono: var(--font-geist-mono);
}
body { background: var(--bg); color: var(--text); }
```

- [ ] **Step 3 — Quarantine, don't delete, inner-page CSS.** Keep the existing `html.light` blocks for `svc-*`, `about-*`, `contact-*`, `story-*`, `eco-*`, `process-*`, `faq-*`, `pillar-*` selectors so inner routes keep rendering. **Remove** only the homepage-specific override noise that the rebuilt homepage components will no longer use (hero cosmos/stars/orbs/particles, bento, glass-card homepage usages, CTA particle styles). When unsure, keep it; dead CSS is harmless this cycle.

- [ ] **Step 4 — Verify.** Run the verification loop. `npm run dev`, confirm `/` boots and every existing route (`/services`, `/services/ai-solutions`, `/work`, `/about`, `/contact`, `/blog`) still renders without crashing in both themes. `npx tsc --noEmit` clean. Toggle theme — no FOUC, persists on reload.

- [ ] **Step 5 — Commit.** `feat(rebrand): graphite token system + Space Grotesk, variable-driven theming`

### Task 2: Motion primitives

**Files:** Modify `src/lib/animations.ts`; Create `src/lib/use-count-up.ts`, `src/lib/use-magnetic.ts`

- [ ] **Step 1 — Easing + presets.** In `animations.ts` add `export const EASE = [0.16, 1, 0.3, 1] as const;`. Refine `fadeUp` to use `EASE`, duration 0.5, `viewport { once: true, margin: "-80px" }`. Add `clipReveal` (clip-path inset wipe-up for headings) and keep `staggerContainer`/`staggerItem` with `EASE`.

- [ ] **Step 2 — `use-count-up.ts`.** Hook: given a target number + `inView` flag, animates from 0 → target over ~1.1s with `EASE`, returns the current display value. If `window.matchMedia('(prefers-reduced-motion: reduce)')` matches, return the target immediately (no animation). Handle number formatting via a passed formatter (so `$340K`, `3,000+`, `4.7` all work).

- [ ] **Step 3 — `use-magnetic.ts`.** Hook returning ref + handlers that translate the element toward the cursor within a small radius (max ~6px) using a spring, resetting on leave. No-op when reduced-motion is set or on touch/coarse pointers (`(pointer: coarse)`).

- [ ] **Step 4 — Verify + Commit.** `npx tsc --noEmit` clean. Commit: `feat(rebrand): motion primitives — expo easing, count-up, magnetic hooks`

---

## PHASE 1 — Component kit

### Task 3: Button, Eyebrow, Tag

**Files:** Modify `src/components/ui/button.tsx`; Create `src/components/ui/eyebrow.tsx`, `src/components/ui/tag.tsx`

- [ ] **Step 1 — Button.** Variants: `primary` (`bg-blue text-[#04121a]`, 10px radius, `use-magnetic`, press → `--blue-press`), `secondary` (transparent, `border border-border`, hover → `bg-surface border-border-hi`), `link` (text + Lucide `ArrowRight` translating `+2px` on hover). Sizes sm/md/lg. Keep the existing `href`→`Link` / else `button` dual-render. Keep focus-visible ring (`--blue`).
- [ ] **Step 2 — Eyebrow.** `<Eyebrow index="02" label="WHAT WE DO" />` → a 1px tick + Geist Mono uppercase, tracking `+0.12em`, `text-text-faint` with the index in `text-blue`. `fadeIn` on view.
- [ ] **Step 3 — Tag.** Mono micro-label in a hairline pill (`border-border`, `text-text-muted`, full radius, px-2.5 py-1, text-[11px] uppercase).
- [ ] **Step 4 — Verify + Commit.** Temporarily render all three in the hero area or a scratch route to eyeball both themes. `feat(rebrand): button, eyebrow, tag primitives`

### Task 4: SectionHeading + Container + ThemeToggle

**Files:** Modify `section-heading.tsx`, `container.tsx`, `theme-toggle.tsx`

- [ ] **Step 1 — SectionHeading.** Compose `Eyebrow` (numbered) → Space Grotesk title (`font-display`, tracking -0.02em, `clipReveal`) → muted subtitle (`text-text-muted`). `align` prop (`left` default | `center`). Preserve the `.section-heading-text` consumers or migrate them to `text-text`.
- [ ] **Step 2 — Container.** Max-width `1200px` (`max-w-[1200px]`), responsive padding kept. Add optional `grid` prop exposing a 12-col grid (`grid grid-cols-12 gap-x-6`).
- [ ] **Step 3 — ThemeToggle.** Restyle to a hairline icon button (`border border-border`, hover `border-border-hi`), keep sun/moon swap + ARIA labels + `useTheme()`.
- [ ] **Step 4 — Verify + Commit.** `feat(rebrand): section-heading, container, theme-toggle`

### Task 5: Metric + FramedFigure

**Files:** Create `src/components/ui/metric.tsx`, `src/components/ui/framed-figure.tsx`

- [ ] **Step 1 — Metric.** Props `{ value, suffix?, prefix?, label, format? }`. Big value in `font-display` (or tabular mono for pure numbers) with `use-count-up` on in-view; Geist Mono caps label beneath; optional delta arrow. Uses `useInView`.
- [ ] **Step 2 — FramedFigure.** `next/image` in a hairline frame (`border border-border`, 14px radius, overflow-hidden), optional mono caption strip below. Lazy by default, `sizes` set, reserves aspect ratio (no CLS).
- [ ] **Step 3 — Verify + Commit.** Render a Metric row + a FramedFigure on a scratch area; confirm count-up fires once and respects reduced-motion. `feat(rebrand): metric (instrument readout) + framed-figure`

### Task 6: BlueprintGrid + AgentDiagram

**Files:** Create `src/components/ui/blueprint-grid.tsx`, `src/components/blocks/agent-diagram.tsx`

- [ ] **Step 1 — BlueprintGrid.** Absolutely-positioned SVG/CSS ruler-tick grid using `--border` lines + faint blue ticks, with a mask fade at edges. `draw-in` once on mount (stroke-dashoffset or opacity sweep), static under reduced-motion. Pointer-events none.
- [ ] **Step 2 — AgentDiagram.** Clean node graph: `YOUR STACK → AGENT → {CRM · DB · VOICE · TOOLS} → OUTCOME`. Hairline connectors, mono node labels, one traveling pulse along a path (`offsetDistance`/`animateMotion`), pausable / disabled under reduced-motion. Responsive: collapses to a vertical stack < 768px.
- [ ] **Step 3 — Verify + Commit.** `feat(rebrand): blueprint-grid + agent-diagram art system`

---

## PHASE 2 — Navigation chrome

### Task 7: Header

**Files:** Modify `src/components/blocks/header.tsx`

- [ ] **Step 1 — Build.** Transparent over hero → on scroll add a `border-b border-border` + `bg-bg/80 backdrop-blur`. Logo · text nav with a precise `--blue` tick active indicator (no glow) · Services dropdown (structured two-column, mono category labels, sourced from `FOOTER_LINKS.services`) · `ThemeToggle` · one `primary` "Book a call". Mobile: full-height sheet, mono section labels, accordion Services. Keep the theme-aware logo swap classes.
- [ ] **Step 2 — Magic MCP (optional).** May seed the navbar/menu structure via `mcp__magic__21st_magic_component_builder`, then strip its styling and re-skin entirely to the kit. Ship nothing that resembles the default demo.
- [ ] **Step 3 — Verify + Commit.** Check on `/` and an inner route, both themes, mobile sheet open/close, keyboard nav + focus rings. `feat(rebrand): precise minimal header`

### Task 8: Footer

**Files:** Modify `src/components/blocks/footer.tsx`

- [ ] **Step 1 — Build.** Editorial: oversized `DEVNEXUS` wordmark baseline (ghost), Services + Company columns (from `FOOTER_LINKS`), contact (`info@devnexus.co`, `+92 324 9429698` from `SITE`), social icons (LinkedIn/X/Instagram from `SITE.social`), hairline dividers, closing "Let's build →" link to `/contact`. Keep copyright.
- [ ] **Step 2 — Verify + Commit.** `feat(rebrand): editorial footer`

---

## PHASE 3 — Homepage sections

### Task 9 ★ MILESTONE: Hero

**Files:** Modify `src/components/blocks/hero.tsx`

- [ ] **Step 1 — Build homepage variant.** Graphite section + `BlueprintGrid` (draws in once). `Eyebrow` `SOFTWARE & AI ENGINEERING STUDIO` → H1 `Software that thinks. Shipped every week.` (`font-display`, `clipReveal`, blue span on "Shipped") → sub (spec §6.1) → CTAs: magnetic primary `Book a strategy call` → `/contact`, `link` `See selected work →` → `/work`. Proof strip = 4 `Metric`s: `3,000+ installs · $340K /yr saved · 200+ calls/day · 4.7★ avg`, count-up on view.
- [ ] **Step 2 — Preserve `page` variant** for inner-page heroes (keep its existing API/props) but restyle to tokens (graphite, hairline divider, no cosmos).
- [ ] **Step 3 — Verify + Commit + REPORT.** Full hero review both themes + 4 breakpoints; reduced-motion check. `feat(rebrand): precision-instrument hero`. **Report to user.**

### Task 10: Logo proof row

**Files:** Create `src/components/blocks/logo-row.tsx`; update `src/app/page.tsx` import

- [ ] **Step 1 — Build.** Static, evenly-gridded grayscale row of the 7 client logos (`/public/images/clients`, excluding `download.png`) with mono label `TRUSTED BY TEAMS SHIPPING REAL PRODUCTS`. Grayscale + reduced opacity, subtle hover restore. Responsive wrap (4-col → 2-col). Light-mode logo inversion handled (reuse `.logo-bar-image` filter or a tokenized equivalent).
- [ ] **Step 2 — Verify + Commit.** `feat(rebrand): static logo proof row`

### Task 11 ★ MILESTONE: Services index

**Files:** Modify `src/components/sections/home-services.tsx`

- [ ] **Step 1 — Build.** `Eyebrow` `01 / WHAT WE DO` + title "Web + AI. One team. Zero gaps." + sub. Two hero pillars (Web & Mobile, AI Solutions) as bordered cards with icon (Lucide `Globe`/`BrainCircuit`), one-liner, mono stat tags, hover → `border-hi` + arrow. Three indexed rows (Agentic/Voice/Jira) as a hairline-divided list with mono numbering + hover reveal. Copy + links per spec §6.3. No glass.
- [ ] **Step 2 — Verify + Commit + REPORT.** `feat(rebrand): services index section`. **Report to user.**

### Task 12 ★ MILESTONE: Built for the AI era

**Files:** Create `src/components/sections/home-ai-layer.tsx`; update `page.tsx`

- [ ] **Step 1 — Build.** `Eyebrow` `02 / THE AI LAYER` + title "Not chatbots. Systems that do the work." + sub. `AgentDiagram` as the centerpiece. Supporting proof = 3 `Metric`s (VAPI internal): `200+ calls/day · 91% qualification · 85% time saved`. Copy per spec §6.4.
- [ ] **Step 2 — Verify + Commit + REPORT.** `feat(rebrand): AI-layer section + agent diagram`. **Report to user.**

### Task 13 ★ MILESTONE: Selected Work

**Files:** Create `src/components/sections/home-selected-work.tsx`; update `page.tsx`

- [ ] **Step 1 — Build.** `Eyebrow` `03 / SELECTED WORK` + title "Proof, not promises." Featured (large): **TopHealth AI** — `FramedFigure` (intake app shot) + 4 `Metric`s (`68% faster intake · $340K /yr saved · 94% accuracy · +18 NPS`) + the **one** allowed glass quote ("Our front desk staff went from data entry clerks to patient advocates." — Lina, Founder). Two compact cards: **AgilePulse** (`3,000+ installs · 4.7★ · 1st-try cert`) and **VAPI Voice Agent** (`200+ calls/day · 91% qualified · 85% time saved`). `link` "View all case studies →" → `/work`. Pull exact metrics/quotes from case-study MDX; link cards to their `/work/[slug]`.
- [ ] **Step 2 — Verify + Commit + REPORT.** `feat(rebrand): selected work section`. **Report to user.**

### Task 14: How We Work

**Files:** Modify `src/components/sections/home-process.tsx`

- [ ] **Step 1 — Build.** `Eyebrow` `04 / HOW WE WORK` + title "Senior engineers. Weekly demos. No black boxes." Horizontal spec timeline: hairline track, mono step numbers `01–04` (Discovery → Build → Launch → Maintain), timeline badges; vertical stack on mobile. Restyle existing `process-*` classes to tokens or replace with utilities. Copy per spec §6.6.
- [ ] **Step 2 — Verify + Commit.** `feat(rebrand): how-we-work spec timeline`

### Task 15: Closing CTA

**Files:** Modify `src/components/blocks/cta-banner.tsx`

- [ ] **Step 1 — Build.** Replace neon gradient + particles with graphite section + `BlueprintGrid`. `Eyebrow` `LET'S BUILD` + title "Have something that needs to ship?" + sub + magnetic primary `Book a strategy call` → `/contact` + mono trust signals `Reply within 24h · No commitment · Free strategy call`. Copy per spec §6.7. Note: the old `:has([class*="from-brand-blue"])` light-mode rule no longer applies — confirm removed/irrelevant.
- [ ] **Step 2 — Verify + Commit.** `feat(rebrand): graphite closing CTA`

### Task 16 ★ MILESTONE: Assemble homepage

**Files:** Modify `src/app/page.tsx`

- [ ] **Step 1 — Wire order:** `Hero → LogoRow → ServicesSection → AiLayerSection → SelectedWorkSection → ProcessSection → CTABanner`. Remove imports/usage of `VisualBentoSection`, `SuccessStorySection`, `CaseStudiesSection` (and the already-commented Ecosystem/Why). Keep all three JSON-LD schema scripts and `createMetadata` exactly as-is.
- [ ] **Step 2 — Verify + Commit + REPORT.** Full homepage pass: both themes, 375/768/1024/1440, reduced-motion, keyboard/focus. `feat(rebrand): assemble precision-instrument homepage`. **Report to user.**

---

## PHASE 4 — Polish & verification

### Task 17: Cross-cutting polish + regression sweep

- [ ] **Step 1 — Inner-route smoke test.** Visit `/services`, all 5 `/services/*`, `/work`, a `/work/[slug]`, `/about`, `/contact`, `/blog`, a `/blog/[slug]`, `/not-found`. Confirm none crash and each is legible in both themes after the token refactor. Note (don't fix) any inner-page visual debt for Cycle 2.
- [ ] **Step 2 — A11y/motion pass.** Verify focus-visible rings everywhere, `prefers-reduced-motion` disables count-ups/draw-ins/magnetic/parallax, color contrast ≥ 4.5:1 on text, all interactive targets ≥ 44px.
- [ ] **Step 3 — Commit.** `chore(rebrand): a11y + reduced-motion polish, inner-route regression notes`

### Task 18: Production build + final report

- [ ] **Step 1 — Build.** `npm run build` → expect success, no type errors, reasonable bundle. Spot-check `next build` output for the homepage.
- [ ] **Step 2 — Remove retired files** now that the homepage is verified: delete `home-visual-bento.tsx`, `home-success-story.tsx`, `home-case-studies.tsx` (confirm no remaining imports). Re-run build.
- [ ] **Step 3 — Commit + REPORT.** `chore(rebrand): remove retired homepage sections; production build green`. **Final milestone report to user.**

---

## Self-review — spec coverage

- Color/type/space/motion tokens → Tasks 1–2. ✓
- Theming rebuild + inner-page retention → Task 1 (steps 2–3). ✓
- Component kit (button, eyebrow, tag, card/surface, metric, framed-figure, section-heading, blueprint, diagram, logo row) → Tasks 3–6, 10. ✓ (generic Card = bordered `bg-surface` utility pattern, used inline by sections; no standalone file needed — YAGNI.)
- Header + footer → Tasks 7–8. ✓
- 8 homepage sections + assembly → Tasks 9–16. ✓ (Hero, LogoRow, Services, AI Layer, Selected Work, Process, CTA, Footer.)
- Copy deck → embedded in each section task referencing spec §6. ✓
- Constraints to preserve (metadata, schema, routing, sitemap/robots, theme key/FOUC, fonts, real content, analytics) → Task 1 (no FOUC/theme changes), Task 16 (schema/metadata untouched), Tasks 10/13 (real assets). ✓
- Magic MCP usage → Tasks 7, (optionally 9/11/13). ✓
- Later cycles (inner pages) → out of scope; regression-only in Task 17. ✓

**Open items carried from spec §11 (resolved):** Featured case = TopHealth (Task 13). Proof-strip numbers = approved (Task 9).
