# Architecture

A TanStack Start (React 19) site that is prerendered to static HTML at build
time. Nothing runs at request time in production.

## Codebase layout

| Path | Responsibility |
| --- | --- |
| `src/routes/` | File-based routes. `__root.tsx` holds the document shell and stylesheet order; each leaf owns its own `head()` metadata. |
| `src/components/` | App components: `TimelineArcade` (Level Select overworld), `ProjectCabinet`, `ProjectSummaryCard`, `ProjectPager`, `BugleCharts`, `HostTag`, `SiteShell`, `PixelSiteFooter`, etc. |
| `src/data/` | Typed content. `projects.ts` (icon map + `findProject`), `projects.generated.ts` (**generated — do not edit**), `bugle-crowns.ts`, `timeline.ts`. |
| `src/lib/` | Pure helpers: `projects.functions.ts` (async accessor over the generated data), `jsonld.ts`, `head-assets.ts`, `project-host.ts`, `tech-icons.ts`, `format-date.ts`, `sitemap.ts`. |
| `src/design-system/` | Vendor copies of NES.css and Web Awesome / Font Awesome. **Never edit** — re-attaching the library overwrites the folder. |
| `src/integrations/supabase/` | Auto-generated Cloud client and types. Not used at request time. |
| `scripts/` | Build steps: `generate-projects.mjs`, `generate-sitemap.mjs`, `copy-static-output.mjs`. |
| `public/` | Static passthrough: fonts, favicon, OG cover, `sitemap.xml`, `robots.txt`, `_redirects`. |
| `vite.config.ts` | Prerender page list, conditional Cloudflare plugin, prerendered-HTML flush. |

## Key design decisions

**Data is generated at build time, not fetched at request time.** Project
records live in the Lovable Cloud table `public.projects` and are edited there.
`scripts/generate-projects.mjs` reads them with the publishable key and writes
`src/data/projects.generated.ts`. `src/lib/projects.functions.ts` is a plain
async accessor over that module — deliberately *not* a `createServerFn`, because
a server call would break client-side navigation on a static host. Consequence:
the public site shows projects as of the last build.

**No client-side data fetching.** TanStack Query is installed and wired into the
router context, but no route needs it: all content is either generated or
authored in `src/data/`.

**Metadata lives in each route's `head()`.** There is no `react-helmet`. Titles,
descriptions, canonical URLs, OG/Twitter tags, and JSON-LD (built in
`src/lib/jsonld.ts`) are returned from the route so they are present in the
prerendered HTML. `og:image` is set only on leaf routes, never on `__root`.

**Styling uses design-system tokens only.** `src/styles.css` holds app layout
classes; all colours, borders, shadows, and spacing come from the NES/Web
Awesome CSS variables. The only inline numeric values in the codebase are chart
bar lengths in `BugleCharts.tsx`, which are match data (possession %, goals
relative to the weekly maximum) and cannot be tokens.

**Charts are hand-rolled.** `recharts` was removed for payload size. The Bugle
Crowns charts are CSS bars styled with NES tokens, each paired with a
visually-hidden table or a full `aria-label` so the data is readable without
sight of the graphic.

**Performance patterns:** self-hosted `press-start-2p.woff2` / `work-sans.woff2`
(no CDN font requests), a 320px WebP portrait with a preload hint, Font Awesome
and Web Awesome stylesheets scoped to the routes that need them via
`src/lib/head-assets.ts`, a lazily imported `DesignSystemsShowcase`, and
`defaultPreload: "intent"` with a 30s stale time in `src/router.tsx`.

## Gotchas & lessons learned

- **Stylesheet order matters.** The NES stylesheet must be linked *before* the
  app CSS in `__root.tsx`, or the production build ships app CSS without
  `.nes-container` rules and the retro look disappears.
- **`html body` beats the pixel font.** Body text uses Work Sans through an
  `html body` rule; a weaker selector loses to the design system's own font
  rule and the whole page renders in Press Start 2P.
- **The Cloudflare plugin must stay a lazy `await import()`.** Spacefast scans
  the *repository*, not the build output, and rejects anything that loads
  Cloudflare Worker tooling. For the same reason **no `wrangler.jsonc` /
  `wrangler.toml` / `wrangler.json` may be committed** — the Worker settings are
  passed inline to the plugin inside `vite.config.ts`. The plugin loads only
  when `LOVABLE` or `LOVABLE_BUILD=1` is set, and never when `STATIC_BUILD=1`.
- **Never set `nitro: { preset: "static" }`.** It breaks the SSR build.
  Prerendering is configured directly through
  `@tanstack/react-start/plugin/vite`, with
  `prerender: { enabled: true, autoStaticPathsDiscovery: false }` and an explicit
  `pages` list.
- **`process.env.CI` is forced to `"true"`.** Vite's preview server (used while
  prerendering) attaches an stdin listener it later removes; the build sandbox's
  stdin has no `off`, which crashed the build after every page was written. Vite
  skips that listener under `CI`.
- **`"/"` must be flushed to `index.html`.** When writing the captured
  prerendered HTML, a leading slash resolves to the filesystem root and the home
  page silently goes missing — leading/trailing slashes are stripped before
  `path.join`.
- **Two server bundle names.** The prerender step boots `dist/server/server.js`
  while the Cloudflare output emits `dist/server/index.js`; a tiny re-export
  shim (`prerenderServerShim`) bridges them for the Lovable build.
- **`src/routes/[__component].preview.$.tsx` and `[__mockup].preview.$.tsx` are
  generated** by `mockupPreviewPlugin` on every build. Edits do not stick and
  both files are excluded from `tsconfig.json`.
- **Adding a public route means three edits:** the route file, the path list in
  `prerenderPages()` in `vite.config.ts`, and `STATIC_PATHS` in
  `scripts/generate-sitemap.mjs`. Project pages need none of them — both lists
  derive from the generated project data.
- **Hosting labels live in code**, not in the database:
  `src/lib/project-host.ts` maps slugs to Spacefast / Lovable Cloud / AWS.
- **No Drizzle.** `drizzle-kit` and `drizzle-orm` were removed (they pinned a
  vulnerable esbuild); schema changes are applied as SQL through Lovable Cloud.
