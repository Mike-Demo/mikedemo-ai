# Move projects into the Cloud database

Today every project lives in one code file. This moves the project records into the Cloud database so the Level Select page and each project page read their content from there — editable in the database, no code change needed.

## What changes for you

- Level Select, each project page, the Bugle Crowns page, the Skills Guide link and the sitemap all read projects from the database.
- Content stays exactly the same: same ten projects, same order (newest first), same summaries, technologies, credits, links and dates.
- Project logos stay bundled with the site (they're image files, not text), matched to each project by its short name.
- Reads are public, so pages still work for visitors who aren't signed in, and still render on first load for search engines.

## Technical outline

1. **Migration** — `public.projects` table: `slug` (PK), `name`, `domain`, `summary`, `description`, `tech text[]`, `url`, `icon`, `started date`, `detail_path`, `credits jsonb`, `sites jsonb`, timestamps. Grants: `SELECT` to `anon` + `authenticated`, `ALL` to `service_role`. RLS on with a single public read policy. The same migration seeds all ten rows with literal `INSERT`s copied from the current data file.
2. **`src/lib/projects.functions.ts`** — public `createServerFn` `listProjects` using a server publishable-key client, ordered `started desc`; maps rows to the existing `Project` type and attaches the local logo asset by slug.
3. **`src/data/projects.ts`** — keeps the `Project`/`ProjectCredit`/`ProjectSite` types and becomes the slug→logo asset map; the hardcoded array is removed.
4. **`src/data/timeline.ts`** — `projectsNewestFirst` becomes `sortProjectsNewestFirst(projects)`; credentials stay as-is.
5. **Routes** — `/projects`, `/projects/$slug`, `/bugle-crowns`, `/agent-skills` gain loaders calling `listProjects` (public fn, safe during prerender) and pass data into existing components; `head()` reads from `loaderData`, and each of those routes gets `errorComponent` / `notFoundComponent`. `sitemap[.]xml.ts` awaits `listProjects` for its project URLs.
6. **Verification** — production build, then browser checks of `/projects`, a project page, `/bugle-crowns` and `/sitemap.xml`, including a refresh to confirm data survives.

No visual or layout changes.
