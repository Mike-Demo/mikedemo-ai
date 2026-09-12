import type { ReactElement } from "react";

import { NesIcon } from "@/design-system/nes-229931";
import type { Project } from "@/data/projects";

interface ProjectIconProps {
  readonly project: Project;
  readonly className?: string;
}

/**
 * Shows a project's own site icon when available, falling back to its
 * Font Awesome glyph.
 */
export function ProjectIcon({ project, className }: ProjectIconProps): ReactElement {
  if (project.logo) {
    return (
      <img
        src={project.logo}
        alt=""
        className={className ? `project-logo ${className}` : "project-logo"}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return <NesIcon name="star" className={className} />;
}
