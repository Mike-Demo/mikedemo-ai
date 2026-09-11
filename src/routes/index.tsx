import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";

import {
  WaButton,
  WaIcon,
} from "@/design-system/font-awsome-web-awesome-171158";

import { CredentialsSection } from "@/components/CredentialsSection";
import { SiteShell } from "@/components/SiteShell";
import { TimelineArcade } from "@/components/TimelineArcade";
import headshotSrc from "@/assets/headshot.png";
import { projectsNewestFirst } from "@/data/timeline";


export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "MikeDemo — AI Project Portfolio" },
      {
        name: "description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:title", content: "MikeDemo — AI Project Portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio of MikeDemo's AI projects: on-device browser ML, AI deployment tooling, agent skill builders, and a parody office suite.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mikedemo.dev/" },
      { property: "og:image", content: "https://mikedemo.dev/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mikedemo.dev/og-cover.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://mikedemo.dev/" }],
  }),
  component: Index,
});

function ProjectCard({ project }: { project: Project }): ReactElement {
  return (
    <WaCard className="pixel-card" appearance="outlined">
      <div className="wa-stack wa-gap-s">
        <div className="wa-cluster wa-align-items-center wa-gap-s">
          <span className="pixel-icon-badge" aria-hidden="true">
            <ProjectIcon project={project} />
          </span>
          <h3 className="pixel-card-title">{project.name}</h3>
        </div>
        <p className="wa-color-text-quiet">{project.summary}</p>
        <TechTagList
          items={project.tech}
          size="small"
          label={`${project.name} tech stack`}
        />
        <ProjectCredits project={project} />
        <div className="wa-cluster wa-gap-s">
          {project.detailPath ? (
            <Link to={project.detailPath} className="site-nav-link">
              Details
            </Link>
          ) : (
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="site-nav-link"
            >
              Details
            </Link>
          )}
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="site-nav-link">
            <WaIcon name="arrow-up-right-from-square" aria-hidden="true" /> {project.domain}
          </a>
        </div>
      </div>
    </WaCard>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function CredentialCard({ credential }: { credential: Credential }): ReactElement {
  return (
    <>
      <h3 className="pixel-display credential-card-heading">{credential.title}</h3>
      <WaCard className="pixel-card credential-card" appearance="outlined">
        <div className="wa-stack wa-gap-s">
          <div className="wa-cluster wa-align-items-center wa-gap-s">
            <span className="pixel-icon-badge" aria-hidden="true">
              <WaIcon name={credential.icon} />
            </span>
            <span className="wa-color-text-quiet credential-issuer">{credential.issuer}</span>
          </div>
          <p className="wa-color-text-quiet">{credential.summary}</p>
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
    </>
  );
}

function TimelineCard({ item }: { item: TimelineItem }): ReactElement {
  return item.kind === "project" ? (
    <ProjectCard project={item} />
  ) : (
    <CredentialCard credential={item} />
  );
}

function timelineItemId(item: TimelineItem): string {
  return `timeline-${item.kind === "project" ? item.slug : item.id}`;
}

function timelineItemTitle(item: TimelineItem): string {
  return item.kind === "project" ? item.name : item.title;
}

function Index(): ReactElement {
  const itemsByDate = useMemo(
    () => [...timelineItems].sort((a, b) => a.started.localeCompare(b.started)),
    []
  );
  const ids = useMemo(() => itemsByDate.map(timelineItemId), [itemsByDate]);
  const activeId = useActiveTimelineItem(ids);

  function handleMarkerKeyDown(
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number
  ): void {
    const offsets: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };

    let nextIndex: number | null = null;
    if (event.key in offsets) {
      nextIndex = index + (offsets[event.key] ?? 0);
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = ids.length - 1;
    }

    if (nextIndex === null || nextIndex < 0 || nextIndex >= ids.length) {
      return;
    }

    event.preventDefault();
    const nextId = ids[nextIndex];
    if (!nextId) {
      return;
    }
    document.querySelector<HTMLAnchorElement>(`a[href="#${nextId}"]`)?.focus();
    scrollToTimelineItem(nextId);
  }

  return (
    <SiteShell>
      <section className="hero-section wa-stack wa-gap-m wa-align-items-center">
        <img
          src={headshotSrc}
          alt="MikeDemo"
          className="hero-headshot"
          width="160"
          height="160"
        />
        <p className="pixel-display hero-eyebrow">PRESS START</p>
        <h1 className="pixel-display hero-title">AI Projects by MikeDemo</h1>
        <p className="hero-subtitle">
          A collection of experiments in on-device machine learning, AI deployment, agent tooling,
          and one extremely productive-looking parody office suite.
        </p>
        <p className="pixel-display hero-quote">“Tools are tools, just don’t be one”</p>
        <WaButton variant="brand" size="large" href="#projects">
          <WaIcon slot="start" name="rocket" aria-hidden="true" />
          See the timeline
        </WaButton>
      </section>

      <section id="projects" className="section wa-stack wa-gap-l" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="pixel-display section-title">
          The Lineup
        </h2>
        <ol className="timeline-alternating" aria-label="Project and credential timeline, oldest to newest">
          {itemsByDate.map((item, index) => {
            const id = timelineItemId(item);
            const title = timelineItemTitle(item);
            const isActive = activeId === id;

            return (
              <li
                key={id}
                id={id}
                className="timeline-alternating-item"
                data-active={isActive ? "true" : undefined}
              >
                <div className="timeline-center">
                  <a
                    className="timeline-marker"
                    href={`#${id}`}
                    aria-label={`Jump to ${title}`}
                    aria-current={isActive ? "true" : undefined}
                    onKeyDown={(event) => handleMarkerKeyDown(event, index)}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToTimelineItem(id);
                    }}
                  >
                    <span className="pixel-display timeline-number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="pixel-display timeline-marker-title" aria-hidden="true">
                      {title}
                    </span>
                  </a>
                  <time className="pixel-display timeline-date" dateTime={item.started}>
                    {"period" in item ? item.period : formatDate(item.started)}
                  </time>
                </div>
                <TimelineCard item={item} />
              </li>
            );
          })}
        </ol>
      </section>
    </SiteShell>
  );
}
