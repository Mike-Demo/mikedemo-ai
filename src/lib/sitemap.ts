/**
 * Sitemap bookkeeping for the static build.
 *
 * The site is prerendered and served as static files, so the sitemap is the
 * checked-in `public/sitemap.xml` rather than a server route. Each route still
 * declares whether it belongs in the sitemap, so the decision stays visible
 * next to the page; update `public/sitemap.xml` and the prerendered page list
 * in `vite.config.ts` when adding or removing a public route.
 */

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    // Optional: the auto-generated internal preview routes are rewritten by
    // mockupPreviewPlugin on every build and cannot carry route options.
    // Public routes should still declare `staticData: { sitemap: ... }`.
    sitemap?: boolean | "exclude-subtree";
  }
}

export const sitemapRouteInventoryVersion = 2;
