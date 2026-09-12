import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { DesignSystemsShowcase } from "@/components/DesignSystemsShowcase";
import { ProjectCabinet } from "@/components/ProjectCabinet";
import { ProjectPager } from "@/components/ProjectPager";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SiteShell } from "@/components/SiteShell";
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
          That cartridge isn't in the collection. Try another project from Level Select.
        </NesContainer>
        <Link to="/projects" className="site-nav-link">
          ← Back to Level Select
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

          {project.slug === "awesome-design-system" ? (
            <DesignSystemsShowcase project={project} />
          ) : (
            <div className="cluster cluster-m">
              <a className="nes-btn is-primary" href={project.url} target="_blank" rel="noopener noreferrer">
                VISIT LIVE SITE
              </a>
            </div>
          )}

          <ProjectPager projects={projectsNewestFirst} currentSlug={project.slug} />
        </ProjectCabinet>
      </section>
    </SiteShell>
  );
}
