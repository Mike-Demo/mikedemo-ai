import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteShell } from "@/components/SiteShell";
import { TimelineArcade } from "@/components/TimelineArcade";
import { projectsNewestFirst } from "@/data/timeline";

const description =
  "Choose from MikeDemo's AI projects in a keyboard-accessible retro NES Level Select.";

export const Route = createFileRoute("/projects/")({
  staticData: { sitemap: true },
  head: () => ({
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
    links: [{ rel: "canonical", href: "https://mikedemo.dev/projects" }],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex(): ReactElement {
  return (
    <SiteShell>
      <section className="section stack stack-l" aria-labelledby="projects-heading">
        <div className="stack stack-s level-select-heading">
          <p className="pixel-display hero-eyebrow">CHOOSE YOUR PLAYER</p>
          <h1 id="projects-heading" className="pixel-display section-title">
            Level Select
          </h1>
          <p className="text-quiet">
            Choose a cartridge. Arrow keys move the cursor; Enter launches the selected project.
          </p>
        </div>

        <TimelineArcade projects={projectsNewestFirst} />
      </section>
    </SiteShell>
  );
}