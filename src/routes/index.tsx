import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { CredentialsSection } from "@/components/CredentialsSection";
import { SiteShell } from "@/components/SiteShell";
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
          src={headshotSrc}
          alt="Pixel-art portrait of MikeDemo wearing glasses, a cap, and a patterned jacket"
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
        <ArcadeStartButton onClick={openProjects}>
          SELECT A PROJECT
        </ArcadeStartButton>
      </section>

      <CredentialsSection />
    </SiteShell>
  );
}

