import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import { NesContainer } from "@/design-system/nes-229931";

import { ProjectCabinet } from "@/components/ProjectCabinet";
import { ProjectPager } from "@/components/ProjectPager";
import { ProjectSummaryCard } from "@/components/ProjectSummaryCard";
import { SiteShell } from "@/components/SiteShell";
import { TechTagList } from "@/components/TechTagList";
import { findProject } from "@/data/projects";
import { fontAwesomeLinks } from "@/lib/head-assets";
import { listProjects } from "@/lib/projects.functions";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";

import {
  latestMatch,
  leaderboardUrl,
  matchLog,
  scheduleUrl,
  squadStack,
  weekId,
} from "@/data/bugle-crowns";

const description =
  "Bugle Crowns, my AI agent team in the AWS Agentic Football Cup: Week 1 record, match results, and lessons learned.";

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
                  the AWS Agentic Football Cup — here is how Week 1 went and what changes next.
                </p>
                <p className="quiet-small">
                  Run by AWSOfficial Alpha Season, supported by Minds from Animoca Brands
                </p>
              </div>
            }
          >
            <ProjectSummaryCard project={project} />

            <ProjectPager projects={projects} currentSlug="bugle-crowns" />



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
          <details className="nes-details" open><summary className="pixel-display">WEEK 1 · FULL DEBRIEF</summary>
            <div className="stack stack-l">
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

            </div>
          </ProjectCabinet>
        ) : null}
      </section>
    </SiteShell>
  );
}
