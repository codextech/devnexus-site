# DevNexus Rebrand — Design Spec

- **Date:** 2026-05-29
- **Status:** Approved direction; spec under review
- **Cycle scope:** Design-system foundation + homepage (Cycle 1 of a multi-cycle rebrand)
- **Creative direction:** "Precision Instrument" (Direction A)
- **Branch:** `feature/hero`

---

## 1. Mission & success criteria

Re-skin and partly re-architect the DevNexus marketing site (devnexus.co) into a **premium, engineered, unmistakably high-end** experience that makes a funded-startup founder or enterprise buyer instantly trust DevNexus and book a call.

**Success criteria**
1. The homepage reads as *engineered and confident*, not as the generic dark/blue-glow "AI-agency template."
2. Proof (real client metrics) is front-and-center and credible.
3. Visual language is distinctive, restrained, and consistent — typography- and grid-led, not decoration-led.
4. Zero regressions to SEO, structured data, routing, or the theme system.
5. Theming is rebuilt onto a maintainable token system (retire the 2,385-line `!important` override file).

**Non-goals this cycle:** inner pages (services ×5, work, about, contact, blog) are *not* redesigned in Cycle 1 — see §10.

---

## 2. Creative direction — "Precision Instrument"

The site reads like a beautifully engineered technical document / precision tool. **Confidence through restraint.** Surfaces are defined by hairline borders, not glows. Typography carries the design. Color is neutral graphite with a single, surgical electric-blue accent. Motion is precise and purposeful. Decoration is replaced by *meaningful* artifacts (blueprint linework, framed real product shots, an informative agent diagram, instrument-style metric readouts).

**Explicitly removed from the current site:** aurora/blob loops, particle fields, twinkling starfields, infinite float animations, pulsing glow halos, glassmorphism-everywhere, the neon blue→cyan gradient CTA banner, the "tubelight/lamp" glowing nav indicator, floating semi-transparent image tags.

---

## 3. Foundation

### 3.1 Color tokens

True **neutral graphite** (not navy). Neutrality makes the single blue accent feel deliberate. All values are semantic CSS variables (see §3.5).

```
DARK (default)                          LIGHT (premium, warm-neutral)
--bg          #0A0A0B  near-black       --bg          #FBFBFA  warm paper
--surface     #131316  raised panel     --surface     #FFFFFF  panel
--surface-2   #1B1B1F  inset / inputs   --surface-2   #F4F4F2  inset
--border      rgba(255,255,255,.08)     --border      rgba(0,0,0,.09)
--border-hi   rgba(255,255,255,.16)     --border-hi   rgba(0,0,0,.16)
--text        #FAFAFA                   --text        #0A0A0B
--text-muted  #A1A1A6                   --text-muted  #56565C
--text-faint  #6B6B70                   --text-faint  #8A8A90

ACCENT (both modes)
--blue        #02A9F7   surgical: 1 primary CTA, key metrics, links, focus ring
--blue-press  #0288C7   active / pressed
--blue-tint   rgba(2,169,247,.10)   rare fills (selected state, focus halo)
```

**Accent discipline:** the homepage is monochrome graphite + one blue. Per-service colors (violet/emerald/amber/cyan) are demoted to tiny functional tags **only on service-specific contexts** (later cycles); they never appear as ambient page color.

### 3.2 Typography

| Role | Family | Notes |
|------|--------|-------|
| Display / headlines | **Space Grotesk** (new) | tight, engineered, distinctive; weights 500/700; tracking −0.02em |
| Body / UI | **DM Sans** (kept) | clean, warm-neutral, readable |
| Data / labels | **Geist Mono** (kept) | **signature**: eyebrows, section labels, metrics, stat values, tags, nav meta — uppercase, tracking +0.12em |

Only **one new font** (Space Grotesk), loaded via `next/font/google` alongside the existing two.

