---
title: "Developers — MikeDemo"
description: "Machine-readable access to the MikeDemo portfolio: read-only static JSON API, OpenAPI spec, and agent resources. No auth, no keys."
canonical: "https://mikedemo.dev/developers.md"
last-updated: "2026-10-03"
---

# Developers

Everything on this site is public and read-only. No API keys, no OAuth flows, no rate limits, no pagination — the JSON files below are static exports regenerated at build time.

## JSON API

- `/api/v1/projects.json` — every project: slug, name, summary, description, tech stack, live URL, detail path.
- `/api/v1/projects/<slug>.json` — one project by slug (e.g. `/api/v1/projects/freshink.json`).
- `/api/v1/site.json` — site-level metadata.
- `/openapi.json` — OpenAPI 3.1 description of the static JSON files. Documents exactly what exists — nothing more.

## For AI agents

- `/llms.txt` — plain-text portfolio summary; full reference at `/llms.md`.
- `/.well-known/agent-card.json` — A2A-style agent card.
- `/.well-known/ard.json` — Agent Resource Discovery catalog.
- `/.well-known/agent-skills/index.json` — agent skills index with sha256 digests.
- `/auth.md` — authentication docs: there is none.
- `/schemamap.xml` — NLWeb Schema Map pointing at the schema.org JSON-LD feed.

## Versioning & stability

The API has no version beyond the `/v1/` path prefix. It is a static snapshot: projects are added and descriptions edited, but fields are not removed without the prefix changing. There is no formal deprecation policy — treat `/openapi.json` as the source of truth for the current shape.

Fetch `/api/v1/projects.json` once and filter client-side. AI crawlers and agent user-agents are welcome (see `/robots.txt`).
