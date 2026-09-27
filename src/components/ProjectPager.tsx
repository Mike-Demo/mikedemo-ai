import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesButton } from "@/design-system/nes-229931";
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
  const navigate = useNavigate();
  const isPrevious = direction === "previous";
  const label = isPrevious ? "PREVIOUS" : "NEXT";
  const content = isPrevious ? `← ${label}` : `${label} →`;

  if (!project) {
    return (
      <NesButton disabled>
        {content}
      </NesButton>
    );
  }

  const accessibleLabel = `${label.toLowerCase()} project: ${project.name}`;

  return (
    <NesButton
      aria-label={accessibleLabel}
      onClick={() => {
        if (project.detailPath) {
          void navigate({ to: project.detailPath });
          return;
        }
        void navigate({ to: "/projects/$slug", params: { slug: project.slug } });
      }}
    >
      {content}
    </NesButton>
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
      <Link to="/projects/" className="site-nav-link project-pager-levels">
        LEVEL SELECT
      </Link>
      <ProjectPagerLink direction="next" project={nextProject} />
    </nav>
  );
}