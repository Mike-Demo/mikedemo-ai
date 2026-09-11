# Arcade timeline: horizontal level-select with modals

## Goals

1. Move the MIT credential out of the timeline into its own section near the top of the homepage.
2. Rebuild the timeline as a horizontal, 8-bit "level select" strip, newest first.
3. Each entry shows its project icon in place of the date marker; clicking it opens a dialog with the full project details.

## What changes on the page

**Header / credential section**

- Directly under the hero (headshot, title, quote, button), a compact "Credentials" band shows the MIT Professional Education entry: graduation-cap icon, course title, issuer, Jan – April 2025, and the credential link.
- The credential no longer appears in the project timeline.

**Horizontal timeline**

- A single horizontal track across the section, styled like a game level-select: a chunky pixel rail with a node per project.
- Order is reverse chronological (newest project on the left).
- Each node is a button showing the project's own icon, with the date and short name below it, plus a two-digit level number.
- Nodes are keyboard reachable: Tab moves through them, Left/Right/Home/End move between them, Enter/Space opens the entry.
- The strip scrolls sideways on narrow screens with clear edge affordance; on mobile it stays a scrollable row rather than collapsing to the old vertical list.
- Hover/focus gives the pixel "hard shadow" lift already used across the site.

**Detail modal**

- Clicking or activating a node opens a Web Awesome dialog titled with the project name.
- Contents: icon, start date, summary, technology stack with icons, credit links, "Details" link to the project page, and the live site link.
- Closes on Escape / overlay click / close button; focus returns to the node that opened it.

## Technical notes

- New `src/components/TimelineArcade.tsx` owns the strip plus the dialog state; `src/routes/index.tsx` renders it and a new `CredentialsSection`.
- `src/data/timeline.ts` keeps exporting `credentials` and gains a projects-only, newest-first accessor; `timelineItems` mixing both is retired.
- Reuse existing `WaCard`, `WaDialog`, `WaButton`, `WaIcon`, `ProjectIcon`, `TechTagList`, `ProjectCredits`; no new dependencies.
- Retire `src/lib/use-active-timeline-item.ts` and the vertical `.timeline-alternating` / marker / credential-card styles in `src/styles.css`, replacing them with `.arcade-*` rules built only from `--wa-*` tokens (no raw hex or px colors).
- Respect `prefers-reduced-motion` for the horizontal scroll animation.
- Keep the existing head metadata and JSON-LD untouched.
