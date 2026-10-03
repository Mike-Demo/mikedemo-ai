// Generates public/feeds/projects.jsonl — one schema.org JSON-LD
// WebApplication object per line, mirroring projectJsonLd() in
// src/lib/jsonld.ts. Listed in public/schemamap.xml (NLWeb Schema Map) as a
// structuredData/schema.org feed.
//
// Run after scripts/generate-projects.mjs and before the build. Idempotent.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const GENERATED = path.join(ROOT, "src/data/projects.generated.ts");
const OUT_DIR = path.join(ROOT, "public/feeds");
const OUTPUT = path.join(OUT_DIR, "projects.jsonl");
const SITE_URL = "https://mikedemo.dev";

function readProjectRows() {
  const source = fs.readFileSync(GENERATED, "utf8");
  const start = source.indexOf("= [") + 2;
  const end = source.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("Could not read generated project rows");
  return JSON.parse(source.slice(start, end + 1));
}

const rows = readProjectRows();
fs.mkdirSync(OUT_DIR, { recursive: true });

const lines = rows.map((row) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: row.name,
    description: row.description,
    url: row.detail_path ? `${SITE_URL}${row.detail_path}` : `${SITE_URL}/projects/${row.slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    dateCreated: row.started,
    keywords: row.tech.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  }),
);

const body = lines.join("\n") + "\n";
const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, "utf8") : "";
if (current !== body) fs.writeFileSync(OUTPUT, body);
console.log(`Wrote ${lines.length} JSON-LD records to public/feeds/projects.jsonl`);
