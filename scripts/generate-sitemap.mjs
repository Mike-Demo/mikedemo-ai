// Writes public/sitemap.xml from the generated project data so new or removed
// projects are always reflected. Run after scripts/generate-projects.mjs and
// before the build. Idempotent: same data in, same file out.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT = path.join(ROOT, "public/sitemap.xml");
const GENERATED = path.join(ROOT, "src/data/projects.generated.ts");
const BASE_URL = "https://mikedemo.dev";

/** Public pages that are not derived from project data. */
const STATIC_PATHS = [
  "/",
  "/projects",
  "/bugle-crowns",
  "/agent-skills",
  "/claude-code-skills",
  "/licenses",
];

/**
 * The generated module is TypeScript, so it is read as text rather than
 * imported: the slugs and detail paths are all this script needs.
 */
function readProjectRows() {
  const source = fs.readFileSync(GENERATED, "utf8");
  const start = source.indexOf("= [") + 2;
  const end = source.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("Could not read generated project rows");
  return JSON.parse(source.slice(start, end + 1));
}

const rows = readProjectRows();
const paths = new Set(STATIC_PATHS);
for (const row of rows) {
  // Projects with a bespoke page are already listed by that page's own path.
  if (!row.detail_path) paths.add(`/projects/${row.slug}`);
}

const urls = [...paths]
  .map((value) => `  <url><loc>${BASE_URL}${value}</loc></url>`)
  .join("\n");
const contents = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, "utf8") : "";
if (current !== contents) fs.writeFileSync(OUTPUT, contents);
console.log(`Wrote ${paths.size} URLs to public/sitemap.xml`);
