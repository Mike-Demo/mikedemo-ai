import type { ReactElement } from "react";

import { WaCard, WaIcon } from "@/design-system/font-awsome-web-awesome-171158";

import { ProjectCredits } from "@/components/ProjectCredits";
import { ProjectIcon } from "@/components/ProjectIcon";
import { TechTagList } from "@/components/TechTagList";
import type { Project } from "@/data/projects";
import { formatMonthYear } from "@/lib/format-date";

/**
 * Pixel-styled summary card for a single project: icon, start date, summary,
 * tech stack, credits and the live site link.
 */
export function ProjectSummaryCard({ project }: { project: Project }): ReactElement {
  return (
    <WaCard className="pixel-card project-summary-card">
      <div className="wa-stack wa-gap-m">
        <div className="wa-cluster wa-align-items-center wa-gap-s">
          <span className="pixel-icon-badge" aria-hidden="true">
            <ProjectIcon project={project} />
          </span>
          <time className="pixel-display arcade-node-date" dateTime={project.started}>
            {formatMonthYear(project.started)}
          </time>
        </div>

        <p className="wa-color-text-quiet">{project.summary}</p>

        <TechTagList items={project.tech} size="small" label={`${project.name} tech stack`} />

        <ProjectCredits project={project} />

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="site-nav-link"
        >
          <WaIcon name="arrow-up-right-from-square" aria-hidden="true" /> {project.domain}
        </a>
      </div>
    </WaCard>
  );
}
