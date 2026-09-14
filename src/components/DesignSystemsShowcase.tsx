import type { ReactElement } from "react";

import { NesContainer, NesIcon } from "@/design-system/nes-229931";
import {
  WaBadge,
  WaButton,
  WaCard,
  WaIcon,
  WebAwesomeLoader,
} from "@/design-system/font-awsome-web-awesome-171158";

import type { Project } from "@/data/projects";

interface DesignSystemsShowcaseProps {
  readonly project: Project;
}

/**
 * Equal showcase of the two libraries represented by the unified portfolio
 * entry. This is the only place on the site that renders <wa-*> markup, so it
 * owns the Web Awesome element bundle: the loader is mounted here instead of
 * in the shared shell, and this module is imported lazily by its route.
 */
export function DesignSystemsShowcase({ project }: DesignSystemsShowcaseProps): ReactElement {
  const nesSite = project.sites?.[0];
  const awesomeSite = project.sites?.[1];

  return (
    <section className="stack stack-m" aria-labelledby="systems-heading">
      <div className="stack stack-xs">
        <p className="pixel-display hero-eyebrow">TWO SYSTEMS · ONE EXPERIENCE</p>
        <h2 id="systems-heading" className="pixel-display section-title">
          Choose a design mode
        </h2>
        <p>
          NES supplies the expressive 8-bit cabinet. Awesome supplies accessible web components,
          scalable icons, tokens, and reusable patterns. This portfolio uses both together.
        </p>
      </div>

      <div className="design-systems-grid">
        <NesContainer className="design-system-panel" title="NES DESIGN SYSTEM" dark>
          <div className="stack stack-m">
            <div className="cluster cluster-s">
              <NesIcon name="star" size="medium" />
              <span className="pixel-display tech-heading">PLAYER ONE</span>
            </div>
            <p>
              Pixel borders, hard shadows, arcade controls, retro typography, and accessible React
              wrappers give the portfolio its console identity.
            </p>
            {nesSite ? (
              <a className="nes-btn is-primary" href={nesSite.url} target="_blank" rel="noopener noreferrer">
                OPEN NES SYSTEM
              </a>
            ) : null}
          </div>
        </NesContainer>

        <WaCard className="design-system-panel" appearance="filled-outlined" with-header with-footer>
          <div slot="header" className="cluster cluster-s">
            <WaIcon name="icons" family="classic" variant="solid" label="" />
            <h3 className="design-system-awesome-title">FONT AWSOME &amp; WEB AWESOME</h3>
          </div>
          <div className="stack stack-m">
            <div className="cluster cluster-s" aria-label="Awesome system capabilities">
              <WaBadge variant="brand" appearance="filled">COMPONENTS</WaBadge>
              <WaBadge variant="neutral" appearance="outlined">ICONS</WaBadge>
              <WaBadge variant="success" appearance="filled-outlined">TOKENS</WaBadge>
            </div>
            <p>
              Accessible custom elements, Font Awesome Free icons, responsive utilities, and theme
              tokens provide the interface foundation beneath the pixels.
            </p>
          </div>
          {awesomeSite ? (
            <div slot="footer">
              <WaButton
                variant="brand"
                appearance="filled"
                href={awesomeSite.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WaIcon slot="start" name="arrow-up-right-from-square" label="" />
                OPEN AWESOME SYSTEM
              </WaButton>
            </div>
          ) : null}
        </WaCard>
      </div>
    </section>
  );
}