/**
 * Project reads for the static build.
 *
 * The records live in the Cloud database and are pulled into
 * `src/data/projects.generated.ts` by `scripts/generate-projects.mjs` before
 * every build. Reading that module keeps the site fully static: no request-time
 * server call, so client-side navigation works on a static host.
 */
import type { Project, ProjectCredit, ProjectSite } from "@/data/projects";
import { projectLogos } from "@/data/projects";
import { generatedProjectRows } from "@/data/projects.generated";
import type { GeneratedProjectRow } from "@/data/projects.generated-types";

function toProject(row: GeneratedProjectRow): Project {
  const logo = projectLogos[row.slug];
  const credits: readonly ProjectCredit[] = row.credits;
  const sites: readonly ProjectSite[] = row.sites;
  return {
    slug: row.slug,
    name: row.name,
    domain: row.domain,
    summary: row.summary,
    description: row.description,
    tech: row.tech,
    url: row.url,
    icon: row.icon,
    started: row.started,
    ...(logo ? { logo } : {}),
    ...(row.detail_path === "/bugle-crowns" ? { detailPath: "/bugle-crowns" as const } : {}),
    ...(credits.length > 0 ? { credits } : {}),
    ...(sites.length > 0 ? { sites } : {}),
  };
}

const projects: readonly Project[] = generatedProjectRows.map(toProject);

/** Every project, newest first. Baked in at build time. */
export async function listProjects(): Promise<readonly Project[]> {
  return projects;
}
