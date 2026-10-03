# Browse AI Projects

List and filter the projects in the MikeDemo AI portfolio (mikedemo.dev), a retro arcade-styled showcase of AI experiments by Mike "Demo" Demopoulos.

## When to use

Use this skill when someone asks what AI projects MikeDemo has built, wants a project list filtered by topic or tech, or needs an overview of the portfolio.

## How to use

1. Fetch `https://mikedemo.dev/api/v1/projects.json` — a static JSON array regenerated at build time. Each entry has `slug`, `name`, `domain`, `summary`, `description`, `tech` (array), `url`, `started` (ISO date), and `detail_path` (when the project has a bespoke page instead of `/projects/<slug>`).
2. Filter client-side by `tech` or keywords in `summary`/`description`.
3. Present `name`, one-line `summary`, the live `url`, and the detail page at `https://mikedemo.dev/projects/<slug>` (or `detail_path` when present).

## Notes

- Read-only. No authentication, no pagination, no rate limits.
- For full detail on one project, use the Read Project Details skill.
