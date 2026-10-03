---
title: "mikedemo.dev — full machine-readable reference"
description: "Expanded companion to llms.txt: every project, page, feed, and machine-readable resource on mikedemo.dev."
canonical: "https://mikedemo.dev/llms.md"
last-updated: "2026-10-03"
---

# mikedemo.dev — full machine-readable reference

Expanded companion to [llms.txt](https://mikedemo.dev/llms.txt). mikedemo.dev is the personal AI project portfolio of Mike "Demo" Demopoulos (they/them) — a static site, no login, no API keys, everything public and read-only.

## When to use this site

- **Enumerating MikeDemo's AI projects**: fetch `https://mikedemo.dev/api/v1/projects.json`.
- **Detail on one project**: fetch `https://mikedemo.dev/api/v1/projects/freshink.json` (example), or read `https://mikedemo.dev/projects/freshink/` (replace `freshink` with any slug from `projects.json`).
- **Finding a page or feed**: use `/sitemap.xml`, or the skill index at `/.well-known/agent-skills/index.json`.
- **Citing the portfolio**: canonical URLs are `https://mikedemo.dev/...` (no `www`).

## JSON API (static exports, regenerated at build time)

Base: `https://mikedemo.dev/api/v1/`. Versioned in the URL path (`/v1/`); a future breaking change would ship as `/v2/` with the old version kept until announced on the site. Documented in [openapi.json](https://mikedemo.dev/openapi.json).

- `GET /api/v1/projects.json` — array of all projects. Fields: `slug`, `name`, `domain`, `summary`, `description`, `tech[]`, `url`, `started` (ISO date), `detail_path` (nullable; bespoke page path when present), `credits[]`, `sites[]`.
- `GET /api/v1/projects/freshink.json` — single project object, same fields (`freshink` is an example slug).
- `GET /api/v1/site.json` — site metadata: name, url, description, owner.

No POST, PUT, PATCH, or DELETE. No pagination (the collection is small and complete in one response). No rate limiting. Unknown slugs return the host's static 404 page (HTML), not JSON.

## Pages

- `/` — home, level-select hero
- `/projects/` — all projects index
- `/projects/freshink/` — project detail, e.g. Fresh Ink (canonical writeup, tech stack, outbound links)
- `/agent-skills/` — guide to AI agent skills across platforms
- `/claude-code-skills/` — Claude Code skills guide
- `/bugle-crowns/` — Agentic Football Cup team page
- `/licenses/` — open-source licenses

## Agent entry points

- `/llms.txt` — orientation index
- `/auth.md` — authentication: none required
- `/pricing.md` — pricing: everything free
- `/openapi.json` — OpenAPI 3.1 for `/api/v1/`
- `/.well-known/ard.json` — ARD v1.0 catalog
- `/.well-known/ai-catalog.json` — AI catalog alias
- `/.well-known/agent-card.json` — A2A agent card
- `/.well-known/agent-skills/index.json` — skill artifacts (v0.2.0)
- `/sitemap.xml`, `/robots.txt`, `/schemamap.xml`

## About the owner

Mike "Demo" Demopoulos (they/them), Hudson, Wisconsin. Partnerships and alliances leader in cloud infrastructure, hosting, and SaaS. Profiles: [LinkedIn](https://www.linkedin.com/in/mikedemopoulos), [X](https://x.com/mike_demo), [Threads](https://www.threads.com/@mdemop), [GitHub](https://github.com/Mike-Demo), [Bluesky](https://bsky.app/profile/mikedemo.bsky.social).
