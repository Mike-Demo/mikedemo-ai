import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import { NesIcon } from "@/design-system/nes-229931";

interface PixelSocialLink {
  /** Accessible label, e.g. "MikeDemo on LinkedIn". */
  readonly label: string;
  /** Absolute URL, opened in a new tab. */
  readonly href: string;
  /** NES pixel social icon name. */
  readonly icon: "linkedin" | "twitter" | "instagram" | "github";
  /** Visible text next to the icon. */
  readonly text: string;
}

const PIXEL_SOCIAL_LINKS: readonly PixelSocialLink[] = [
  {
    label: "MikeDemo on GitHub",
    href: "https://github.com/Mike-Demo",
    icon: "github",
    text: "GitHub",
  },
  {
    label: "MikeDemo on LinkedIn",
    href: "https://www.linkedin.com/in/mikedemopoulos",
    icon: "linkedin",
    text: "LinkedIn",
  },
  {
    label: "MikeDemo on X",
    href: "https://x.com/mike_demo",
    icon: "twitter",
    text: "X",
  },
  {
    label: "@demo on tweet.app",
    href: "https://app.tweet.app/post/92206629-1525-4a74-8f51-39e226fc9e75",
    icon: "twitter",
    text: "tweet.app",
  },
  {
    label: "MikeDemo on Threads",
    href: "https://www.threads.com/@mdemop",
    icon: "instagram",
    text: "Threads",
  },
];

export interface PixelSiteFooterProps {
  /** Attribution line. */
  readonly madeBy?: string;
  /** Path of the open-source license page. */
  readonly licensesHref?: string;
  /** Copyright year. Defaults to current year, resolved after hydration. */
  readonly year?: number;
}

/**
 * NES-styled site footer: attribution, copyright, open-source link, and pixel
 * social icons. Mirrors the layout of the design-system SiteFooter but uses the
 * NES icon set so the retro aesthetic continues all the way to the bottom of the
 * page.
 */
export function PixelSiteFooter({
  madeBy = "Made by MikeDemo",
  licensesHref = "/licenses/",
  year,
}: PixelSiteFooterProps): ReactElement {
  const [resolvedYear, setResolvedYear] = useState<number | undefined>(year);

  useEffect(() => {
    if (year === undefined) setResolvedYear(new Date().getFullYear());
  }, [year]);

  return (
    <footer className="pixel-site-footer">
      <div className="pixel-site-footer-meta">
        <span>{madeBy}</span>
        {resolvedYear === undefined ? null : (
          <span aria-label={`Copyright ${resolvedYear}`}>© {resolvedYear}</span>
        )}
      </div>

      <nav aria-label="Legal links" className="pixel-site-footer-legal">
        <a href={licensesHref} className="pixel-site-footer-link">
          <NesIcon name="coin" size="small" />
          Open Source
        </a>
        <a href="/openapi.json" className="pixel-site-footer-link">
          <NesIcon name="star" size="small" />
          API
        </a>
      </nav>

      <nav aria-label="Social links" className="pixel-site-footer-social">
        {PIXEL_SOCIAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (opens in new tab)`}
            className="pixel-site-footer-link"
          >
            <NesIcon name={link.icon} size="small" />
            {link.text}
          </a>
        ))}
      </nav>
    </footer>
  );
}
