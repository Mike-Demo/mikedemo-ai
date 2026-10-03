// Generates content/projects/<slug>.md — one heading-led markdown twin per
// portfolio project, from the generated project data. Each file carries a
// frontmatter block (title, description, canonical, last-updated) so the
// served .txt copies satisfy the markdown-frontmatter check.
//
// Run after scripts/generate-projects.mjs and before scripts/generate-md-txt.mjs.
// Idempotent: same data in, same files out. Stale twins (removed projects)
// are deleted.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const GENERATED = path.join(ROOT, "src/data/projects.generated.ts");
const OUT_DIR = path.join(ROOT, "content/projects");
const LAST_UPDATED = "2026-10-03";

function readProjectRows() {
  const source = fs.readFileSync(GENERATED, "utf8");
  const start = source.indexOf("= [") + 2;
  const end = source.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("Could not read generated project rows");
  return JSON.parse(source.slice(start, end + 1));
}

function mdPath(row) {
  // Bugle Crowns lives at /bugle-crowns/ instead of /projects/<slug>/.
  return row.detail_path === "/bugle-crowns" ? "/bugle-crowns.md" : `/projects/${row.slug}.md`;
}

function render(row) {
  const pagePath = row.detail_path === "/bugle-crowns" ? "/bugle-crowns/" : `/projects/${row.slug}/`;
  const canonical = `https://mikedemo.dev${mdPath(row)}`;
  const esc = (s) => s.replace(/"/g, '\\"');
  const lines = [
    "---",
    `title: "${esc(row.name)} — MikeDemo AI project"`,
    `description: "${esc(row.summary)}"`,
    `canonical: "${canonical}"`,
    `last-updated: "${LAST_UPDATED}"`,
    "---",
    "",
    `# ${row.name}`,
    "",
    row.summary,
    "",
    "## About",
    "",
    row.description,
    "",
    "## Details",
    "",
    `- Live: ${row.url}`,
    `- Portfolio page: https://mikedemo.dev${pagePath}`,
    `- Tech: ${row.tech.join(", ")}`,
    `- Started: ${row.started}`,
  ];
  if (row.sites && row.sites.length > 0) {
    lines.push("", "## Related sites", "");
    for (const site of row.sites) lines.push(`- ${site.name}: ${site.url}`);
  }
  if (row.credits && row.credits.length > 0) {
    lines.push("", "## Credits", "");
    for (const credit of row.credits) lines.push(`- ${credit.name}: ${credit.url}`);
  }
  lines.push(
    "",
    "## Machine-readable",
    "",
    `- Project record: https://mikedemo.dev/api/v1/projects/${row.slug}.json`,
  );
  return lines.join("\n") + "\n";
}

const rows = readProjectRows();
fs.mkdirSync(OUT_DIR, { recursive: true });

const written = new Set();
for (const row of rows) {
  const file = path.join(OUT_DIR, `${row.slug}.md`);
  const body = render(row);
  const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  if (current !== body) fs.writeFileSync(file, body);
  written.add(`${row.slug}.md`);
}

// Remove twins for projects that no longer exist.
for (const file of fs.readdirSync(OUT_DIR)) {
  if (file.endsWith(".md") && !written.has(file)) {
    fs.unlinkSync(path.join(OUT_DIR, file));
    console.log("removed stale twin:", file);
  }
}

console.log(`Wrote ${written.size} project markdown twins to content/projects/`);
