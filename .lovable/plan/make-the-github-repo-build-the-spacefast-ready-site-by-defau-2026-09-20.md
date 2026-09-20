# Make the GitHub repo build the Spacefast-ready site by default

Spacefast auto-detects the project and runs the plain build with no settings of
its own. Today the plain build produces the Cloudflare Worker output that
Spacefast refuses, and the static-only version only happens when the extra
`build:static` command is used by hand. Flip the default so whatever Spacefast
picks up from GitHub is already the static site.

## What changes

1. **Static is the default.** The plain build stops producing the Worker
   entrypoint and the `wrangler.json` file that Spacefast rejected. Spacefast
   can keep auto-detecting with no configuration and the build passes.

2. **Lovable's own hosted copy keeps a way back.** The Worker output is still
   produced when the build runs inside Lovable's own build environment (it sets
   a `LOVABLE` marker the Spacefast runner does not have), and can also be
   forced with an explicit command. So the preview and the published
   `mikedemo-ai.lovable.app` address should keep working, and Spacefast gets
   static files — from the same repo, with no manual step.

   Caveat worth stating plainly: I can confirm this marker exists in the Lovable
   workspace, but I cannot confirm from here that Lovable's publish step sets
   it. If the published Lovable address 502s again after this change, the fix is
   one command away (the explicit "with Worker output" build), and the Spacefast
   side is unaffected either way. Spacefast production is what matters most in
   your setup; Lovable stays your staging preview.

3. **Commands line up with that.** The plain build = static (Spacefast).
   A named build = Worker output (Lovable hosting). The old
   `build:static` name stays as an alias so anything already using it keeps
   working.

4. **`SPACEFAST.md` updated** so the build-settings table says "auto-detect, no
   settings needed" and the Lovable-hosting note matches the new defaults.

## Technical details

- `vite.config.ts`: replace the `STATIC_BUILD=1` opt-in with an opt-out.
  Worker output is enabled when `command === "build"` and either
  `process.env["LOVABLE_BUILD"] === "1"` or `process.env["LOVABLE"]` is set;
  `STATIC_BUILD=1` still forces it off. Everything else (prerender list,
  `flushPrerenderedHtml`, `CI` default) is unchanged.
- `package.json`: `build` unchanged in text (it becomes static by virtue of the
  config flip); add `build:lovable` = `LOVABLE_BUILD=1 npm run build`; keep
  `build:static` as `STATIC_BUILD=1 npm run build`.
- `wrangler.jsonc` stays in the repo — it is only read when the Cloudflare
  plugin is active, and Spacefast's rejection was triggered by the emitted
  Worker entrypoint/`wrangler.json` in the build output, not by this file.
- Verify: run the plain build and confirm 17 prerendered pages in `dist/client`
  with no `dist/client/wrangler.json` and no `dist/server/index.js`; run
  `build:lovable` and confirm the Worker entry reappears with React bundled;
  typecheck passes.
