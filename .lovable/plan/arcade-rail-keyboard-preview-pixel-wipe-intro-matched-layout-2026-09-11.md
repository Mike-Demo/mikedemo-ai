# Arcade rail: keyboard preview, pixel wipe intro, matched layouts

## What you'll get

1. **Keyboard-driven level select** — Tab into the rail, then arrow keys move between projects. The focused project shows a small popup card right at its icon with the date, summary and tech icons. Enter opens that project's page. Escape closes the popup, Home/End jump to the ends.
2. **Pixel wipe opening** — every page reveals with a blocky 8-bit wipe, then the content settles in. Disabled automatically for people who prefer reduced motion.
3. **Project pages that match the home page** — same centred hero treatment (big project icon, title, domain, lede), same section widths and spacing, so moving from the rail into a project no longer jumps.

## Details

### Rail preview popup
- `TimelineArcade.tsx`: track a `previewIndex` set on focus/hover and cleared on blur/mouse-out; render a popup card inside the focused `li` (absolutely positioned, pixel border/shadow, flipped at the rail edges via CSS `data-align` on first/last nodes).
- Popup content: reuse `ProjectIcon`, `formatMonthYear`, `TechTagList` (small) plus the summary — a lightweight `TimelinePreviewCard` so the existing `ProjectSummaryCard` stays as-is for detail pages.
- Enter/Space already follows the link (nodes are `<Link>`); add `Escape` to dismiss the popup while keeping focus. Popup is `aria-hidden` with the same text exposed to screen readers through the link's `aria-describedby` target, so nothing is announced twice.
- Keep existing Arrow/Home/End handling and smooth `scrollIntoView`.

### Pixel wipe
- Add a `PixelWipe` overlay rendered once in `SiteShell`, keyed by route pathname so it replays on navigation: a grid of blocks that clear in a staggered 8-bit pattern (CSS keyframes, ~450ms, `pointer-events: none`), then unmounts.
- Content sections fade/rise behind it via an `.arcade-enter` animation class.
- Wrap both in `@media (prefers-reduced-motion: reduce)` no-op rules.

### Layout parity
- `projects.$slug.tsx`: replace the left-aligned header block with a centred hero section (`hero-section`-style stack: large icon badge, `h1`, domain, lede), drop `section-narrow` in favour of the home page's section width, keep breadcrumb above, and keep the summary card, live-site button and compact rail below in the same order.
- Bugle Crowns page (`bugle-crowns.tsx`) gets the same centred hero header so all three page types line up.
- New CSS in `src/styles.css` for the popup, wipe overlay, entrance animation and the shared hero header; all values from existing design tokens, no new dependencies.

### Verification
- `bunx tsgo --noEmit`, build check, and Playwright: tab to the rail, arrow through nodes, confirm popup text changes, Enter navigates, and no console errors.
