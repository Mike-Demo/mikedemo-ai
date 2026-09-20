# Update LinkedIn portfolio markdown URLs

## Goal

Refresh the existing `mikedemo-projects-linkedin_v2.md` artifact with the custom-domain links the user provided.

## Changes

- Overwrite `/mnt/documents/mikedemo-projects-linkedin_v2.md` with the user's supplied content.
- Specific URL swaps applied:
  - **QueerCade Connect** live link → `https://queercade.mikedemo.dev/`
  - **Rainbow Jot** live link → `https://mikedemo.one/`
  - **Design Systems — NES Design System** → `https://design.2.mikedemo.dev`
  - **Design Systems — Font Awesome & Web Awesome** → `https://design.1.MikeDemo.dev`
- All other project text, dates, descriptions, skills, credits, project-page links, and the deduplicated skills list remain exactly as supplied.

## Verification

- Re-read the saved file and confirm the four URLs above match the user's requested values.
- Confirm the file opens cleanly as markdown.
- Present it as a downloadable artifact in chat.
