# Add QueerCade Connect to the portfolio

## What will change

- Add **QueerCade Connect** to the Cloud-backed project collection so it appears in Level Select and receives its standard project detail page.
- Use the project’s real published destination: `https://queer-game-vault.lovable.app`.
- Describe it as a curated arcade of games with LGBTQ+ characters and stories, including discovery, curated collections, personal play tracking, and an editor workflow for IGDB imports and Sanity-managed content.
- List the verified stack and services: TypeScript, React, TanStack Start, Lovable Cloud, IGDB, Sanity, and the NES design system.
- Reuse the project’s joystick favicon as its bundled portfolio artwork and connect it through the existing icon lookup.
- Credit IGDB and Sanity with source links.

## Data and publishing

- Add an idempotent database migration for the new project record, preserving the existing public-read access model.
- Apply the same record to the current Cloud database so the preview updates immediately.
- Use `queercade-connect` as the slug and September 19, 2026 as the start date, based on the current project addition date because the source snapshot does not expose its creation date.
- The existing project loader, detail route, SEO schema, sitemap, pager, and static-page generation will include the new record automatically.

## Validation

- Verify the Cloud record, bundled icon, Level Select entry, project detail page, live-site link, project order, metadata, and keyboard navigation.
- Check the current build diagnostics and test the desktop and mobile presentation without changing the established NES layout.

## Rollback

- Remove the single `queercade-connect` database record and its bundled icon mapping; no existing project data or routes need to change.
