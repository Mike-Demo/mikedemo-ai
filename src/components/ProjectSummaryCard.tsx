import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { HostTag } from "@/components/HostTag";
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
    <NesContainer className="project-summary-card" title="PROJECT DATA" dark>
      <div className="stack stack-m">
        <div className="cluster cluster-s">
          <span className="pixel-icon-badge" aria-hidden="true">
            <ProjectIcon project={project} />
          </span>
          <time className="pixel-display arcade-node-date" dateTime={project.started}>
            {formatMonthYear(project.started)}
          </time>
          <HostTag slug={project.slug} />
        </div>

        <p className="text-quiet">{project.summary}</p>

        <TechTagList items={project.tech} size="small" label={`${project.name} tech stack`} />

        <ProjectCredits project={project} />

        {project.sites?.length ? (
          <div className="cluster cluster-m" aria-label={`${project.name} live sites`}>
            {project.sites.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                OPEN {site.name}
              </a>
            ))}
          </div>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-link"
          >
            OPEN {project.domain}
          </a>
        )}
      </div>
    </NesContainer>
  );
}
