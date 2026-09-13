# Plan: NesButton CTA design options

## Goal
Create and implement a more intentional visual treatment for the homepage `SELECT A PROJECT` button, using the NES design system.

## Steps

1. **Capture current state**
   - Take a focused Playwright screenshot of the homepage hero showing the existing `SELECT A PROJECT` button.

2. **Generate design directions**
   - Use the design-directions tool to produce three rendered NES-styled options for the CTA button.
   - Lock the existing palette, type pairing, and layout; vary only the button style, shadow, icon, size, and motion hint.
   - Each direction must stay within the NES design system (`NesButton`, `NesIcon`, NES color tokens, pixel shadows).

3. **Present options**
   - Show the three rendered directions as clickable prototypes.
   - Ask the user to pick one.

4. **Implement chosen direction**
   - Apply the selected treatment to `src/routes/index.tsx` and any supporting styles in `src/styles.css`.
   - Preserve the existing click behavior (navigate to `/projects`) and accessibility (focus outline, touch target).
   - Verify with typecheck, build, and a Playwright screenshot.

## Out of scope
- No changes to routing, copy, or surrounding hero layout unless the chosen direction requires minor spacing.
- No new dependencies or non-NES components.
