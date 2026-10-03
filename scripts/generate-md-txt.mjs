// Copies the canonical markdown sources in content/ to dist/client/md/*.txt.
//
// Why .txt: this host (SpaceFast static) does not serve .md files, so the
// markdown twins advertised at /index.md, /auth.md, /pricing.md, /llms.md and
// the SKILL.md artifacts are served as text/plain via _redirects rewrites.
// The bytes are copied verbatim, so sha256 digests computed from the source
// files match the served bytes exactly.
//
// Run AFTER vite build / copy-static-output (it writes straight into the
// final dist/client). Safe to run repeatedly.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "dist/client/md");

/** [source relative to content/, output name, public URL it serves] */
const FILES = [
  ["index.md", "index.txt", "/index.md"],
  ["auth.md", "auth.txt", "/auth.md"],
  ["pricing.md", "pricing.txt", "/pricing.md"],
  ["llms-full.md", "llms-full.txt", "/llms.md"],
  ["about.md", "about.txt", "/about.md"],
  ["contact.md", "contact.txt", "/contact.md"],
  ["privacy.md", "privacy.txt", "/privacy.md"],
  ["developers.md", "developers.txt", "/developers.md"],
  ["licenses.md", "licenses.txt", "/licenses.md"],
  ["projects.md", "projects.txt", "/projects.md"],
  ["agent-skills.md", "agent-skills.txt", "/agent-skills.md"],
  ["claude-code-skills.md", "claude-code-skills.txt", "/claude-code-skills.md"],
  ["bugle-crowns.md", "bugle-crowns.txt", "/bugle-crowns.md"],
  ["skills/browse-projects/SKILL.md", "skills-browse-projects.txt", "/skills/browse-projects/SKILL.md"],
  ["skills/read-project/SKILL.md", "skills-read-project.txt", "/skills/read-project/SKILL.md"],
  ["skills/site-navigation/SKILL.md", "skills-site-navigation.txt", "/skills/site-navigation/SKILL.md"],
];

// Per-project twins written by scripts/generate-project-md.mjs:
// /projects/<slug>.md  ->  md/projects-<slug>.txt
// (/bugle-crowns.md serves the bugle-crowns twin; see bugle-crowns.md above.)
for (const file of fs.readdirSync(path.join(ROOT, "content/projects"))) {
  if (!file.endsWith(".md")) continue;
  const slug = file.slice(0, -3);
  FILES.push([`projects/${file}`, `projects-${slug}.txt`, `/projects/${slug}.md`]);
}

fs.mkdirSync(OUT, { recursive: true });

for (const [src, dest] of FILES) {
  const bytes = fs.readFileSync(path.join(ROOT, "content", src));
  fs.writeFileSync(path.join(OUT, dest), bytes);
  const digest = crypto.createHash("sha256").update(bytes).digest("hex");
  console.log(`${src} -> md/${dest}  sha256:${digest.slice(0, 12)}...`);
}

console.log("markdown .txt twins written.");
