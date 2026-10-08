// Replaces the 'unsafe-inline' placeholder in the CSP <meta> tag of every
// prerendered HTML file under dist/client with per-page sha256 hashes of
// that page's inline scripts.
//
// Why: the site is fully static (prerendered at build time), so every inline
// script's bytes are deterministic per build and can be hashed. TanStack
// Start boots/hydrates through inline <script> tags, so a static <meta>
// policy cannot use nonces; hashes are the tightest option.
//
// Idempotent: if no 'unsafe-inline' placeholder remains, the script only
// verifies coverage. Fail-closed: exits non-zero when any inline script is
// not covered by the page's policy, or when a page lacks the CSP meta tag.
//
// Run at the END of `npm run build`, after the HTML output is final.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DIST = path.resolve(
  process.env.CSP_DIST ?? path.join(import.meta.dirname, "..", "dist", "client"),
);

// Script types governed by script-src. application/ld+json (and any other
// non-executable type) is exempt from CSP script-src and needs no hash.
const EXECUTABLE_TYPES = new Set([
  "",
  "text/javascript",
  "application/javascript",
  "text/ecmascript",
  "application/ecmascript",
  "module",
]);

function* walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

const sha256b64 = (s) =>
  `sha256-${crypto.createHash("sha256").update(s, "utf8").digest("base64")}`;

const decodeEntities = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const encodeEntities = (s) =>
  s.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;");

let injected = 0;
let checked = 0;

for (const file of walkHtml(DIST)) {
  let html = fs.readFileSync(file, "utf8");
  const rel = path.relative(DIST, file);

  // 1. Collect hashes of every executable inline script on the page.
  const hashes = new Set();
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let m;
  while ((m = scriptRe.exec(html)) !== null) {
    const attrs = m[1];
    const body = m[2];
    if (/\bsrc\s*=/i.test(attrs)) continue; // external script, src allowlisted
    const typeM = /\btype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
    const type = (typeM?.[1] ?? typeM?.[2] ?? typeM?.[3] ?? "").toLowerCase();
    if (!EXECUTABLE_TYPES.has(type)) continue; // e.g. application/ld+json
    hashes.add(sha256b64(body));
  }

  // 2. Locate the page's CSP meta tag.
  const metaM =
    /<meta\b[^>]*\bhttp-equiv\s*=\s*["']Content-Security-Policy["'][^>]*>/i.exec(
      html,
    );
  if (!metaM) throw new Error(`CSP_FAIL: no CSP meta tag in ${rel}`);
  const contentM = /\bcontent\s*=\s*"([^"]*)"/i.exec(metaM[0]);
  if (!contentM)
    throw new Error(`CSP_FAIL: CSP meta tag has no content in ${rel}`);
  const policy = decodeEntities(contentM[1]);

  // 3. Find script-src and reconcile.
  const directives = policy.split(";").map((d) => d.trim());
  const idx = directives.findIndex((d) => d.startsWith("script-src"));
  if (idx === -1) throw new Error(`CSP_FAIL: no script-src in ${rel}`);
  let tokens = directives[idx].split(/\s+/).filter(Boolean);
  const covered = new Set(
    tokens.filter((t) => t.startsWith("'sha256-")).map((t) => t.slice(1, -1)),
  );

  if (tokens.includes("'unsafe-inline'")) {
    tokens = tokens.filter((t) => t !== "'unsafe-inline'");
    for (const h of [...hashes].sort()) tokens.push(`'${h}'`);
    directives[idx] = tokens.join(" ");
    const newTag = metaM[0].replace(
      contentM[0],
      `content="${encodeEntities(directives.join("; "))}"`,
    );
    html = html.replace(metaM[0], newTag);
    fs.writeFileSync(file, html);
    injected++;
    console.log(`csp-hashes: injected ${hashes.size} hash(es) -> ${rel}`);
  } else {
    const missing = [...hashes].filter((h) => !covered.has(h));
    if (missing.length > 0) {
      throw new Error(
        `CSP_FAIL: ${missing.length} inline script(s) not covered by script-src hashes in ${rel}`,
      );
    }
    checked++;
  }
}

console.log(
  `csp-hashes: done (${injected} page(s) injected, ${checked} page(s) verified).`,
);
