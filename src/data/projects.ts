/**
 * Portfolio content. Edit this single file to add or update projects.
 */
import aiDeployerLogo from "@/assets/project-icons/ai-deployer.svg";
import bugleCrownsLogo from "@/assets/project-icons/bugle-crowns.png";
import crosspostLogo from "@/assets/project-icons/crosspost.png";
import onDeviceAiLogo from "@/assets/project-icons/on-device-ai.svg";
import pretendProLogo from "@/assets/project-icons/pretendpro.png";
import prideBlobsLogo from "@/assets/project-icons/pride-blobs.png";
import skillFinderLogo from "@/assets/project-icons/skill-finder-plus.svg";
import staLogo from "@/assets/project-icons/sta-2e-d20-roller.jpg";

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly domain: string;
  readonly summary: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url: string;
  readonly icon: string;
  /** The project's own site icon, when it publishes one. */
  readonly logo?: string;
  /** ISO date the project was first built. */
  readonly started: string;
  /** Set when the project has a bespoke detail page instead of /projects/$slug. */
  readonly detailPath?: "/bugle-crowns";
}

export const projects: readonly Project[] = [
  {
    slug: "bugle-crowns",
    name: "Bugle Crowns",
    domain: "agenticfootballcup.com",
    summary: "My AI agent team in the AWS Agentic Football Cup — five agents, 120-second matches.",
    description:
      "Bugle Crowns is my team in the AWS Agentic Football Cup, where AI agents play 120-second football matches against each other. Each of the five positions runs its own agent with its own instructions, and every week's results feed back into the next round of tactical tuning.",
    tech: ["AI Agents", "AWS", "Prompt Engineering"],
    url: "https://agenticfootballcup.com",
    icon: "futbol",
    logo: bugleCrownsLogo,
    started: "2026-09-10",
    detailPath: "/bugle-crowns",
  },
  {
    slug: "on-device-ai",
    name: "On-Device AI",
    domain: "ai.mikedemo.dev",
    summary: "An AI model running inside the page — on-device inference with no server round-trips.",
    description:
      "On-Device AI runs a real language model entirely inside the browser. Inference happens on your own hardware via WebLLM and WebGPU — no server round-trips, and no data ever leaves your machine. It includes on-device inference demos, model comparisons, and diagnostics.",
    tech: ["TypeScript", "React", "WebLLM", "WebGPU"],
    url: "https://ai.mikedemo.dev",
    icon: "microchip",
    logo: onDeviceAiLogo,
    started: "2026-09-11",
  },
  {
    slug: "ai-deployer",
    name: "AI Deployer",
    domain: "local.mikedemo.dev",
    summary: "Copy-and-paste install guides for self-hosted AI agents — no live SSH, no accounts.",
    description:
      "AI Deployer generates personalized, copy-and-paste install guides for self-hosted AI agents like OpenClaw, Ollama, and n8n. Pick your stack, get a tailored VPS install guide — no live SSH sessions and no account required.",
    tech: ["TypeScript", "React", "TanStack Start", "Tailwind CSS", "Zod"],
    url: "https://local.mikedemo.dev",
    icon: "server",
    logo: aiDeployerLogo,
    started: "2026-09-09",
  },
  {
    slug: "crosspost",
    name: "Crosspost",
    domain: "tweet.mikedemo.dev",
    summary: "Crossposting from tweet.app to X, automatically.",
    description:
      "Crosspost keeps your posts in sync: write once on tweet.app and it republishes to X automatically. One composer, two timelines, zero copy-pasting.",
    tech: ["TypeScript", "React", "TanStack Start", "Supabase"],
    url: "https://tweet.mikedemo.dev",
    icon: "retweet",
    logo: crosspostLogo,
    started: "2026-09-06",
  },
  {
    slug: "skill-finder-plus",
    name: "Skill Finder Plus",
    domain: "skills.mikedemo.dev",
    summary: "A directory of agent skills for Claude, ChatGPT, Cursor, Copilot, Grok, MCP, and Perplexity.",
    description:
      "Skill Finder Plus is a browsable library of agent skills across every major AI platform — Claude, ChatGPT, Cursor, GitHub Copilot, Grok, MCP servers, and Perplexity. Find the right skill for your assistant of choice without digging through repos.",
    tech: ["TypeScript", "React", "AI SDK", "Supabase", "hCaptcha"],
    url: "https://skills.mikedemo.dev",
    icon: "wand-magic-sparkles",
    logo: skillFinderLogo,
    started: "2026-09-02",
  },
  {
    slug: "awesome-design-system",
    name: "Font Awsome & Web Awesome",
    domain: "Lovable",
    summary: "The open-source design system powering this very portfolio.",
    description:
      "Font Awsome & Web Awesome (\"Awesome DS\") is a complete design system built on Web Awesome components and Font Awesome Free icons — design tokens, themes, layout utilities, and patterns. This portfolio is built with it.",
    tech: ["TypeScript", "React", "Web Awesome", "Font Awesome Free"],
    url: "https://project--9fea97bb-e317-446f-b683-1274350846c6.lovable.app",
    icon: "swatchbook",
    started: "2026-09-03",
  },
  {
    slug: "pretendpro",
    name: "PretendPro Office Suite",
    domain: "pretend.pro",
    summary: "A fake productivity suite — set up your fake workday.",
    description:
      "PretendPro Office Suite is a parody productivity platform built purely for entertainment. Set up your fake workday with mock applications that simulate a convincingly busy environment — spreadsheets that type themselves, meetings that attend themselves, and more.",
    tech: ["TypeScript", "React", "Tailwind CSS", "shadcn/ui", "Supabase"],
    url: "https://pretend.pro",
    icon: "user-tie",
    logo: pretendProLogo,
    started: "2026-08-30",
  },
  {
    slug: "pride-blobs",
    name: "Pride Blobs",
    domain: "project--e4ae0ed4-df6b-4f52-9c92-49c8c2ad714d.lovable.app",
    summary: "Deterministic pride-flag blobatars from any name — same string, same avatar, every time.",
    description:
      "Pride Blobs (Pridatar) is a pride-focused fork of blobatar. Type any name and get a striped pride blobatar rendered as SVG. Fifteen flags, a live playground, and downloadable PNGs, all generated in the browser with no backend.",
    tech: ["TypeScript", "React", "SVG", "Canvas API"],
    url: "https://project--e4ae0ed4-df6b-4f52-9c92-49c8c2ad714d.lovable.app",
    icon: "palette",
    logo: prideBlobsLogo,
    started: "2026-08-24",
  },
  {
    slug: "sta-2e-d20-roller",
    name: "STA 2e D20 Roller — LCARS",
    domain: "2d20.space",
    summary: "A Star Trek Adventures 2d20 dice roller with an LCARS interface.",
    description:
      "STA 2e D20 Roller brings the Star Trek Adventures 2d20 system to the table with a full LCARS-styled interface — challenge dice, momentum, threat, and a dice guide, all wrapped in Starfleet's favorite operating system.",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    url: "https://2d20.space",
    icon: "dice-d20",
    logo: staLogo,
    started: "2026-02-23",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
