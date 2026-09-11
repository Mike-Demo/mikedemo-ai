/**
 * Maps a technology name to a Font Awesome Free icon.
 * Brand marks are used where a free brand icon exists; otherwise a
 * meaningful solid icon stands in so every tag reads consistently.
 */
export type TechIcon = {
  readonly name: string;
  readonly family?: "classic" | "brands";
};

const BRAND: Record<string, string> = {
  react: "react",
  "tanstack start": "react",
  aws: "aws",
  "aws agentic football cup": "aws",
  github: "github",
  "github copilot (prompting help)": "github",
  "github copilot": "github",
  microsoft: "microsoft",
  "microsoft copilot": "microsoft",
  "microsoft copilot cowork": "microsoft",
  "node.js": "node-js",
  npm: "npm",
  cloudflare: "cloudflare",
  x: "x-twitter",
  "font awesome free": "font-awesome",
  "font awesome": "font-awesome",
  "web awesome": "font-awesome",
  css: "css",
  html: "html5",
  javascript: "js",
  python: "python",
  figma: "figma",
  docker: "docker",
};

const SOLID: Record<string, string> = {
  typescript: "code",
  zod: "shield-halved",
  "tailwind css": "wind",
  "shadcn/ui": "shapes",
  lovable: "heart",
  supabase: "database",
  webgpu: "microchip",
  webllm: "brain",
  "webllm by mlc ai": "brain",
  "on-device ai": "microchip",
  "ai agents": "robot",
  "ai sdk": "plug",
  "prompt engineering": "wand-magic-sparkles",
  ollama: "server",
  openclaw: "terminal",
  n8n: "diagram-project",
  "canvas api": "paintbrush",
  svg: "bezier-curve",
  hcaptcha: "shield-halved",
  perplexity: "magnifying-glass",
  grokbot: "robot",
  "minds from animoca brands": "brain",
  "nova pro": "star",
  "nova micro": "star-half-stroke",
};

export function getTechIcon(tech: string): TechIcon {
  const key = tech.trim().toLowerCase();
  const brand = BRAND[key];
  if (brand) {
    return { name: brand, family: "brands" };
  }
  return { name: SOLID[key] ?? "cube" };
}
