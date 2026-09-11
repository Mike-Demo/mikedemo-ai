import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaIcon,
} from "@/design-system/font-awsome-web-awesome-171158";

import { CredentialsSection } from "@/components/CredentialsSection";
import { SiteShell } from "@/components/SiteShell";
import { TimelineArcade } from "@/components/TimelineArcade";
import headshotSrc from "@/assets/headshot.png";
import { projectsNewestFirst } from "@/data/timeline";


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
  return (
    <SiteShell>
      <section className="hero-section wa-stack wa-gap-m wa-align-items-center">
        <img
          src={headshotSrc}
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
        <WaButton variant="brand" size="large" href="#projects">
          <WaIcon slot="start" name="rocket" aria-hidden="true" />
          Select a level
        </WaButton>
      </section>

      <CredentialsSection />

      <section id="projects" className="section wa-stack wa-gap-l" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pixel-display section-title">
          Level Select
        </h2>
        <p className="wa-color-text-quiet">
          Newest first. Pick an icon to open the project — arrow keys move along the rail.
        </p>
        <TimelineArcade projects={projectsNewestFirst} />
      </section>
    </SiteShell>
  );
}

