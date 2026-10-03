import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { CredentialsSection } from "@/components/CredentialsSection";
import { SiteShell } from "@/components/SiteShell";
import { generatedProjectRows } from "@/data/projects.generated";
// 320px source for a 160px display box: the LCP element, so it is kept small,
// preloaded below, and offered as WebP with a PNG fallback.
import headshotWebp from "@/assets/headshot-320.webp";
import headshotPng from "@/assets/headshot-320.png";
import { ArcadeStartButton } from "@/components/ArcadeStartButton";



export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "MikeDemo — AI Project Portfolio" },
      {
        name: "description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:title", content: "MikeDemo — AI Project Portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://mikedemo.dev/" },
      { rel: "preload", as: "image", href: headshotWebp, type: "image/webp" },
    ],
  }),
  component: Index,
});

function Index(): ReactElement {
  const navigate = useNavigate();
  const openProjects = (): void => {
    void navigate({ to: "/projects/" });
  };

  return (
    <SiteShell>
      <section className="hero-section">
        <picture>
          <source srcSet={headshotWebp} type="image/webp" />
          <img
            src={headshotPng}
            alt="Pixel-art portrait of MikeDemo wearing glasses, a cap, and a patterned jacket"
            className="hero-headshot"
            width="160"
            height="160"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <p className="pixel-display hero-eyebrow">PRESS START</p>
        <h1 className="pixel-display hero-title">AI Projects by MikeDemo</h1>
        <p className="hero-subtitle">
          A collection of experiments in on-device machine learning, AI deployment, agent tooling,
          and one extremely productive-looking parody office suite.
        </p>
        <p className="pixel-display hero-quote">“Tools are tools, just don’t be one”</p>
        <ArcadeStartButton onClick={openProjects}>
          SELECT A PROJECT
        </ArcadeStartButton>
      </section>

      <CredentialsSection />

      <section className="section stack stack-m" aria-labelledby="home-projects">
        <h2 id="home-projects" className="pixel-display section-title">Level select</h2>
        <p className="project-lede">
          Every project below ships as a static site or tool with its own detail page.
          Agents and scripts should prefer the machine-readable records in the{" "}
          <Link to="/developers/">developers section</Link> — but here is the human tour.
        </p>
        <ul className="stack stack-s" style={{ listStyle: "none", padding: 0 }}>
          {generatedProjectRows.map((project) => {
            const href =
              project.detail_path === "/bugle-crowns"
                ? "/bugle-crowns/"
                : `/projects/${project.slug}/`;
            return (
              <li key={project.slug}>
                <a href={href}>
                  <strong>{project.name}</strong>
                </a>
                <p className="text-quiet">{project.summary}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section stack stack-m" aria-labelledby="home-machine">
        <h2 id="home-machine" className="pixel-display section-title">Machine-readable</h2>
        <p>
          This portfolio publishes a read-only JSON API — no keys, no auth, no rate
          limits. Start at <a href="/api/v1/projects.json"><code>/api/v1/projects.json</code></a> for
          all {generatedProjectRows.length} projects, read the{" "}
          <a href="/openapi.json"><code>OpenAPI spec</code></a> for the exact shape, or
          visit the <Link to="/developers/">developers page</Link> for the full list of
          agent resources (llms.txt, ARD catalog, agent card, schema feeds).
        </p>
      </section>
    </SiteShell>
  );
}

