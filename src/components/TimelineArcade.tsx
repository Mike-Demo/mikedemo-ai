import { Link } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";


import { WaDialog, WaIcon } from "@/design-system/font-awsome-web-awesome-171158";

import { ProjectCredits } from "@/components/ProjectCredits";
import { ProjectIcon } from "@/components/ProjectIcon";
import { TechTagList } from "@/components/TechTagList";
import type { Project } from "@/data/projects";

interface TimelineArcadeProps {
  /** Projects in the order they should appear along the rail (newest first). */
  readonly projects: readonly Project[];
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Horizontal "level select" rail: one pixel node per project, each opening a
 * dialog with the project's full details.
 */
export function TimelineArcade({ projects }: TimelineArcadeProps): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const openerIndex = useRef<number | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number): void => {
    openerIndex.current = index;
    setOpenIndex(index);
  }, []);

  const close = useCallback((): void => {
    setOpenIndex(null);
    const index = openerIndex.current;
    if (index !== null) {
      nodeRefs.current[index]?.focus();
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    dialog.addEventListener("wa-after-hide", close);
    return () => dialog.removeEventListener("wa-after-hide", close);
  }, [close]);

  // `open` is a Lit property on <wa-dialog>, so set it directly instead of
  // letting React write it as an attribute value.
  useEffect(() => {
    const dialog = dialogRef.current as (HTMLElement & { open?: boolean }) | null;
    if (dialog) {
      dialog.open = openIndex !== null;
    }
  }, [openIndex]);



  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
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

  const active = openIndex === null ? null : projects[openIndex] ?? null;

  return (
    <>
      <div className="arcade-rail-scroll">
        <ol className="arcade-rail" aria-label="Project timeline, newest first">
          {projects.map((project, index) => (
            <li key={project.slug} className="arcade-node">
              <span className="pixel-display arcade-level" aria-hidden="true">
                {String(projects.length - index).padStart(2, "0")}
              </span>
              <button
                type="button"
                className="arcade-node-button"
                ref={(element) => {
                  nodeRefs.current[index] = element;
                }}
                aria-haspopup="dialog"
                onClick={() => open(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="arcade-node-icon" aria-hidden="true">
                  <ProjectIcon project={project} />
                </span>
                <span className="wa-visually-hidden">{`Open details for ${project.name}`}</span>
              </button>
              <time className="pixel-display arcade-node-date" dateTime={project.started}>
                {formatDate(project.started)}
              </time>
              <span className="pixel-display arcade-node-name">{project.name}</span>
            </li>
          ))}
        </ol>
      </div>

      <WaDialog
        ref={dialogRef}
        className="arcade-dialog"
        label={active?.name ?? ""}
        light-dismiss
      >


        {active ? (
          <div className="wa-stack wa-gap-m">
            <div className="wa-cluster wa-align-items-center wa-gap-s">
              <span className="pixel-icon-badge" aria-hidden="true">
                <ProjectIcon project={active} />
              </span>
              <time className="pixel-display arcade-node-date" dateTime={active.started}>
                {formatDate(active.started)}
              </time>
            </div>
            <p className="wa-color-text-quiet">{active.summary}</p>
            <TechTagList
              items={active.tech}
              size="small"
              label={`${active.name} tech stack`}
            />
            <ProjectCredits project={active} />
            <div className="wa-cluster wa-gap-s">
              {active.detailPath ? (
                <Link to={active.detailPath} className="site-nav-link">
                  Details
                </Link>
              ) : (
                <Link
                  to="/projects/$slug"
                  params={{ slug: active.slug }}
                  className="site-nav-link"
                >
                  Details
                </Link>
              )}
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                <WaIcon name="arrow-up-right-from-square" aria-hidden="true" /> {active.domain}
              </a>
            </div>
          </div>
        ) : null}
      </WaDialog>
    </>
  );
}
