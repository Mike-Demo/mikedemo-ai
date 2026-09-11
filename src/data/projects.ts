/**
 * Portfolio content. Edit this single file to add or update projects.
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
    summary: "An AI model running inside the page — on-device inference with no server round-trips.",
    description:
      "On-Device AI runs a real language model entirely inside the browser. Inference happens on your own hardware via WebLLM and WebGPU — no server round-trips, and no data ever leaves your machine. It includes on-device inference demos, model comparisons, and diagnostics.",
    tech: ["TypeScript", "React", "WebLLM", "WebGPU"],
    url: "https://ai.mikedemo.dev",
    icon: "microchip",
  },
  {
    slug: "ai-deployer",
    name: "AI Deployer",
    domain: "LOCAL.mikedemo.dev",
    summary: "Copy-and-paste install guides for self-hosted AI agents — no live SSH, no accounts.",
    description:
      "AI Deployer generates personalized, copy-and-paste install guides for self-hosted AI agents like OpenClaw, Ollama, and n8n. Pick your stack, get a tailored VPS install guide — no live SSH sessions and no account required.",
    tech: ["TypeScript", "React", "TanStack Start", "Tailwind CSS", "Zod"],
    url: "https://local.mikedemo.dev",
    icon: "server",
  },
  {
    slug: "crosspost",
    name: "Crosspost",
    domain: "tweet.app",
    summary: "Crossposting from tweet.app to X, automatically.",
    description:
      "Crosspost keeps your posts in sync: write once on tweet.app and it republishes to X automatically. One composer, two timelines, zero copy-pasting.",
    tech: ["TypeScript", "React", "TanStack Start", "Supabase"],
    url: "https://tweet.app",
    icon: "retweet",
  },
  {
    slug: "skill-finder-plus",
    name: "Skill Finder Plus",
    domain: "SKILLS.mikedemo.dev",
    summary: "A directory of agent skills for Claude, ChatGPT, Cursor, Copilot, Grok, MCP, and Perplexity.",
    description:
      "Skill Finder Plus is a browsable library of agent skills across every major AI platform — Claude, ChatGPT, Cursor, GitHub Copilot, Grok, MCP servers, and Perplexity. Find the right skill for your assistant of choice without digging through repos.",
    tech: ["TypeScript", "React", "AI SDK", "Supabase", "hCaptcha"],
    url: "https://skills.mikedemo.dev",
    icon: "wand-magic-sparkles",
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
  },
  {
    slug: "pretendpro",
    name: "PretendPro Office Suite",
    domain: "Pretend.Pro",
    summary: "A fake productivity suite — set up your fake workday.",
    description:
      "PretendPro Office Suite is a parody productivity platform built purely for entertainment. Set up your fake workday with mock applications that simulate a convincingly busy environment — spreadsheets that type themselves, meetings that attend themselves, and more.",
    tech: ["TypeScript", "React", "Tailwind CSS", "shadcn/ui", "Supabase"],
    url: "https://pretend.pro",
    icon: "user-tie",
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
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
