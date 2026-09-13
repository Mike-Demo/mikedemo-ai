# NES Overworld Project Map

## Direction
Replace the current cartridge grid on `/projects` with the selected **Overworld map quest** layout while preserving the portfolio’s NES cabinet styling and all existing project content.

- Present all nine projects as connected map nodes along a clear pixel path.
- Use each project’s real icon, level number, name, and date at its node.
- Make the active node unmistakable with the existing yellow selection color and stepped cursor motion.
- Keep the selected project’s summary, technologies, credits, and **Start Level** action in a stable information panel.
- Retain the current black, blue, red, white, yellow, and green NES palette, square pixel borders, hard shadows, and readable body font.

## Layout and interaction
- **Desktop:** use a wide overworld map with a winding route and a fixed detail panel, keeping the overall cabinet dimensions stable while selection changes.
- **Tablet:** stack the full-width map above the detail panel so project labels remain readable.
- **Mobile:** use a vertically progressing map with large tap targets and a compact selected-project panel rather than hiding useful project details.
- Preserve mouse, touch, Arrow, Home, End, and Enter controls; keyboard movement will follow the project order along the route.
- Keep selection feedback stepped and immediate, with reduced-motion support and no layout bounce.

## Technical details
- Refactor `TimelineArcade` presentation around semantic map nodes while retaining its existing project data, navigation, focus management, and announcements.
- Replace the current grid/flank-specific styling with token-backed overworld path, node, and responsive panel styles in the app stylesheet.
- Compose with the attached NES components and existing project icons; do not edit managed design-system files or introduce another UI library.
- Avoid decorative map claims such as locked stages, scores, or lives that could misrepresent the real portfolio.

## Verification
- Check all nine projects, labels, dates, summaries, technologies, credits, and destinations.
- Verify keyboard order, focus visibility, Enter activation, touch targets, and live selection announcements.
- Check desktop, tablet, and the current mobile view for clipping, overlap, overflow, and stable cabinet height.
- Confirm readable body text, reduced-motion behavior, clean runtime output, and a successful build.

## Risk and rollback
- The change is presentation-only; project records and detail pages remain unchanged.
- If route lines become visually dense on small screens, simplify the connectors rather than removing project nodes or shrinking labels.
- Rollback is limited to restoring the current `TimelineArcade` markup and its Level Select styles.
