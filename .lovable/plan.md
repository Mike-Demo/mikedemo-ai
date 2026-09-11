# Arcade rail: nodes link to project pages

## Goals

1. Every part of a rail entry — icon, date, and name — is one link that opens that project's own page.
2. Each project page gets a pixel-styled summary card matching the homepage look, plus a mini rail showing where the project sits among the others.

## What changes

**Level Select rail (homepage)**

- Each node becomes a single link instead of a button: icon, date, and short name are all clickable, with the same pixel hover/focus lift.
- Bugle Crowns keeps going to its own page; every other project goes to its project page.
- Arrow keys / Home / End still move along the rail; Enter opens the project.
- The pop-up detail dialog is retired — the rail is now pure navigation, and its contents live on the project page instead.
- Helper copy under the heading updates to say picking a level opens the project.

**Project pages**

- Under the project heading, a pixel card in the same style as the homepage cards shows: project icon, start date, summary, technology tags with icons, credits, and the live-site link.
- Below that, a "Level Select" mini rail shows all projects in the same newest-first order with the current one marked as the active level; the neighbours are links, so you can hop between projects without going home.
- The current project's node is marked as current for screen readers and is not a link.

**Bugle Crowns page**

- Gets the same pixel summary card and mini rail above its existing Week 1 content, so it matches the rest.

## Technical notes

- `TimelineArcade` gains an optional `currentSlug` and drops the dialog state, `WaDialog`, and focus-return logic; nodes render `<Link to="/projects/$slug" params>` or `to={detailPath}` — never interpolated hrefs.
- New `ProjectSummaryCard` component reuses `WaCard`/`pixel-card`, `ProjectIcon`, `TechTagList`, `ProjectCredits`, and the existing date formatter (moved into a small shared helper).
- `src/routes/projects.$slug.tsx` and `src/routes/bugle-crowns.tsx` render the card plus `<TimelineArcade projects={projectsNewestFirst} currentSlug={...} />`.
- `src/styles.css`: `.arcade-node-button` rules apply to the link element; add `.arcade-node[data-current]` treatment and a compact `.arcade-rail-compact` variant. `.arcade-dialog` rules are removed. All values stay on `--wa-*` tokens; reduced-motion handling stays.
- Head metadata and JSON-LD on all routes are untouched.
