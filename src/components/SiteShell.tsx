import type { ReactElement, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import {
  SiteFooter,
  WebAwesomeLoader,
} from "@/design-system/font-awsome-web-awesome-171158";

import { PixelWipe } from "@/components/PixelWipe";
import { NesIcon } from "@/design-system/nes-229931";

/**
 * Shared page shell: NES game HUD, route transition, main content, and the
 * design-system footer that owns the social and open-source links.
 */
export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="site-shell">
      <WebAwesomeLoader />

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

      <PixelWipe />

      <main id="main-content" className="page-enter">{children}</main>

      <div className="site-footer-wrap">
        <SiteFooter />
      </div>
    </div>
  );
}
