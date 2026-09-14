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
        },
      }),
      viteReact(),
      ...(mode === "development" ? [componentTagger()] : []),
    ],
  };
});
