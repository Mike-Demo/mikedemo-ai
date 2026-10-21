# Security audit triage backlog — 2026-10-21

## Prioritization

The audit reports **0 confirmed findings, 4 needs-validation leads, and 0 rejected candidates**. There are no confirmed findings to prioritize or create remediation issues for. The leads depend on facts unavailable from this repository, so they are grouped into one validation issue without severity ranking.

## Issue ready to file

**Title:** `[security][needs-validation] Audit leads to validate`

**Body:**

Parent audit: [#7](https://github.com/Mike-Demo/mikedemo-ai/issues/7)

Validate each lead below and record the missing fact. These are leads, not confirmed findings; do not assign severity until the missing facts are known.

- [ ] **Per-visitor appreciation cap (10 per project) / `appreciation-cap-client-side-only-unauthenticated-post`** — The claimed concern is that the cap is enforced in visitor localStorage and counter increments are unauthenticated POSTs. The relevant API is in a different repository.

  **Missing fact:** Whether the QueerCade appreciations API (queercade.mikedemo.dev, different repo) enforces any server-side per-visitor allowance, rate limit, or bot check for the portfolio-* namespace. Owner check: inspect that API's handler for server-side enforcement.

- [ ] **CSP `script-src` placeholder / `csp-unsafe-inline-placeholder-may-ship-without-hash-injection`** — The source uses `'unsafe-inline'` until `scripts/inject-csp-hashes.mjs` replaces it; the production deployment configuration is not established by source inspection.

  **Missing fact:** Which build command SpaceFast actually ran for the current mikedemo.dev deployment, equivalently whether the deployed HTML's Content-Security-Policy meta contains 'sha256-' tokens and no 'unsafe-inline'. Owner check: fetch any deployed page and inspect its CSP meta tag.

- [ ] **`.env` exposure risk / `env-file-not-gitignored-service-role-key-exposure`** — The audit found no `.env` tracked at current HEAD, but current HEAD alone cannot establish the full-history/branch exposure status.

  **Missing fact:** Whether any other branch, fork, or prior commit in full history contains a committed .env with a privileged (service-role) key — current HEAD tracks only .env.example. Owner check: git log --all --full-history -- .env / .env.* across all branches and GitHub secret-scanning results for the repo.

- [ ] **Theme-defaults server function / `unauthenticated-theme-defaults-serverfn-file-write`** — Source shows an unauthenticated server function that can write caller-supplied CSS outside production, but deployment reachability and runtime capabilities are unknown.

  **Missing fact:** Whether saveThemeDefaults is registered/reachable in any deployed build (no in-repo importer exists, so it may be tree-shaken), the deployed runtime's NODE_ENV value, and whether that runtime (static SpaceFast vs Lovable Cloudflare Worker vs node SSR) has a writable filesystem at src/webawesome/brand.css.
