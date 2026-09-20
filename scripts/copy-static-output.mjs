// Static hosts expect the site in dist/client. The Nitro/SSR build writes its
// prerendered output to .output/public on some presets and straight into
// dist/client on this project's Cloudflare preset. Copy when needed, skip when
// the files already live in the right place. Safe to run repeatedly.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, ".output/public");
const TARGET = path.join(ROOT, "dist/client");

if (!fs.existsSync(SOURCE)) {
  const hasTarget = fs.existsSync(path.join(TARGET, "index.html"));
  console.log(
    hasTarget
      ? "Static output already in dist/client — nothing to copy."
      : "No .output/public found and dist/client has no index.html; check the build output.",
  );
  process.exit(hasTarget ? 0 : 1);
}

if (path.resolve(SOURCE) === path.resolve(TARGET)) {
  console.log("Source and target are the same directory — nothing to copy.");
  process.exit(0);
}

fs.rmSync(TARGET, { recursive: true, force: true });
fs.mkdirSync(TARGET, { recursive: true });
fs.cpSync(SOURCE, TARGET, { recursive: true });
console.log("Copied .output/public to dist/client.");
