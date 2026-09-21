import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { BugleCharts } from "@/components/BugleCharts";
import { ProjectCabinet } from "@/components/ProjectCabinet";
import { ProjectPager } from "@/components/ProjectPager";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SiteShell } from "@/components/SiteShell";
import { TechTagList } from "@/components/TechTagList";
import type { MatchLogEntry } from "@/data/bugle-crowns";
import { findProject } from "@/data/projects";
import { fontAwesomeLinks } from "@/lib/head-assets";
import { listProjects } from "@/lib/projects.functions";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

import {
  fastestGoal,
  latestMatch,
  leaderboardUrl,
  matchLog,
  matchLogWeek2,
  scheduleUrl,
  seasonStanding,
  squadStack,
  week2Record,
  weekId,
  weekRecord,
} from "@/data/bugle-crowns";

const description =
  "Bugle Crowns, my AI agent team in the AWS Agentic Football Cup: season standing, charts, and match recaps for Weeks 1 and 2.";

/** One compact match card, shared by both weeks. */
function MatchCard({ match, weekLabel }: { readonly match: MatchLogEntry; readonly weekLabel: string }): ReactElement {
  return (
    <NesContainer className="match-card">
      <div className="stack stack-xs">
        <div className="cluster cluster-xs">
          <h3 className="pixel-card-title">
            Match {match.match} · {match.result === "win" ? "W" : "L"} {match.scoreFor}-
            {match.scoreAgainst} vs {match.opponent}
          </h3>
          {match.possession !== undefined ? (
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
        {match.shots ? (
          <p className="quiet-small">
            Shots {match.shots.for}–{match.shots.against} · On target {match.shots.forOnTarget}–
            {match.shots.againstOnTarget}
          </p>
        ) : null}
        {match.summary ? <p>{match.summary}</p> : null}
        {weekLabel === "Week 1" && match.match === 10 ? (
          <ol className="stack stack-xs goal-timeline">
            {latestMatch.goalTimeline.map((goal) => (
              <li key={goal.event}>{goal.event}</li>
            ))}
          </ol>
        ) : null}
      </div>
    </NesContainer>
  );
}

export const Route = createFileRoute("/bugle-crowns")({
  staticData: { sitemap: true },
  loader: () => listProjects(),
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
    links: [
      { rel: "canonical", href: "https://mikedemo.dev/bugle-crowns" },
      ...fontAwesomeLinks,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsTeam",
          name: "Bugle Crowns",
          url: `${SITE_URL}/bugle-crowns`,
          description,
          sport: "Soccer",
          memberOf: {
            "@type": "SportsOrganization",
            name: "AWS Agentic Football Cup",
            url: "https://agenticfootballcup.com",
          },
          coach: { "@id": `${SITE_URL}/#person` },
        }),
      },
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Projects", url: `${SITE_URL}/projects` },
          { name: "Bugle Crowns", url: `${SITE_URL}/bugle-crowns` },
        ]),
      },
    ],
  }),
  component: BugleCrownsPage,
});

function BugleCrownsPage(): ReactElement {
  const projects = Route.useLoaderData();
  const project = findProject(projects, "bugle-crowns");

  return (
    <SiteShell>
      <section className="project-stage">
        {project ? (
          <ProjectCabinet
            project={project}
            eyebrow={`AWS Agentic Football Cup · ${weekId}`}
            subtitle={
              <div className="stack stack-xs">
                <p>
                  Five AI agents, 120-second matches, one very opinionated coach. Bugle Crowns is my team in
                  the AWS Agentic Football Cup — here is how Weeks 1 and 2 went.
                </p>
                <p className="quiet-small">
                  Run by AWSOfficial Alpha Season, supported by Minds from Animoca Brands
                </p>
              </div>
            }
          >
            <ProjectSummaryCard project={project} />

            <ProjectPager projects={projects} currentSlug="bugle-crowns" />

            <NesContainer title="SEASON STANDING" dark>
              <p>
                {seasonStanding.rank}th of {seasonStanding.of} in {seasonStanding.league} ·{" "}
                {seasonStanding.points} points · {seasonStanding.played} played · {seasonStanding.wins}W–
                {seasonStanding.losses}L · {seasonStanding.goalsFor} for / {seasonStanding.goalsAgainst}{" "}
                against (+{seasonStanding.goalDifference}) · {seasonStanding.cleanSheets} clean sheets
              </p>
            </NesContainer>

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

            <NesContainer title="SEASON CHARTS">
              <BugleCharts
                week1={matchLog}
                week2={matchLogWeek2}
                week1Record={weekRecord}
                week2Record={week2Record}
              />
            </NesContainer>

            <div className="stack stack-s">
          <details className="nes-details" open><summary className="pixel-display">WEEK 2 · ALL MATCHES</summary>
            <div className="stack stack-l">
              <h3 className="pixel-display tech-heading">Every match · 6W–4L, 34–21</h3>
              <div className="stack stack-s">
              {matchLogWeek2.map((match) => (
                <MatchCard key={match.match} match={match} weekLabel="Week 2" />
              ))}
              </div>
              <p className="quiet-small">{fastestGoal}</p>
            </div>
          </details>

          <details className="nes-details"><summary className="pixel-display">WEEK 1 · FULL DEBRIEF</summary>
            <div className="stack stack-l">
              <h3 className="pixel-display tech-heading">Every match · 6W–4L, 28–23</h3>
              <div className="stack stack-s">
              {matchLog.map((match) => (
                <MatchCard key={match.match} match={match} weekLabel="Week 1" />
              ))}
              </div>
            </div>
          </details>

            </div>
          </ProjectCabinet>
        ) : null}
      </section>
    </SiteShell>
  );
}