**Signature "instrument readout":** Geist Mono uppercase + letter-spacing for all labels and numbers, e.g. `03 / SELECTED WORK`, `$340K /YR SAVED`, `68% INTAKE TIME ↓`.

**Type scale (fluid `clamp()`):** display 64→88px (hero), h2 40→52, h3 24→28, body 16→18, mono-label 12–13 caps. Default heading alignment **left** (editorial); center available as an option.

### 3.3 Space · grid · radius · border · elevation

- **12-column grid**, content max-width **1200px** (down from 1280 for editorial density).
- **Generous whitespace** — section vertical rhythm `py-28 → py-40`.
- **Radii:** cards 14px, buttons 10px, pills full. (No more 2xl-everywhere.)
- **Hairline 1px borders** are the primary surface-definition tool — the signature look.
- **Elevation:** border + one restrained soft shadow for raised elements. **No glows / neon shadows.**

### 3.4 Motion language

Principles: purposeful, precise, calm. Durations **150–450ms**. Primary easing `cubic-bezier(.16,1,.3,1)` (expo-out). Motion always conveys meaning or hierarchy.

| Keep / introduce | Kill |
|---|---|
| Clip-mask headline reveals (text wipes up behind a mask) | Aurora blob loops |
| Refined `fadeUp` stagger w/ expo easing | Particle fields |
| Number **count-ups** on metrics (on in-view) | Twinkling starfields |
| Magnetic / cursor-aware primary button (the only one) | Infinite float animations |
| Signature: blueprint grid that **draws in** on the hero | Pulsing glow halos |
| Single traveling pulse along the agent diagram | Decoration-only motion |

**`prefers-reduced-motion`:** fully respected — disables count-ups, draw-ins, magnetic effect, and parallax; content appears in final state.

### 3.5 Theming architecture (engineering rebuild)

- Replace literal-baked `@theme inline` values + 2,385 lines of `!important` overrides with **semantic CSS variables** defined on `:root` and overridden under the existing **`html.light`** class (kept as-is, so the FOUC script in `layout.tsx` stays untouched).
- Map Tailwind v4 `@theme` to the **variables**, not inlined literals, so a light-mode swap is a ~40-line variable block instead of per-utility overrides.
- **Preserve unchanged:** `devnexus-theme` localStorage key, the synchronous FOUC script in `layout.tsx`, and the `useTheme()` context API in `src/lib/theme-context.tsx`.
- **Migration safety:** the existing inner-page CSS blocks (`svc-*`, `about-*`, `contact-*`, `story-*`, `eco-*`, `process-*`, etc.) are **retained** during Cycle 1 so inner pages keep rendering. They reference the new core tokens where possible and are fully migrated in their own later cycles (§10). After the token refactor, every existing route is smoke-tested for breakage.

---

## 4. Component kit

Small, disciplined set. Every piece favors hairline borders, mono labels, tight radii, restraint.

**Interactive**
- **Button** — 3 variants @ 10px radius: `primary` (blue fill, magnetic/cursor-aware, press-darken), `secondary` (transparent + hairline border; hover fills `--surface`), `link` (text + arrow `→` slides on hover). Sizes sm/md/lg.
- **Theme toggle** — kept, restyled to a crisp hairline icon button.

**Content**
- **Eyebrow / SectionLabel** — Geist Mono uppercase, **numbered + indexed** (`02 / WHAT WE DO`), preceded by a 1px tick. Replaces the pulsing pill.
- **Surface / Card** — flat `--surface`, 1px border, 14px radius; hover = border → `--border-hi` + 1px rise. No glass, no glow.
- **Metric (instrument readout)** — oversized value + **count-up on view** + Geist Mono caps label + optional delta arrow.
- **Tag / Badge** — static mono micro-label in a hairline pill (tech stack, service tags).
- **SectionHeading** — numbered mono eyebrow → Space Grotesk title (clip-mask reveal) → muted subtitle; left-align default.

