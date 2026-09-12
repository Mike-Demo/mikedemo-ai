import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { CredentialsSection } from "@/components/CredentialsSection";
import { SiteShell } from "@/components/SiteShell";
import headshotAsset from "@/assets/mike-pixel-portrait.png.asset.json";
import { NesButton } from "@/design-system/nes-229931";


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
    links: [{ rel: "canonical", href: "https://mikedemo.dev/" }],
  }),
  component: Index,
});

function Index(): ReactElement {
  const navigate = useNavigate();
  const openProjects = (): void => {
    void navigate({ to: "/projects" });
  };

  return (
    <SiteShell>
      <section className="hero-section">
        <img
          src={headshotAsset.url}
          alt="MikeDemo"
          className="hero-headshot"
          width="160"
          height="160"
        />
        <p className="pixel-display hero-eyebrow">PRESS START</p>
        <h1 className="pixel-display hero-title">AI Projects by MikeDemo</h1>
        <p className="hero-subtitle">
          A collection of experiments in on-device machine learning, AI deployment, agent tooling,
          and one extremely productive-looking parody office suite.
        </p>
        <p className="pixel-display hero-quote">“Tools are tools, just don’t be one”</p>
        <NesButton variant="primary" onClick={openProjects}>
          SELECT A PROJECT
        </NesButton>
      </section>

      <CredentialsSection />

      <section className="section home-project-callout" aria-labelledby="projects-heading">
        <div className="stack stack-m">
          <h2 id="projects-heading" className="pixel-display section-title">Ready Player One?</h2>
          <p>Explore every AI experiment from the dedicated arcade cabinet.</p>
          <div>
            <NesButton variant="primary" onClick={openProjects}>OPEN LEVEL SELECT</NesButton>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

