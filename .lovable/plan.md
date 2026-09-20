# Fix the Spacefast build: drop the Cloudflare Worker output

## Why it failed

Spacefast auto-detects the project and runs `vite build`. That build still
loads the Cloudflare plugin in `vite.config.ts`, which emits a Cloudflare
Worker entrypoint — and Spacefast refuses to convert Worker entrypoints, so
the build stops before anything is produced.

The site is already fully static (every public page is pre-built at build
time, projects are baked in from the database at build time). The Worker
output is no longer needed, so the fix is to stop producing it.

## What changes

1. **Remove the Cloudflare plugin from `vite.config.ts`.** The build then
   produces plain static output (TanStack Start's default Nitro output at
   `.output/public`) plus the pre-built pages — no Worker entrypoint, nothing
   for Spacefast to reject. The `prerenderServerShim` plugin exists only to
   bridge Cloudflare's server file naming, so it is removed too.

2. **Make the project-data generator safe on Spacefast CI.**
   `scripts/generate-projects.mjs` needs database credentials from `.env`,
   which will not exist on Spacefast. Change it so that when credentials are
   missing it keeps the already-committed `src/data/projects.generated.ts`
   and exits cleanly instead of failing. The Lovable preview build still has
   credentials, so data keeps refreshing here; on Spacefast the site builds
   from the data as of your last Lovable build.

3. **Keep the build command Spacefast-friendly.** `package.json` already runs
   `generate-projects.mjs && vite build && copy-static-output.mjs`; with step
   2 the generator no longer fails without credentials, so Spacefast's
   auto-detected `vite build` path and the full `npm run build` path both
   work, both ending with static files in `dist/client`.

4. **Verify.** Run the typecheck and the full build here, confirm `dist/client`
   contains an `index.html` for every one of the 17 public routes plus
   `sitemap.xml`, `robots.txt`, and `_redirects`, and spot-check pages in a
   browser. Update `SPACEFAST.md` if the build spec changed.

## Notes / trade-offs

- Previewing inside Lovable is unaffected — the dev server never used the
  Cloudflare plugin.
- Publishing on Lovable's own hosting is not part of this setup anymore; the
  public site is the Spacefast static build. The database remains readable by
  the build only (public visitors never contact it).
- If you later add anything that needs a live server (login, forms that save
  data), the site stops being fully static and this setup would need revisiting.
