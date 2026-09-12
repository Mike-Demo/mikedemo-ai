# Stabilize the Level Select with Web Awesome Flank

## Goal
Keep the selected Level Select cabinet and its project preview steady while browsing projects, so different summaries, technologies, and credits do not make the layout jump.

## Changes
- Apply Web Awesome’s `wa-flank` layout utility to the cabinet screen’s two primary regions: the level grid and selected-project preview.
- Keep the project list as the flexible main region and the preview as the stable flank, with the preview aligned consistently rather than resizing the surrounding cabinet for each selection.
- Give the preview’s variable content a stable internal layout so its action remains anchored and project changes do not alter the cabinet’s overall height.
- Preserve the existing one-column mobile treatment, where the preview is intentionally hidden, and keep all project data, navigation, keyboard controls, and NES styling unchanged.

## Verification
- Compare short and long project summaries on desktop to confirm the cabinet and preview dimensions remain fixed.
- Check the Level Select at the current viewport and on mobile for wrapping, overflow, and footer movement.
- Re-test arrow-key selection and Enter navigation, then confirm the project builds cleanly with no browser errors.

## Technical details
- Reuse the already-loaded Web Awesome utilities stylesheet; no package or design-system source changes are needed.
- Use only existing Web Awesome/NES utility classes and project design tokens for any supporting constraints.
