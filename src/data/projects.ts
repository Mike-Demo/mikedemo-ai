/**
 * Portfolio content. Edit this single file to add or update projects.
 * Summaries and tech stacks for projects without a matching Lovable
 * project are best-effort placeholders — adjust them here.
 */
export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly domain: string;
  readonly summary: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url: string;
  readonly icon: string;
}

export const projects: readonly Project[] = [
  {
    slug: "on-device-ai",
    name: "On-Device AI",
    domain: "AI.mikedemo.dev",
    summary: "An agent framework that runs lightweight machine learning models entirely in the browser.",
    description:
      "On-Device AI explores the feasibility of running AI workloads directly in the browser environment — no server round-trips, no data leaving the machine. It executes lightweight machine learning models on-device through a web-based agent framework.",
    tech: ["TypeScript", "React", "Browser ML", "Web APIs"],
    url: "https://ai.mikedemo.dev",
    icon: "microchip",
  },
  {
    slug: "ai-deployer",
    name: "AI Deployer",
    domain: "LOCAL.mikedemo.dev",
    summary: "Deploy AI agents and models onto your own VPS over SSH, with a streamlined install flow.",
    description:
      "AI Deployer streamlines getting AI agents and models onto personal VPS hosting. It provides a clean interface for installing and managing deployments over SSH, so self-hosting AI infrastructure stops being a weekend project.",
    tech: ["TypeScript", "React", "SSH", "VPS Hosting"],
    url: "https://local.mikedemo.dev",
    icon: "server",
  },
  {
    slug: "skill-builder",
    name: "Skill Builder Bot",
    domain: "SKILLS.mikedemo.dev",
    summary: "A guided, interactive assistant for creating custom agent skills.",
    description:
      "Skill Builder Bot walks users through creating custom skills with a guided, interactive process. It leverages AI tooling to take a skill from idea to working definition without hand-editing configuration files.",
    tech: ["TypeScript", "React", "AI Tooling", "Guided Flows"],
    url: "https://skills.mikedemo.dev",
    icon: "wand-magic-sparkles",
  },
  {
    slug: "mikedemo-cv",
    name: "MikeDemo.cv",
    domain: "MikeDemo.cv",
    summary: "My online CV — experience, projects, and skills in one link.",
    description:
      "MikeDemo.cv is my living resume on the web: experience, selected projects, and skills, always up to date and always one link away.",
    tech: ["TypeScript", "React", "Web Awesome"],
    url: "https://mikedemo.cv",
    icon: "id-card",
  },
  {
    slug: "mikedemo-work",
    name: "MikeDemo.work",
    domain: "MikeDemo.work",
    summary: "A showcase of professional work and selected engagements.",
    description:
      "MikeDemo.work is the professional companion to this portfolio — a home for client work, case studies, and selected engagements.",
    tech: ["TypeScript", "React", "Web Awesome"],
    url: "https://mikedemo.work",
    icon: "briefcase",
  },
  {
    slug: "pretendpro",
    name: "PretendPro Office Suite",
    domain: "Pretend.Pro",
    summary: "A playful parody productivity suite that simulates looking busy at work.",
    description:
      "PretendPro Office Suite is a parody productivity platform built purely for entertainment. Its collection of mock applications simulates a convincingly busy work environment — spreadsheets that type themselves, meetings that attend themselves, and more.",
    tech: ["TypeScript", "React", "Parody UX", "Mock Apps"],
    url: "https://pretend.pro",
    icon: "user-tie",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
