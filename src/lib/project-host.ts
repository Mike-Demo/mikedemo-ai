/**
 * Where each project's public site is hosted. Kept in one place so the Level
 * Select list and the project pages always show the same answer.
 */
export type ProjectHost = "spacefast" | "lovable-cloud" | "aws";

const HOST_BY_SLUG: Readonly<Record<string, ProjectHost>> = {
  "skill-finder-plus": "lovable-cloud",
  "queercade-connect": "lovable-cloud",
  "bugle-crowns": "aws",
  "ceo-owl": "lovable-cloud",
  freshink: "lovable-cloud",
};

const HOST_LABELS: Readonly<Record<ProjectHost, string>> = {
  spacefast: "Spacefast",
  "lovable-cloud": "Lovable Cloud",
  aws: "AWS",
};

/** Defaults to Spacefast, which hosts every project not listed above. */
export function projectHost(slug: string): ProjectHost {
  return HOST_BY_SLUG[slug] ?? "spacefast";
}

export function projectHostLabel(slug: string): string {
  return HOST_LABELS[projectHost(slug)];
}
