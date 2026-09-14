/**
 * Public project reads from the Cloud database.
 */
import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";

import type { Project, ProjectCredit, ProjectSite } from "@/data/projects";
import { projectLogos } from "@/data/projects";
import type { Database } from "@/integrations/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

function toCredits(value: ProjectRow["credits"]): readonly ProjectCredit[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return value as unknown as readonly ProjectCredit[];
}

function toSites(value: ProjectRow["sites"]): readonly ProjectSite[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return value as unknown as readonly ProjectSite[];
}

function toProject(row: ProjectRow): Project {
  const logo = projectLogos[row.slug];
  const credits = toCredits(row.credits);
  const sites = toSites(row.sites);
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
    ...(credits ? { credits } : {}),
    ...(sites ? { sites } : {}),
  };
}

/**
 * Short-lived per-instance cache. The project list changes rarely, so this
 * keeps a burst of navigations (list page, detail page, pager) from hitting
 * the database once per render. The database stays the source of truth.
 */
const CACHE_TTL_MS = 60_000;
let cache: { at: number; projects: readonly Project[] } | undefined;

/** Every project, newest first. Public read — safe during SSR and prerender. */
export const listProjects = createServerFn({ method: "GET" }).handler(async (): Promise<readonly Project[]> => {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.projects;

  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await supabasePublic
    .from("projects")
    .select("slug, name, domain, summary, description, tech, url, icon, started, detail_path, credits, sites")
    .order("started", { ascending: false });

  if (error) throw new Error(error.message);
  const projects = (data ?? []).map((row) => toProject(row as ProjectRow));
  cache = { at: Date.now(), projects };
  return projects;
});
