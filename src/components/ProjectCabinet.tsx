import { Link } from "@tanstack/react-router";
import type { ReactElement, ReactNode } from "react";

import { ProjectIcon } from "@/components/ProjectIcon";
import { NesIcon } from "@/design-system/nes-229931";
import type { Project } from "@/data/projects";

interface ProjectCabinetProps {
  readonly project: Project;
  readonly eyebrow?: ReactNode;
  readonly subtitle: ReactNode;
  readonly children: ReactNode;
}

/** Full-page arcade cabinet shared by standard and bespoke project pages. */
export function ProjectCabinet({
  project,
  eyebrow = project.domain,
  subtitle,
  children,
}: ProjectCabinetProps): ReactElement {
  return (
    <article className="project-cabinet">
      <div className="project-cabinet-marquee">
        <span className="pixel-display project-cabinet-player">PLAYER 1</span>
        <span className="project-cabinet-mark" aria-hidden="true">
          <ProjectIcon project={project} />
        </span>
        <span className="pixel-display project-cabinet-status">
          <NesIcon name="star" size="small" /> LEVEL READY
        </span>
      </div>

      <div className="project-cabinet-bezel">
        <div className="project-cabinet-screen">
          <nav aria-label="Breadcrumb" className="project-cabinet-back">
            <Link to="/projects/" className="site-nav-link">
              ← LEVEL SELECT
            </Link>
          </nav>

          <header className="project-cabinet-header">
            <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
              <ProjectIcon project={project} />
            </span>
            <div className="stack stack-s project-cabinet-heading">
              <p className="pixel-display project-cabinet-eyebrow">{eyebrow}</p>
              <h1 className="pixel-display project-cabinet-title">{project.name}</h1>
              <div className="project-cabinet-subtitle">{subtitle}</div>
            </div>
          </header>

          <div className="project-cabinet-content stack stack-l">{children}</div>
        </div>
      </div>

      <div className="project-cabinet-controls" aria-hidden="true">
        <span className="pixel-joystick" />
        <span className="control-label pixel-display">MOVE</span>
        <span className="pixel-button pixel-button-red" />
        <span className="control-label pixel-display">SELECT</span>
        <span className="pixel-button pixel-button-blue" />
        <span className="control-label pixel-display">START</span>
      </div>
    </article>
  );
}