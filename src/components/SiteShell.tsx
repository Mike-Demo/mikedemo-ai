import type { ReactElement, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { WebAwesomeLoader } from "@/design-system/font-awsome-web-awesome-171158";

import { PixelSiteFooter } from "@/components/PixelSiteFooter";
import { NesIcon } from "@/design-system/nes-229931";

/**
 * Shared page shell: NES game HUD, main content, and the
 * design-system footer that owns the social and open-source links.
 */
export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="site-shell">
      <WebAwesomeLoader />

      <a href="#main-content" className="skip-link pixel-display">
        Skip to content
      </a>

      <header className="site-header">
        <Link to="/" className="site-brand pixel-display" aria-label="MikeDemo portfolio home">
          <NesIcon name="coin" size="small" />
          MikeDemo
        </Link>
        <nav aria-label="Main navigation" className="site-nav">
          <Link to="/projects" className="site-nav-link" activeProps={{ className: "is-active" }}>
            Projects
          </Link>
          <Link to="/agent-skills" className="site-nav-link" activeProps={{ className: "is-active" }}>
            Skills Guide
          </Link>
          <Link to="/licenses" className="site-nav-link" activeProps={{ className: "is-active" }}>
            Credits
          </Link>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <div className="site-footer-wrap">
        <PixelSiteFooter />
      </div>
    </div>
  );
}
