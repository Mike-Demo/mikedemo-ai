import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

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
      <section className="hero-section">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="site-nav-link">
            ← All projects
          </Link>
        </nav>

        <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
          <ProjectIcon project={project} />
        </span>
        <h1 className="pixel-display hero-title">{project.name}</h1>
        <p className="pixel-display hero-eyebrow">{project.domain}</p>
        <p className="hero-subtitle">{project.description}</p>
      </section>

      <section className="section stack stack-l">
        <ProjectSummaryCard project={project} />




        <div className="cluster cluster-m">
          <a className="nes-btn is-primary" href={project.url} target="_blank" rel="noopener noreferrer">
            VISIT LIVE SITE
          </a>
        </div>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Level Select</h2>
          <p className="text-quiet">
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
