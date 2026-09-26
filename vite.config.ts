import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { componentTagger } from "lovable-tagger";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";
import { generatedProjectRows } from "./src/data/projects.generated";

/**
 * Vite's preview server (used while prerendering) attaches an stdin listener it
 * later removes; this sandbox's stdin has no `off`, which crashed the build
 * after every page was written. Vite skips that listener entirely under `CI`.
 */
process.env["CI"] = process.env["CI"] ?? "true";

/**
 * Every public, non-parameterized path to prerender. Project detail routes are
 * parameterized, so their slugs come from the generated project data that
 * `scripts/generate-projects.mjs` writes from the database before the build.
 * The internal Lovable canvas preview routes are deliberately excluded.
 */
function prerenderPages(): { path: string }[] {
  const paths = new Set<string>([
    "/",
    "/projects",
    "/bugle-crowns",
    "/agent-skills",
    "/claude-code-skills",
    "/licenses",
  ]);

  for (const row of generatedProjectRows) {
    // Projects with a bespoke page are listed by that page's own path.
    if (!row.detail_path) paths.add(`/projects/${row.slug}`);
  }

  return [...paths].map((value) => ({ path: value }));
}

/**
 * Keep prerendered HTML in memory, then flush each page to both the TanStack
 * output directory and `dist/client` at process exit.
 */
const prerenderedHtml = new Map<string, string>();

function flushPrerenderedHtml(): void {
  if (prerenderedHtml.size === 0) return;
  const outDirs = [".output/public", process.env["TSS_CLIENT_OUTPUT_DIR"] ?? "dist/client"];
  for (const outDir of outDirs) {
    if (!fs.existsSync(path.resolve(outDir))) continue;
    for (const [pagePath, html] of prerenderedHtml) {
      // "/" must land on <outDir>/index.html: a leading slash would otherwise
      // resolve to the filesystem root and the home page would go missing.
      const relative = pagePath.replace(/^\/+|\/+$/g, "");
      const file = path.join(path.resolve(outDir), relative, "index.html");
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
    }
  }
  prerenderedHtml.clear();
}

process.on("exit", flushPrerenderedHtml);

export default defineConfig(({ command, mode }) => {
  const pages = command === "build" ? prerenderPages() : [];

  return {
    server: {
      host: "::",
      port: 8080,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [
      mockupPreviewPlugin(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        pages,
        prerender: {
          enabled: command === "build",
          crawlLinks: false,
          autoStaticPathsDiscovery: false,
          onSuccess: ({ page, html }: { page: { path: string }; html: string }) => {
            prerenderedHtml.set(page.path, html);
          },
        },
      }),
      viteReact(),
      ...(mode === "development" ? [componentTagger()] : []),
    ],
  };
});
