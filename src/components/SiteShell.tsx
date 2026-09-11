import type { ReactElement, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import {
  SiteFooter,
  WaIcon,
  WaPage,
  WebAwesomeLoader,
} from "@/design-system/font-awsome-web-awesome-171158";
import { DEFAULT_SOCIAL_LINKS } from "@/design-system/font-awsome-web-awesome-171158/webawesome/patterns/site-footer";

import { PixelWipe } from "@/components/PixelWipe";

/**
 * Shared page shell: Web Awesome loader, sticky header with icon navigation
 * and social links, main content, and the standard site footer.
 */
export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <WaPage>
      <WebAwesomeLoader />

      <header slot="header" className="site-header wa-cluster wa-justify-content-space-between wa-align-items-center">
        <Link to="/" className="site-brand pixel-display" aria-label="MikeDemo portfolio home">
          <WaIcon name="gamepad" aria-hidden="true" />
          MikeDemo
        </Link>
        <div className="wa-cluster wa-gap-l wa-align-items-center">
          <nav aria-label="Main navigation" className="wa-cluster wa-gap-m">
            <Link to="/" className="site-nav-link site-nav-icon" aria-label="Projects">
              <WaIcon name="rocket" aria-hidden="true" />
            </Link>
            <Link to="/agent-skills" className="site-nav-link site-nav-icon" aria-label="AI agent skills guide">
              <WaIcon name="wand-magic-sparkles" aria-hidden="true" />
            </Link>
            <Link to="/licenses" className="site-nav-link site-nav-icon" aria-label="Licenses and credits">
              <WaIcon name="scale-balanced" aria-hidden="true" />
            </Link>
          </nav>
          <nav aria-label="Social links" className="wa-cluster wa-gap-m">
            {DEFAULT_SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link site-nav-icon"
                aria-label={link.label}
              >
                <WaIcon family="brands" name={link.icon} aria-hidden="true" />
              </a>
            ))}
            <a
              href="https://councils.forbes.com/profile/Mike-Demopoulos-Partnerships-Lead-North-America-hosting-com/ad134482-08d5-4acc-810f-16e790de5b2b"
              target="_blank"
              rel="noopener noreferrer"
              className="site-nav-link site-nav-icon"
              aria-label="Forbes profile"
            >
              <WaIcon family="solid" name="user-tie" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <div slot="footer">
        <SiteFooter />
      </div>
    </WaPage>
  );
}
