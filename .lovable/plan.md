# Fix bouncing project-card hover

## Problem
On `/projects`, hovering a project row in the overworld level-select list makes the card visually bounce. The `.overworld-node` default state sets a `box-shadow` offset, but the `:hover`/`:focus-visible`/`.is-selected` rule removes it. That shadow change creates a layout shift / visual jump.

## Fix
1. In `src/styles.css`, keep the pixel shadow consistent across all `.overworld-node` states so hover/selection only changes color, not position/size.
   - Option A (preferred): add the same `box-shadow: var(--space-1) var(--space-1) 0 var(--nes-black)` to the `.overworld-node:hover, ...` rule.
   - Option B: remove the shadow from the default state instead.
   Either way, the hover state must not alter box model or shadow offset.
2. Audit `.level-cartridge` and `.overworld-node` hover styles for any other property that could cause movement (border-width, transform, margin, padding, font-size). If found, stabilize them.
3. Verify the selected-project panel still updates correctly and that focus/hover keyboard navigation remains intact.

## Verification
- TypeScript check and production build pass.
- Browser check on `/projects`: hover over several rows; the row highlights without shifting, and the subtitle/meta area (date, CLEARED/LOCKED badge) stays still.
- No console errors or regressions in keyboard navigation (Arrow/Home/End/Enter) or selected preview.
