import { Link, useNavigate } from "@tanstack/react-router";
import type { KeyboardEvent, ReactElement } from "react";
import { useRef, useState } from "react";

import { ProjectCredits } from "@/components/ProjectCredits";
import { ProjectIcon } from "@/components/ProjectIcon";
import { TechTagList } from "@/components/TechTagList";
import { NesButton, NesContainer, NesIcon, NesRuneIcon, NesText } from "@/design-system/nes-229931";
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
  const navigate = useNavigate();
  const currentIndex = Math.max(0, projects.findIndex((project) => project.slug === currentSlug));
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const selectedProject = projects[selectedIndex] ?? projects[0];

  function focusProject(index: number): void {
    const next = Math.min(Math.max(index, 0), projects.length - 1);
    setSelectedIndex(next);
    itemRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number): void {
    const offsets: Readonly<Record<string, number>> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
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
    <div className={`arcade-cabinet overworld-cabinet${compact ? " arcade-cabinet-compact" : ""}`}>
      <div className="cabinet-marquee pixel-display">
        <NesIcon name="star" size="small" /> PROJECT WORLD <NesIcon name="star" size="small" />
      </div>

      <div className="cabinet-bezel">
        <div className={`cabinet-screen${compact ? "" : " overworld-layout"}`}>
          <div className="overworld-map">
            <div className="overworld-hud pixel-display" aria-hidden="true">
              <span>WORLD 01</span>
              <span>{String(projects.length).padStart(2, "0")} STAGES</span>
            </div>
            <span className="overworld-route" aria-hidden="true" />
            <ol className="level-grid overworld-levels" aria-label="Project world, newest first">
            {projects.map((project, index) => {
              const isSelected = selectedIndex === index;
              const isCurrent = project.slug === currentSlug;
              const destination = project.detailPath ?? "/projects/$slug";
              const isCleared = Boolean(project.url || project.sites?.length);
              const statusLabel = isCleared ? "Cleared" : "Locked";

              return (
                <li key={project.slug} className="level-slot overworld-stage">
                  <Link
                    to={destination}
                    params={project.detailPath ? undefined : { slug: project.slug }}
                    ref={(element) => {
                      itemRefs.current[index] = element;
                    }}
                    className={`level-cartridge overworld-node${isSelected ? " is-selected" : ""}`}
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`Stage ${String(projects.length - index).padStart(2, "0")}: ${project.name}, ${formatMonthYear(project.started)}, ${statusLabel}`}
                    onFocus={() => setSelectedIndex(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="level-cursor pixel-display" aria-hidden="true">▶</span>
                    <span className="level-icon" aria-hidden="true">
                      <ProjectIcon project={project} />
                    </span>
                    <span className="overworld-node-copy">
                      <span className="level-number pixel-display">
                        STAGE {String(projects.length - index).padStart(2, "0")}
                      </span>
                      <span className="level-name pixel-display">{project.name}</span>
                    </span>
                    <span className="overworld-node-meta">
                      <time className="level-date" dateTime={project.started}>
                        {formatMonthYear(project.started)}
                      </time>
                      <span className={`stage-status pixel-display ${isCleared ? "stage-status-cleared" : "stage-status-locked"}`}>
                        <NesRuneIcon name={isCleared ? "star" : "lock"} size="small" aria-hidden="true" />
                        {isCleared ? "CLEARED" : "LOCKED"}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
            </ol>
          </div>

          {!compact ? (
            <NesContainer className="selected-project" dark aria-live="polite">
              <span className="selected-project-badge pixel-display">ACTIVE</span>
              <div className="selected-project-content stack stack-m">
                <div className="selected-project-topline">
                  <NesText variant="success" className="pixel-display">PLAYER 1</NesText>
                  <NesText variant="success" className="pixel-display">READY!</NesText>
                </div>
                <span className="crt-strip" aria-hidden="true" />
                <h3 className="pixel-display selected-project-title">
                  <NesText variant="warning">{selectedProject.name}</NesText>
                </h3>
                <p>{selectedProject.summary}</p>
                <TechTagList items={selectedProject.tech.slice(0, 4)} size="small" />
                <ProjectCredits project={selectedProject} />
                <NesButton
                  variant="primary"
                  className="cabinet-start"
                  onClick={() => {
                    void navigate({
                      to: selectedProject.detailPath ?? "/projects/$slug",
                      params: selectedProject.detailPath ? undefined : { slug: selectedProject.slug },
                    });
                  }}
                >
                  START LEVEL
                </NesButton>
              </div>
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