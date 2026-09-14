# Performance roadmap — MikeDemo portfolio

Verified findings from the current code, ordered by impact. Every item below was confirmed by reading the files, not assumed.

## What's actually slow right now

| Finding | Measured | Where |
|---|---|---|
| Homepage portrait is a 2.4 MB PNG shown at 160×160 | 2.4 MB | `src/assets/headshot.png`, used in `src/routes/index.tsx` |
| Web Awesome element bundle loads on every page, but only one project page uses `wa-*` tags | 823 KB JS | `WebAwesomeLoader` in `src/components/SiteShell.tsx`; only `DesignSystemsShowcase.tsx` uses `wa-*` |
| Four render-blocking stylesheets pulled from two third-party CDNs on every page | 4 requests, cross-origin | `src/routes/__root.tsx` |
| Full NES stylesheet is render-blocking | 307 KB | `nes.css` link in `src/routes/__root.tsx` |
| Pixel font shipped as TrueType, not WOFF2, and not preloaded | 113 KB | `public/fonts/press-start-2p.ttf`, `@font-face` in `src/styles.css` |
| Google Fonts preconnected and a Work Sans stylesheet fetched at runtime | 1 blocking request + 1 font | `src/routes/__root.tsx` |
| `recharts` is a dependency no file imports | dead weight | `package.json` |

SSR is already in place and healthy: TanStack Start renders on Cloudflare's edge, project data is fetched in route loaders (`src/lib/projects.functions.ts`), and route components are automatically code-split. TTFB work is therefore about caching and payload, not about adding SSR.

---

## 1. Images and the LCP element

**Bottleneck.** The homepage LCP candidate is a 2.4 MB PNG decoded down to 160×160 — roughly 100× more bytes than the layout needs. On a mid-tier mobile connection this alone dominates LCP.

**Steps.**
1. Add `vite-imagetools` to the Vite config.
2. Import the portrait at its real display size in AVIF and WebP with a PNG fallback, served through `<picture>` at 160px and 320px (2×).
3. Keep the explicit `width`/`height` (already present — good, no CLS) and add `fetchpriority="high"` since it is the LCP element.
4. Give every below-the-fold image `loading="lazy"` and `decoding="async"`: project logos on `/projects`, the credential and Bugle Crowns art. The hero portrait stays eager.
5. Re-encode `public/og-cover.jpg` (120 KB) — social crawlers only, so drop it to ~60 KB at 1200×630.

**Metrics.** LCP on `/` under 1.5 s on a simulated Fast 3G run; hero image transfer under 15 KB; Lighthouse "Properly size images" and "Serve images in modern formats" both passing.

---

## 2. Lazy loading the Web Awesome runtime

**Bottleneck.** `SiteShell` mounts `WebAwesomeLoader` on every route, which imports an 823 KB element bundle. Only the Design Systems project page renders `wa-*` markup. Every other page pays the download, parse, and custom-element registration cost for nothing, competing with hydration for main-thread time.

**Steps.**
1. Remove `WebAwesomeLoader` from `SiteShell`.
2. Mount it inside `DesignSystemsShowcase` (the only `wa-*` consumer), and load that showcase itself through `React.lazy` behind a `Suspense` fallback so the bundle is requested only when that section renders.
3. Move the four Web Awesome / Font Awesome CDN stylesheet links out of `__root.tsx`'s `head()` and into the `head()` of the one route that needs them (`src/routes/projects.$slug.tsx` is shared, so gate them there by slug, or attach them from the showcase component's own route). The vendor design-system files themselves are not edited.
4. Confirm the footer and shell still render correctly — `PixelSiteFooter` uses NES pixel icons, not `wa-*`, so it is unaffected.
5. Remove the unused `recharts` dependency.

**Metrics.** Homepage JS transfer down by ~800 KB; Total Blocking Time under 200 ms; Lighthouse "Reduce unused JavaScript" clearing the Web Awesome entry on `/` and `/projects`.

---

## 3. Critical CSS, and preprocessor vs native CSS

**Bottleneck.** 307 KB of NES CSS plus four cross-origin stylesheets block first paint. The blocking chain, not the CSS language, is the problem.

**Recommendation on preprocessors: do not add LESS or Sass.** This stack already has everything a preprocessor was invented for — the design system exposes CSS custom properties (`--nes-*`) that theme at runtime, which a compile-time preprocessor variable cannot do; native nesting, `color-mix()`, and `@layer` are all supported by the browsers this site targets; and Vite already minifies and hashes CSS via Lightning CSS. Adding LESS would mean a build step, a second source of truth for tokens, and a compile boundary between the site and design-system tokens, in exchange for nothing. The existing single `src/styles.css` on top of design-system tokens is the right architecture. Split it into `@layer base, layout, components, utilities` for maintainability instead.

