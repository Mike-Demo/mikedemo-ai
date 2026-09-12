import { Link } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement } from "react";
import { useRef, useState } from "react";

import { ProjectCredits } from "@/components/ProjectCredits";
import { ProjectIcon } from "@/components/ProjectIcon";
import { TechTagList } from "@/components/TechTagList";
import { NesContainer, NesIcon } from "@/design-system/nes-229931";
import type { Project } from "@/data/projects";
import { formatMonthYear } from "@/lib/format-date";

interface TimelineArcadeProps {
  readonly projects: readonly Project[];
  readonly currentSlug?: string;
  readonly compact?: boolean;
}

/**
 * Cabinet-style project selector. Focus, hover, or tap moves the player cursor;
 * Enter follows the focused cartridge and Arrow/Home/End keys traverse the grid.
 */
export function TimelineArcade({
  projects,
  currentSlug,
  compact = false,
}: TimelineArcadeProps): ReactElement {
  const currentIndex = Math.max(0, projects.findIndex((project) => project.slug === currentSlug));
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const gridRef = useRef<HTMLOListElement | null>(null);
  const selectedProject = projects[selectedIndex] ?? projects[0];

  function focusProject(index: number): void {
    const next = Math.min(Math.max(index, 0), projects.length - 1);
    setSelectedIndex(next);
    itemRefs.current[next]?.focus();
  }

  /** Visual column count, so Arrow Up/Down move exactly one rendered row. */
  function columnCount(): number {
    const grid = gridRef.current;
    if (!grid) return 1;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length;
    return Math.max(1, columns);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number): void {
    const columns = columnCount();
    const offsets: Readonly<Record<string, number>> = {
      ArrowRight: 1,
      ArrowDown: columns,
      ArrowLeft: -1,
      ArrowUp: -columns,
    };
    let nextIndex: number | undefined;

    if (event.key in offsets) nextIndex = index + (offsets[event.key] ?? 0);
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projects.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    focusProject(nextIndex);
  }

  if (!selectedProject) {
    return <p className="text-quiet">No project cartridges loaded.</p>;
  }

  return (
    <div className={`arcade-cabinet${compact ? " arcade-cabinet-compact" : ""}`}>
      <div className="cabinet-marquee pixel-display">
        <NesIcon name="star" size="small" /> SELECT PROJECT <NesIcon name="star" size="small" />
      </div>

      <div className="cabinet-bezel">
        <div className="cabinet-screen">
          <ol className="level-grid" aria-label="Project levels, newest first" ref={gridRef}>
            {projects.map((project, index) => {
              const isSelected = selectedIndex === index;
              const isCurrent = project.slug === currentSlug;
              const destination = project.detailPath ?? "/projects/$slug";

              return (
                <li key={project.slug} className="level-slot">
                  <Link
                    to={destination}
                    params={project.detailPath ? undefined : { slug: project.slug }}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    className={`level-cartridge${isSelected ? " is-selected" : ""}`}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`Level ${String(projects.length - index).padStart(2, "0")}: ${project.name}, ${formatMonthYear(project.started)}`}
                    onFocus={() => setSelectedIndex(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="level-cursor pixel-display" aria-hidden="true">▶</span>
                    <span className="level-number pixel-display">
                      LV {String(projects.length - index).padStart(2, "0")}
                    </span>
                    <span className="level-icon" aria-hidden="true">
                      <ProjectIcon project={project} />
                    </span>
                    <span className="level-name pixel-display">{project.name}</span>
                    <time className="level-date" dateTime={project.started}>
                      {formatMonthYear(project.started)}
                    </time>
                  </Link>
                </li>
              );
            })}
          </ol>

          {!compact ? (
            <NesContainer className="selected-project" dark aria-live="polite">
              <div className="selected-project-topline">
                <span className="pixel-display">PLAYER 1</span>
                <span className="pixel-display">READY!</span>
              </div>
              <h3 className="pixel-display selected-project-title">{selectedProject.name}</h3>
              <p>{selectedProject.summary}</p>
              <TechTagList items={selectedProject.tech.slice(0, 4)} size="small" />
              <ProjectCredits project={selectedProject} />
              <Link
                to={selectedProject.detailPath ?? "/projects/$slug"}
                params={selectedProject.detailPath ? undefined : { slug: selectedProject.slug }}
                className="nes-btn is-primary cabinet-start"
              >
                START LEVEL
              </Link>
            </NesContainer>
          ) : null}
        </div>
      </div>

      <div className="cabinet-controls" aria-hidden="true">
        <span className="pixel-joystick" />
        <span className="control-label pixel-display">MOVE</span>
        <span className="pixel-button pixel-button-red" />
        <span className="control-label pixel-display">START</span>
        <span className="pixel-button pixel-button-blue" />
      </div>
    </div>
  );
}