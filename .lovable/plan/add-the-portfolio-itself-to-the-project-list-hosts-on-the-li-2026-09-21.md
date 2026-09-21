# Add the portfolio itself to the project list + hosts on the Licenses page

Two additions: this portfolio site becomes a project entry, and the Licenses page gains a Hosting credits group.

## 1. Portfolio site as a project

Add a new record to the `public.projects` table (same source as every other project):

- **Slug:** `mikedemo-portfolio`
- **Name:** AI Project Portfolio
- **Domain:** mikedemo.dev
- **Summary:** This site — a retro level-select portfolio of my AI projects.
- **Description:** A flat-file, fully static portfolio styled like a retro game console. Projects live in a Lovable Cloud database and are baked into plain HTML at build time; staging runs on Lovable, production on Spacefast.
- **Tech:** TypeScript, React, TanStack Start, NES.css, Web Awesome, Font Awesome, Lovable Cloud
- **URL:** https://mikedemo.dev/
- **Started:** 2026-09-11 (first commit of the site)
- **Credits:** NES.css, Web Awesome, Font Awesome, Press Start 2P (with source links)
- **Icon:** the site's own pixel favicon, copied to `src/assets/project-icons/mikedemo-portfolio.png` and added to the icon map in `src/data/projects.ts`
- **Host:** no mapping needed — it defaults to Spacefast, which is correct (production is Spacefast)

Inserted with an idempotent `ON CONFLICT (slug) DO UPDATE` SQL statement, then `node scripts/generate-projects.mjs` regenerates `src/data/projects.generated.ts` so it appears on Level Select and gets its own `/projects/mikedemo-portfolio` page automatically (both the prerender list and sitemap are derived from the project data, so no other wiring is needed).

## 2. Hosts on the Licenses page

The Licenses page has no per-project entries, so the hosts go in as their own credits group at the end:

- **New "Hosting" group** with three entries, same card style as the others:
  - **Spacefast** — static hosting for this site's production copy (mikedemo.dev)
  - **Lovable Cloud** — database, staging, and hosting for Skill Finder Plus and QueerCade Connect
  - **AWS** — hosting for Bugle Crowns
- Each gets an author/license line ("Hosting provider") and a link to the provider's site.

## Technical details

- SQL via `supabase--run_sql` (idempotent INSERT); no schema change — the existing columns cover everything.
- `src/data/projects.ts`: add the icon import + icon-map entry only.
- `src/routes/licenses.tsx`: append the "Hosting" group to the `groups` array; no new components or styles.
- Sitemap and prerendered pages pick up the new project automatically on the next build (13 projects, 18 pages).

## Verification

- `bun run typecheck` and the full build pass; sitemap includes the new project page.
- Browser check: the portfolio appears in Level Select, its project page renders with the Spacefast host tag, and the Licenses page shows the Hosting group.