**Steps.**
1. Keep the NES stylesheet link first, app CSS second (this ordering is load-bearing — a previous regression flipped it and body text turned into the pixel font).
2. Inline the small critical slice — shell layout, hero, font-face — into the document head, and load the remaining NES bulk with `media="print"` + `onload` swap, or as a non-blocking preload, so first paint no longer waits on 307 KB.
3. Introduce `@layer` boundaries in `src/styles.css` and group the file by section; no visual change intended.
4. Audit for any remaining hardcoded values against design-system tokens as part of the same pass.

**Metrics.** First Contentful Paint under 1.2 s; render-blocking resources reduced to one stylesheet in the Lighthouse audit; no visual diff in before/after screenshots at 390 / 925 / 1280 px.

---

## 4. Fonts, preloading, and route prefetching

**Bottleneck.** The pixel font is a 113 KB TTF discovered only after CSS parses, so pixel headings flash in a fallback face. Work Sans arrives from a third-party origin, adding a DNS + TLS + stylesheet round trip before body text can render in its real face.

**Steps.**
1. Convert `press-start-2p.ttf` to WOFF2 (typically 60–70% smaller), keep `font-display: swap`, and drop the TTF.
2. Preload the WOFF2 from `__root.tsx`'s `head().links` with `as="font" type="font/woff2" crossorigin`.
3. Self-host Work Sans the same way and remove the Google Fonts stylesheet and both preconnects — one less origin on the critical path.
4. Preload the hero portrait from `src/routes/index.tsx`'s own `head()` (`rel="preload" as="image" fetchpriority="high"`), matching the `<picture>` sources so the preload is actually used.
5. Turn on router prefetching: `defaultPreload: "intent"` in `src/router.tsx`, and raise `defaultPreloadStaleTime` from `0` so a hover-prefetched route isn't refetched on click. The high-probability path is `/` → `/projects` → a project page, and the project list already comes from a loader, so intent prefetch warms both code and data.
6. Prefetch `/projects` eagerly from the homepage CTA (`ArcadeStartButton`) since it's the single primary action.

**Metrics.** Zero font-related layout shift (CLS under 0.05); font bytes on first load under 60 KB; navigation from `/` to `/projects` feeling instant — under 200 ms to content in a Playwright timing check.

---

## 5. TTFB, caching, and compression

**Bottleneck.** SSR is already correct, so TTFB is governed by cache headers and the per-request database read. Compression is handled by the hosting edge — hand-rolling Gzip/Brotli in the app would double-compress and is explicitly the wrong move here.

**Steps.**
1. Verify at the edge, not in code: check `content-encoding: br` on the HTML document and on the hashed JS/CSS assets from the published site. If Brotli is present (expected), no application change is warranted — do **not** add a compression middleware.
2. Set long-lived immutable caching for hashed build assets and a short `s-maxage` with `stale-while-revalidate` for the SSR HTML, so repeat and crawler visits are served from edge cache rather than re-rendered.
3. The project list is effectively static content in a database. Cache it per-render with a short TTL so ten navigations don't mean ten round trips, keeping the database as the source of truth.
4. Consider prerendering the genuinely static routes (`/`, `/agent-skills`, `/licenses`) at build time; `/projects` and project pages stay SSR since they read the database.

**Metrics.** TTFB under 200 ms from edge cache and under 600 ms cold; Lighthouse Performance 95+ on `/` and `/projects` mobile; all four Core Web Vitals in the green (LCP under 2.5 s, INP under 200 ms, CLS under 0.1).

---

## Suggested order of work

1. Portrait image pipeline and lazy loading (biggest single win, lowest risk).
2. Unmount the Web Awesome bundle from the global shell; drop `recharts`.
3. Fonts: WOFF2, self-host, preload.
4. Router prefetching.
5. Critical-CSS split and `@layer` reorganisation.
6. Cache headers, edge compression verification, optional prerendering.

## Rollback

Each step is independent and touches one or two files, so any step can be reverted alone. The two risk areas, from prior regressions on this project: the NES-then-app stylesheet order must not flip, and the pixel font must keep loading from a self-hosted file rather than a CDN. Both get a screenshot check at 390 / 925 / 1280 px after every step.

## Technical notes

- Files in scope: `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/router.tsx`, `src/components/SiteShell.tsx`, `src/components/DesignSystemsShowcase.tsx`, `src/styles.css`, `vite.config.ts`, `package.json`, `public/fonts/`, `src/assets/headshot.png`.
- Nothing under `src/design-system/**` is edited; that copy is vendor code and is replaced on any design-system update.
- Confidence: the image, bundle, stylesheet, font, and dead-dependency findings are measured facts from the files. The compression conclusion is contingent on step 5.1's header check; the roadmap assumes edge Brotli and says so rather than adding speculative middleware.