**Navigation**
- **Header** — retire the glowing tubelight bar. Minimal bar, transparent over hero → condenses with a hairline bottom border on scroll. Logo · text nav with a precise **blue-tick** active indicator · structured Services dropdown (mono category labels, clean two-column) · theme toggle · one `Book a call` primary. Mobile: full-height sheet with mono section labels.
- **Footer** — editorial: oversized `DEVNEXUS` wordmark baseline, columned links with mono headers, closing "Let's build →" line, social icons, hairline dividers.

**Art system (replaces decoration)**
- **Blueprint grid** — subtle, precise ruler-tick linework that draws itself in on the hero and anchors select sections. Replaces cosmos/dot-grid.
- **Framed product shot** — real screenshots in clean hairline frames + mono caption (like figures in a spec sheet).
- **Agent / flow diagram** — one *informative* node-graph for the AI story: clean nodes, hairline connectors, a single traveling pulse. (Evolves the old ecosystem idea, minus the aurora soup.)
- **Logo proof row** — 7 client logos as a **static, evenly-gridded grayscale row** with a mono `TRUSTED BY` label (chosen over marquee).

---

## 5. Homepage architecture (8 sections)

```
1  HERO            blueprint grid draws in · mono eyebrow · Space Grotesk claim
                   · 1 blue word · instrument proof strip · magnetic CTA + link
2  TRUSTED BY      static gridded grayscale logo row · mono label
3  SERVICES        2 hero pillars (Web&Mobile, AI) + 3 indexed rows
                   (Agentic, Voice, Jira) · hairline dividers · mono numbering
4  BUILT FOR THE   dedicated AI band · agent/flow diagram · supporting proof
   AI ERA          (the dedicated band you approved)
5  SELECTED WORK   ★ centerpiece · featured case (large, framed + metrics +
                   the ONE glass quote) + 2 compact cases
6  HOW WE WORK     4-step spec timeline · mono step numbers · hairline track
7  CLOSING CTA     graphite (not neon) · blueprint grid · magnetic CTA ·
                   mono trust signals
8  FOOTER          editorial wordmark · columns · social
```

