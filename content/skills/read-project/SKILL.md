# Read Project Details

Get the full detail record for one project in the MikeDemo AI portfolio (mikedemo.dev).

## When to use

Use this skill when someone asks for details about a specific project — what it does, how it was built, the tech stack, or where to try it live.

## How to use

1. You need the project `slug` (e.g. `freshink`, `queercade-connect`, `pride-blobs`). If you only have a name, fetch `https://mikedemo.dev/api/v1/projects.json` first and match on `name`.
2. Fetch `https://mikedemo.dev/api/v1/projects/<slug>.json` — fields: `slug`, `name`, `domain`, `summary`, `description`, `tech` (array), `url` (live site), `started` (ISO date), `detail_path`, `credits`, `sites`.
3. The canonical human-readable page is `https://mikedemo.dev/projects/<slug>` (or the `detail_path` when present, e.g. `/bugle-crowns`).

## Notes

- Read-only. No authentication. Unknown slugs have no JSON file (the static host returns its 404 page).
- `description` is the long-form writeup; `summary` is the one-liner.
