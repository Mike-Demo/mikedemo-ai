import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // The host 308-redirects extensionless paths to trailing-slash
    // canonicals (/projects/x -> /projects/x/). "always" makes every
    // generated Link href point directly at the canonical form so neither
    // users nor crawlers churn through the redirect. (The router default is
    // "never", which was silently stripping the trailing slashes.)
    trailingSlash: "always",
    // Warm route code and loader data on hover/focus, and keep the warmed
    // data for 30s so the click that follows does not refetch it.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 30_000,
  });

  return router;
};
