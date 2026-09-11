import { Link } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import { useRef, useState } from "react";

import { ProjectIcon } from "@/components/ProjectIcon";
import { TimelinePreviewCard } from "@/components/TimelinePreviewCard";
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
 * that project's own page. Arrow keys move along the rail, the focused node
 * shows a preview popup, and Enter opens the project.
 */
export function TimelineArcade({
  projects,
  currentSlug,
  compact = false,
}: TimelineArcadeProps): ReactElement {
  const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number): void {
    if (event.key === "Escape") {
      setPreviewIndex(null);
      return;
    }

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
          const previewId = `arcade-preview-${project.slug}${compact ? "-compact" : ""}`;
          const showPreview = previewIndex === index && !isCurrent;
          const align =
            index === 0 ? "start" : index === projects.length - 1 ? "end" : undefined;

          const body = (
            <>
              <span className="arcade-node-icon" aria-hidden="true">
                <ProjectIcon project={project} />
              </span>
              <time className="pixel-display arcade-node-date" dateTime={project.started}>
                {formatMonthYear(project.started)}
              </time>
              <span className="pixel-display arcade-node-name">{project.name}</span>
            </>
          );

          const interactionProps = {
            className: "arcade-node-link",
            "aria-describedby": previewId,
            ref: (element: HTMLAnchorElement | null) => {
              nodeRefs.current[index] = element;
            },
            onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => handleKeyDown(event, index),
            onFocus: () => setPreviewIndex(index),
            onBlur: () => setPreviewIndex((current) => (current === index ? null : current)),
            onMouseEnter: () => setPreviewIndex(index),
            onMouseLeave: () => setPreviewIndex((current) => (current === index ? null : current)),
          } as const;

          let node: ReactNode;
          if (isCurrent) {
            node = (
              <span className="arcade-node-link" aria-current="page">
                {body}
              </span>
            );
          } else if (project.detailPath) {
            node = (
              <Link to={project.detailPath} {...interactionProps}>
                {body}
              </Link>
            );
          } else {
            node = (
              <Link to="/projects/$slug" params={{ slug: project.slug }} {...interactionProps}>
                {body}
              </Link>
            );
          }

          return (
            <li
              key={project.slug}
              className="arcade-node"
              data-current={isCurrent ? "true" : undefined}
              data-align={align}
            >
              <span className="pixel-display arcade-level" aria-hidden="true">
                {String(projects.length - index).padStart(2, "0")}
              </span>

              {node}

              {showPreview ? <TimelinePreviewCard project={project} id={previewId} /> : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
