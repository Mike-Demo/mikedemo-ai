# Environment variables

Only two values are actually needed, and both are **publishable, read-only**
keys. They are used by one build step — `scripts/generate-projects.mjs` — to read
the project records out of the Lovable Cloud database. Nothing is read at request
time, and no secret belongs in this repo.

Copy [`.env.example`](../.env.example) to `.env` and fill in the two values.

| Variable | Controls |
| --- | --- |
| `SUPABASE_URL` | Base URL of the Lovable Cloud (Supabase) project. Used by the build-time data step to fetch `public.projects`. |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) API key for that project. Grants read-only access to the public project list, which is what the site shows to every visitor anyway. |
| `VITE_SUPABASE_URL` | Same URL, exposed to the client bundle by Vite. Present because the generated Cloud client reads it; the static site does not call it. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Same publishable key, client-side equivalent. |
| `VITE_SUPABASE_PROJECT_ID` / `SUPABASE_PROJECT_ID` | Cloud project identifier. Written by Lovable's integration; not used by application code. |

The data step accepts either the plain or the `VITE_`-prefixed name.

## Build flags

These are not secrets and are not stored in `.env` — they are set by whoever runs
the build.

| Variable | Effect |
| --- | --- |
| `CI` | Forced to `"true"` in `vite.config.ts` when unset, to work around a Vite preview-server stdin listener that crashes the prerender step. |

## Missing values are safe

If `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` are absent — as they are on
Spacefast's build runner — `scripts/generate-projects.mjs` logs a notice, skips
the fetch, and exits cleanly. The committed `src/data/projects.generated.ts` from
the last Lovable build is reused, so the build still succeeds and the site still
lists every project. It simply does not pick up newer database edits.

## What is never here

The service-role key and the database password are not available on Lovable
Cloud and must never appear in this repository, in documentation, in logs, or in
application code.
