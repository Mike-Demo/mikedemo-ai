// Fixes corrupted route IDs in TanStack Start's prerendered HTML.
// 
// Background: TanStack Start's prerenderer emits null bytes (U+0000) in the
// route manifest's `i` (route ID) fields — a known upstream bug
// (https://github.com/tanstack/router/issues/7581). The corruption mangles
// `/` into null bytes and concatenates routeId+pathname, e.g.:
//   "__root__" -> "__root__\0"
//   "/"         -> "\0\0"
//   "/projects/" -> "\0projects\0\0projects\0"
// These corrupted IDs break client-side router hydration, leaving a blank page.
//
// This script strips null bytes and restores the correct route IDs based on
// each file's path. Must run BEFORE inject-csp-hashes.mjs (which hashes the
// final inline script bytes).
//
// Fail-closed: exits non-zero if any HTML file still contains null bytes
// after processing, or if a file's manifest doesn't have the expected
// number of route matches.
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(
  process.env.MANIFEST_DIST ?? path.join(import.meta.dirname, "..", "dist", "client"),
);

function* walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

// Expected route IDs for a prerendered file, derived from its path.
// dist/client/index.html -> ["__root__", "/"]
// dist/client/about/index.html -> ["__root__", "/about"]
function expectedRouteIds(file) {
  const rel = path.relative(DIST, file);
  if (rel === "index.html") return ["__root__", "/"];
  const parts = rel.split(path.sep).slice(0, -1); // drop "index.html"
  let route = "/" + parts.join("/");
  if (route === "/projects") route = "/projects/"; // routeTree uses trailing slash
  return ["__root__", route];
}

let fixed = 0;
for (const file of walkHtml(DIST)) {
  const rel = path.relative(DIST, file);
  let buf = fs.readFileSync(file);
  if (!buf.includes(0)) continue; // no null bytes, skip

  // Strip null bytes, then repair the {i:"..."} route IDs in order.
  const text = buf.toString("utf8").replace(/\0/g, "");
  const expected = expectedRouteIds(file);
  let idx = 0;
  const repaired = text.replace(/\{i:"[^"]*"/g, (m) => {
    if (idx >= expected.length) {
      throw new Error(
        `MANIFEST_FAIL: unexpected extra route match in ${rel} (expected ${expected.length})`,
      );
    }
    return `{i:"${expected[idx++]}"`;
  });

  if (repaired.includes("\0")) {
    throw new Error(`MANIFEST_FAIL: null bytes remain in ${rel} after repair`);
  }

  fs.writeFileSync(file, repaired);
  fixed++;
  console.log(`route-manifest: repaired ${rel} -> [${expected.join(", ")}]`);
}

console.log(`route-manifest: done (${fixed} file(s) repaired).`);
