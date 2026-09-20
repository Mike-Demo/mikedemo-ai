# Reusable prompt: prepare a Lovable project for Spacefast static hosting

Paste this prompt into any other Lovable project. The AI there should follow it
and produce a project-specific `SPACEFAST.md` in that repo.

---

## Your task
Prepare this Lovable project for static hosting on Spacefast. The goal is a
fully prerendered static site with no live server, no login, no per-user pages,
no webhooks, no cron, and no request-time server functions.

Do **NOT** touch GitHub, DNS, or any publishing/login steps. Do **not**
connect or configure a custom domain inside Lovable. Only produce documentation
and code changes needed to make the build output static. The user will handle
GitHub, DNS, and publishing themselves.

Write the final result as a new file named `SPACEFAST.md` in the project root.

---

## Step 0 — Static check

Inspect the project. If any of the following are true, stop and report that the
project cannot be made fully static without redesign:

- User login or auth-protected routes
- Routes that show different content for different visitors
- Webhooks, cron jobs, or server-side event handlers
- Request-time database reads that must be fresh for every visitor
- Any feature that needs a running server after the build

If none apply, continue.

---

## Step 1 — Stack identification

Identify the framework and build tool. Read at minimum:

- `package.json` (dependencies and scripts)
- `vite.config.ts`, `next.config.*`, or the equivalent build config
- The route files under `src/routes/`, `src/pages/`, `app/`, etc.

Note the exact framework: TanStack Start, Next.js, plain Vite + React, or
something else.

---

## Step 2 — Prerender every public route

Configure the build to prerender all public routes to plain HTML. Choose the
path that matches the stack:

### TanStack Start

Use `@tanstack/react-start/plugin/vite` or `@lovable.dev/vite-tanstack-config`
2.20.0 or newer. Set:

```ts
prerender: {
  enabled: true,
  autoStaticPathsDiscovery: false,
}
```

List **every concrete public path** in `pages`. Example:

```ts
pages: [
  { path: "/" },
  { path: "/about" },
  // one entry per parameterized URL, e.g.:
  // { path: "/blog/hello-world" },
]
```

- Do **NOT** use `nitro: { preset: "static" }` — it breaks the SSR build.
- Parameterized routes need one `pages` entry per concrete URL; they are not
  auto-discovered.

### Next.js

Set `output: 'export'` in `next.config.*`. Make sure every dynamic route has
`generateStaticParams`. Verify the `dist` folder contains one HTML file per
public route.

### Plain Vite + React (or similar)

Use a static prerender approach appropriate to the project:

- `vite-plugin-ssr` / `vike`
- `react-snap`
- A simple `prerender.js` Node script that renders each route to HTML

If none are installed, add the simplest one that fits the router.

### Verification

After configuring, run the build and confirm that every public route has a
corresponding HTML file in the output directory. For TanStack Start / Nitro
that usually means `<route>/index.html`.

---

## Step 3 — Static assets

Ensure these files exist in `public/` and are copied into the build output:

- `sitemap.xml` — list every public page URL using the project's public domain
- `robots.txt` — point at `/sitemap.xml`
- `_redirects` — single rule:

```
/*  /index.html  200
```

This lets deep links resolve on a static host.

If the project already has a server-generated sitemap route (e.g.
`/sitemap.xml` generated at request time), delete that route and replace it with
a static `public/sitemap.xml`.

---

## Step 4 — Project data strategy

If the project reads any content from the Lovable Cloud database (project
records, posts, etc.):

1. Keep the database as the source of truth for editing.
2. Add a build-time script that reads the data using the **publishable** key and
   writes it to a generated file under `src/data/` — for example
   `src/data/projects.generated.ts`.
3. Make the pages import that generated file instead of fetching at request
   time.
4. Document that after editing data in Lovable Cloud, the user must rebuild and
   re-upload to Spacefast.

If the host environment does not have database credentials available, the script
must skip gracefully and reuse the committed generated file.

If the project has no database dependency, skip this step and state that in the
output.

---

## Step 5 — Build settings

Write the exact Spacefast build settings into `SPACEFAST.md` using this table:

```markdown
| Setting                 | Value                                      |
| ----------------------- | ------------------------------------------ |
| Install command         | `<actual install command>`                 |
| Build command           | `<actual build command>`                   |
| Static output directory | `<actual output directory>`                |
| Raw build output        | `<intermediate output directory if any>`   |
```

The build command must refresh any generated data before the main build. Example
for this project style:

```
node scripts/generate-projects.mjs && vite build && node scripts/copy-static-output.mjs
```

If the output directory is nested (e.g. `.output/public` copied to
`dist/client`), explain the copy step.

---

## Step 6 — Staging and production notes

Add a section explaining:

- **Staging = Lovable.** The Lovable preview and the default
  `*.lovable.app` URL are used to test changes before they ship.
- **Production = Spacefast.** The custom domain points at Spacefast, not
  Lovable; do not connect that domain inside Lovable, so Lovable's
  primary-domain redirect never applies.
- **SEO and security checks run against the Lovable project** (code, database,
  preview). The static output bakes in page titles, descriptions, structured
  data, sitemap, and robots, so a passing check here carries over to the
  Spacefast copy. Anything configured on Spacefast itself (server headers,
  caching, HTTPS) is outside those checks.
- **Workflow:** re-run the SEO and security checks in Lovable after content
  changes, before rebuilding and uploading — Spacefast serves a snapshot of the
  last build.

---

## Step 7 — Future-change notes

Add a short list of reminders appropriate to the stack, for example:

- Adding a public route means updating the prerender list and `public/sitemap.xml`.
- Do not set `nitro: { preset: "static" }` if using TanStack Start.
- The database-backed project data is a snapshot as of the last build; edit
  data in Lovable Cloud, then rebuild.
- Do not add server-only features later without first deciding whether to keep
  this project static.

---

## Output format

Create a single file `SPACEFAST.md` at the project root. Match this tone:
step-by-step, explicit commands, and cautionary notes about things that can
silently break. Include a note that the user handles GitHub, DNS, and
publishing/login themselves.
