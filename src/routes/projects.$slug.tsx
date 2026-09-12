import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { ProjectCabinet } from "@/components/ProjectCabinet";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SiteShell } from "@/components/SiteShell";
import { TimelineArcade } from "@/components/TimelineArcade";
import { getProject } from "@/data/projects";
import { projectsNewestFirst } from "@/data/timeline";


export const Route = createFileRoute("/projects/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — MikeDemo" }] };
    }
    const url = `https://mikedemo.dev/projects/${loaderData.slug}`;
    const descriptor = loaderData.tech.slice(0, 2).join(" · ");
    const title = descriptor
      ? `${loaderData.name}: ${descriptor} — MikeDemo`
      : `${loaderData.name} — MikeDemo`;
    const cover = "https://mikedemo.dev/og-cover.jpg";
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: cover },
      ],
      links: [{ rel: "canonical", href: url }],
    };

  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound(): ReactElement {
  return (
    <SiteShell>
      <section className="section stack stack-m">
        <h1 className="pixel-display section-title">Project not found</h1>
        <NesContainer title="CARTRIDGE ERROR">
          That cartridge isn't in the collection. Try one of the projects on the home page.
        </NesContainer>
        <Link to="/" className="site-nav-link">
          ← Back to all projects
        </Link>
      </section>
    </SiteShell>
  );
}

function ProjectPage(): ReactElement {
  const project = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="project-stage">
        <ProjectCabinet project={project} subtitle={<p>{project.description}</p>}>
          <ProjectSummaryCard project={project} />

          <div className="cluster cluster-m">
            <a className="nes-btn is-primary" href={project.url} target="_blank" rel="noopener noreferrer">
              VISIT LIVE SITE
            </a>
          </div>

          <section className="stack stack-xs" aria-labelledby="project-level-select">
            <h2 id="project-level-select" className="pixel-display tech-heading">Project Timeline</h2>
            <p className="text-quiet">
              Where this project sits in the timeline — pick another level to jump across.
            </p>
            <TimelineArcade
              projects={projectsNewestFirst}
              currentSlug={project.slug}
              compact
            />
          </section>
        </ProjectCabinet>
      </section>
    </SiteShell>
  );
}
