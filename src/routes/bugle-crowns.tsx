import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaCallout,
  WaCard,
  WaIcon,
  WaTag,
} from "@/design-system/font-awsome-web-awesome-171158";

import { ProjectIcon } from "@/components/ProjectIcon";
import { SiteShell } from "@/components/SiteShell";
import { getProject } from "@/data/projects";
import {
  drills,
  latestMatch,
  performanceDiagnosis,
  practiceFocus,
  rankMovement,
  recommendations,
  weekId,
  weekRecord,
} from "@/data/bugle-crowns";

const description =
  "Bugle Crowns, my AI agent team in the AWS Agentic Football Cup: Week 1 record, match results, and the tactical changes proposed for Round 2.";

export const Route = createFileRoute("/bugle-crowns")({
  head: () => ({
    meta: [
      { title: "Bugle Crowns — AWS Agentic Football Cup | MikeDemo" },
      { name: "description", content: description },
      { property: "og:title", content: "Bugle Crowns — AWS Agentic Football Cup" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BugleCrownsPage,
});

function Stat({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="stat-block">
      <span className="pixel-display stat-value">{value}</span>
      <span className="wa-color-text-quiet stat-label">{label}</span>
    </div>
  );
}

function BugleCrownsPage(): ReactElement {
  const project = getProject("bugle-crowns");

  return (
    <SiteShell>
      <section className="section section-narrow wa-stack wa-gap-l">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="site-nav-link">
            <WaIcon name="arrow-left" aria-hidden="true" /> All projects
          </Link>
        </nav>

        <div className="wa-cluster wa-align-items-center wa-gap-m">
          {project ? (
            <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
              <ProjectIcon project={project} />
            </span>
          ) : null}
          <div className="wa-stack wa-gap-2xs">
            <h1 className="pixel-display section-title">Bugle Crowns</h1>
            <span className="wa-color-text-quiet">AWS Agentic Football Cup · {weekId}</span>
          </div>
        </div>

        <p className="project-lede">
          Five AI agents, 120-second matches, one very opinionated coach. Bugle Crowns is my team in
          the AWS Agentic Football Cup — here is how Week 1 went and what changes next.
        </p>

        <div className="wa-cluster wa-gap-m">
          <WaButton
            variant="brand"
            size="large"
            href="https://agenticfootballcup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon slot="start" name="arrow-up-right-from-square" aria-hidden="true" />
            agenticfootballcup.com
          </WaButton>
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">Week 1 at a glance</h2>
          <div className="stat-grid">
            <Stat label="Record" value={`${weekRecord.wins}W ${weekRecord.losses}L`} />
            <Stat label="Goals for" value={String(weekRecord.goalsFor)} />
            <Stat label="Goals against" value={String(weekRecord.goalsAgainst)} />
            <Stat label="Clean sheets" value={String(weekRecord.cleanSheets)} />
            <Stat label="Rank" value={`#${rankMovement.after} (${rankMovement.delta})`} />
            <Stat label="Points" value={String(rankMovement.points)} />
          </div>
          <p className="wa-color-text-quiet">
            {weekRecord.played} of a possible {weekRecord.possible} matches played. {rankMovement.note}
          </p>
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">
            Match 10 · {latestMatch.result === "loss" ? "L" : "W"} {latestMatch.scoreFor}-
            {latestMatch.scoreAgainst} vs {latestMatch.opponent}
          </h2>
          <WaCard className="pixel-card" appearance="outlined">
            <div className="wa-stack wa-gap-s">
              <ol className="wa-stack wa-gap-2xs goal-timeline">
                {latestMatch.goalTimeline.map((goal) => (
                  <li key={goal.event}>{goal.event}</li>
                ))}
              </ol>
              <div className="wa-cluster wa-gap-2xs">
                {latestMatch.awards.map((award) => (
                  <WaTag key={award} variant="brand" appearance="filled" size="small">
                    {award}
                  </WaTag>
                ))}
              </div>
            </div>
          </WaCard>
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">Week 1 standings</h2>
          <div className="match-table-scroll">
            <table className="match-table">
              <caption className="wa-color-text-quiet">
                All ten Round 1 Week 1 matches, in the order they were played.
              </caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Opponent</th>
                  <th scope="col">Result</th>
                  <th scope="col">Score</th>
                  <th scope="col">GD</th>
                </tr>
              </thead>
              <tbody>
                {matchLog.map((match) => {
                  const diff = match.scoreFor - match.scoreAgainst;
                  return (
                    <tr key={match.match}>
                      <td>{match.match}</td>
                      <th scope="row">{match.opponent}</th>
                      <td>
                        <WaTag
                          variant={match.result === "win" ? "success" : "danger"}
                          appearance="filled"
                          size="small"
                        >
                          {match.result === "win" ? "W" : "L"}
                        </WaTag>
                      </td>
                      <td>
                        {match.scoreFor}–{match.scoreAgainst}
                      </td>
                      <td>{diff > 0 ? `+${diff}` : String(diff)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <th scope="row">Total</th>
                  <td>
                    {weekRecord.wins}W {weekRecord.losses}L
                  </td>
                  <td>
                    {weekRecord.goalsFor}–{weekRecord.goalsAgainst}
                  </td>
                  <td>
                    {weekRecord.goalsFor - weekRecord.goalsAgainst > 0 ? "+" : ""}
                    {weekRecord.goalsFor - weekRecord.goalsAgainst}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">Every match</h2>
          <div className="wa-stack wa-gap-s">
            {matchLog.map((match) => (
              <WaCard key={match.match} className="pixel-card" appearance="outlined">
                <div className="wa-stack wa-gap-2xs">
                  <h3 className="pixel-card-title">
                    Match {match.match} · {match.result === "win" ? "W" : "L"} {match.scoreFor}-
                    {match.scoreAgainst} vs {match.opponent}
                  </h3>
                  <p>{match.summary}</p>
                  {match.match === 10 ? (
                    <ol className="wa-stack wa-gap-2xs goal-timeline">
                      {latestMatch.goalTimeline.map((goal) => (
                        <li key={goal.event}>{goal.event}</li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </WaCard>
            ))}
          </div>
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">What we learned</h2>
          {performanceDiagnosis.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">Proposed for Round 2</h2>
          {recommendations.map((rec) => (
            <WaCard key={rec.id} className="pixel-card" appearance="outlined">
              <div className="wa-stack wa-gap-2xs">
                <h3 className="pixel-card-title">{rec.field}</h3>
                <p>{rec.change}</p>
                <p className="wa-color-text-quiet">
                  <strong>Evidence:</strong> {rec.evidence}
                </p>
                <p className="wa-color-text-quiet">
                  <strong>Ranking impact:</strong> {rec.rankingImpact}
                </p>
                <div>
                  <WaTag variant="neutral" appearance="outlined" size="small">
                    {rec.status}
                  </WaTag>
                </div>
              </div>
            </WaCard>
          ))}
        </div>

        <div className="wa-stack wa-gap-s">
          <h2 className="pixel-display tech-heading">Practice plan</h2>
          <p className="wa-color-text-quiet">{practiceFocus}</p>
          <ul className="wa-stack wa-gap-xs goal-timeline">
            {drills.map((drill) => (
              <li key={drill.drill}>
                {drill.drill}
                <br />
                <span className="wa-color-text-quiet">{drill.rationale}</span>
              </li>
            ))}
          </ul>
        </div>

        <WaCallout variant="neutral">
          Part of the Week 1 debrief was cut off when it was pasted in, so a couple of proposed
          changes are missing here. Send the full file and I'll add them.
        </WaCallout>
      </section>
    </SiteShell>
  );
}
