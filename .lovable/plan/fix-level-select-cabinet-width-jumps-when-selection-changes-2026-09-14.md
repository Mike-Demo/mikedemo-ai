# Fix: Level Select cabinet width jumps when selection changes

## Problem

On the Level Select page (`/projects`), the whole arcade cabinet changes width depending on which project is highlighted — worst at tablet widths (~925px), where the cabinet measured 877px for some projects and 747px for others.

Root cause (confirmed by inspecting computed styles in the browser):

- `.section.stack` is a column flex container (`.stack { display: flex; flex-direction: column }`).
- `.arcade-cabinet` has `max-width: 68rem` and `margin-inline: auto`, but no `width`.
- In a column flex container, `margin-inline: auto` cancels cross-axis stretching, so the cabinet falls back to **fit-content** sizing — its width becomes whatever the currently selected project's preview panel prefers, and it visibly grows/shrinks as you hover or arrow through projects.

Compare: `.project-cabinet` (used on detail pages) already declares `width: 100%` — which is why those pages don't jump.

## Fix

In `src/styles.css`:

1. Add `width: 100%` (and `min-width: 0` for safety) to `.arcade-cabinet`, so it always fills the section up to its `68rem` max-width, regardless of selected content. This matches the existing `.project-cabinet` pattern.
2. While here, confirm `.arcade-cabinet-compact` (used on project/Bugle Crowns pages) inherits the same stable width.

No markup or behavior changes; keyboard navigation, hover selection, and the preview panel stay exactly as they are.

## Verification

- Re-run the width measurement at 1280px, 925px, and 390px while hovering/arrow-keying through all 10 projects: cabinet, screen, map, and preview widths must be identical for every selection.
- Check the preview panel's inner scrollbar (`overflow-y: auto`) doesn't shift content; if it does at tablet width, add `scrollbar-gutter: stable` to `.selected-project`.
- Typecheck + production build; confirm no console errors on `/projects` and one detail page.
