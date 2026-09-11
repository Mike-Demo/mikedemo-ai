import { Link } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";
import { useRef, useState } from "react";

import { ProjectIcon } from "@/components/ProjectIcon";
import { TimelinePreviewCard } from "@/components/TimelinePreviewCard";
import { WaIcon } from "@/design-system/font-awsome-web-awesome-171158";
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

interface PreviewState {
  readonly index: number;
  readonly left: number;
}

const PREVIEW_WIDTH_REM = 17;

/**
 * Horizontal "level select" rail: one pixel node per project, each linking to
 * that project's own page. Arrow keys or the flanking arrow buttons move along
 * the rail, the active node shows a preview card floating below the rail, and
 * Enter opens the project. The preview lives outside the scroll container so
 * it overlays the page instead of growing it.
 */
export function TimelineArcade({
  projects,
  currentSlug,
  compact = false,
}: TimelineArcadeProps): ReactElement {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [preview, setPreview] = useState<PreviewState | null>(null);

  function computeLeft(index: number): number {
    const node = nodeRefs.current[index];
    const scroller = scrollRef.current;
    const wrap = wrapRef.current;
    if (!node || !scroller || !wrap) {
      return 0;
    }
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const previewWidth = Math.min(PREVIEW_WIDTH_REM * rootFontSize, wrap.clientWidth * 0.8);
    const center = node.offsetLeft - scroller.scrollLeft + node.offsetWidth / 2;
    const max = Math.max(0, wrap.clientWidth - previewWidth);
    return Math.min(Math.max(center - previewWidth / 2, 0), max);
  }

  function showPreview(index: number): void {
    setPreview({ index, left: computeLeft(index) });
  }

  function hidePreview(index: number): void {
    setPreview((current) => (current?.index === index ? null : current));
  }

  function handleScroll(): void {
    setPreview((current) =>
      current === null ? null : { index: current.index, left: computeLeft(current.index) },
    );
  }

  function step(delta: number): void {
    const focusedIndex = nodeRefs.current.findIndex(
      (element) => element !== null && element === document.activeElement,
    );
    const base = preview?.index ?? (focusedIndex >= 0 ? focusedIndex : delta > 0 ? -1 : projects.length);
    const next = Math.min(Math.max(base + delta, 0), projects.length - 1);
    const node = nodeRefs.current[next];
    node?.focus();
    node?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    showPreview(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number): void {
    if (event.key === "Escape") {
      setPreview(null);
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

  const activeProject = preview === null ? undefined : projects[preview.index];
  const showCard =
    preview !== null && activeProject !== undefined && activeProject.slug !== currentSlug;

  return (
    <div className="arcade-rail-wrap" ref={wrapRef}>
      <button
        type="button"
        className="arcade-arrow"
        aria-label="Previous project"
        disabled={preview?.index === 0}
        onClick={() => step(-1)}
      >
        <WaIcon name="chevron-left" aria-hidden="true" />
      </button>

      <div className="arcade-rail-scroll" ref={scrollRef} onScroll={handleScroll}>
        <ol
          className={`arcade-rail${compact ? " arcade-rail-compact" : ""}`}
          aria-label="Project timeline, newest first"
        >
          {projects.map((project, index) => {
            const isCurrent = project.slug === currentSlug;
            const previewId = `arcade-preview-${project.slug}${compact ? "-compact" : ""}`;

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
              onFocus: () => showPreview(index),
              onBlur: () => hidePreview(index),
              onMouseEnter: () => showPreview(index),
              onMouseLeave: () => hidePreview(index),
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
              >
                <span className="pixel-display arcade-level" aria-hidden="true">
                  {String(projects.length - index).padStart(2, "0")}
                </span>

                {node}
              </li>
            );
          })}
        </ol>
      </div>

      <button
        type="button"
        className="arcade-arrow"
        aria-label="Next project"
        disabled={preview?.index === projects.length - 1}
        onClick={() => step(1)}
      >
        <WaIcon name="chevron-right" aria-hidden="true" />
      </button>

      {showCard && activeProject ? (
        <TimelinePreviewCard
          project={activeProject}
          id={`arcade-preview-${activeProject.slug}${compact ? "-compact" : ""}`}
          style={{ insetInlineStart: `${preview.left}px` }}
        />
      ) : null}
    </div>
  );
}
