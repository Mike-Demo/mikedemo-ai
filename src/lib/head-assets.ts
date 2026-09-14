/**
 * Route-scoped third-party stylesheet links.
 *
 * These sheets used to load on every page from the root route. Only some
 * pages need them, and each one is a render-blocking cross-origin request,
 * so they are attached from the `head()` of the routes that actually use
 * them (see the performance roadmap).
 */
import {
  FONT_AWESOME_VERSION,
  WEB_AWESOME_VERSION,
} from "@/design-system/font-awsome-web-awesome-171158/webawesome/setup";

const JSDELIVR = "https://cdn.jsdelivr.net/npm";

/** Font Awesome Free: needed wherever `fa-*` classes render (tech chips). */
export const fontAwesomeLinks = [
  {
    rel: "stylesheet",
    href: `${JSDELIVR}/@fortawesome/fontawesome-free@${FONT_AWESOME_VERSION}/css/all.min.css`,
  },
] as const;

/** Web Awesome theme + utilities: needed only where `wa-*` elements render. */
export const webAwesomeLinks = [
  {
    rel: "stylesheet",
    href: `${JSDELIVR}/@awesome.me/webawesome@${WEB_AWESOME_VERSION}/dist/styles/webawesome.css`,
  },
  {
    rel: "stylesheet",
    href: `${JSDELIVR}/@awesome.me/webawesome@${WEB_AWESOME_VERSION}/dist/styles/themes/default.css`,
  },
  {
    rel: "stylesheet",
    href: `${JSDELIVR}/@awesome.me/webawesome@${WEB_AWESOME_VERSION}/dist/styles/utilities.css`,
  },
] as const;
