# Deployment

The site is a folder of static files. There is no server to run: no login, no
request-time data fetching, no webhooks, no scheduled jobs.

## Production — Spacefast

| Setting | Value |
| --- | --- |
| Install command | auto-detected (`bun install` / `npm ci`) |
| Build command | auto-detected (`npm run build` / `vite build`) |
| Output directory | `dist/client` |
| Raw Nitro output | `.output/public` (copied into `dist/client`) |

Nothing needs configuring: the repo's *default* build is the static build.
Spacefast picks up the GitHub repository, auto-detects the commands, and the
result is plain HTML.

The repo deliberately keeps both `bun.lock` and `package-lock.json`: Bun stays
the preferred local package manager, while the npm lockfile makes the fallback
`npm ci` path reproducible when Spacefast chooses it.

Two hard rules follow from Spacefast scanning the **repository** (not the build
output) for Cloudflare features:

1. Never commit a `wrangler.jsonc` / `wrangler.toml` / `wrangler.json`. The
   Worker settings live inline in the Cloudflare plugin call in
   `vite.config.ts`; `.wrangler/` is git-ignored.
2. The `@cloudflare/vite-plugin` import must stay a dynamic `await import()`
   that only runs for the Lovable build. A top-level static import loads
   Cloudflare tooling in every build and the detector fails immediately.

## Staging — Lovable

The Lovable preview and https://mikedemo-ai.lovable.app stay live for testing
before anything ships. That environment sets `LOVABLE`, which switches the build
to the Cloudflare Worker output it needs; `bun run build:lovable` forces the same
output manually. If the Lovable-hosted copy ever returns a 502 after a build,
that command is the fix.

`bun run build:static` forces static output even inside Lovable
(`STATIC_BUILD=1` always wins).

## What gets published

`dist/client` contains an `index.html` for every public page:

- `/`
- `/projects`
- `/projects/<slug>` (one per project without a bespoke page)
- `/bugle-crowns`
- `/agent-skills`
- `/claude-code-skills`
- `/licenses`

Plus the files served from `public/`:

- `sitemap.xml` — regenerated from the project data on every build
- `robots.txt` — points at `/sitemap.xml`
- `_redirects` — `/*  /index.html  200`

## URL rewrites

`public/_redirects` contains a single rule:

```
/*  /index.html  200
```

Every page is a real prerendered file, so the rule is only a safety net for deep
links and unknown paths: the host serves `index.html` with a 200 and the client
router resolves the route. On a host that ignores `_redirects`, configure the
equivalent SPA fallback.

## Domain and DNS

- `mikedemo.dev` — DNS points at **Spacefast**. The domain is deliberately
  **never connected inside Lovable**, so Lovable's primary-domain redirect never
  applies and visitors only ever see the static build.
- `https://mikedemo.dev` is the base URL baked into canonical tags, OG tags, the
  sitemap, and `robots.txt`. Changing the domain means updating those.
- Spacefast handles HTTPS, caching, and server headers. Those are outside
  Lovable's view and need an external tool to check.

## Content refresh workflow

Project records live in the Lovable Cloud database and are edited there, but they
are read at build time. To publish a content change:

1. Edit the project record.
2. Re-run the SEO and security checks in Lovable (they run against the Lovable
   project — code, database, preview — and the results carry over because the
   metadata is baked into the static output).
3. Rebuild (`bun run build`) and upload / push so Spacefast rebuilds.

Spacefast always serves a snapshot of the last build.
