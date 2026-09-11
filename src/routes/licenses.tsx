import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { LicensesPage, baseCredits } from "@/design-system/font-awsome-web-awesome-171158";

import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/licenses")({
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
        groups={[
          {
            title: "Typefaces",
            entries: [
              {
                name: "Press Start 2P",
                author: "CodeMan38",
                license: "SIL Open Font License 1.1",
                url: "https://fonts.google.com/specimen/Press+Start+2P",
                note: "Pixel display typeface used for headings.",
              },
            ],
          },
          { title: "Open source libraries", entries: baseCredits },
        ]}
      />
    </SiteShell>
  );
}
