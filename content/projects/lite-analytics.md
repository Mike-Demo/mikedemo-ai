---
title: "Lite Analytics — MikeDemo AI project"
description: "A tiny self-hosted web analytics service: cookieless tracking and a dashboard in one SpaceFast worker."
canonical: "https://mikedemo.dev/projects/lite-analytics.md"
last-updated: "2026-10-03"
---

# Lite Analytics

A tiny self-hosted web analytics service: cookieless tracking and a dashboard in one SpaceFast worker.

## About

Lite Analytics is a self-hosted, cookieless web analytics service that runs as a single SpaceFast Functions worker with zero runtime dependencies. It collects Umami-compatible tracker payloads, serves its own minimal tracker script, and renders a server-side dashboard with pageviews, visitors, bounce rate, live traffic, top pages, referrers, and custom events. One admin login, PBKDF2-hashed passwords, HMAC-signed sessions. It now powers stats across the whole portfolio.

## Details

- Live: https://github.com/Mike-Demo/umami-spacefast
- Portfolio page: https://mikedemo.dev/projects/lite-analytics/
- Tech: TypeScript, SpaceFast Functions, SQLite, Umami-compatible tracker
- Started: 2026-09-27

## Credits

- Umami: https://umami.is/

## Machine-readable

- Project record: https://mikedemo.dev/api/v1/projects/lite-analytics.json
