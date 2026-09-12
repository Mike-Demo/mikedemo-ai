# Fix the Level Select layout

## Goal
Make the `/projects` cabinet readable and visually balanced at tablet widths without changing its NES styling or navigation behavior.

## Layout changes
- Keep the current side-by-side grid and preview on wide desktop screens.
- At tablet widths, place a roomy three-column cartridge grid above a full-width selected-project preview inside the same cabinet screen.
- Remove the current zero-height preview sizing that compresses the preview to its header at the 925px view.
- Give each cartridge enough width for its level number, icon, project name, and date without narrow letter-by-letter wrapping.
- Keep the mobile treatment unchanged: one-column cartridges with the selected-project preview hidden.
- Preserve stable cabinet dimensions while switching selections, with the action anchored consistently in the preview.

## Behavior and accessibility
- Preserve mouse, touch, Arrow, Home, End, and Enter controls.
- Keep focus, selected-state, and live preview announcements intact.
- Retain the NES design-system colors, typography, pixel borders, and the Web Awesome Flank utility on widths where the side-by-side arrangement fits.

## Verification
- Check the reported 925px-wide view for readable cartridges, a complete preview below the grid, and no horizontal overflow.
- Check wide desktop to confirm the split layout remains balanced and stable across short and long project summaries.
- Check mobile to confirm the preview remains hidden and cartridges stay easy to tap.
- Verify keyboard navigation, Enter activation, stable footer position, clean runtime output, and a successful build.

## Technical details
- Update the responsive rules in `src/styles.css`; adjust `TimelineArcade` markup only if a small structural hook is needed.
- Use existing NES and Web Awesome tokens and components only; do not change project content, routes, or detail pages.
