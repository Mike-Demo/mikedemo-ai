# Prepare the site for static hosting on Spacefast

## Static check: it can be fully static, with one change first

I checked every page. There is no login, no per-visitor content, no webhooks or scheduled
jobs. Every page shows the same thing to everyone, so a static build works.

One thing must change first. The project list currently comes from the Cloud database
through a live server call. The first load of a pre-built page is fine, but once a visitor
clicks between the Level Select and a project page, the site asks the server again — and on
a static host there is no server to answer. So the project data has to be baked into the
site at build time.

The fix keeps your workflow intact: the database stays the place the projects live and the
place you edit them, and each build pulls the current records into the site. New or edited
projects appear after the next build.

## What I'll do

1. **Bake the project data in.** A small prebuild step reads the projects from the Cloud
   database and writes them into a generated data file. Pages read that file instead of
   calling the server, so clicking around works with no server.
2. **Pre-build every public page:** home, Level Select, each project page, Bugle Crowns,
   Agent Skills, Claude Code Skills, Licenses. The internal Lovable preview pages stay out.
3. **Output folder.** The build already writes the finished pages to `dist/client`. I'll add
   the small copy script you asked for anyway, so the command is the same on any host and
   simply skips when the files are already in place.
4. **Static sitemap, robots and deep-link rule.** A plain `public/sitemap.xml` listing every
   public page, `public/robots.txt` pointing at it, and `public/_redirects` with
   `/*  /index.html  200`. The current server-generated sitemap page gets deleted.
5. **`SPACEFAST.md`** with the install command, the build command, and the output folder.
6. **Verify:** run the build, confirm an `index.html` exists for every page plus the three
   static files, then open each page in a browser to confirm it renders and that links and
   query parameters still behave after loading.

## Technical details

- **Data**: `scripts/generate-projects.mjs` reads `public.projects` via the publishable key
  and writes `src/data/projects.generated.ts` (typed, no `any`). `src/lib/projects.functions.ts`
  loses the `createServerFn` wrapper and becomes a plain async accessor over that module, so
  loaders stay isomorphic. `vite.config.ts` stops fetching slugs over the network and reads
  them from the generated module.
- **Prerender**: `tanstackStart.pages` lists `/`, `/projects`, `/projects/<slug>` for each
  slug, `/bugle-crowns`, `/agent-skills`, `/claude-code-skills`, `/licenses`;
  `prerender: { enabled: true, autoStaticPathsDiscovery: false }` stays. This project does
  not use `@lovable.dev/vite-tanstack-config` — prerendering is wired directly through
  `@tanstack/react-start/plugin/vite`, so the 2.20.0 version note does not apply here.
  `nitro.preset` is not set, and won't be.
- **Output**: the Cloudflare build already emits the prerendered HTML into `dist/client`
  (there is no `.output/public` in this project). `scripts/copy-static-output.mjs` copies
  `.output/public` → `dist/client` when that directory exists and exits cleanly when it does
  not. `build` becomes `vite build && node scripts/copy-static-output.mjs`, with
  `generate-projects.mjs` running first.
- **Build hang**: the existing `CI` shim and prerender-server shim stay. `QueryClient` is
  created per request with default `gcTime`, so no unref guard is needed unless the build
  actually hangs; if it does, a `TSS_PRERENDERING`-guarded timeout provider goes into
  `src/router.tsx`.
- **Head metadata**: already defined in each route's `head()`, including the leaf routes, so
  it is baked into the prerendered HTML. No changes needed beyond removing the sitemap route.
- **Checks**: `bun run lint` plus the full build (there is no separate typecheck script; the
  build typechecks), then Playwright over each prerendered route.

## Trade-off to know about

After this change the public site reflects the projects as of the last build. Editing a
project in the database alone will not update the live site until you build and upload again.
