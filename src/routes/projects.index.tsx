import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { SiteShell } from "@/components/SiteShell";
import { TimelineArcade } from "@/components/TimelineArcade";
import { breadcrumbJsonLd, projectCollectionJsonLd, SITE_URL } from "@/lib/jsonld";
import { fontAwesomeLinks } from "@/lib/head-assets";
import { listProjects } from "@/lib/projects.functions";

const description =
  "Choose from MikeDemo's AI projects in a keyboard-accessible retro NES Level Select.";

export const Route = createFileRoute("/projects/")({
  staticData: { sitemap: true },
  loader: () => listProjects(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "AI Projects Level Select — MikeDemo" },
      { name: "description", content: description },
      { property: "og:title", content: "AI Projects Level Select — MikeDemo" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/projects" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://mikedemo.dev/projects" },
      ...fontAwesomeLinks,
    ],
    scripts: [
      { type: "application/ld+json", children: projectCollectionJsonLd(loaderData ?? []) },
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Projects", url: `${SITE_URL}/projects` },
        ]),
      },
    ],
  }),
  errorComponent: ProjectsUnavailable,
  notFoundComponent: ProjectsUnavailable,
  component: ProjectsIndex,
});

function ProjectsUnavailable(): ReactElement {
  return (
    <SiteShell>
      <section className="section stack stack-m">
        <h1 className="pixel-display section-title">Level Select unavailable</h1>
        <NesContainer title="CARTRIDGE ERROR">
          The project list could not be loaded right now. Please try again in a moment.
        </NesContainer>
      </section>
    </SiteShell>
  );
}

function ProjectsIndex(): ReactElement {
  const projects = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="section stack stack-l" aria-labelledby="projects-heading">
        <div className="stack stack-s level-select-heading">
          <p className="pixel-display hero-eyebrow">CHOOSE YOUR PLAYER</p>
          <h1 id="projects-heading" className="pixel-display section-title">
            AI Project Level Select
          </h1>
          <p className="text-quiet">
            Choose a cartridge. Arrow keys move the cursor; Enter launches the selected project.
          </p>
        </div>

        <TimelineArcade projects={projects} />
      </section>
    </SiteShell>
  );
}