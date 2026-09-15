# Export the project portfolio as a LinkedIn-ready markdown file

## Goal

Produce one markdown file containing every project from the Level Select page, written as LinkedIn project entries you can copy straight into your profile.

## What you get

A single downloadable file, `mikedemo-projects-linkedin.md`, with:

- A short intro block (name, tagline, portfolio link) you can paste into your About/Featured section.
- One section per project, newest first, matching the site order:
  On-Device AI, Bugle Crowns, AI Deployer, Crosspost, Design Systems, Skill Finder Plus, PretendPro Office Suite, Awesome Adventure CV, Pride Blobs, STA 2e D20 Roller.
- Each project section formatted for LinkedIn's project fields:
  - **Project name**
  - **Date** — month and year the project started
  - **Description** — a tightened 2–3 sentence blurb built from the site's existing summary and description (no invented facts)
  - **Skills** — the project's technology list as a comma-separated line, ready for LinkedIn's skill tags
  - **Link** — the live site URL (both URLs where a project has two, e.g. Design Systems)
  - **Credits** — upstream projects with links, where the site lists them
- A closing "All skills used" list, deduplicated across all projects, for the profile Skills section.

## How it's produced

A one-off script reads the current project records from the Cloud database (the same source the site uses), reshapes each into LinkedIn phrasing, and writes the markdown file to your documents so it appears in chat for download. No changes to the website itself.

## Verification

- The file lists all ten projects with no blanks in name, date, description, skills or link.
- Dates and links match the live project pages.
- File opens cleanly as markdown and appears as a downloadable attachment in chat.
