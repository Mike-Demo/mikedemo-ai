import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer, NesIcon, NesList } from "@/design-system/nes-229931";

import { SiteShell } from "@/components/SiteShell";
import { TechTagList } from "@/components/TechTagList";
import { findProject } from "@/data/projects";
import { listProjects } from "@/lib/projects.functions";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

const title = "AI Agent Skills: What They Are and Where to Find Them";
const description =
  "A plain-language guide to AI agent skills: how Claude, ChatGPT, Cursor, Copilot, Grok, MCP and Perplexity package reusable instructions, and where to browse ready-made skills.";

export const Route = createFileRoute("/agent-skills")({
  staticData: { sitemap: true },
  loader: () => listProjects(),
  head: () => ({
    meta: [
      { title: `${title} | MikeDemo` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://mikedemo.dev/agent-skills" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://mikedemo.dev/agent-skills" },
      ...fontAwesomeLinks,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          author: { "@type": "Person", name: "Mike Demopoulos" },
          mainEntityOfPage: "https://mikedemo.dev/agent-skills",
        }),
      },
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "AI Agent Skills", url: `${SITE_URL}/agent-skills` },
        ]),
      },
    ],
  }),
  component: AgentSkillsPage,
});

interface PlatformEntry {
  platform: string;
  icon: string;
  packaged: string;
}

const platforms: readonly PlatformEntry[] = [
  {
    platform: "Claude",
    icon: "robot",
    packaged: "A skill folder holding a SKILL.md file with instructions, plus any scripts or reference files it needs.",
  },
  {
    platform: "ChatGPT",
    icon: "comments",
    packaged: "Custom instructions and uploaded reference files, saved on a custom GPT or a project.",
  },
  {
    platform: "Cursor",
    icon: "code",
    packaged: "Rule files kept in the repository so every developer on the project gets the same guidance.",
  },
  {
    platform: "GitHub Copilot",
    icon: "code-branch",
    packaged: "Repository instruction files that Copilot reads before it suggests code.",
  },
  {
    platform: "Grok",
    icon: "bolt",
    packaged: "System-level instructions attached to a conversation or workspace.",
  },
  {
    platform: "MCP servers",
    icon: "plug",
    packaged: "A server that exposes tools an assistant can call, rather than text instructions.",
  },
  {
    platform: "Perplexity",
    icon: "magnifying-glass",
    packaged: "Space-level instructions and sources that shape every answer inside that space.",
  },
];

function AgentSkillsPage(): ReactElement {
  const projects = Route.useLoaderData();
  const skillFinder = findProject(projects, "skill-finder-plus");

  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <h1 className="pixel-display section-title">AI agent skills</h1>

        <p className="project-lede">
          An agent skill is a reusable set of instructions you hand to an AI assistant so it does a job the
          same way every time — a code review checklist, a writing style, a research routine. Instead of
          retyping the same prompt, you save it once and the assistant loads it when the work calls for it.
        </p>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">How each platform packages a skill</h2>
          <p className="text-quiet">
            The idea is the same everywhere; the file format and the place you put it are not.
          </p>
          <div className="manual-grid">
            {platforms.map((entry) => (
              <NesContainer key={entry.platform} className="manual-card">
                <div className="stack stack-s">
                  <div className="cluster cluster-s">
                    <span className="pixel-icon-badge" aria-hidden="true">
                      <NesIcon name="star" size="small" />
                    </span>
                    <h3 className="pixel-card-title">{entry.platform}</h3>
                  </div>
                  <p className="text-quiet">{entry.packaged}</p>
                </div>
              </NesContainer>
            ))}
          </div>
        </div>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">What makes a skill worth saving</h2>
          <NesList className="checklist">
            <li>It describes a repeatable job, not a one-off question.</li>
            <li>It states the steps and the output shape, so results stay consistent.</li>
            <li>It names the edge cases you keep having to correct by hand.</li>
            <li>It stays short enough to read; long skills get ignored by people and models alike.</li>
          </NesList>
        </div>

        {skillFinder ? (
          <div className="stack stack-s">
            <h2 className="pixel-display tech-heading">Browse ready-made skills</h2>
            <p>
              I built {skillFinder.name} for exactly this: a browsable library of agent skills across the
              platforms above, so you can start from something that already works.
            </p>
            <TechTagList items={skillFinder.tech} size="small" label={`${skillFinder.name} tech stack`} />
            <div className="cluster cluster-m">
              <a className="nes-btn is-primary" href={skillFinder.url} target="_blank" rel="noopener noreferrer">
                OPEN {skillFinder.domain}
              </a>
              <Link to="/projects/$slug" params={{ slug: skillFinder.slug }} className="site-nav-link">
                How it was built
              </Link>
            </div>
          </div>
        ) : null}

        <nav aria-label="Back to portfolio">
          <Link to="/" className="site-nav-link">
            ← Back to all projects
          </Link>
        </nav>
      </section>
    </SiteShell>
  );
}
