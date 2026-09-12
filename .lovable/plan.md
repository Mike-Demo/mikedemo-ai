# Dedicated Level Select page

## Goal

Move the complete NES Level Select out of the homepage and into its own `/projects` page so selection and project-detail screens feel like parts of one consistent game flow, while each page keeps a stable, evenly framed layout.

## Page flow

```text
Home → Level Select → Project detail
                    ↔ Previous / Next project
```

- Keep the homepage focused on MikeDemo’s introduction and MIT credential.
- Replace the homepage’s full cabinet grid with a clear NES-style “Select a project” action linking to `/projects`.
- Add a dedicated `/projects` route containing the complete cabinet Level Select, selected-project preview, keyboard controls, and launch action.
- Update the shared Projects navigation link to open `/projects` and show its active state there.

## Project pages

- Remove the repeated compact Level Select from standard project pages and Bugle Crowns.
- Add consistent Previous and Next project controls inside the cabinet, ordered by the existing reverse-chronological project list.
- At the first or last project, show the unavailable direction as disabled rather than wrapping unexpectedly.
- Keep a direct “Level Select” return link in the cabinet breadcrumb.
- Preserve every project’s existing URL, content, live-site link, credits, Bugle Crowns results, accordions, and calendar.

## Layout and accessibility

- Reuse the existing NES cabinet, project icons, and data rather than duplicating project records.
- Keep cabinet widths and content framing consistent between `/projects` and detail pages to reduce visual jumps during navigation.
- Preserve Arrow/Home/End focus movement and Enter activation on the full Level Select.
- Give Previous/Next controls descriptive accessible labels, visible focus states, and reliable mobile wrapping.
- Respect reduced-motion settings and retain the existing route transition.

## Metadata and verification

- Add unique title, description, Open Graph, Twitter, canonical, and sitemap inclusion for `/projects`.
- Update homepage wording and metadata only where needed to reflect its new role; retain the existing credential and structured content.
- Verify desktop and mobile layouts, keyboard selection, Previous/Next boundaries, active navigation, all project destinations, no overflow, and a clean build/runtime result.

## Technical details

- Create `src/routes/projects.index.tsx` for `/projects`; the existing `src/routes/projects.$slug.tsx` remains the dynamic detail route.
- Update `src/routes/index.tsx`, `src/components/SiteShell.tsx`, `src/components/ProjectCabinet.tsx`, both project detail routes, and only the supporting token-based styles required for the new flow.
- Derive adjacent projects from `projectsNewestFirst`, honoring bespoke `detailPath` destinations such as Bugle Crowns.
