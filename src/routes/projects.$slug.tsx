import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaCallout,
  WaIcon,
} from "@/design-system/font-awsome-web-awesome-171158";

import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { ProjectIcon } from "@/components/ProjectIcon";
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
      <section className="hero-section wa-stack wa-gap-m wa-align-items-center">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="site-nav-link">
            <WaIcon name="arrow-left" aria-hidden="true" /> All projects
          </Link>
        </nav>

        <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
          <ProjectIcon project={project} />
        </span>
        <h1 className="pixel-display hero-title">{project.name}</h1>
        <p className="pixel-display hero-eyebrow">{project.domain}</p>
        <p className="hero-subtitle">{project.description}</p>
      </section>

      <section className="section wa-stack wa-gap-l">
        <ProjectSummaryCard project={project} />




        <div className="wa-cluster wa-gap-m">
          <WaButton variant="brand" size="large" href={project.url} target="_blank" rel="noopener noreferrer">
            <WaIcon slot="start" name="arrow-up-right-from-square" aria-hidden="true" />
            Visit live site
          </WaButton>
        </div>

        <div className="wa-stack wa-gap-xs">
          <h2 className="pixel-display tech-heading">Level Select</h2>
          <p className="wa-color-text-quiet">
            Where this project sits in the timeline — pick another level to jump across.
          </p>
          <TimelineArcade
            projects={projectsNewestFirst}
            currentSlug={project.slug}
            compact
          />
        </div>
      </section>

    </SiteShell>
  );
}
