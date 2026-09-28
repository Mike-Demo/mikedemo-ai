import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import nesCss from "@/design-system/nes-229931/styles/nes.css?url";
import appCss from "../styles.css?url";
import { identityJsonLd } from "@/lib/jsonld";

/**
 * Content-Security-Policy delivered via <meta http-equiv> (see RootShell).
 *
 * Third-party inventory (verified 2026-09-26; tightest policy that allows them):
 * - Stylesheets: Font Awesome + Web Awesome CSS from
 *   https://cdn.jsdelivr.net/npm (route-scoped <link> tags, see lib/head-assets.ts)
 * - Fonts: self-hosted /fonts/*.woff2, plus Font Awesome webfonts served from
 *   the jsDelivr paths above (../webfonts relative to the FA stylesheet)
 * - Icons: <wa-icon> fetches SVGs from the jsDelivr @fortawesome path
 *   (connect-src; the vendored bundle pins setIconPath to jsDelivr)
 * - Images: Vite inlines assets under its inline limit as data: URIs,
 *   so img-src also allows data: (images never execute script, so this is
 *   not an XSS vector).
 * - Analytics: the private umami-lite tracker loads from
 *   https://umami-lite.view.fast/tracker.js and POSTs to /api/send there
 *   (script-src + connect-src allowlist it). No cookies, no IP storage.
 * - Appreciations: the rainbow pixel-heart on project pages reads and
 *   increments shared counts via QueerCade's public API at
 *   https://queercade.mikedemo.dev/api/public/v1/appreciations
 *   (connect-src allowlists it; that API allows all origins and
 *   rate-limits per client).
 *
 * Notes:
 * - script-src needs 'unsafe-inline': TanStack Start boots/hydrates through
 *   inline <script> tags (scroll-restoration snippet, streaming hydration
 *   parts with per-request serialized data). Nonces cannot be delivered via
 *   a static meta tag, and hashes are unusable because stream content varies
 *   per request. External script injection is still blocked: only 'self' and
 *   inline are allowed, no third-party script hosts.
 * - The <script type="application/ld+json"> blocks are not governed by
 *   script-src (non-executable script types are exempt).
 * - style-src intentionally omits 'unsafe-inline': SSR HTML contains no
 *   <style> elements or style="" attributes, and React applies style props
 *   through CSSOM, which style-src does not govern.
 * - fonts.googleapis.com is deliberately NOT allowlisted: NesProvider can
 *   inject a Google Fonts link, but nothing in the app mounts it (dead code).
 * - frame-ancestors / report-uri are not valid in meta-delivered policies and
 *   are omitted (frame-ancestors would need an HTTP header instead).
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://umami-lite.view.fast",
  "style-src 'self' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net",
  "img-src 'self' data:",
  "connect-src 'self' https://cdn.jsdelivr.net https://umami-lite.view.fast https://queercade.mikedemo.dev",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "MikeDemo" },
      {
        name: "google-site-verification",
        content: "RHlwBdxnagu8yjEC1UQ3cV-WcIJ17lGECi8uJYHO6P4",
      },
      { property: "og:site_name", content: "MikeDemo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Fonts are self-hosted (see src/styles.css) so first paint does not
      // wait on a third-party origin. Both faces are used above the fold.
      {
        rel: "preload",
        href: "/fonts/press-start-2p.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/work-sans.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // Order is load-bearing: the NES sheet must come before the app sheet,
      // or body copy renders in the pixel font.
      { rel: "stylesheet", href: nesCss },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [{ type: "application/ld+json", children: identityJsonLd() }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={CONTENT_SECURITY_POLICY}
        />
        <HeadContent />
        <script
          defer
          src="https://umami-lite.view.fast/tracker.js"
          data-website-id="80498e4e-5b55-4f01-955f-0b4ea2757654"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Keep this root providers-only: canvas preview routes (/__mockup,
// /__component) render inside it, so any chrome leaks into every frame.
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
