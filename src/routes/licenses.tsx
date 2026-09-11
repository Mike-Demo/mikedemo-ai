import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  LicensesPage,
  baseCredits,
  FONT_AWESOME_VERSION,
  WEB_AWESOME_CDN,
  WEB_AWESOME_VERSION,
} from "@/design-system/font-awsome-web-awesome-171158";

import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/licenses")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Open Source Licenses — MikeDemo" },
      {
        name: "description",
        content: "Licenses and credits for the open-source libraries and typefaces used on this site.",
      },
      { property: "og:title", content: "Open Source Licenses — MikeDemo" },
      {
        property: "og:description",
        content: "Licenses and credits for the open-source libraries and typefaces used on this site.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Licenses,
});

function Licenses(): ReactElement {
  return (
    <SiteShell>
      <LicensesPage
        heading="Open source & credits"
        lede="This portfolio is a flat-file site built on freely licensed software and typefaces. Every dependency it ships is credited below."
        backHref="/"
        backLabel="Back to the portfolio"
        groups={[
          {
            title: "Typefaces",
            entries: [
              {
                name: "Press Start 2P",
                author: "CodeMan38",
                license: "SIL Open Font License 1.1",
                url: "https://openfontlicense.org",
                note: "Pixel display typeface used for every heading, the timeline date stamps, and the site wordmark. Served from Google Fonts.",
              },
              {
                name: "Inter",
                author: "Rasmus Andersson",
                license: "SIL Open Font License 1.1",
                url: "https://github.com/rsms/inter/blob/master/LICENSE.txt",
                note: "Body typeface inherited from the Web Awesome default theme.",
              },
            ],
          },
          {
            title: "Design system",
            entries: [
              ...baseCredits,
              {
                name: "Web Awesome stylesheets (CDN)",
                author: "Font Awesome / Fonticons, Inc.",
                license: "MIT",
                url: `${WEB_AWESOME_CDN}/styles/webawesome.css`,
                note: `Theme, palette, and utility stylesheets pinned to Web Awesome ${WEB_AWESOME_VERSION} with Font Awesome Free ${FONT_AWESOME_VERSION} iconography.`,
              },
            ],
          },
          {
            title: "Framework & build tooling",
            entries: [
              {
                name: "TanStack Query",
                author: "Tanner Linsley and contributors",
                license: "MIT",
                url: "https://github.com/TanStack/query/blob/main/LICENSE",
                note: "Client cache wired into the router context.",
              },
              {
                name: "Vite",
                author: "Evan You and Vite contributors",
                license: "MIT",
                url: "https://github.com/vitejs/vite/blob/main/LICENSE",
                note: "Dev server and production bundler.",
              },
              {
                name: "TypeScript",
                author: "Microsoft Corporation",
                license: "Apache-2.0",
                url: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt",
                note: "Every source file on this site is typed.",
              },
              {
                name: "Zod",
                author: "Colin McDonnell and contributors",
                license: "MIT",
                url: "https://github.com/colinhacks/zod/blob/main/LICENSE",
                note: "Schema validation for typed data.",
              },
              {
                name: "Cloudflare Vite plugin",
                author: "Cloudflare, Inc.",
                license: "MIT",
                url: "https://github.com/cloudflare/workers-sdk/blob/main/LICENSE-MIT",
                note: "Builds the site for the Workers runtime it is served from.",
              },
            ],
          },
          {
            title: "Artwork",
            entries: [
              {
                name: "Project logos & screenshots",
                author: "Mike Demopoulos",
                license: "All rights reserved",
                url: "/",
                note: "Each project icon shown in the lineup and timeline comes from that project's own site.",
              },
              {
                name: "Bugle Crowns team badge",
                author: "AWS Agentic Football Cup",
                license: "Used with permission of the event organizers",
                url: "https://agenticfootballcup.com",
                note: "Astronaut-helmet crest shown on the Bugle Crowns page.",
              },
            ],
          },
        ]}
      />
    </SiteShell>
  );
}
