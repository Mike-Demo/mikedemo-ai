import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer, NesTable, NesText } from "@/design-system/nes-229931";

import { ProjectIcon } from "@/components/ProjectIcon";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SeasonCalendar } from "@/components/SeasonCalendar";
import { SiteShell } from "@/components/SiteShell";
import { TechTagList } from "@/components/TechTagList";
import { TimelineArcade } from "@/components/TimelineArcade";
import { getProject } from "@/data/projects";
import { projectsNewestFirst } from "@/data/timeline";

import {
  drills,
  latestMatch,
  leaderboardUrl,
  matchLog,
  performanceDiagnosis,
  practiceFocus,
  
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
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Bugle Crowns — AWS Agentic Football Cup | MikeDemo" },
      { name: "description", content: description },
      { property: "og:title", content: "Bugle Crowns — AWS Agentic Football Cup" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://mikedemo.dev/bugle-crowns" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/bugle-crowns" }],
  }),
  component: BugleCrownsPage,
});

function Stat({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="stat-block">
      <span className="pixel-display stat-value">{value}</span>
      <span className="text-quiet stat-label">{label}</span>
    </div>
  );
}

function BugleCrownsPage(): ReactElement {
  const project = getProject("bugle-crowns");

  return (
    <SiteShell>
      <section className="hero-section">
        <nav aria-label="Breadcrumb">
          <Link to="/" className="site-nav-link">
            ← All projects
          </Link>
        </nav>

        {project ? (
          <span className="pixel-icon-badge pixel-icon-badge-large" aria-hidden="true">
            <ProjectIcon project={project} />
          </span>
        ) : null}
        <h1 className="pixel-display hero-title">Bugle Crowns</h1>
        <p className="pixel-display hero-eyebrow">AWS Agentic Football Cup · {weekId}</p>
        <p className="hero-subtitle">
          Five AI agents, 120-second matches, one very opinionated coach. Bugle Crowns is my team in
          the AWS Agentic Football Cup — here is how Week 1 went and what changes next.
        </p>
        <p className="quiet-small">
          Run by AWSOfficial Alpha Season, supported by Minds from Animoca Brands
        </p>
      </section>

      <section className="section stack stack-l">
        {project ? <ProjectSummaryCard project={project} /> : null}

        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Level Select</h2>
          <p className="text-quiet">
            Where this project sits in the timeline — pick another level to jump across.
          </p>
          <TimelineArcade
            projects={projectsNewestFirst}
            currentSlug="bugle-crowns"
            compact
          />
        </div>



        <div className="stack stack-xs">
          <h2 className="pixel-display tech-heading">Squad stack</h2>
          <TechTagList
            items={squadStack}
            appearance="outlined"
            size="small"
            label="Squad stack technologies"
          />
        </div>

        <div className="cluster cluster-m">
          <a className="nes-btn is-primary" href={scheduleUrl} target="_blank" rel="noopener noreferrer">CUP SCHEDULE</a>
          <a className="nes-btn" href={leaderboardUrl} target="_blank" rel="noopener noreferrer">LEADERBOARD</a>
        </div>

        <div className="stack stack-s">
          <h2 className="pixel-display tech-heading">Week 1 at a glance</h2>
          <div className="stat-grid">
            <Stat label="Record" value={`${weekRecord.wins}W ${weekRecord.losses}L`} />
            <Stat label="Goals for" value={String(weekRecord.goalsFor)} />
            <Stat label="Goals against" value={String(weekRecord.goalsAgainst)} />
            <Stat label="Clean sheets" value={String(weekRecord.cleanSheets)} />
            <Stat label="Points" value={String(weekRecord.points)} />
          </div>
          <p className="text-quiet">
            {weekRecord.played} of a possible {weekRecord.possible} matches played.
          </p>
        </div>

        <div className="stack stack-s">
          <details className="nes-details" open><summary className="pixel-display">WEEK 1 · FULL DEBRIEF</summary>
            <div className="stack stack-l">
              <h3 className="pixel-display tech-heading">Standings</h3>
              <div className="match-table-scroll">
                <NesTable className="match-table" bordered responsive>
                  <caption className="text-quiet">
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
                            <NesText variant={match.result === "win" ? "success" : "error"}>{match.result === "win" ? "W" : "L"}</NesText>
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
                </NesTable>
              </div>
              <h3 className="pixel-display tech-heading">Every match</h3>
              <div className="stack stack-s">
              {matchLog.map((match) => (
                <NesContainer key={match.match} className="match-card">
                  <div className="stack stack-xs">
                    <div className="cluster cluster-xs">
                      <h3 className="pixel-card-title">
                        Match {match.match} · {match.result === "win" ? "W" : "L"} {match.scoreFor}-
                        {match.scoreAgainst} vs {match.opponent}
                      </h3>
                      {match.possession ? (
                        <span className="status-chip">{match.possession}% possession</span>
                      ) : null}
                    </div>
                    {match.playedAt ? (
                      <p className="quiet-small">
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
                      <ol className="stack stack-xs goal-timeline">
                        {latestMatch.goalTimeline.map((goal) => (
                          <li key={goal.event}>{goal.event}</li>
                        ))}
                      </ol>
                    ) : null}
                  </div>
                </NesContainer>
              ))}
              </div>
              <h3 className="pixel-display tech-heading">What we learned</h3>
              <div className="stack stack-s">
                {performanceDiagnosis.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </details>

          <details className="nes-details"><summary className="pixel-display">PROPOSED FOR ROUND 2</summary>
            <div className="stack stack-s">
              {recommendations.map((rec) => (
                <NesContainer key={rec.id} className="recommendation-card">
                  <div className="stack stack-xs">
                    <h3 className="pixel-card-title">{rec.field}</h3>
                    <p>{rec.change}</p>
                    <p className="text-quiet">
                      <strong>Evidence:</strong> {rec.evidence}
                    </p>
                    <p className="text-quiet">
                      <strong>Ranking impact:</strong> {rec.rankingImpact}
                    </p>
                    <div>
                      <span className="status-chip">{rec.status}</span>
                    </div>
                  </div>
                </NesContainer>
              ))}
            </div>
          </details>

          <details className="nes-details"><summary className="pixel-display">PRACTICE PLAN</summary>
            <div className="stack stack-s">
              <p className="text-quiet">{practiceFocus}</p>
              <ul className="stack stack-xs goal-timeline">
                {drills.map((drill) => (
                  <li key={drill.drill}>
                    {drill.drill}
                    <br />
                    <span className="text-quiet">{drill.rationale}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>

        <div className="stack stack-s">
          <h2 className="pixel-display tech-heading">Season calendar</h2>
          <SeasonCalendar />
          <p className="text-quiet">
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
      </section>
    </SiteShell>
  );
}
