# Arcade rail: arrow buttons + stable footer

## What you'll see

- Previous/next arrow buttons beside the timeline rail. Clicking one scrolls the rail to the next project, moves the pixel preview card, and highlights that node — no Tab needed.
- Hovering or focusing a node no longer shoves the footer down the page. The preview card floats over the content below the rail instead of growing the page.

## Changes

### 1. Arrow buttons (`src/components/TimelineArcade.tsx`)

- Wrap the rail in a flex row: a Web Awesome circular button with a Font Awesome `chevron-left` icon, the rail, then a matching `chevron-right` button.
- Clicking an arrow advances a "selected index" (clamped at both ends), focuses and smooth-scrolls that node into view (`scrollIntoView`, inline center), and opens its preview — same behavior as keyboard Arrow keys today.
- Buttons disable at the first/last node, get `aria-label`s ("Previous project" / "Next project"), and stay keyboard-focusable.
- Hidden on the compact project-page rail variant? No — shown there too, same behavior.
- Existing keyboard support (Arrow/Home/End/Enter, focus preview) is unchanged.

### 2. Stop the footer from moving (`TimelineArcade.tsx` + `src/styles.css`)

Cause: `.arcade-rail-scroll[data-preview]` adds `padding-block-end: 15rem` when a preview opens (the scroller clips the popup otherwise), which physically grows the page and pushes the footer.

Fix — take the preview out of the clipped scroller:

- Render `TimelinePreviewCard` as a sibling of the scroll container, absolutely positioned inside a `position: relative` wrapper that has no overflow clipping.
- Horizontally align the card to the active node using the node's `offsetLeft` minus the scroller's `scrollLeft`, clamped so it never overflows the viewport edge (replaces the current `data-align` start/end hack).
- Hide the preview while the rail is being scrolled (`onScroll`), since the anchored position would drift.
- Delete the `[data-preview]` padding rule, its transition, and the `data-preview` attribute; remove the now-unneeded `data-align` attribute and its CSS.

### 3. Styling (`src/styles.css`)

- New `.arcade-rail-wrap` (relative), `.arcade-arrow` button styling consistent with the pixel look (square border, hard shadow, hover lift), and disabled state.
- `.arcade-preview` keeps its current pixel-card look; only its positioning context changes (anchored to the wrapper below the rail).
- Reduced-motion: instant scroll, no transitions, as today.

## Verification

- `bunx tsgo --noEmit` clean; build OK.
- Playwright: arrows scroll + preview at both ends (disabled states), hover/focus no longer changes page height (assert footer `getBoundingClientRect().top` is identical before/during hover), Enter still navigates, compact rail on a project page works, mobile viewport check, no console errors.
