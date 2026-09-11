# Reverse-chronological alternating timeline for the portfolio

## Goal
Rebuild the project list on the home page so the project cards and the timeline share one reverse-chronological flow (newest → oldest), arranged as an alternating two-column timeline. On desktop each project card sits on one side of a central rail; on mobile it collapses into a single stacked timeline.

## Current state
- `src/data/projects.ts` has an ISO `started` date for every project.
- `src/routes/index.tsx` currently renders:
  - a `wa-grid` of `ProjectCard`s in source-array order (already newest-to-oldest)
  - a separate sidebar `<aside>` timeline sorted oldest-to-newest
- `src/styles.css` already contains timeline rail/date-badge styles and scroll-driven entrance animations.

## Plan

1. **Unify the data order**
   - In `src/routes/index.tsx`, compute one sorted array: `[...projects].sort((a, b) => b.started.localeCompare(a.started))`.
   - Use that single sorted list for both cards and timeline entries.

2. **Replace the split layout with an alternating timeline**
   - Remove the `wa-flank:end` wrapper, the separate `projects-grid`, and the `timeline-aside`.
   - Render a single `<ol class="timeline-alternating">` where each `<li class="timeline-alternating-item">` contains:
     - the formatted `<time>` date badge
     - a project card (same `ProjectCard` component)
   - Alternate the visual side of each item with CSS (`:nth-child(odd)` / `:nth-child(even)`), keeping the DOM in newest-to-oldest order so screen-reader/keyboard order matches the visual sequence.

3. **Add responsive alternating-timeline CSS**
   - Central vertical rail using `border-inline-start`/`border-inline-end` or pseudo-element.
   - Each item uses CSS Grid: date marker in the center column, card in either the left or right column.
   - Mobile (`max-width: 60rem` or the existing `40rem` breakpoint): collapse to a single column with the date badge above the card, rail on the left.
   - Re-use existing pixel-funky tokens: hard shadows on cards, Press Start 2P date badge, brand color for the rail marker.

4. **Preserve the existing animation**
   - Keep the scroll-driven `timeline-item-enter` and `timeline-date-stamp` keyframes on the new `.timeline-alternating-item` and `.timeline-date` selectors.

5. **Verify**
   - Run a typecheck/build.
   - Open the preview and confirm:
     - newest project (On-Device AI, Sep 11 2026) is at the top
     - oldest project (STA 2e D20 Roller, Feb 23 2026) is at the bottom
     - cards alternate left/right on wide screens and stack on narrow screens
     - no console errors

## Out of scope
- No changes to project data, detail routes, or social/footer links.
