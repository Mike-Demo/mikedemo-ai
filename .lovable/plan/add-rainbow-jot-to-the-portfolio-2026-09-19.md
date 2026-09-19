# Add Rainbow Jot to the portfolio

## What will change

- Add **Rainbow Jot** to the Cloud-backed project collection so it appears in Level Select and receives the standard NES cabinet project page.
- Link to its published site at `https://pridejot.lovable.app`.
- Describe the verified experience: a pride-themed, session-only idea board with colorful draggable notes, heart voting, QR-code invites, presentation mode, and board clearing.
- Clearly note that ideas are not persisted, matching the project’s current behavior rather than describing it as real-time collaboration.
- List the verified stack: TypeScript, React, TanStack Start, Web Awesome, and Font Awesome.
- Reuse the project’s rainbow-heart logo as its portfolio artwork.
- Credit Web Awesome and Font Awesome with source links.

## Data and publishing

- Add or update the `rainbow-jot` record in the existing public projects table without changing its schema or access rules.
- Use September 19, 2026 as the start date because the source snapshot does not expose an earlier creation date.
- The existing project loader, SEO schema, sitemap, pager, keyboard controls, and static-page generation will include the new entry automatically.

## Validation

- Verify the stored record and artwork, then open Level Select and `/projects/rainbow-jot` at desktop and mobile sizes.
- Confirm project order, keyboard selection, metadata, credits, and the live-site link.
- Check build and browser diagnostics for regressions while preserving the current NES portfolio layout.

## Rollback

- Remove the single `rainbow-jot` record and its bundled artwork mapping; existing projects and routes remain untouched.