**Rationale:** proof moves up (case studies #4); the standalone SysPOS success-story folds into Selected Work as the featured case; the AI story gets its own band (#4); the neon gradient CTA becomes a calm graphite closer. `home-ecosystem` and `home-why` remain retired.

**Motion choreography:** hero blueprint draws in once → headline clip-reveal → proof metrics count up. Per section: numbered eyebrow ticks in → heading clip-reveals → content fade-up stagger (expo). Magnetic effect only on the two primary CTAs.

---

## 6. Copy deck (sharpened — all real assets kept)

### 1 — Hero
- **Eyebrow:** `SOFTWARE & AI ENGINEERING STUDIO`
- **H1:** **Software that thinks. Shipped every week.** *(blue on "Shipped")*
- **Sub:** "We pair production-grade web & mobile engineering with AI that actually works — agents, voice, and automation that move real metrics. Senior team, weekly demos, no black boxes."
- **Proof strip:** `3,000+ installs` · `$340K /yr saved` · `200+ calls/day` · `4.7★ avg`
- **CTAs:** `Book a strategy call` · `See selected work →`

### 2 — Trusted by
- **Label:** `TRUSTED BY TEAMS SHIPPING REAL PRODUCTS`
- **Logos:** AgilePulse, SysPOS, Cellular, Tasleem Taxi, TTravel, TopHealth, Capri (from `/public/images/clients`).

### 3 — Services · "Web + AI. One team. Zero gaps."
- **Eyebrow:** `01 / WHAT WE DO`
- **Title:** Web + AI. One team. Zero gaps.
- **Sub:** "Most agencies do one or the other. We engineer the product *and* the intelligence inside it — so nothing falls between teams."
- **Hero pillars:**
  - **Web & Mobile Development** — "Software built to ship — web, mobile & APIs." (Globe) · stats: `<1s LCP` · `99.9% uptime` · `weekly demos` → `/services/web-and-mobile`
  - **AI Solutions** — "AI that actually works in production." (BrainCircuit) · stats: `RAG` · `automation` · `analytics` → `/services/ai-solutions`
- **Indexed rows:**
  - **Agentic AI Workflows** — "Agents that take action, not just chat." (Bot) → `/services/agentic-ai`
  - **Voice AI Agents** — "Voice agents that sound like your best employee." (Phone) → `/services/voice-ai`
  - **Jira Apps & Integrations** — "Jira apps that make workflows disappear." (Puzzle) → `/services/jira-apps`

### 4 — Built for the AI era
- **Eyebrow:** `02 / THE AI LAYER`
- **Title:** Not chatbots. Systems that do the work.
- **Sub:** "We design agentic systems that plug into your stack — researching, deciding, and acting across your tools, with humans where they matter."
- **Diagram:** `YOUR STACK → AGENT → {CRM · DB · VOICE · TOOLS} → OUTCOME`, single traveling pulse, mono node labels.
- **Supporting proof (real, VAPI internal):** `200+ calls/day` · `91% qualification accuracy` · `85% time saved`.

### 5 — Selected work · "Proof, not promises."
- **Eyebrow:** `03 / SELECTED WORK`
- **Title:** Proof, not promises.
- **Featured (large):** **TopHealth AI** — Healthcare — framed intake-app shot — metrics `68% faster intake (12→3.8 min)` · `$340K /yr saved` · `94% accuracy` · `+18 NPS` — **glass quote:** "Our front desk staff went from data entry clerks to patient advocates." — *Lina, Founder*
- **Compact 1:** **AgilePulse** — Jira Apps — `3,000+ installs` · `4.7★` · `1st-try Marketplace cert`
- **Compact 2:** **VAPI Voice Agent** — Sales Automation — `200+ calls/day` · `91% qualified` · `85% time saved`
- **CTA:** `View all case studies →` → `/work`
- *Alternate flagship available:* SysPOS "30× growth" (current site's success story) can swap into the featured slot — flagged for user confirmation in §11.

### 6 — How we work
- **Eyebrow:** `04 / HOW WE WORK`
- **Title:** Senior engineers. Weekly demos. No black boxes.
- **Steps:** `01 Discovery` (scope + architecture) → `02 Build` (weekly demos; you see progress) → `03 Launch` (ship to production) → `04 Maintain` (own it, evolve it). Each with a timeline badge.

### 7 — Closing CTA
- **Eyebrow:** `LET'S BUILD`
- **Title:** Have something that needs to ship?
- **Sub:** "Book a free strategy call. We'll tell you exactly how we'd build it — scope, timeline, and what it costs."
- **CTA:** `Book a strategy call` → `/contact`
- **Trust signals (mono):** `Reply within 24h` · `No commitment` · `Free strategy call`

### 8 — Footer
- Oversized `DEVNEXUS` wordmark · Services + Company columns · contact (`info@devnexus.co`, `+92 324 9429698`) · social (LinkedIn, X, Instagram) · closing "Let's build →".

---

## 7. Constraints to preserve (DO NOT BREAK)

1. **Metadata** — `createMetadata()` in `src/lib/metadata.ts`; dynamic OG via `/og?title=`; canonical + Twitter card; `%s | DevNexus` template.
2. **Structured data** — all JSON-LD in `src/lib/schema.ts`: `websiteSchema`, `organizationSchema`, `professionalServiceSchema` on home; service/FAQ/breadcrumb on service pages; article schema on blog/case studies.
3. **Routing / slugs** — keep all service slugs, `/work`, `/blog`, `/about`, `/contact`, `/work/[slug]`, `/blog/[slug]`.
4. **Sitemap / robots** — `src/app/sitemap.ts` (reads MDX frontmatter dates), `src/app/robots.ts` (disallow `/api/`).
5. **Theme** — `devnexus-theme` localStorage key, FOUC script in `layout.tsx`, `useTheme()` API.
6. **Fonts** — keep DM Sans (`--font-dm-sans`) + Geist Mono (`--font-geist-mono`); add Space Grotesk.
7. **Real content** — `src/data/services.ts` (5 services + structure), case-study MDX + frontmatter (`metrics[]`, `techStack[]`, `duration`, `teamSize`), blog MDX, client logos, exact metric strings/quotes.
8. **Analytics** — GTM/GA scripts (`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`).

---

## 8. File / component inventory (Cycle 1)

**New**
- `src/components/ui/metric.tsx` — instrument readout + count-up
- `src/components/ui/eyebrow.tsx` — numbered mono section label
- `src/components/ui/tag.tsx` — static mono badge
- `src/components/ui/blueprint-grid.tsx` — signature draw-in background
- `src/components/ui/framed-figure.tsx` — hairline-framed image + mono caption
- `src/components/blocks/agent-diagram.tsx` — informative flow diagram
- `src/components/blocks/logo-row.tsx` — static gridded logo proof row
- `src/components/sections/home-ai-layer.tsx` — the "Built for the AI era" band
- `src/components/sections/home-selected-work.tsx` — featured + compact case studies

**Reworked**
- `src/app/globals.css` — token system rebuild (§3.5); retire homepage `!important` overrides
- `src/app/layout.tsx` — add Space Grotesk; keep FOUC + theme + analytics
- `src/components/blocks/hero.tsx` — Precision Instrument hero
- `src/components/blocks/header.tsx` — minimal precise nav
- `src/components/blocks/footer.tsx` — editorial footer
- `src/components/blocks/cta-banner.tsx` — graphite closer
- `src/components/sections/home-services.tsx` — index treatment
- `src/components/sections/home-process.tsx` — restyle to spec timeline
- `src/components/ui/button.tsx`, `section-heading.tsx`, `container.tsx` — retune to tokens/kit
- `src/lib/animations.ts` — expo easing presets, clip-reveal, count-up helpers

**Retired from homepage**
- `home-visual-bento.tsx` (the auto-play carousel — *note: currently open in your editor*), `home-success-story.tsx` (folded into Selected Work), `home-case-studies.tsx` (replaced by Selected Work). `home-ecosystem.tsx` + `home-why.tsx` remain commented out. Files kept on disk until Cycle 1 is verified, then removed.

---

## 9. Implementation notes

- **Magic MCP**: registered + connected (`claude mcp list` ✓), but its `mcp__magic__*` tools load at session start — **restart Claude Code before the build phase** to use them. We'll pull 21st.dev blocks and heavily customize to this spec (never ship a default-demo look).
- **Space Grotesk** via `next/font/google`, exposed as `--font-display`.
- **Tailwind v4**: map `@theme` to CSS variables (not literals) so light mode is a variable swap.
- Build order matches the user's stated flow: tokens/theming → primitives → homepage section-by-section, with a dev-server visual self-review per section.

---

## 10. Later cycles (out of scope here)

- **Cycle 2:** Service pages (×5) + Work index/detail — migrate `svc-*` CSS to tokens.
- **Cycle 3:** About + Contact — migrate `about-*` / `contact-*` CSS.
- **Cycle 4:** Blog index/detail + global polish (motion, perf/CLS, a11y, metadata sweep).
- Inner pages render correctly during Cycle 1 via retained CSS (§3.5) but won't be fully restyled until their cycle.

---

## 11. Open items / assumptions

1. **Featured case study** = TopHealth AI (strongest documented enterprise metrics). SysPOS "30×" is the alternate — confirm which leads the Selected Work section.
2. **Hero proof-strip numbers** use real case-study metrics; confirm they're cleared for public homepage display (they already appear across the live site/case studies).
3. **Display font** = Space Grotesk (approved); swap is low-cost if you later prefer another.
4. Assumes dark-first default with a first-class light mode (approved).
