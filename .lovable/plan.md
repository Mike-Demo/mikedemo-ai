# Add Structured Data (Schema.org) Across the Site

The SEO foundations scan is fully passing — no failing findings. This plan adds JSON-LD structured data to help search engines and AI assistants understand who you are and what each page is, which can enable richer search results.

## What gets added

1. **Person + WebSite schema on every page** (`__root.tsx`)
   - `Person`: your name (Mike Demopoulos), site URL, and links to your LinkedIn, X, Threads, and Forbes profiles — this helps Google connect the site to your identity (knowledge panel eligibility).
   - `WebSite`: site name "MikeDemo" and URL.

2. **CollectionPage + ItemList on /projects (Level Select)**
   - Lists all nine portfolio projects with their names, URLs, and positions — tells search engines this is a project index.

3. **SoftwareApplication (or WebApplication) on each project detail page** (`/projects/$slug`, `/bugle-crowns`)
   - Name, description, URL, technologies, and date created from the existing `projects.ts` data — no content changes needed. Bugle Crowns gets a `SportsTeam`-flavored CreativeWork treatment instead, matching its competition content.

4. **BreadcrumbList on all inner pages**
   - Home → Projects → [Project] style trails, which can show as breadcrumbs in search results.

5. **Article schema already on /agent-skills** — verified in place, left unchanged.

## Technical details

- All schemas go in each route's existing `head()` via the `scripts` array (the same pattern already used for the Article schema on `/agent-skills`) — no new dependencies, no rendering changes.
- Data comes from `src/data/projects.ts` and `src/data/timeline.ts`, so schemas stay in sync with content automatically.
- Verification: typecheck, build, and a browser pass confirming the JSON-LD renders in the page head; the next scheduled SEO scan re-verifies.
- No visual changes to the site. The change reaches the live URL on the next publish.
