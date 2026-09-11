# Timeline-style numbered navigation

Restyle the homepage timeline to match the CodePen "Timeline Style Navigation" pattern (codepen.io/nailaahmad/pen/MyZXVE): a vertical numbered rail where the active entry is expanded and highlighted, scrolling updates the active number, and clicking a number scrolls to that entry. All built on the existing Web Awesome design system (wa-* utilities and --wa-* tokens, Press Start 2P headings, hard pixel shadows) — no raw colors or hardcoded values.

## What changes

1. **Numbered rail column** (`src/routes/index.tsx`, `src/styles.css`)
   - Each timeline item gets a two-digit number (01, 02, …) in the pixel display font, sitting on the center rail in place of the current plain square dot.
   - Numbers are links (`<a href="#item-id">`) with `aria-label` naming the project/credential, so keyboard users can jump straight to an entry.
   - The active number gets a branded treatment: filled pixel badge with hard shadow, larger size, and the item title revealed next to it in small pixel text — mirroring the pen's expanded "01 / Intro" state. Inactive numbers stay quiet.

2. **Scroll-synced active state**
   - Give every timeline item a stable `id` (slug-based) and observe them with an `IntersectionObserver` in a small hook (`src/lib/use-active-timeline-item.ts`). The item nearest the viewport center becomes active.
   - Active state drives a CSS class only — styling stays in `src/styles.css` with tokens.

3. **Sticky rail behavior**
   - On desktop, the number column stays visually tied to the center rail; the active number "lights up" as you scroll past each card, matching the pen's feel.
   - On mobile (existing single-column breakpoint), numbers shrink and sit on the left rail above each card; no sticky behavior.

4. **Accessibility & motion**
   - Smooth scrolling respects `prefers-reduced-motion` (reduced motion = instant jump).
   - Keep the existing scroll-driven entrance animations and add a stepped "stamp" transition when a number becomes active (`steps()` for the retro snap), all inside the existing reduced-motion guard.
   - The rail remains a semantic `<ol>` with real `<time>` elements; numbers are decorative position markers plus accessible labels.

## Out of scope

- No full-screen sections or page background color changes — the pen's full-viewport slides are not carried over; the card timeline layout stays.
- No changes to project data, the Bugle Crowns page, or other routes.

## Technical notes

- Files: `src/routes/index.tsx` (markup + ids), `src/styles.css` (rail number styles, active state), new `src/lib/use-active-timeline-item.ts` (observer hook).
- Tokens only: `--wa-color-brand-*`, `--wa-space-*`, `--wa-border-*`, `--wa-font-size-*`; existing `.pixel-display`, `.pixel-card` classes reused.
- Verify with typecheck, build, and a Playwright pass checking that scrolling updates the active number and clicking a number jumps to its card.
