# MikeDemo — AI Project Portfolio

A retro, NES-styled portfolio of my AI projects. Every page is prerendered to
plain HTML at build time and served as static files.

- **Production:** https://mikedemo.dev (static hosting on Spacefast)
- **Staging:** the Lovable preview and https://mikedemo-ai.lovable.app

## Key features

- **Level Select overworld** (`/projects`) — a pixel-art quest map of every
  project, navigable with mouse, touch, and keyboard (arrows / Home / End /
  Enter), with a selected-project preview panel.
- **Per-project pages** (`/projects/<slug>`) — NES "cabinet" layout with
  summary, tech stack with icons, live links, hosting tag, and credits.
- **Bugle Crowns** (`/bugle-crowns`) — my AI agent team in the AWS Agentic
  Football Cup: season standing, hand-rolled pixel charts (results strip, goals
  per week, possession per match) and reverse-chronological match recaps.
- **Skills guides** — `/agent-skills` and `/claude-code-skills`, written from
  Anthropic and Microsoft documentation.
- **Licenses & credits** (`/licenses`) — every library, font, and hosting
  provider used, with author and license.
- **Fully static** — 18 prerendered pages, no login, no request-time server
  calls, no webhooks or cron.
- **SEO & accessibility** — per-route `head()` metadata, JSON-LD (Person,
  WebSite, CollectionPage, WebApplication, SportsTeam, BreadcrumbList, Article),
  generated `sitemap.xml` and `robots.txt`, skip link, labelled icon controls,
  visually-hidden text equivalents for every chart.
- **Performance** — self-hosted WOFF2 fonts, route-scoped stylesheets, a
  preloaded WebP portrait, lazy-loaded design-system showcase, intent-based
  route prefetching, and no chart library.

## Attribution

The retro look comes from two attached design systems, copied into
`src/design-system/` and owned by their authors:

| Credit | Author | License |
| --- | --- | --- |
| [NES.css](https://nostalgic-css.github.io/NES.css/) | Bandism / nostalgic-css | MIT |
| [Web Awesome](https://webawesome.com) | Font Awesome, Inc. | Web Awesome license |
| [Font Awesome](https://fontawesome.com) | Font Awesome, Inc. | Icons CC BY 4.0, fonts SIL OFL 1.1, code MIT |
| [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) | CodeMan38 | SIL OFL 1.1 |
| [Work Sans](https://fonts.google.com/specimen/Work+Sans) | Wei Huang | SIL OFL 1.1 |

Framework and tooling: React, TanStack Start / Router / Query, Vite, Zod,
date-fns, Supabase JS. Hosting: Spacefast (production), Lovable Cloud
(staging and project data), AWS (Bugle Crowns). The full list with links lives
on the `/licenses` page and in `src/routes/licenses.tsx`.

This project is not a fork of another repository.

## Tech stack

- **Framework:** TanStack Start (React 19, SSR + build-time prerendering)
- **Router:** TanStack Router, file-based routes in `src/routes/`
- **Styling:** plain CSS (`src/styles.css`) using only design-system tokens
- **Data:** Lovable Cloud / Supabase `public.projects`, read at **build time**
- **Build:** Vite 8, TypeScript (strict), ESLint
- **Package manager:** Bun (npm also works)

## Local development

Prerequisites: **Node 22+** and **Bun 1.3+** (Bun preferred; `npm ci` works
too).

```sh
bun install
cp .env.example .env    # then fill in the two publishable values
bun run dev             # http://localhost:8080
```

The `.env` values are publishable, read-only keys and are only needed by the
build-time data step. Without them the site still builds — the step skips and
reuses the committed `src/data/projects.generated.ts`. See
[docs/environment.md](docs/environment.md).

## Build & deployment

```sh
bun run build          # static build — the default, what Spacefast runs
bun run build:lovable  # adds the Cloudflare Worker output for Lovable hosting
bun run build:static   # forces static output even inside Lovable
bun run typecheck      # tsc --noEmit
bun run lint
```

`build` runs: generate project data → generate `sitemap.xml` → `vite build`
(prerenders every public route) → copy `.output/public` into **`dist/client`**.

`dist/client` is the deployable folder: one `index.html` per page plus
`sitemap.xml`, `robots.txt`, and `_redirects`. Production is served from those
files by Spacefast, which auto-detects the repo and needs no build settings.

Because the project list is baked in at build time, editing a project record
requires a rebuild for the change to appear publicly.

## Documentation index

- [docs/architecture.md](docs/architecture.md) — codebase layout, design
  decisions, gotchas and lessons learned
- [docs/deployment.md](docs/deployment.md) — hosting, redirects, domain and DNS
- [docs/environment.md](docs/environment.md) — every environment variable
- [SPACEFAST.md](SPACEFAST.md) — the static-hosting build spec
- [docs/spacefast-prompt.md](docs/spacefast-prompt.md) — reusable prompt for
  preparing other projects for static hosting
- [roadmap.md](roadmap.md) — completed milestones and open work
