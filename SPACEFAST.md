# Static hosting build spec (Spacefast)

This site is prerendered to plain HTML at build time. There is no server to run:
no login, no request-time data fetching, no webhooks or scheduled jobs.

## Build settings

| Setting                  | Value                                              |
| ------------------------ | -------------------------------------------------- |
| Install command          | `bun install` (or `npm ci`)                        |
| Build command            | `npm run build:static`                             |
| Static output directory  | `dist/client`                                      |
| Raw Nitro output         | `.output/public` (copied into `dist/client`)        |

`build:static` sets `STATIC_BUILD=1` and then runs the normal build:

```
STATIC_BUILD=1 node scripts/generate-projects.mjs && node scripts/generate-sitemap.mjs && vite build && node scripts/copy-static-output.mjs
```

`STATIC_BUILD=1` is what keeps the output static: it switches off the Cloudflare
Worker output in `vite.config.ts`, which Spacefast refuses to convert. The default
`npm run build` keeps the Worker output because Lovable's own hosting (preview and
`mikedemo-ai.lovable.app`) needs it to serve requests. Always use `build:static`
on Spacefast; never the plain `build`.

## What gets published

`dist/client` contains an `index.html` for every public page:

- `/`
- `/projects`
- `/projects/<slug>` (one per project)
- `/bugle-crowns`
- `/agent-skills`
- `/claude-code-skills`
- `/licenses`

Plus the static files served from `public/`:

- `sitemap.xml` — lists every public page
- `robots.txt` — points at `/sitemap.xml`
- `_redirects` — `/*  /index.html  200` so deep links resolve on a static host

## Project data

Project records live in the Lovable Cloud database (`public.projects`) and are still
edited there. `scripts/generate-projects.mjs` reads them at build time and writes
`src/data/projects.generated.ts`, which the pages import. Nothing is fetched at
request time, so navigation works with no server.

Consequence: the published site shows the projects as of the last build. After editing
a project in the database, rebuild and upload again.

The script needs `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (it also accepts the
`VITE_`-prefixed equivalents). Both are publishable, read-only values and are present
in `.env`.

## Staging and production

- **Staging = Lovable.** The Lovable preview and the published
  `mikedemo-ai.lovable.app` address stay live for testing changes before they
  ship.
- **Production = Spacefast.** `mikedemo.dev`'s DNS points at Spacefast, not
  Lovable. The domain is never connected inside Lovable, so Lovable's
  primary-domain redirect never applies.
- **SEO and security checks run against the Lovable project** (code, database,
  preview). The static output bakes in the titles, descriptions, structured
  data, sitemap, and robots file, so a passing check here carries over to the
  Spacefast copy. Anything configured on Spacefast itself (server headers,
  caching, HTTPS) is outside those checks and needs an external tool.
- **Workflow:** re-run the SEO and security checks here after content changes,
  before rebuilding and uploading — Spacefast serves a snapshot of the last
  build.

## Notes for future changes

- Adding a public route means three edits: the route file, the `prerenderPages()` list
  in `vite.config.ts`, and `public/sitemap.xml`.
- Do not set `nitro: { preset: "static" }` — it breaks the SSR build.
- Prerendering is configured directly through `@tanstack/react-start/plugin/vite`
  (`prerender: { enabled: true, autoStaticPathsDiscovery: false }`); this project does
  not use `@lovable.dev/vite-tanstack-config`.
