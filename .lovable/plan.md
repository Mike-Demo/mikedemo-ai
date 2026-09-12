# Accessibility audit — MikeDemo portfolio

Reviewed the shared header/footer, home, Level Select, project pages, Bugle Crowns, Skills Guide, Credits, the season calendar, and the style tokens.

**Result: 2 critical, 5 warning, 3 info.** No missing image alt text, no fake buttons on non-interactive elements, no focus traps — the foundations are solid.

## Critical

1. **No "skip to content" link.** The header has a main-content target but nothing to jump to it, so keyboard and screen-reader users tab through the logo and three nav links on every single page.
2. **The season calendar (Bugle Crowns) is unreadable to screen readers.** Match days are marked only by a coloured dot plus a hover tooltip, and the day cells use a table-ish row marking that isn't valid without a real table. Someone not using a mouse gets a wall of bare numbers with no idea which days have matches.

## Warning

3. **Footer icons announce as unnamed images.** The pixel icons next to Open Source, LinkedIn, X, tweet.app and Threads are passed an empty label, which switches off the "decorative" flag and makes screen readers announce a nameless graphic before each link.
4. **Two low-contrast text colours.** The small red heading line on the dark project screens sits at 3.8:1 (needs 4.5:1), and the white "MOVE / START" control labels on the grey cabinet strip are at 2.0:1.
5. **Small tap targets on mobile.** Header nav links and footer links use the smallest pixel type with no minimum height, landing under the 44px touch minimum.
6. **Level Select arrow keys assume a fixed 3-column grid**, so up/down jump to the wrong cartridge at mobile and wide sizes.
7. **The Level Select preview panel changes silently.** Moving between cartridges swaps the summary card with no announcement, so screen-reader users don't hear the selected project change.

## Info

8. The homepage portrait's description repeats the page title; better as decorative or a real description.
9. Escape inside Level Select is repurposed to jump the cursor, which conflicts with the usual "close/exit" expectation.
10. The bulleted lists on the Skills Guide render outside a list wrapper in one spot, losing "list of 4 items" announcements.

## Fixes I'll make

Working critical-first, in this order:

1. Add a skip link in the shared shell that appears on focus and jumps to main content.
2. Rebuild the season calendar day cells so match days carry real text (visually hidden where needed), drop the invalid row marking, and pair every colour dot with a text label so colour is never the only signal.
3. Let the footer pixel icons stay properly decorative.
4. Raise the two failing colours to token values that clear 4.5:1 on their backgrounds.
5. Give header/footer links and cabinet links a 44px minimum touch height on small screens.
6. Read the real column count for arrow navigation so up/down move one visual row.
7. Announce the selected project politely when the Level Select cursor moves.
8. Tidy the three info items: portrait description, Escape behaviour, list markup.

## Technical notes

- Files touched: `src/components/SiteShell.tsx`, `src/components/PixelSiteFooter.tsx`, `src/components/SeasonCalendar.tsx`, `src/components/TimelineArcade.tsx`, `src/routes/index.tsx`, `src/routes/agent-skills.tsx`, `src/styles.css`.
- All colour changes use existing NES tokens in `src/styles.css`; no new literals, no design-system files edited.
- Calendar keeps its current visual grid; changes are semantics plus a visually-hidden utility class.
- Verification: `bunx tsgo --noEmit`, production build, and Playwright passes for skip-link focus, Level Select keyboard traversal at mobile and desktop widths, and calendar cell announcements.
