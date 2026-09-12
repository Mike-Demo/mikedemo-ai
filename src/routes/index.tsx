import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesButton } from "@/design-system/nes-229931";
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
      <section className="hero-section">
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
        <NesButton
          variant="primary"
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        >
          SELECT A LEVEL
        </NesButton>
      </section>

      <CredentialsSection />

      <section id="projects" className="section stack stack-l" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pixel-display section-title">
          Level Select
        </h2>
        <p className="text-quiet">
          Choose a cartridge. Arrow keys move the cursor; Enter launches the selected project.
        </p>

        <TimelineArcade projects={projectsNewestFirst} />
      </section>
    </SiteShell>
  );
}

