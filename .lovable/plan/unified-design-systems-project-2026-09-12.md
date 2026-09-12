# Unified Design Systems project

## Goal
Combine the NES design system and Font Awsome & Web Awesome into the selected portfolio card and one shared project page.

## Changes
- Replace the existing “Font Awsome & Web Awesome” project entry with a unified “Design Systems” entry while preserving its current portfolio position and URL.
- Update the card summary, description, technologies, icon treatment, and credits so NES, Web Awesome, and Font Awesome receive equal billing.
- Turn the existing project detail page into a dedicated combined showcase with:
  - a NES section linking to the NES project;
  - a Font Awsome & Web Awesome section linking to the Awesome project;
  - a concise explanation of how both systems work together in this portfolio;
  - shared technologies and source credits.
- Keep the surrounding arcade cabinet, previous/next navigation, accessibility behavior, and responsive layout consistent with the rest of the site.
- Update the page title and social metadata to describe the combined project.

## Technical details
- Extend the project data model only as needed for the two project links and section content.
- Render the custom combined content conditionally for this project without affecting other project pages.
- Compose existing NES and Web Awesome design-library elements; do not modify vendor-owned design-system files.
- Verify the card and page on desktop and mobile, keyboard navigation, external links, metadata, and the production build.

## Assumption
The existing `/projects/awesome-design-system` address remains unchanged so published links continue to work.
