# Add MIT AI certificate to the timeline

## Goal
Add the user's MIT Professional Education AI certificate to the homepage project timeline as a distinct milestone card, update the timeline order so the oldest entry appears first, and verify the page still builds and renders correctly.

## What will change

### Data layer
- Extend `src/data/projects.ts` (or create `src/data/timeline.ts`) to support two timeline item kinds: `project` and `credential`.
- A credential item will carry: id, kind, title, issuer, date range, summary, credential URL, icon, and optional course name.
- Add the MIT Professional Education certificate:
  - Title: "No Code AI and Machine Learning: Building Data Science Solutions"
  - Issuer: "MIT Professional Education"
  - Period: "Jan – April 2025"
  - Summary: "AI and Machine Learning"
  - Credential URL: https://www.credential.net/3e8d52c3-ec84-4ee2-b0e9-51e2aeed8a4b
  - Icon: graduation-cap (or certificate)

### Components
- In `src/routes/index.tsx`, replace the single `ProjectCard` mapping with a union render that chooses `ProjectCard` or a new `CredentialCard` based on item kind.
- Create `CredentialCard` inline or as a separate component under `src/components/`:
  - Distinct visual treatment from project cards (icon badge + credential label).
  - "View credential" link pointing to the Credential.net URL.
  - No "Details" route link, no live-site domain link, no tech tags.

### Timeline ordering
- Sort the combined timeline chronologically (oldest first) so the Jan–April 2025 certificate appears at the top and the most recent project at the bottom.
- Update the `<ol>` aria-label from "Project timeline, newest to oldest" to "Project and credential timeline, oldest to newest".

### Styling
- Reuse existing `.pixel-card`, `.timeline-alternating-item`, and `.timeline-date` classes for layout and animation.
- Add a small modifier class (e.g., `.credential-card`) only if needed for the distinct icon/badge color; prefer existing design tokens.

### Verification
- Run `bunx tsc --noEmit`.
- Run a Playwright check of `/` to confirm:
  - MIT certificate card is visible near the top of the timeline.
  - Certificate links to the Credential.net URL.
  - Existing project cards still render in the new order.
  - No console errors.

## Notes
- This intentionally changes the timeline direction from "newest first" to "oldest first" per the user's answer. If that direction should remain newest-first, the certificate would simply append at the bottom instead.
