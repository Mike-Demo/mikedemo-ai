import fs from "node:fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { componentTagger } from "lovable-tagger";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

/**
 * Vite's preview server (used while prerendering) attaches an stdin listener it
 * later removes; this sandbox's stdin has no `off`, which crashed the build
 * after every page was written. Vite skips that listener entirely under `CI`.
 */
process.env["CI"] = process.env["CI"] ?? "true";

/**
 * Concrete paths to prerender. Project detail routes are parameterized, so the
 * slugs are read from the database at build time; a failed read simply falls
 * back to server rendering those pages.
 */
async function prerenderPages(): Promise<{ path: string }[]> {
  const paths = new Set<string>(["/projects"]);
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];

  if (url && key) {
    try {
      const response = await fetch(`${url}/rest/v1/projects?select=slug,detail_path`, {
        headers: { apikey: key },
      });
      if (response.ok) {
        const rows = (await response.json()) as { slug: string; detail_path: string | null }[];
        for (const row of rows) {
          paths.add(`/projects/${row.slug}`);
          if (row.detail_path) paths.add(row.detail_path);
        }
      }
    } catch {
      // Keep the build going: unlisted routes are still server rendered.
    }
  }

  return [...paths].map((value) => ({ path: value }));
}

/**
 * The prerender step boots the built server from `dist/server/server.js`, while
 * the Cloudflare output is emitted as `dist/server/index.js`. This writes a
 * tiny re-export so both names resolve.
 */
function prerenderServerShim(): Plugin {
  return {
    name: "prerender-server-shim",
    enforce: "post",
    writeBundle(options) {
      const dir = options.dir;
      if (!dir || path.basename(dir) !== "server") return;
      if (!fs.existsSync(path.join(dir, "index.js"))) return;
      fs.writeFileSync(
        path.join(dir, "server.js"),
        'export * from "./index.js";\nexport { default } from "./index.js";\n',
      );
    },
  };
}

/**
 * Prerendered HTML is written into the client output directory, which the
 * Cloudflare build step rewrites afterwards. Keep each page in memory and flush
 * it back once the whole build has finished.
 */
const prerenderedHtml = new Map<string, string>();

function flushPrerenderedHtml(): void {
  if (prerenderedHtml.size === 0) return;
  const outDir = process.env["TSS_CLIENT_OUTPUT_DIR"] ?? "dist/client";
  for (const [pagePath, html] of prerenderedHtml) {
    const file = path.resolve(outDir, `${pagePath.replace(/^\/+/, "")}/index.html`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  }
  prerenderedHtml.clear();
}

process.on("exit", flushPrerenderedHtml);

export default defineConfig(async ({ command, mode }) => {
  // Cloudflare Workers plugin only on build (produces the worker output);
  // the workerd runtime isn't available for the dev server.
  const useCloudflare = command === "build";
  const pages = command === "build" ? await prerenderPages() : [];

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
      ...(useCloudflare ? [cloudflare({ viteEnvironment: { name: "ssr" } })] : []),
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
      prerenderServerShim(),
      ...(mode === "development" ? [componentTagger()] : []),
    ],
  };
});
