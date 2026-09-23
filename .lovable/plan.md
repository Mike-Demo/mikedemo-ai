# Repository hand-off documentation

Goal: anyone can clone this repo and build, understand, and maintain the site
without Lovable. Documentation only — no application code changes.

## What the audit already established

- TanStack Start (React 19) with file-based routing under `src/routes/`, plain
  CSS (`src/styles.css`) plus two attached design systems (NES.css and
  Web Awesome / Font Awesome) copied into `src/design-system/`. Bun preferred,
  npm works.
- Not a live-backend app. Project records live in the Lovable Cloud (Supabase)
  `public.projects` table, but they are read **at build time** by
  `scripts/generate-projects.mjs` into `src/data/projects.generated.ts`. No
  login, no request-time server calls, no webhooks or cron. Every page is
  prerendered to static HTML.
- Build: `npm run build` → generate projects, generate sitemap, `vite build`,
  copy `.output/public` into `dist/client`. Static output is the default
  (Spacefast); `build:lovable` adds the Cloudflare Worker output for Lovable
  hosting; `build:static` forces static even inside Lovable.
- Env: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (and `VITE_` equivalents) —
  publishable read-only values, only needed for the build-time data pull.

## Files to write

1. **`README.md`** (rewrite; current content is starter boilerplate)
   - Overview: AI project portfolio, retro NES arcade style, live at
     https://mikedemo.dev
   - Key features: level-select overworld project map, per-project pages,
     Bugle Crowns season page with hand-rolled pixel charts, agent-skills and
     Claude Code skills guides, licenses/credits page, full prerendering,
     JSON-LD + sitemap + robots, accessibility work.
   - Attribution: NES.css, Web Awesome, Font Awesome, Press Start 2P, plus the
     hosting credits — matching the Licenses page.
   - Tech stack, local dev (Bun/Node versions, install, `.env`, `bun run dev`),
     build and deployment summary, and a documentation index.

2. **`docs/architecture.md`**
   - Folder map: `src/routes`, `src/components`, `src/data`, `src/lib`,
     `src/design-system`, `scripts`, `public`.
   - Decisions: build-time data generation instead of request-time fetching;
     TanStack Query present but the site needs no client fetching; route
     `head()` for all metadata (no helmet); design-system token-only styling;
     performance choices (self-hosted WOFF2 fonts, route-scoped stylesheets,
     lazy design-system showcase, no chart library).
   - Gotchas: NES stylesheet must load before app CSS; `html body` rule keeps
     body text out of the pixel font; the Cloudflare plugin must stay a lazy
     dynamic import and no `wrangler` config file may be committed; never set
     `nitro: { preset: "static" }`; `CI=true` workaround for the prerender
     preview server; `"/"` must be written to `index.html` when flushing
     prerendered HTML; the two `*.preview.$.tsx` routes are generated and
     excluded from typecheck.

3. **`docs/deployment.md`**
   - Production = Spacefast static hosting from GitHub auto-detect; output
     `dist/client`. Staging = the Lovable preview and `mikedemo-ai.lovable.app`
     (uses `build:lovable`).
   - `public/_redirects` fallback rule, sitemap/robots, DNS pointing at
     Spacefast with the domain deliberately not connected in Lovable.
   - Content-refresh workflow: edit a project record, rebuild, re-upload.

4. **`docs/environment.md`** and **`.env.example`**
   - Each variable, what it controls, that it is publishable and read-only, and
     what happens when it is absent (the data step skips and the committed
     generated file is reused). No real values beyond the note that they are
     publishable.

5. **`roadmap.md`** (rewrite)
   - Keep the completed milestones as checked items, grouped (portfolio content,
     design system / retro UI, performance, SEO & accessibility, static hosting).
   - Open items: the info-level public-read RLS finding left intentionally open
     (published flag option), verifying the Lovable-hosted address after a
     publish, and the Week 1 `playedAt` offsets that disagree with the feed's
     UTC kickoff times.

## Verification

- Every markdown link in `README.md` and `docs/` resolves to a committed file.
- Grep the new docs for secrets: no service-role key, no database password, no
  project ref or dashboard URLs.
- `bun run typecheck` passes (there is no `check` script; `typecheck` is the
  equivalent).
