# Roadmap

Completed milestones and open work. Detailed records of each change live in
`.lovable/plan/`; architecture decisions are in [docs/architecture.md](docs/architecture.md).

## Portfolio content

- [x] Replace placeholder projects with real project records
- [x] Add Pride Blobs, Awesome Adventure CV, QueerCade Connect, Rainbow Jot
- [x] Add the portfolio site itself as a project entry
- [x] Combine NES and Font Awesome / Web Awesome into one Design Systems project
- [x] MIT AI & machine-learning credential in its own credentials band
- [x] Licenses page with real credit lines for every font, library, and host
- [x] Link source projects for credit on every card and detail page
- [x] Show the hosting platform (Spacefast / Lovable Cloud / AWS) per project
- [x] Move project records into the Cloud database (`public.projects`)
- [x] Replace Lovable preview links with custom-domain URLs everywhere
- [x] Export the portfolio as a LinkedIn-ready markdown file

## Bugle Crowns

- [x] Full Week 1 match log with per-match detail
- [x] Simplify the page to team details plus the Week 1 recap
- [x] Week 2 data, season standing, pixel charts, matching reverse-chronological
      week sections

## Retro UI / design system

- [x] NES arcade-cabinet redesign across the whole site
- [x] Level Select as its own page with an overworld quest map
- [x] Previous/Next project pager instead of selector grids
- [x] Pixel social icon footer and Font Awesome header icons
- [x] Arcade start button on the home page
- [x] Stabilise the Level Select cabinet with Web Awesome Flank; grid with
      preview below at tablet widths
- [x] Fix bouncing hover, cabinet width jumps, and pixel-font bleed into body text

## Performance, SEO, accessibility

- [x] Accessibility audit and fixes (skip link, labelled icons, tap targets,
      contrast, live-region updates, chart text equivalents)
- [x] Structured data (Person, WebSite, CollectionPage, WebApplication,
      SportsTeam, BreadcrumbList, Article)
- [x] Canonical / OG / Twitter metadata per route, generated sitemap and robots
- [x] Agent Skills and Claude Code Skills guides
- [x] Performance pass: self-hosted WOFF2 fonts, WebP portrait with preload,
      route-scoped stylesheets, lazy showcase, intent prefetch, no chart library
- [x] Remove vulnerable dependencies (Drizzle packages, unused recharts)

## Static hosting

- [x] Prerender every public page into `dist/client`
- [x] Build-time project data generation with graceful skip when credentials
      are absent
- [x] Static `sitemap.xml`, `robots.txt`, `_redirects`; sitemap regenerated each build
- [x] Make the static build the default so Spacefast's auto-detect just works
- [x] Retire the Lovable Worker build path and keep static-only deployment
- [x] Document the staging (Lovable) / production (Spacefast) split
- [x] Reusable Spacefast prompt for other projects (`docs/spacefast-prompt.md`)

## Repository hand-off

- [x] Real `README.md` with overview, features, attribution, stack, dev, deploy
- [x] `docs/architecture.md`, `docs/deployment.md`, `docs/environment.md`
- [x] `.env.example` with no real values
- [x] Consolidated roadmap

## Open

- [ ] Decide on the info-level public-read RLS finding: the `projects` SELECT
      policy is `USING (true)` for `anon` / `authenticated`, which is intentional
      for a public portfolio. Optionally add an `is_published` flag and scope the
      policy to it to silence the scanner.
- [ ] Verify the Lovable-hosted address (`mikedemo-ai.lovable.app`) after the
      next publish — the 502 fix is confirmed in the build output only.
- [ ] Reconcile Week 1 `playedAt` offsets in `src/data/bugle-crowns.ts` with the
      feed's UTC kickoff times (the `-05:00` values do not match).
- [ ] Consider a published/draft flag so in-progress projects can live in the
      database without appearing on the site.
