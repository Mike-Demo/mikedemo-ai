import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense, type ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { ProjectCabinet } from "@/components/ProjectCabinet";
import { ProjectPager } from "@/components/ProjectPager";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SiteShell } from "@/components/SiteShell";
import { findProject } from "@/data/projects";
import { listProjects } from "@/lib/projects.functions";
import { fontAwesomeLinks, webAwesomeLinks } from "@/lib/head-assets";
import { breadcrumbJsonLd, projectJsonLd, SITE_URL } from "@/lib/jsonld";

/** Design Systems slug is the only page that renders <wa-*> markup. */
const DESIGN_SYSTEMS_SLUG = "awesome-design-system";

// Loaded on demand: pulls the Web Awesome element bundle, which no other
// project page needs.
const DesignSystemsShowcase = lazy(async () => ({
  default: (await import("@/components/DesignSystemsShowcase")).DesignSystemsShowcase,
}));


export const Route = createFileRoute("/projects/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const projects = await listProjects();
    const project = findProject(projects, params.slug);
    if (!project) throw notFound();
    return { project, projects };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — MikeDemo" }] };
    }
    const url = `https://mikedemo.dev/projects/${loaderData.project.slug}`;
    const descriptor = loaderData.project.tech.slice(0, 2).join(" · ");
    const title = descriptor
      ? `${loaderData.project.name}: ${descriptor} — MikeDemo`
      : `${loaderData.project.name} — MikeDemo`;
    const cover = "https://mikedemo.dev/og-cover.jpg";
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.project.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: cover },
      ],
      links: [
        { rel: "canonical", href: url },
        ...fontAwesomeLinks,
        ...(loaderData.project.slug === DESIGN_SYSTEMS_SLUG ? webAwesomeLinks : []),
      ],
      scripts: [
        { type: "application/ld+json", children: projectJsonLd(loaderData.project) },
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Projects", url: `${SITE_URL}/projects` },
            { name: loaderData.project.name, url },
          ]),
        },
      ],
    };

  },
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectNotFound,
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
        <Link to="/projects/" className="site-nav-link">
          ← Back to Level Select
        </Link>
      </section>
    </SiteShell>
  );
}

function ProjectPage(): ReactElement {
  const { project, projects } = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="project-stage">
        <ProjectCabinet project={project} subtitle={<p>{project.description}</p>}>
          <ProjectSummaryCard project={project} />

          {project.slug === DESIGN_SYSTEMS_SLUG ? (
            <Suspense fallback={<NesContainer title="DESIGN SYSTEMS">Loading…</NesContainer>}>
              <DesignSystemsShowcase project={project} />
            </Suspense>
          ) : (
            <div className="cluster cluster-m">
              <a className="nes-btn is-primary" href={project.url} target="_blank" rel="noopener noreferrer">
                VISIT LIVE SITE
              </a>
            </div>
          )}

          <ProjectPager projects={projects} currentSlug={project.slug} />
        </ProjectCabinet>
      </section>
    </SiteShell>
  );
}
