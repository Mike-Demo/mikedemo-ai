# Move credential title above its card

## Goal
Reposition the MIT credential’s title so it appears as a prominent heading above the credential card in the homepage timeline, matching the annotated reference where the title label sits above the card body rather than inside it.

## What will change

### 1. Component structure
In `src/routes/index.tsx`, update `CredentialCard` so:
- The credential `title` is rendered outside the `WaCard` as a heading above it.
- The `WaCard` keeps the icon, issuer, summary, and "View credential" link.
- Heading hierarchy stays accessible (the existing `h3` can move above the card or become the card title depending on final structure).

### 2. Styling
In `src/styles.css`, add scoped styles for the credential title so it:
- Uses the pixel-display heading font.
- Sits directly above the credential card with consistent spacing.
- Keeps the warning/branded credential color scheme already used for the card border.
- Remains readable on mobile and respects reduced-motion preferences.

### 3. Timeline consistency
Consider whether project cards should follow the same pattern (title above card). For this plan, start with the credential card only, since that is what the annotation highlights. If the result looks right, the same treatment can be applied to `ProjectCard` in a follow-up.

## Verification
- TypeScript compilation and production build pass.
- Browser preview shows the credential title above the credential card, aligned with the timeline marker/date column.
