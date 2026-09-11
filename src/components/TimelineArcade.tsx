import { Link } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement } from "react";
import { useRef } from "react";

import { ProjectIcon } from "@/components/ProjectIcon";
import type { Project } from "@/data/projects";
import { formatMonthYear } from "@/lib/format-date";

interface TimelineArcadeProps {
  /** Projects in the order they should appear along the rail (newest first). */
  readonly projects: readonly Project[];
  /** Slug of the project currently being viewed, if any. */
  readonly currentSlug?: string;
  /** Compact variant used on project pages. */
  readonly compact?: boolean;
}

/**
 * Horizontal "level select" rail: one pixel node per project, each linking to
 * that project's own page.
 */
export function TimelineArcade({
  projects,
  currentSlug,
  compact = false,
}: TimelineArcadeProps): ReactElement {
  const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number): void {
    const offsets: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };

    let nextIndex: number | null = null;
    if (event.key in offsets) {
      nextIndex = index + (offsets[event.key] ?? 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = projects.length - 1;
    }

    if (nextIndex === null || nextIndex < 0 || nextIndex >= projects.length) {
      return;
    }

    event.preventDefault();
    const next = nodeRefs.current[nextIndex];
    next?.focus();
    next?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  return (
    <div className="arcade-rail-scroll">
      <ol
        className={`arcade-rail${compact ? " arcade-rail-compact" : ""}`}
        aria-label="Project timeline, newest first"
      >
        {projects.map((project, index) => {
          const isCurrent = project.slug === currentSlug;
          const icon = (
            <>
              <span className="arcade-node-icon" aria-hidden="true">
                <ProjectIcon project={project} />
              </span>
              <span className="wa-visually-hidden">{`Open ${project.name}`}</span>
            </>
          );

          return (
            <li
              key={project.slug}
              className="arcade-node"
              data-current={isCurrent ? "true" : undefined}
            >
              <span className="pixel-display arcade-level" aria-hidden="true">
                {String(projects.length - index).padStart(2, "0")}
              </span>

              {isCurrent ? (
                <span className="arcade-node-button" aria-current="true">
                  <span className="arcade-node-icon" aria-hidden="true">
                    <ProjectIcon project={project} />
                  </span>
                  <span className="wa-visually-hidden">{`${project.name}, current project`}</span>
                </span>
              ) : project.detailPath ? (
                <Link
                  to={project.detailPath}
                  className="arcade-node-button"
                  ref={(element) => {
                    nodeRefs.current[index] = element;
                  }}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  {icon}
                </Link>
              ) : (
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="arcade-node-button"
                  ref={(element) => {
                    nodeRefs.current[index] = element;
                  }}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  {icon}
                </Link>
              )}

              <time className="pixel-display arcade-node-date" dateTime={project.started}>
                {formatMonthYear(project.started)}
              </time>
              <span className="pixel-display arcade-node-name">{project.name}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
