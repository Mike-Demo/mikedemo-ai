import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaCallout,
  WaIcon,
  WaTag,
} from "@/design-system/font-awsome-web-awesome-171158";

import { SiteShell } from "@/components/SiteShell";
import { getProject } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — MikeDemo" }] };
    }
    return {
      meta: [
        { title: `${loaderData.name} — MikeDemo` },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: `${loaderData.name} — MikeDemo` },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound(): ReactElement {
  return (
    <SiteShell>
      <section className="section wa-stack wa-gap-m">
        <h1 className="pixel-display section-title">Project not found</h1>
        <WaCallout variant="warning">
          That cartridge isn't in the collection. Try one of the projects on the home page.
        </WaCallout>
        <Link to="/" className="site-nav-link">
          <WaIcon name="arrow-left" aria-hidden="true" /> Back to all projects
        </Link>
      </section>
    </SiteShell>
  );
}

function ProjectPage(): ReactElement {
  const project = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="section section-narrow wa-stack wa-gap-l">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="site-nav-link">
            <WaIcon name="arrow-left" aria-hidden="true" /> All projects
          </Link>
        </nav>

        <div className="wa-cluster wa-align-items-center wa-gap-m">
          <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
            <WaIcon name={project.icon} />
          </span>
          <div className="wa-stack wa-gap-2xs">
            <h1 className="pixel-display section-title">{project.name}</h1>
            <span className="wa-color-text-quiet">{project.domain}</span>
          </div>
        </div>

        <p className="project-lede">{project.description}</p>

        <div className="wa-stack wa-gap-xs">
          <h2 className="pixel-display tech-heading">Tech stack</h2>
          <div className="wa-cluster wa-gap-2xs">
            {project.tech.map((item) => (
              <WaTag key={item} variant="brand" appearance="filled">
                {item}
              </WaTag>
            ))}
          </div>
        </div>

        <div className="wa-cluster wa-gap-m">
          <WaButton variant="brand" size="large" href={project.url} target="_blank" rel="noopener noreferrer">
            <WaIcon slot="start" name="arrow-up-right-from-square" aria-hidden="true" />
            Visit live site
          </WaButton>
        </div>
      </section>
    </SiteShell>
  );
}
