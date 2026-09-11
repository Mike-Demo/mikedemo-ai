# Replace portfolio project content with real project details

## Goal

Replace the placeholder summaries and tech lists in the portfolio with details pulled from the seven actual Lovable projects. The lineup becomes exactly these seven projects (dropping Skill Builder Bot, MikeDemo.cv, and MikeDemo.work).

## What changes

### `src/data/projects.ts` (single file edit — all content lives here)

New lineup, with summaries and tech stacks verified from each project's source:

| Project | Live URL | Summary (from source) | Tech |
|---|---|---|---|
| On-Device AI | https://ai.mikedemo.dev | An AI model running inside the page — on-device inference with no server round-trips | TypeScript, React, WebLLM, WebGPU |
| AI Deployer | https://local.mikedemo.dev | Copy-and-paste install guides for self-hosted AI agents (OpenClaw, Ollama, n8n) — no live SSH, no accounts | TypeScript, React, TanStack Start, Tailwind CSS, Zod |
| Crosspost | https://tweet.app | Crossposting from tweet.app to X, automatically | TypeScript, React, TanStack Start, Supabase |
| Skill Finder Plus | https://skills.mikedemo.dev | A directory of agent skills for Claude, ChatGPT, Cursor, Copilot, Grok, MCP, and Perplexity | TypeScript, React, AI SDK, Supabase, hCaptcha |
| Font Awsome & Web Awesome | https://project--9fea97bb-e317-446f-b683-1274350846c6.lovable.app | The open-source design system ("Awesome DS") powering this very portfolio | TypeScript, React, Web Awesome, Font Awesome Free |
| PretendPro Office Suite | https://pretend.pro | A fake productivity suite — set up your fake workday | TypeScript, React, Tailwind CSS, shadcn/ui, Supabase |
| STA 2e D20 Roller — LCARS | https://2d20.space | A Star Trek Adventures 2d20 dice roller with an LCARS interface | TypeScript, React, Tailwind CSS |

Each entry gets: slug, icon (Font Awesome free: microchip, server, retweet, wand-magic-sparkles, swatchbook, user-tie, dice-d20), one-line summary, longer description for the detail page, domain label, tech tags, and URL.

### Detail pages and home grid

No code changes needed — both render from `src/data/projects.ts`. New slugs automatically produce detail routes (`/projects/crosspost`, `/projects/sta-2e-d20-roller`, etc.). Card grid and detail layout already handle seven items.

## Verification

- Build log clean (`build OK`).
- Browser check: home grid shows all seven cards with correct tags/links; spot-check two detail pages (e.g. Crosspost, STA roller); no console errors.

## Notes / assumptions

- Font Awsome & Web Awesome links to its Lovable URL per your answer (stable published URL; serves the published deployment once that project is published).
- "STA 2e D20 Roller — LCARS" lives at 2d20.space, found in its source metadata.
