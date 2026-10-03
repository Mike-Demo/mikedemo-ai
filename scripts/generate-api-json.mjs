// Generates the static JSON API under public/api/v1/ from the committed
// project data (src/data/projects.generated.ts, rewritten every build from
// the Cloud database by generate-projects.mjs).
//
// These are REAL static exports of real data — the OpenAPI spec documents
// exactly these URLs. Run BEFORE `vite build` (public/ is copied to the
// output). The files are committed: deterministic output, reviewable diffs.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/api/v1");

const src = fs.readFileSync(
  path.join(ROOT, "src/data/projects.generated.ts"),
  "utf8",
);
const start = src.indexOf("= [");
const end = src.lastIndexOf("] as const;");
if (start === -1 || end === -1) throw new Error("could not locate project rows array");
const rows = JSON.parse(src.slice(start + 2, end + 1));
if (!Array.isArray(rows) || rows.length === 0) throw new Error("no project rows parsed");

const pick = (r) => ({
  slug: r.slug,
  name: r.name,
  domain: r.domain,
  summary: r.summary,
  description: r.description,
  tech: r.tech,
  url: r.url,
  started: r.started,
  detail_path: r.detail_path ?? null,
  credits: r.credits ?? [],
  sites: r.sites ?? [],
});

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "projects"), { recursive: true });

const projects = rows.map(pick);
fs.writeFileSync(
  path.join(OUT, "projects.json"),
  JSON.stringify(projects, null, 2) + "\n",
);

for (const p of projects) {
  fs.writeFileSync(
    path.join(OUT, "projects", `${p.slug}.json`),
    JSON.stringify(p, null, 2) + "\n",
  );
}

fs.writeFileSync(
  path.join(OUT, "site.json"),
  JSON.stringify(
    {
      name: "MikeDemo",
      url: "https://mikedemo.dev",
      description:
        "AI project portfolio of Mike \"Demo\" Demopoulos — retro arcade-styled showcase of AI experiments, on-device ML, agent skills, and web toys.",
      owner: "Mike Demopoulos",
      api_version: "v1",
      openapi: "https://mikedemo.dev/openapi.json",
    },
    null,
    2,
  ) + "\n",
);

console.log(`api/v1: ${projects.length} projects + site.json written.`);
