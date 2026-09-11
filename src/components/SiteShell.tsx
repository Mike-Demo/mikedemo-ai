import type { ReactElement, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import {
  SiteFooter,
  WaIcon,
  WaPage,
  WebAwesomeLoader,
} from "@/design-system/font-awsome-web-awesome-171158";

/**
 * Shared page shell: Web Awesome loader, sticky header, main content, and
 * the standard site footer (social links included).
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
        <nav aria-label="Main navigation" className="wa-cluster wa-gap-m">
          <Link to="/" className="site-nav-link">
            Projects
          </Link>
          <Link to="/licenses" className="site-nav-link">
            Licenses
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <div slot="footer">
        <SiteFooter />
      </div>
    </WaPage>
  );
}
