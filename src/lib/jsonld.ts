/**
 * Schema.org JSON-LD builders. Each returns a string ready for a route head()
 * `scripts` entry: { type: "application/ld+json", children: <value> }.
 */
import type { Project } from "@/data/projects";

export const SITE_URL = "https://mikedemo.dev";
export const SITE_NAME = "MikeDemo";

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Mike Demopoulos",
  alternateName: SITE_NAME,
  description: "Mike 'Demo' Demopoulos (they/them) is a partnerships and alliances leader in cloud infrastructure, hosting, and SaaS, and the builder behind mikedemo.dev — a retro arcade-styled portfolio of AI experiments including on-device browser ML, AI deployment tooling, agent skills, and playful web toys.",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/mikedemopoulos",
    "https://x.com/mike_demo",
    "https://www.threads.com/@mdemop",
    "https://github.com/Mike-Demo",
    "https://bsky.app/profile/mikedemo.bsky.social",
  ],
};

/** Person + WebSite identity graph, emitted once from the root route. */
export function identityJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        author: { "@id": person["@id"] },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        founder: { "@id": person["@id"] },
        contactPoint: {
          "@type": "ContactPoint",
          email: "hey.demo@mikedemo.email",
          contactType: "general",
        },
        sameAs: person.sameAs,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is mikedemo.dev?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The personal AI project portfolio of Mike 'Demo' Demopoulos — a retro arcade-styled showcase of AI experiments including on-device browser ML, AI deployment tooling, agent skills, and playful web toys.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need an account or API key to use mikedemo.dev?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Everything on mikedemo.dev is public, read-only, and free. There is no login, no registration, and no API keys.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a machine-readable API?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Static JSON exports live under https://mikedemo.dev/api/v1/ (projects.json, projects/<slug>.json, site.json), documented by the OpenAPI spec at https://mikedemo.dev/openapi.json.",
            },
          },
          {
            "@type": "Question",
            name: "How much does mikedemo.dev cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nothing. It is a free personal portfolio; there are no paid plans or usage limits.",
            },
          },
        ],
      },
    ],
  });
}

export interface BreadcrumbItem {
  readonly name: string;
  /** Absolute URL. */
  readonly url: string;
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

function projectUrl(project: Project): string {
  return project.detailPath
    ? `${SITE_URL}${project.detailPath}`
    : `${SITE_URL}/projects/${project.slug}`;
}

/** One SoftwareApplication per portfolio project, built from the data file. */
export function projectJsonLd(project: Project): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: project.name,
    description: project.description,
    url: projectUrl(project),
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    dateCreated: project.started,
    keywords: project.tech.join(", "),
    author: { "@id": person["@id"] },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  });
}

/** CollectionPage + ItemList for the /projects Level Select index. */
export function projectCollectionJsonLd(projects: readonly Project[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} — AI Projects Level Select`,
    url: `${SITE_URL}/projects`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: projectUrl(project),
      })),
    },
  });
}
