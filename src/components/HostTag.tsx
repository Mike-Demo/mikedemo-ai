import type { ReactElement } from "react";

import { projectHost, projectHostLabel } from "@/lib/project-host";

/** Small pixel tag naming the platform a project's live site is hosted on. */
export function HostTag({ slug }: { slug: string }): ReactElement {
  const label = projectHostLabel(slug);

  return (
    <span className={`host-tag pixel-display host-tag-${projectHost(slug)}`}>
      <span className="sr-only">Hosted on {label}</span>
      <span aria-hidden="true">{label.toUpperCase()}</span>
    </span>
  );
}
