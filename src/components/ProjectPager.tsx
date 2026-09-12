import { Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import type { Project } from "@/data/projects";

interface ProjectPagerProps {
  readonly projects: readonly Project[];
  readonly currentSlug: string;
}

interface ProjectPagerLinkProps {
  readonly direction: "previous" | "next";
  readonly project?: Project;
}

function ProjectPagerLink({ direction, project }: ProjectPagerLinkProps): ReactElement {
  const isPrevious = direction === "previous";
  const label = isPrevious ? "PREVIOUS" : "NEXT";
  const content = isPrevious ? `← ${label}` : `${label} →`;

  if (!project) {
    return (
      <span className="nes-btn is-disabled" aria-disabled="true">
        {content}
      </span>
    );
  }

  const accessibleLabel = `${label.toLowerCase()} project: ${project.name}`;

  if (project.detailPath) {
    return (
      <Link to={project.detailPath} className="nes-btn" aria-label={accessibleLabel}>
        {content}
      </Link>
    );
  }

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="nes-btn"
      aria-label={accessibleLabel}
    >
      {content}
    </Link>
  );
}

/** Adjacent-project navigation using the portfolio's canonical display order. */
export function ProjectPager({ projects, currentSlug }: ProjectPagerProps): ReactElement {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject = currentIndex >= 0 ? projects[currentIndex + 1] : undefined;

  return (
    <nav className="project-pager" aria-label="Browse projects">
      <ProjectPagerLink direction="previous" project={previousProject} />
      <Link to="/projects" className="site-nav-link project-pager-levels">
        LEVEL SELECT
      </Link>
      <ProjectPagerLink direction="next" project={nextProject} />
    </nav>
  );
}