import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer, NesList } from "@/design-system/nes-229931";

import { SiteShell } from "@/components/SiteShell";
import { fontAwesomeLinks } from "@/lib/head-assets";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

const title = "Claude Code Skills (and Microsoft Copilot Agents): A Practical Guide";
const description =
  "How to create, structure, and manage Claude Code skills with SKILL.md, and how to do the same job in Microsoft 365 Copilot with Copilot Studio instructions and declarative agents.";

export const Route = createFileRoute("/claude-code-skills")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: `${title} | MikeDemo` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://mikedemo.dev/claude-code-skills" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://mikedemo.dev/claude-code-skills" },
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
          mainEntityOfPage: "https://mikedemo.dev/claude-code-skills",
        }),
      },
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "AI Agent Skills", url: `${SITE_URL}/agent-skills` },
          { name: "Claude Code Skills", url: `${SITE_URL}/claude-code-skills` },
        ]),
      },
    ],
  }),
  component: ClaudeCodeSkillsPage,
});

interface Step {
  heading: string;
  body: string;
}

const claudeSteps: readonly Step[] = [
  {
    heading: "Create a SKILL.md",
    body: "A skill is a folder containing a SKILL.md file. The file starts with a short frontmatter block (a name and a one-line description of when to use it) followed by the instructions themselves. Claude reads the description to decide when the skill is relevant, so write it as a trigger, not a title.",
  },
  {
    heading: "Put it where Claude can find it",
    body: "Personal skills live in your user-level skills folder and follow you across projects. Project skills live in the repository's skills folder, so everyone working on that codebase gets the same guidance. Claude Code ships with bundled skills as well.",
  },
  {
    heading: "Bundle supporting files",
    body: "A skill can be more than one file: scripts to run, templates to fill, reference documents to consult. Keep SKILL.md as the short entry point and move long material into sibling files the skill links to.",
  },
  {
    heading: "Invoke it directly or let it trigger",
    body: "Once installed, a skill is used automatically when the task matches its description, or you can call it by name like a slash command. Test it on a real task and tighten the description if it triggers too often — or not at all.",
  },
  {
    heading: "Share and version it",
    body: "Because a skill is just files, it versions like code: commit it with the project, or publish the folder for others to drop into their own setup. Agent Skills were published as an open standard in December 2025, so a well-formed skill travels between tools.",
  },
];

const copilotSteps: readonly Step[] = [
  {
    heading: "Start with instructions",
    body: "In Copilot Studio, instructions are the central directions an agent follows: which tools, knowledge sources, and topics to call, and how to shape the response. Microsoft's guidance: assign a role, specify format and style, and state clearly what the agent should not do.",
  },
  {
    heading: "Build a declarative agent for Microsoft 365 Copilot",
    body: "A declarative agent is a customized version of Microsoft 365 Copilot defined by a manifest: a machine-readable document declaring the agent's instructions, knowledge, and actions. You build it with the Microsoft 365 Agents Toolkit and it runs inside the Copilot your organization already uses.",
  },
  {
    heading: "Answer three questions before writing",
    body: "Microsoft's instruction-writing guidance comes down to: what goal must the agent accomplish, what workflows will users go through, and what business logic belongs in the loop. Answer those first and the instructions almost write themselves.",
  },
  {
    heading: "Scope the knowledge",
    body: "Declarative agents ground their answers in the knowledge you attach — SharePoint content, files, or other sources — so keep that set tight and current. A focused agent with a few good sources outperforms a broad one.",
  },
  {
    heading: "Test like a user, not an author",
    body: "Run the workflows you listed in step three end to end. Where the agent picks the wrong tool or format, fix the instructions rather than adding exceptions — short, clear directions beat a wall of rules.",
  },
];

function StepCard({ index, step }: { index: number; step: Step }): ReactElement {
  return (
    <NesContainer className="manual-card">
      <div className="stack stack-s">
        <div className="cluster cluster-s">
          <span className="pixel-icon-badge" aria-hidden="true">
            {index + 1}
          </span>
          <h3 className="pixel-card-title">{step.heading}</h3>
        </div>
        <p className="text-quiet">{step.body}</p>
      </div>
    </NesContainer>
  );
}

function ClaudeCodeSkillsPage(): ReactElement {
  return (
    <SiteShell>
      <article className="section section-narrow stack stack-l">
        <h1 className="pixel-display section-title">Claude Code skills</h1>

        <p className="project-lede">
          Claude Code skills and Microsoft Copilot agents solve the same problem: you have a job you want
          done the same way every time, and you are tired of retyping the prompt. Here is how to build and
          manage both, based on Anthropic&apos;s and Microsoft&apos;s own documentation.
        </p>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Build a Claude Code skill</h2>
          <div className="manual-grid">
            {claudeSteps.map((step, index) => (
              <StepCard key={step.heading} index={index} step={step} />
            ))}
          </div>
        </div>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Do the same in Microsoft Copilot</h2>
          <p className="text-quiet">
            Microsoft&apos;s equivalent of a skill is an agent: a set of instructions plus the knowledge and
            actions it may use. You author it in Copilot Studio, or package it as a declarative agent that
            runs inside Microsoft 365 Copilot.
          </p>
          <div className="manual-grid">
            {copilotSteps.map((step, index) => (
              <StepCard key={step.heading} index={index} step={step} />
            ))}
          </div>
        </div>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Claude Code skill vs. Copilot agent</h2>
          <NesList className="checklist">
            <li>Format: a Claude skill is a folder of files led by SKILL.md; a Copilot agent is declared in a manifest plus instructions authored in Copilot Studio.</li>
            <li>Where it runs: skills run wherever Claude Code runs; Copilot agents run inside Microsoft 365 Copilot and Copilot Studio.</li>
            <li>Sharing: skills move as plain files and follow an open standard; Copilot agents deploy through your Microsoft 365 tenant.</li>
            <li>Same rule for both: one repeatable job, a clear trigger description, and short instructions win.</li>
          </NesList>
        </div>

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Sources</h2>
          <NesList className="checklist">
            <li>
              <a
                href="https://code.claude.com/docs/en/skills"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                Extend Claude with skills — Claude Code Docs
              </a>
            </li>
            <li>
              <a
                href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                Equipping agents for the real world with Agent Skills — Anthropic
              </a>
            </li>
            <li>
              <a
                href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-instructions"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                Write agent instructions — Microsoft Copilot Studio
              </a>
            </li>
            <li>
              <a
                href="https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/declarative-agent-instructions"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                Write effective instructions for declarative agents — Microsoft Learn
              </a>
            </li>
          </NesList>
        </div>

        <div className="stack stack-s">
          <h2 className="pixel-display tech-heading">Keep exploring</h2>
          <div className="cluster cluster-m">
            <Link to="/agent-skills" className="site-nav-link">
              AI agent skills across every platform
            </Link>
            <Link to="/projects/$slug" params={{ slug: "skill-finder-plus" }} className="site-nav-link">
              Skill Finder Plus project
            </Link>
          </div>
        </div>

        <nav aria-label="Back to portfolio">
          <Link to="/" className="site-nav-link">
            ← Back to all projects
          </Link>
        </nav>
      </article>
    </SiteShell>
  );
}
