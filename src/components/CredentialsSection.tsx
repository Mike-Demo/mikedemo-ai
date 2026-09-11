import type { ReactElement } from "react";

import { WaCard, WaIcon } from "@/design-system/font-awsome-web-awesome-171158";

import { credentials } from "@/data/timeline";

/**
 * Credentials band shown near the top of the homepage, separate from the
 * project timeline.
 */
export function CredentialsSection(): ReactElement {
  return (
    <section
      id="credentials"
      className="section wa-stack wa-gap-m"
      aria-labelledby="credentials-heading"
    >
      <h2 id="credentials-heading" className="pixel-display section-title">
        Credentials
      </h2>
      <div className="credential-grid">
        {credentials.map((credential) => (
          <WaCard key={credential.id} className="pixel-card credential-card" appearance="outlined">
            <div className="wa-stack wa-gap-s">
              <div className="wa-cluster wa-align-items-center wa-gap-s">
                <span className="pixel-icon-badge" aria-hidden="true">
                  <WaIcon name={credential.icon} />
                </span>
                <span className="wa-color-text-quiet credential-issuer">{credential.issuer}</span>
              </div>
              <h3 className="pixel-card-title">{credential.title}</h3>
              <p className="wa-color-text-quiet">
                {credential.summary} · {credential.period}
              </p>
              <a
                href={credential.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                <WaIcon name="arrow-up-right-from-square" aria-hidden="true" /> View credential
              </a>
            </div>
          </WaCard>
        ))}
      </div>
    </section>
  );
}
