# Make the repo pass Spacefast's Cloudflare detector

## Why the build still fails

Spacefast fails two seconds after "Build command started" — before any real
build work. Its build pack scans the **repository contents**, not the build
output, and flags anything that looks like a Cloudflare Worker project. The
repo still contains three such markers:

- `wrangler.jsonc` at the repo root (the classic Worker config file)
- `.wrangler/` (the Wrangler CLI's cache directory)
- `@cloudflare/vite-plugin` listed in `package.json` and statically imported
  at the top of `vite.config.ts`

The previous fix only stopped the Worker files from being *emitted*; the
scanner never gets that far.

## Changes

1. **Delete `wrangler.jsonc`** and the `.wrangler/` cache directory, and add
   `.wrangler` to `.gitignore` so the local cache never comes back.
2. **Give the Lovable-hosted build its Worker settings inline.** The settings
   in `wrangler.jsonc` (name, compatibility date, `nodejs_compat`) move into
   the Cloudflare plugin call inside `vite.config.ts`, so Lovable hosting
   keeps working with no config file.
3. **Load the Cloudflare plugin lazily.** Replace the static
   `import { cloudflare } from "@cloudflare/vite-plugin"` at the top of
   `vite.config.ts` with a dynamic `await import()` that only runs when the
   Lovable-hosting target is active (`LOVABLE` or `LOVABLE_BUILD=1`). The
   plain/Spacefast build then never touches Cloudflare code at all. The
   config function becomes `async`, which Vite supports.
4. **Update `SPACEFAST.md`**: note that no `wrangler` config file may exist
   in the repo, and that the Cloudflare plugin only loads on Lovable.

## What stays the same

- `package.json` keeps `@cloudflare/vite-plugin` as a dependency — Lovable's
  own builds still need it installed. It is simply never loaded on Spacefast.
- Build commands, prerendered pages, sitemap generation, and the
  `build:lovable` / `build:static` overrides are unchanged.

## Verification

- `npm run typecheck` passes.
- Plain `npm run build` (no Lovable env vars): succeeds, produces the 17
  prerendered pages in `dist/client`, and never loads the Cloudflare plugin.
- `LOVABLE_BUILD=1 npm run build` (the Lovable-hosting build): succeeds and
  still emits the Worker entry with React bundled, confirming the inline
  config replaced `wrangler.jsonc` correctly.
- Final step is yours: push to GitHub. Spacefast's next auto-build should get
  past the detector. If it still complains, the remaining trigger would be
  the dependency entry in `package.json`, which would need a different
  workaround (and I would tell you before changing anything).

## Technical details

- `vite.config.ts`: config function becomes `async`; the plugin array gets
  `...(useCloudflare ? [(await import("@cloudflare/vite-plugin")).cloudflare({ viteEnvironment: { name: "ssr" }, ... })] : [])`
  with `compatibilityDate: "2025-09-24"` and `compatibilityFlags: ["nodejs_compat"]`
  passed via the plugin's config options.
- Files touched: `vite.config.ts`, `.gitignore`, `SPACEFAST.md`; deleted:
  `wrangler.jsonc`, `.wrangler/`.
