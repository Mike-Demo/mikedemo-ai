import type { CSSProperties, ReactElement } from "react";

import { TechTagList } from "@/components/TechTagList";
import type { Project } from "@/data/projects";
import { formatMonthYear } from "@/lib/format-date";

/**
 * Small pixel popup shown below the focused/hovered rail node: date, summary
 * and tech stack for that project. Rendered outside the rail's scroll
 * container so it overlays the page instead of growing it.
 */
export function TimelinePreviewCard({
  project,
  id,
  style,
}: {
  readonly project: Project;
  readonly id: string;
  readonly style?: CSSProperties;
}): ReactElement {
  return (
    <div className="arcade-preview pixel-card" id={id} role="presentation" style={style}>
      <p className="pixel-display arcade-preview-title">{project.name}</p>
      <p className="pixel-display arcade-preview-date">{formatMonthYear(project.started)}</p>
      <p className="arcade-preview-summary">{project.summary}</p>
      <TechTagList items={project.tech.slice(0, 4)} size="small" />
      <p className="pixel-display arcade-preview-hint">Press Enter to open</p>
    </div>
  );
}
