import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About MikeDemo — MikeDemo" },
      {
        name: "description",
        content:
          "Mike \"Demo\" Demopoulos (they/them) is a partnerships and alliances leader in cloud infrastructure and hosting who builds AI workflow tooling on the side.",
      },
      { property: "og:title", content: "About MikeDemo — MikeDemo" },
      {
        property: "og:description",
        content:
          "Partnerships and alliances leader in cloud infrastructure and hosting; builder of AI workflow and agent tooling.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/about/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/about/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
        ]),
      },
    ],
  }),
  component: About,
});

function About(): ReactElement {
  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <Link to="/" className="site-nav-link">← Back to the portfolio</Link>
        <header className="stack stack-s">
          <p className="hero-eyebrow pixel-display">PLAYER ONE</p>
          <h1 className="pixel-display section-title">About MikeDemo</h1>
        </header>
        <div className="stack stack-m">
          <p>
            <strong>Mike &ldquo;Demo&rdquo; Demopoulos</strong> (they/them) is a partnerships and
            alliances leader in cloud infrastructure, hosting, and SaaS, based in Hudson,
            Wisconsin. They were Partnerships Lead, North America at hosting.com, and before
            that led partnerships at Codeable and did business development and product
            evangelism at InMotion Hosting / BoldGrid.
          </p>
          <p>
            Demo is a Council Member and Web Hosting &amp; Infrastructure Group Lead at the
            Forbes Agency Council, a longtime volunteer with Out in Tech, and a lead
            organizer of the Global Pride Parties at WordCamp Asia, Europe, and US. They
            have contributed to six CloudFest Hackathons and served on the board of Open
            Source Matters.
          </p>
          <p>
            Since 2026 they have been building <strong>applied AI workflow and agent
            tooling</strong> in public — on-device browser ML, deployment helpers for
            self-hosted AI agents, agent skill directories, and playful web toys. This
            site, mikedemo.dev, is the level-select screen for all of it: every project
            gets a card, a detail page, and machine-readable records for humans and
            agents alike.
          </p>
          <p>
            The portfolio itself is a fully static site — no accounts, no tracking
            cookies, no server. Project data lives in a database at build time and is
            exported to the read-only JSON API documented on the{" "}
            <Link to="/developers/">developers page</Link>. The source is public at{" "}
            <a href="https://github.com/Mike-Demo/mikedemo-ai" target="_blank" rel="noopener noreferrer">
              github.com/Mike-Demo/mikedemo-ai
            </a>.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
