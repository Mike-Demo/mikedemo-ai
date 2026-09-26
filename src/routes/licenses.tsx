import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

// Deep imports on purpose: the design-system barrel pulls in every <wa-*>
// wrapper and its theme stylesheet, and this page only needs credit data and
// version constants.
import type { LicenseEntry } from "@/design-system/font-awsome-web-awesome-171158/webawesome/patterns/licenses";
import { baseCredits } from "@/design-system/font-awsome-web-awesome-171158/webawesome/patterns/licenses";
import {
  FONT_AWESOME_VERSION,
  WEB_AWESOME_CDN,
  WEB_AWESOME_VERSION,
} from "@/design-system/font-awsome-web-awesome-171158/webawesome/setup";
import { NesContainer } from "@/design-system/nes-229931";
import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

interface LicenseGroup {
  readonly title: string;
  readonly entries: readonly LicenseEntry[];
}

const groups: readonly LicenseGroup[] = [
  {
    title: "Typefaces",
    entries: [
      {
        name: "Press Start 2P",
        author: "CodeMan38",
        license: "SIL Open Font License 1.1",
        url: "https://openfontlicense.org",
        note: "Pixel display typeface used for headings, controls, and the site wordmark. Served from Google Fonts.",
      },
      {
        name: "Work Sans",
        author: "Wei Huang and contributors",
        license: "SIL Open Font License 1.1",
        url: "https://github.com/weiweihuanghuang/Work-Sans",
        note: "Readable body typeface used for summaries and long-form content.",
      },
    ],
  },
  {
    title: "Design systems",
    entries: [
      {
        name: "NES.css",
        author: "Ryo Sakai and contributors",
        license: "MIT",
        url: "https://github.com/nostalgic-css/NES.css/blob/develop/LICENSE",
        note: "The pixel-art component system used across the portfolio.",
      },
      ...baseCredits.filter((entry) => entry.name === "Web Awesome" || entry.name === "Font Awesome Free"),
      {
        name: "Web Awesome stylesheets (CDN)",
        author: "Font Awesome / Fonticons, Inc.",
        license: "MIT",
        url: `${WEB_AWESOME_CDN}/styles/webawesome.css`,
        note: `Legacy setup and shared footer support pinned to Web Awesome ${WEB_AWESOME_VERSION} with Font Awesome Free ${FONT_AWESOME_VERSION}.`,
      },
    ],
  },
  {
    title: "Framework & build tooling",
    entries: [
      ...baseCredits.filter((entry) => entry.name === "React" || entry.name === "TanStack Start & Router"),
      { name: "TanStack Query", author: "Tanner Linsley and contributors", license: "MIT", url: "https://github.com/TanStack/query/blob/main/LICENSE", note: "Client cache wired into the router context." },
      { name: "Vite", author: "Evan You and Vite contributors", license: "MIT", url: "https://github.com/vitejs/vite/blob/main/LICENSE", note: "Dev server and production bundler." },
      { name: "TypeScript", author: "Microsoft Corporation", license: "Apache-2.0", url: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt", note: "Every source file on this site is typed." },
      { name: "Zod", author: "Colin McDonnell and contributors", license: "MIT", url: "https://github.com/colinhacks/zod/blob/main/LICENSE", note: "Schema validation for typed data." },
      { name: "Cloudflare Vite plugin", author: "Cloudflare, Inc.", license: "MIT", url: "https://github.com/cloudflare/workers-sdk/blob/main/LICENSE-MIT", note: "Builds the site for its production runtime." },
    ],
  },
  {
    title: "Services",
    entries: [
      ...baseCredits.filter((entry) => entry.name === "hCaptcha"),
      {
        name: "Supabase",
        author: "Supabase, Inc.",
        license: "MIT (client libraries)",
        url: "https://github.com/supabase/supabase-js/blob/master/LICENSE",
      },
    ],
  },
  {
    title: "Hosting",
    entries: [
      {
        name: "Spacefast",
        author: "Spacefast",
        license: "Hosting provider",
        url: "https://spacefast.io",
        note: "Serves the production copy of this portfolio (mikedemo.dev) and most listed projects as plain static files.",
      },
      {
        name: "Lovable Cloud",
        author: "Lovable",
        license: "Hosting provider",
        url: "https://lovable.dev",
        note: "Stores the project records behind this site and hosts the staging copy, Skill Finder Plus, and QueerCade Connect.",
      },
      {
        name: "AWS",
        author: "Amazon Web Services, Inc.",
        license: "Hosting provider",
        url: "https://aws.amazon.com",
        note: "Hosts Bugle Crowns.",
      },
    ],
  },
  {
    title: "Artwork",
    entries: [
      { name: "Project logos & screenshots", author: "Mike Demopoulos", license: "All rights reserved", url: "/", note: "Each project icon shown in the level select comes from that project's own site." },
      { name: "Bugle Crowns team badge", author: "AWS Agentic Football Cup", license: "Used with permission of the event organizers", url: "https://agenticfootballcup.com", note: "Astronaut-helmet crest shown on the Bugle Crowns page." },
    ],
  },
];

export const Route = createFileRoute("/licenses")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Open Source Licenses — MikeDemo" },
      { name: "description", content: "Licenses and credits for the open-source libraries and typefaces used on this site." },
      { property: "og:title", content: "Open Source Licenses — MikeDemo" },
      { property: "og:description", content: "Licenses and credits for the open-source libraries and typefaces used on this site." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/licenses" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/licenses" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Open Source Licenses", url: `${SITE_URL}/licenses` },
        ]),
      },
    ],
  }),
  component: Licenses,
});

function Licenses(): ReactElement {
  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <Link to="/" className="site-nav-link">← Back to the portfolio</Link>
        <header className="stack stack-s">
          <p className="hero-eyebrow pixel-display">CREDITS SCREEN</p>
          <h1 className="pixel-display section-title">Open source & credits</h1>
          <p className="project-lede">This portfolio is a flat-file site built on freely licensed software and typefaces. Every dependency it ships is credited below.</p>
          <a
            href="https://app.aikido.dev/audit-report/external/smlvhLoPnScdRnVeF7TjudEr/request"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aikido Security Audit Report (opens in new tab)"
          >
            <img
              src="https://app.aikido.dev/assets/badges/full-light-theme.svg"
              alt="Aikido Security Audit Report"
              height={40}
            />
          </a>
        </header>
        {groups.map((group) => (
          <section key={group.title} className="stack stack-m" aria-labelledby={`license-${group.title.replaceAll(" ", "-").toLowerCase()}`}>
            <h2 id={`license-${group.title.replaceAll(" ", "-").toLowerCase()}`} className="pixel-display tech-heading">{group.title}</h2>
            <div className="license-grid">
              {group.entries.map((entry) => (
                <NesContainer key={`${group.title}-${entry.name}`} className="license-card">
                  <div className="stack stack-xs">
                    <h3 className="pixel-card-title">{entry.name}</h3>
                    <p className="text-quiet">{entry.author} · {entry.license}</p>
                    {entry.note ? <p>{entry.note}</p> : null}
                    <a href={entry.url} target="_blank" rel="noopener noreferrer">LICENSE SOURCE</a>
                  </div>
                </NesContainer>
              ))}
            </div>
          </section>
        ))}
      </section>
    </SiteShell>
  );
}
