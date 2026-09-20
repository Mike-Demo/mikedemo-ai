# Show the hosting platform on each project

Add a small pixel tag telling visitors where each project is hosted.

Hosts per your answers:
- **Lovable Cloud** — Skill Finder Plus, QueerCade Connect
- **AWS** — Bugle Crowns
- **Spacefast** — every other project

## What you'll see

- On the Level Select page, each project row/card gains a small host tag next to its status.
- On each project page, the same tag appears in the project summary area.
- The tag uses the existing retro tag styling — no new colors or sizes.

## How it works

1. Add a `host` field to the project records in the database, allowed values `spacefast`, `lovable-cloud`, and `aws`, defaulting to `spacefast`.
2. Set Skill Finder Plus and QueerCade Connect to `lovable-cloud`, Bugle Crowns to `aws`; the rest stay `spacefast`.
3. Regenerate the built-in project data file so the static build carries the new field.
4. Render the tag in the Level Select list and in the project summary card, with readable labels ("Hosted on Spacefast" / "Hosted on Lovable Cloud" / "Hosted on AWS") for screen readers.

## Technical details

- Migration: `ALTER TABLE public.projects ADD COLUMN host text NOT NULL DEFAULT 'spacefast'` plus a validation check restricting it to the three values. Existing read policy and grants are unchanged.
- Data update via SQL: set `host` for the Skill Finder Plus, QueerCade Connect, and Bugle Crowns slugs.
- `src/data/projects.generated-types.ts`: add `host: string` to `GeneratedProjectRow`.
- `scripts/generate-projects.mjs`: include `host` in the selected columns and emitted rows; re-run it to rewrite `src/data/projects.generated.ts`.
- New `src/lib/project-host.ts`: maps the stored value to a display label, keeping the mapping in one place.
- UI: a pixel tag rendered in `src/components/TimelineArcade.tsx` (Level Select rows and the selected-project panel) and `src/components/ProjectSummaryCard.tsx` (project detail). Styling only through existing NES tokens and existing tag classes.

## Verification

- `bun run typecheck` and `bun run build` pass, 17 pages still prerender.
- Browser check: Level Select and the project pages show the right host for each project at desktop and mobile widths.
