import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { SiteShell } from "@/components/SiteShell";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Privacy Policy — MikeDemo" },
      {
        name: "description",
        content:
          "Privacy policy for mikedemo.dev: a static portfolio with no accounts, no login, and no tracking cookies.",
      },
      { property: "og:title", content: "Privacy Policy — MikeDemo" },
      {
        property: "og:description",
        content: "What this static portfolio collects (almost nothing) and why.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/privacy/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/privacy/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
        ]),
      },
    ],
  }),
  component: Privacy,
});

function Privacy(): ReactElement {
  return (
    <SiteShell>
      <section className="section section-narrow stack stack-l">
        <Link to="/" className="site-nav-link">← Back to the portfolio</Link>
        <header className="stack stack-s">
          <p className="hero-eyebrow pixel-display">GAME MANUAL</p>
          <h1 className="pixel-display section-title">Privacy policy</h1>
          <p className="text-quiet">Last updated: October 3, 2026.</p>
        </header>
        <div className="stack stack-m">
          <section className="stack stack-s">
            <h2 className="pixel-display tech-heading">The short version</h2>
            <p>
              mikedemo.dev is a fully static portfolio. There are no accounts, no login,
              no comments, no newsletter signup, and no contact form — so the site itself
              collects nothing about you, sets no tracking cookies, and stores no personal
              data.
            </p>
          </section>
          <section className="stack stack-s">
            <h2 className="pixel-display tech-heading">Analytics</h2>
            <p>
              The site loads a lightweight, cookieless analytics tracker (umami-lite) that
              counts page views without cookies and without storing IP addresses. There is
              no cross-site tracking and no advertising profile built from your visit.
            </p>
          </section>
          <section className="stack stack-s">
            <h2 className="pixel-display tech-heading">Third parties</h2>
            <p>
              Fonts, icons, and stylesheets load from the jsDelivr CDN, and pages are
              served by SpaceFast static hosting. Those providers see the same technical
              request data any web host sees (such as your IP address and user agent) when
              your browser fetches files from them. The projects linked from this
              portfolio are separate sites with their own policies.
            </p>
          </section>
          <section className="stack stack-s">
            <h2 className="pixel-display tech-heading">AI crawlers</h2>
            <p>
              AI crawlers and agent user-agents are explicitly welcome here (see{" "}
              <a href="/robots.txt">robots.txt</a>). The machine-readable files on this
              site — llms.txt, the JSON API, the ARD catalog — exist so agents can read
              the portfolio without scraping HTML.
            </p>
          </section>
          <section className="stack stack-s">
            <h2 className="pixel-display tech-heading">Questions</h2>
            <p>
              Privacy questions about this site can go through any of the public profiles
              on the <Link to="/contact/">contact page</Link>.
            </p>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
