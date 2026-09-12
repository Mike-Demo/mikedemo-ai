# NES arcade cabinet portfolio redesign

## Direction

Build the selected **Classic arcade cabinet** direction across the full site:

- NES console palette: black, white, red, and blue
- Press Start 2P for short headings and controls; readable body copy for summaries and long-form content
- Hard pixel borders, stepped shadows, square corners, and no gradients
- The uploaded Mario Kart cabinet image guides the composition only; its artwork will not be embedded

## Homepage

- Recompose the opening area as a compact player-introduction screen using the existing headshot, quote, description, and MIT credential.
- Replace the horizontal timeline with a dominant cabinet-shaped **SELECT PROJECT** screen.
- Show all nine projects in a responsive two-row roster using their real icons, level numbers, names, and dates.
- Keep a persistent selected-project panel with its summary, technology stack, source credits, and clear “start level” action.
- Support mouse, touch, Arrow keys, Home/End, Enter, and Escape with a visible pixel cursor and correct focus behavior.
- Adapt the cabinet into a single-column game menu on small screens without shrinking text or controls beyond readability.

## Whole-site visual system

- Load the attached NES stylesheet and use its `NesContainer`, `NesButton`, `NesBadge`, `NesList`, `NesTable`, `NesText`, and pixel-art/icon primitives where they fit.
- Replace Web Awesome cards, buttons, tags, callouts, accordions, and tables on portfolio pages with NES components or accessible native patterns styled from the NES system.
- Keep project logos and technology icons as content imagery, while all surrounding controls and surfaces follow the NES system.
- Rebuild the shared header as a compact game HUD with clear current-page states and responsive navigation.
- Keep the design-system `SiteFooter` as the single source of social and license links, positioned as the cabinet’s closing band without duplicating it.
- Keep the existing pixel wipe, but retime it as a short cartridge-load transition and disable it for reduced-motion users.

## Page templates

- **Project pages:** selected-level intro, project summary panel, live-site action, credits, technology inventory, and a compact project roster for switching levels.
- **Bugle Crowns:** NES scoreboard treatment for stats and match results; native expandable debrief sections; retro calendar styling without losing data density.
- **AI agent skills:** game-manual chapter layout with NES containers and pixel lists while keeping body text easy to scan.
- **Licenses:** retain every real credit line and setup constant, presented as a retro credits/manual screen.
- **Missing project:** cartridge-not-found error screen with a clear return action.

## Technical details

- Add a dedicated level-select component and keep project selection/navigation logic separate from presentation.
- Remove the old horizontal rail and its popup/positioning styles after all pages use the new selector.
- Use the attached NES library only through its documented imports; do not edit managed design-system files.
- Keep route metadata, canonical links, structured data, sitemap behavior, project content, URLs, and social destinations unchanged.
- Use design-system values for the final styling. The chosen NES palette is an explicit visual requirement and may require a small app-level theme layer where the library has no equivalent semantic value.

## Verification

- Test desktop and mobile layouts for every content route.
- Verify keyboard traversal, selected-project preview, Enter navigation, focus return, and reduced motion.
- Check long project names, tables, calendar cells, header links, and footer links for clipping or overlap.
- Run focused type checks, the preview build, and browser checks with no console or runtime errors.
