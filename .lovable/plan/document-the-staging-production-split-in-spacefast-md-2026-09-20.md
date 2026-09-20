# Document the staging/production split in SPACEFAST.md

Add one short section to `SPACEFAST.md` so the Lovable-staging / Spacefast-production workflow is written down next to the build spec.

## What changes

A new "Staging and production" section in `SPACEFAST.md` covering:

1. **Staging = Lovable.** The Lovable preview and the published
   `mikedemo-ai.lovable.app` address stay live for testing changes before they
   ship.
2. **Production = Spacefast.** `mikedemo.dev`'s DNS points at Spacefast, not
   Lovable. The domain is never connected inside Lovable, so Lovable's
   primary-domain redirect never applies.
3. **SEO and security checks run against the Lovable project** (code, database,
   preview). Because the static output bakes in the titles, descriptions,
   structured data, sitemap, and robots file, a passing check here carries over
   to the Spacefast copy. Anything configured on Spacefast itself (server
   headers, caching, HTTPS) is outside those checks and needs an external tool.
4. **Workflow note:** re-run the SEO and security checks here after content
   changes, before rebuilding and uploading, since Spacefast serves a snapshot
   of the last build.

No code, routes, or configuration change — documentation only.
