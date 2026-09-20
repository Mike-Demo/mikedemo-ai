# Update project live URLs on site pages and LinkedIn export

## Goal

Replace the four custom-domain-bound project URLs wherever they appear, both in the downloadable LinkedIn portfolio markdown and in the site's project data, so project pages and the export stay in sync.

## URL changes

| Project | Old URL | New URL | Where used |
|---|---|---|---|
| QueerCade Connect | `https://queer-game-vault.lovable.app` | `https://queercade.mikedemo.dev/` | `public.projects` `url`, generated file, LinkedIn export |
| Rainbow Jot | `https://pridejot.lovable.app` | `https://mikedemo.one/` | `public.projects` `url`, `sites[0]`, generated file, LinkedIn export |
| Design Systems — NES | `https://project--2d41e7ac-ac8d-4713-844e-300c9d4181e6.lovable.app` | `https://design.2.mikedemo.dev` | `public.projects` `sites[0]`, generated file, LinkedIn export |
| Design Systems — Awesome | `https://project--9fea97bb-e317-446f-b683-1274350846c6.lovable.app` | `https://design.1.MikeDemo.dev` | `public.projects` `url` and `sites[1]`, generated file, LinkedIn export |

## What will change

1. **Cloud database** — run idempotent `UPDATE` statements on `public.projects` for:
   - `queercade-connect`: set `url` and `domain` to the new custom domain.
   - `rainbow-jot`: set `url` and `sites[0].url` to the new custom domain.
   - `awesome-design-system`: set `url`, `sites[0].url`, and `sites[1].url` to the new custom domains.
2. **Regenerate build data** — run `scripts/generate-projects.mjs` to rewrite `src/data/projects.generated.ts` from the database.
3. **LinkedIn artifact** — overwrite `/mnt/documents/mikedemo-projects-linkedin_v2.md` with the user's supplied content (same text, four URLs updated).

## Verification

- Confirm the four old URLs no longer appear in `src/data/projects.generated.ts` or `src/`.
- Confirm the four new URLs do appear in the generated file.
- Open the project detail pages in the preview and confirm each live-site link points to the new custom domain.
- Re-read the saved LinkedIn markdown and confirm the four URLs match the user's request.
