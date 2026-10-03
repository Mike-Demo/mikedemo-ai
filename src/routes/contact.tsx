import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

const PROFILES: ReadonlyArray<{ readonly label: string; readonly href: string; readonly note: string }> = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mikedemopoulos",
    note: "Best channel for professional inquiries — partnerships, alliances, and channel work.",
  },
  {
    label: "GitHub",
    href: "https://github.com/Mike-Demo",
    note: "Source code for this portfolio and most of the projects on it.",
  },
  {
    label: "X",
    href: "https://x.com/Mike_Demo",
    note: "Build notes and community chatter.",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@mdemop",
    note: "Shorter updates and cross-posts.",
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/mikedemo.bsky.social",
    note: "Also reachable here.",
  },
];

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contact MikeDemo — MikeDemo" },
      {
        name: "description",
        content:
          "How to reach Mike \"Demo\" Demopoulos: LinkedIn for professional inquiries, GitHub for code, X / Threads / Bluesky for everything else.",
      },
      { property: "og:title", content: "Contact MikeDemo — MikeDemo" },
      {
        property: "og:description",
        content: "Public profiles for reaching Mike \"Demo\" Demopoulos.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/contact/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/contact/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]),
      },
    ],
  }),
  component: Contact,
});

function Contact(): ReactElement {
  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <Link to="/" className="site-nav-link">← Back to the portfolio</Link>
        <header className="stack stack-s">
          <p className="hero-eyebrow pixel-display">INSERT COIN</p>
          <h1 className="pixel-display section-title">Contact</h1>
          <p className="project-lede">
            This site has no contact form and no inbox of its own — the profiles below are
            the public ways to reach Demo. For partnerships, alliances, or channel work,
            LinkedIn is the fastest route.
          </p>
        </header>
        <ul className="stack stack-m" style={{ listStyle: "none", padding: 0 }}>
          {PROFILES.map((profile) => (
            <li key={profile.href} className="stack stack-xs">
              <a href={profile.href} target="_blank" rel="noopener noreferrer">
                <strong>{profile.label}</strong>
              </a>
              <p className="text-quiet">{profile.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
