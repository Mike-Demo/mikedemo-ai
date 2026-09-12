import type { ReactElement } from "react";

import { NesContainer, NesIcon } from "@/design-system/nes-229931";

import { credentials } from "@/data/timeline";

/**
 * Credentials band shown near the top of the homepage, separate from the
 * project timeline.
 */
export function CredentialsSection(): ReactElement {
  return (
    <section
      id="credentials"
      className="section stack stack-m"
      aria-labelledby="credentials-heading"
    >
      <h2 id="credentials-heading" className="pixel-display section-title">
        Credentials
      </h2>
      <div className="credential-grid">
        {credentials.map((credential) => (
          <NesContainer key={credential.id} className="credential-card" title="ACHIEVEMENT UNLOCKED">
            <div className="stack stack-s">
              <div className="cluster cluster-s">
                <span className="pixel-icon-badge" aria-hidden="true">
                  <NesIcon name="trophy" />
                </span>
                <span className="text-quiet credential-issuer">{credential.issuer}</span>
              </div>
              <h3 className="pixel-card-title">{credential.title}</h3>
              <p className="text-quiet">
                {credential.summary} · {credential.period}
              </p>
              <a
                href={credential.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
              >
                VIEW CREDENTIAL
              </a>
            </div>
          </NesContainer>
        ))}
      </div>
    </section>
  );
}
