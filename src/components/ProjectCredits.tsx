import type { ReactElement } from "react";

import { WaIcon } from "@/design-system/font-awsome-web-awesome-171158";

import type { Project } from "@/data/projects";

/**
 * Credit links to the upstream projects a build is based on.
 * Renders nothing when the project has no credits.
 */
export function ProjectCredits({ project }: { project: Project }): ReactElement | null {
  if (!project.credits?.length) return null;
  return (
    <p className="project-credits">
      <WaIcon name="heart" aria-hidden="true" /> Built on{" "}
      {project.credits.map((credit, index) => (
        <span key={credit.url}>
          {index > 0 && ", "}
          <a href={credit.url} target="_blank" rel="noopener noreferrer">
            {credit.name}
          </a>
        </span>
      ))}
    </p>
  );
}
