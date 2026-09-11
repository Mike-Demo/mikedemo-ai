import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaCard,
  WaIcon,
  WaTag,
} from "@/design-system/font-awsome-web-awesome-171158";

import { ProjectIcon } from "@/components/ProjectIcon";
import { SiteShell } from "@/components/SiteShell";
import headshotAsset from "@/assets/headshot.png.asset.json";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MikeDemo — AI Project Portfolio" },
      {
        name: "description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:title", content: "MikeDemo — AI Project Portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function ProjectCard({ project }: { project: (typeof projects)[number] }): ReactElement {
  return (
    <WaCard className="pixel-card" appearance="outlined">
      <div className="wa-stack wa-gap-s">
        <div className="wa-cluster wa-align-items-center wa-gap-s">
          <span className="pixel-icon-badge" aria-hidden="true">
            <ProjectIcon project={project} />
          </span>
          <h3 className="pixel-card-title">{project.name}</h3>
        </div>
        <p className="wa-color-text-quiet">{project.summary}</p>
        <div className="wa-cluster wa-gap-2xs">
          {project.tech.map((item) => (
            <WaTag key={item} variant="brand" appearance="filled" size="small">
              {item}
            </WaTag>
          ))}
        </div>
        <div className="wa-cluster wa-gap-s">
          {project.detailPath ? (
            <Link to={project.detailPath} className="site-nav-link">
              Details
            </Link>
          ) : (
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="site-nav-link"
            >
              Details
            </Link>
          )}
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="site-nav-link">
            <WaIcon name="arrow-up-right-from-square" aria-hidden="true" /> {project.domain}
          </a>
        </div>
      </div>
    </WaCard>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Index(): ReactElement {
  const projectsByDate = [...projects].sort(
    (a, b) => b.started.localeCompare(a.started)
  );

  return (
    <SiteShell>
      <section className="hero-section wa-stack wa-gap-m wa-align-items-center">
        <p className="pixel-display hero-eyebrow">PRESS START</p>
        <h1 className="pixel-display hero-title">AI Projects by MikeDemo</h1>
        <p className="hero-subtitle">
          A collection of experiments in on-device machine learning, AI deployment, agent tooling,
          and one extremely productive-looking parody office suite.
        </p>
        <WaButton variant="brand" size="large" href="#projects">
          <WaIcon slot="start" name="rocket" aria-hidden="true" />
          See the projects
        </WaButton>
      </section>

      <section id="projects" className="section wa-stack wa-gap-l" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pixel-display section-title">
          The Lineup
        </h2>
        <ol className="timeline-alternating" aria-label="Project timeline, newest to oldest">
          {projectsByDate.map((project) => (
            <li key={project.slug} className="timeline-alternating-item">
              <time className="pixel-display timeline-date" dateTime={project.started}>
                {formatDate(project.started)}
              </time>
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>
      </section>
    </SiteShell>
  );
}
