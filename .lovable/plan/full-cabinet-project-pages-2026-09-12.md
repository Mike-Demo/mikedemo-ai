# Full-cabinet project pages

## Direction

Convert every project detail page into a full NES arcade-cabinet experience while preserving each project’s existing information, links, and place in the portfolio timeline.

- Use one reusable cabinet page frame so all standard projects and Bugle Crowns feel consistent with the homepage level select.
- Keep the selected NES console palette, pixel borders, hard shadows, square construction, and readable body type.
- Treat the full page as the cabinet: marquee and project identity at the top, project content within the screen, and cabinet controls as the closing band.
- Keep the shared site header and design-system footer outside the cabinet so navigation and social links remain stable.

## Standard project pages

- Move the project icon, name, domain, description, start date, summary, technologies, source credits, and live-site action into the cabinet screen.
- Preserve the compact project timeline inside each page, with the current cartridge visibly selected.
- Keep mouse, touch, Arrow keys, Home/End, Enter, and Escape behavior unchanged.
- Maintain the existing project-specific metadata, URLs, and content from the shared project records.

## Bugle Crowns

- Apply the same cabinet frame without flattening its richer content.
- Preserve the project summary, squad stack, schedule and leaderboard links, Week 1 statistics, complete ten-match debrief, recommendations, practice plan, and season calendar.
- Present the long sections as structured NES screen panels inside the cabinet, retaining expandable sections and horizontally scrollable results on smaller screens.
- Keep its own selected position in the compact project timeline.

## Technical details

- Add an app-owned reusable cabinet layout component composed with the attached NES design-system components; do not edit managed design-system files.
- Refactor the shared dynamic project route and Bugle Crowns route to use that frame rather than duplicating cabinet markup.
- Extend the existing token-backed page styles for full-page cabinet composition, responsive screen spacing, long-content flow, and stable controls.
- Continue using the existing `TimelineArcade` data and navigation logic so each page’s timeline remains intact.
- Preserve route metadata, canonical links, structured content, live destinations, project data, and the design-system `SiteFooter`.

## Verification

- Check every standard project route and Bugle Crowns on desktop and mobile.
- Verify no project content, links, match data, calendar data, credits, or technologies disappear.
- Verify each page’s current level is selected and keyboard navigation still previews and opens other projects.
- Check long names, result tables, accordions, calendar cells, cabinet controls, header, and footer for clipping or overlap.
- Confirm reduced-motion behavior, route transitions, build health, and absence of browser errors.

## Risk and rollback

- Risk is limited to presentation and shared page composition; project records and navigation destinations remain unchanged.
- If the full frame makes long Bugle Crowns content unwieldy, retain the reusable cabinet header and controls while allowing its screen area to grow naturally rather than clipping or paginating content.
- Rollback is isolated to restoring the two route layouts and removing the new app-owned cabinet wrapper/styles.