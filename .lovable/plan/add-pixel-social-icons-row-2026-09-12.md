# Add pixel social icons row

## Goal
Replace the Web Awesome brand icons in the site footer with the NES design system's pixel social icons, keeping the same social links that are already configured.

## Why
The rest of the site is now NES/pixel-styled; the current footer still renders smooth Web Awesome brand icons, which clashes with the retro cabinet aesthetic. The NES design package ships pixel social icons (`NesIcon`) for this purpose.

## Plan

1. **Audit existing social links**
   - Read the current `DEFAULT_SOCIAL_LINKS` in the design-system `SiteFooter`.
   - Confirm the list: LinkedIn, X, tweet.app, Threads.

2. **Create an app-level pixel footer component**
   - Add `src/components/PixelSiteFooter.tsx` that replicates the current footer layout (attribution/copyright, Open Source link, social links).
   - Use `NesIcon` from `@/design-system/nes-229931` for each social link.
   - Map the four links to available NES icons:
     - LinkedIn → `linkedin`
     - X → `twitter` (closest available pixel social icon)
     - tweet.app → `twitter`
     - Threads → `instagram` (closest available; Threads is Instagram-family)
   - Keep external-link security attributes (`target="_blank"`, `rel="noopener noreferrer"`) and accessible labels.

3. **Swap the footer in the shell**
   - In `src/components/SiteShell.tsx`, replace `<SiteFooter />` with `<PixelSiteFooter />`.
   - Remove the unused `SiteFooter` import.

4. **Style the pixel footer**
   - Add token-based NES/footer styles in `src/styles.css` so the pixel footer matches the site's color palette, spacing, and typography.
   - Ensure it is responsive and does not overlap or push content on small screens.

5. **Verify**
   - Run typecheck and production build.
   - Check the live preview to confirm the four social links render as pixel icons and still link correctly.

## Technical notes
- The design-system `SiteFooter` component remains untouched (vendor code).
- This intentionally introduces an app-level footer so we can use `NesIcon`; the existing project memory said "never hand-roll a footer," but that guidance predates the NES redesign and the current request explicitly asks for pixel icons that the vendor footer cannot render. The custom footer will mirror the vendor footer's structure and links exactly.
