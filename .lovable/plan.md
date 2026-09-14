# Overworld map — "Level Select Overworld" redesign

Rebuild the /projects overworld map to match the selected "Level select overworld" direction: one stage per row on desktop, a bouncing pixel cursor beside the selected stage, and CLEARED / LOCKED status badges with pixel-art icons — all in the NES design system.

## What you'll see

- The green dotted field and 3-column card grid become a **mission list**: one full-width stage row per project (icon, STAGE number, name, date), connected by a dotted pixel path down the left edge.
- A small **animated pixel cursor sprite** floats (stepped 2-frame animation, reduced-motion safe) next to the currently selected stage — hover, tap, or arrow keys move it.
- Each stage row gets a **status badge**: `CLEARED` with a pixel star icon for projects that are live on the web, `LOCKED` with a pixel lock icon for ones without a live site (currently only stages without a public link).
- The selected-project panel stays on the right, restyled with an **ACTIVE** corner badge, a CRT scanline strip over the preview area, tech tags, credits, and the ENTER STAGE button.
- The dark cabinet frame, marquee ("PROJECT WORLD"), and physical controls footer stay as they are.

## Technical details

- `src/components/TimelineArcade.tsx`: change stage markup to a single-column row layout (icon + stage number + name + date + status badge), add the cursor sprite element and status badge (star/lock via `NesIcon`/`NesRuneIcon`), add the ACTIVE badge and scanline strip to the preview panel. Keyboard nav (arrows/Home/End/Enter), focus handling, aria labels, and `aria-current` are unchanged.
- `src/styles.css`: replace the `.overworld-*` grid rules with the row layout, path connector, cursor float animation (`steps(2)`, disabled under `prefers-reduced-motion`), badge and scanline styles. Colors/spacing only from NES tokens (`--nes-*`, `--space-*`) — no raw hex or px.
- Status rule: project has a live URL → CLEARED; otherwise → LOCKED. Badge text stays readable; the row's selected state still uses the yellow highlight.
- Compact rails on project/Bugle Crowns pages keep working (they reuse this component).
- Verify: typecheck, build, Playwright on /projects (desktop 1280 + tablet 925 + mobile), keyboard traversal, badge counts vs. live URLs, no console errors, no horizontal overflow.

## Assumption to confirm

"CLEARED" = the project has a live site link; "LOCKED" = no public link yet. If you'd rather mark all 10 as CLEARED (or use a different rule), say so when approving.
