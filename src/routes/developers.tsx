import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

const API_LINKS: ReadonlyArray<{ readonly label: string; readonly href: string; readonly note: string }> = [
  {
    label: "/api/v1/projects.json",
    href: "/api/v1/projects.json",
    note: "Every project: slug, name, summary, description, tech stack, live URL, and detail path.",
  },
  {
    label: "/api/v1/projects/<slug>.json",
    href: "/api/v1/projects/freshink.json",
    note: "One project by slug — for example, freshink. Slugs are listed in projects.json.",
  },
  {
    label: "/api/v1/site.json",
    href: "/api/v1/site.json",
    note: "Site-level metadata.",
  },
  {
    label: "/openapi.json",
    href: "/openapi.json",
    note: "OpenAPI 3.1 description of the static JSON files above. It documents exactly what exists — nothing more.",
  },
];

const AGENT_LINKS: ReadonlyArray<{ readonly label: string; readonly href: string; readonly note: string }> = [
  {
    label: "/llms.txt",
    href: "/llms.txt",
    note: "Plain-text portfolio summary for language models, with a full reference at /llms.md.",
  },
  {
    label: "/.well-known/agent-card.json",
    href: "/.well-known/agent-card.json",
    note: "A2A-style agent card describing this site as an information source.",
  },
  {
    label: "/.well-known/ard.json",
    href: "/.well-known/ard.json",
    note: "Agent Resource Discovery catalog of the machine-readable resources on this site.",
  },
  {
    label: "/.well-known/agent-skills/index.json",
    href: "/.well-known/agent-skills/index.json",
    note: "Index of the agent skills published for this portfolio, with sha256 digests.",
  },
  {
    label: "/auth.md",
    href: "/auth.md",
    note: "Authentication documentation: there is none — everything here is public and read-only.",
  },
  {
    label: "/schemamap.xml",
    href: "/schemamap.xml",
    note: "NLWeb Schema Map pointing at the schema.org JSON-LD feed of all projects.",
  },
];

export const Route = createFileRoute("/developers")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Developers — MikeDemo" },
      {
        name: "description",
        content:
          "Machine-readable access to the MikeDemo portfolio: a read-only static JSON API, OpenAPI spec, and agent resources. No auth, no keys.",
      },
      { property: "og:title", content: "Developers — MikeDemo" },
      {
        property: "og:description",
        content: "Read-only JSON API, OpenAPI spec, and agent resources for mikedemo.dev.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/developers/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/developers/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Developers", url: `${SITE_URL}/developers` },
        ]),
      },
    ],
  }),
  component: Developers,
});

function Developers(): ReactElement {
  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <Link to="/" className="site-nav-link">← Back to the portfolio</Link>
        <header className="stack stack-s">
          <p className="hero-eyebrow pixel-display">DEBUG MENU</p>
          <h1 className="pixel-display section-title">Developers</h1>
          <p className="project-lede">
            Everything on this site is public and read-only. There are no API keys, no
            OAuth flows, no rate limits, and no pagination — the JSON files below are
            static exports regenerated at build time.
          </p>
        </header>

        <section className="stack stack-m" aria-labelledby="dev-api">
          <h2 id="dev-api" className="pixel-display tech-heading">JSON API</h2>
          <ul className="stack stack-s" style={{ listStyle: "none", padding: 0 }}>
            {API_LINKS.map((link) => (
              <li key={link.label} className="stack stack-xs">
                <a href={link.href}>
                  <code>{link.label}</code>
                </a>
                <p className="text-quiet">{link.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="stack stack-m" aria-labelledby="dev-agents">
          <h2 id="dev-agents" className="pixel-display tech-heading">For AI agents</h2>
          <ul className="stack stack-s" style={{ listStyle: "none", padding: 0 }}>
            {AGENT_LINKS.map((link) => (
              <li key={link.label} className="stack stack-xs">
                <a href={link.href}>
                  <code>{link.label}</code>
                </a>
                <p className="text-quiet">{link.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="stack stack-m" aria-labelledby="dev-versioning">
          <h2 id="dev-versioning" className="pixel-display tech-heading">Versioning &amp; stability</h2>
          <div className="stack stack-s">
            <p>
              The API has no version beyond the <code>/v1/</code> path prefix. It is a
              static snapshot: project fields can gain new entries when projects are
              added, and descriptions can be edited, but fields are not removed without
              the prefix changing. There is no formal deprecation policy because there
              is no live service to deprecate — treat <code>/openapi.json</code> as the
              source of truth for the current shape.
            </p>
            <p>
              Usage notes: fetch <code>/api/v1/projects.json</code> once and filter
              client-side; individual project files are small enough to fetch on demand.
              AI crawlers and agent user-agents are welcome — see{" "}
              <a href="/robots.txt">robots.txt</a> and the{" "}
              <Link to="/privacy/">privacy policy</Link>.
            </p>
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
