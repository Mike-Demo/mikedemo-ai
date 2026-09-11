import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaAccordion,
  WaAccordionItem,
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
  leaderboardUrl,
  matchLog,
  performanceDiagnosis,
  practiceFocus,
  rankMovement,
  recommendations,
  scheduleUrl,
  seasonSchedule,
  squadStack,
  weekId,
  weekRecord,
} from "@/data/bugle-crowns";

const description =
  "Bugle Crowns, my AI agent team in the AWS Agentic Football Cup: Week 1 record, match results, season schedule, and the tactical changes proposed for Round 2.";

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
            <span className="wa-color-text-quiet" style={{ fontSize: "var(--wa-font-size-s)" }}>
              Run by AWSOfficial Alpha Season, supported by Minds from Animoca Brands
            </span>
          </div>
        </div>

        <p className="project-lede">
          Five AI agents, 120-second matches, one very opinionated coach. Bugle Crowns is my team in
          the AWS Agentic Football Cup — here is how Week 1 went and what changes next.
        </p>

        <div className="wa-stack wa-gap-2xs">
          <h2 className="pixel-display tech-heading">Squad stack</h2>
          <ul className="wa-cluster wa-gap-xs">
            {squadStack.map((item) => (
              <li key={item}>
                <WaTag variant="brand" appearance="outlined" size="small">
                  {item}
                </WaTag>
              </li>
            ))}
          </ul>
        </div>

        <div className="wa-cluster wa-gap-m">
          <WaButton
            variant="brand"
            size="large"
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon slot="start" name="calendar-days" aria-hidden="true" />
            Cup schedule
          </WaButton>
          <WaButton
            variant="neutral"
            appearance="outlined"
            size="large"
            href={leaderboardUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WaIcon slot="start" name="ranking-star" aria-hidden="true" />
            Leaderboard
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

        <WaAccordion className="wa-stack wa-gap-s">
          <WaAccordionItem label="Upcoming schedule">
            <div className="wa-stack wa-gap-s schedule-list">
              {seasonSchedule.map((entry) => (
                <div key={entry.label} className="wa-cluster wa-gap-m schedule-row">
                  <WaTag
                    variant={
                      entry.status === "done"
                        ? "success"
                        : entry.status === "milestone"
                          ? "warning"
                          : "brand"
                    }
                    appearance="filled"
                    size="small"
                  >
                    {entry.dates}
                  </WaTag>
                  <div className="wa-stack wa-gap-3xs">
                    <strong>
                      {entry.label}
                      {entry.status === "done" ? " (played)" : ""}
                    </strong>
                    <span className="wa-color-text-quiet">{entry.detail}</span>
                  </div>
                </div>
              ))}
              <p className="wa-color-text-quiet">
                Times per{" "}
                <a href={scheduleUrl} target="_blank" rel="noopener noreferrer">
                  agenticfootballcup.ai/schedule
                </a>
                . League A standings on the{" "}
                <a href={leaderboardUrl} target="_blank" rel="noopener noreferrer">
                  live leaderboard
                </a>
                .
              </p>
            </div>
          </WaAccordionItem>

          <WaAccordionItem label="Week 1 · Standings">
            <div className="wa-stack wa-gap-s">
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
                      <th scope="col">Poss.</th>
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
                          <td>{match.possession ? `${match.possession}%` : "—"}</td>
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
                      <td>—</td>
                      <td>
                        {weekRecord.goalsFor - weekRecord.goalsAgainst > 0 ? "+" : ""}
                        {weekRecord.goalsFor - weekRecord.goalsAgainst}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </WaAccordionItem>

          <WaAccordionItem label="Week 1 · Every match">
            <div className="wa-stack wa-gap-s">
              {matchLog.map((match) => (
                <WaCard key={match.match} className="pixel-card" appearance="outlined">
                  <div className="wa-stack wa-gap-2xs">
                    <div className="wa-cluster wa-gap-xs wa-align-items-center">
                      <h3 className="pixel-card-title">
                        Match {match.match} · {match.result === "win" ? "W" : "L"} {match.scoreFor}-
                        {match.scoreAgainst} vs {match.opponent}
                      </h3>
                      {match.possession ? (
                        <WaTag variant="neutral" appearance="outlined" size="small">
                          {match.possession}% possession
                        </WaTag>
                      ) : null}
                    </div>
                    {match.playedAt ? (
                      <p className="wa-color-text-quiet" style={{ fontSize: "var(--wa-font-size-s)" }}>
                        <time dateTime={match.playedAt}>
                          {new Date(match.playedAt).toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: "America/Chicago",
                            timeZoneName: "short",
                          })}
                        </time>
                      </p>
                    ) : null}
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
          </WaAccordionItem>

          <WaAccordionItem label="Week 1 · What we learned">
            <div className="wa-stack wa-gap-s">
              {performanceDiagnosis.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </WaAccordionItem>

          <WaAccordionItem label="Proposed for Round 2">
            <div className="wa-stack wa-gap-s">
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
          </WaAccordionItem>

          <WaAccordionItem label="Practice plan">
            <div className="wa-stack wa-gap-s">
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
          </WaAccordionItem>
        </WaAccordion>

      </section>
    </SiteShell>
  );
}
