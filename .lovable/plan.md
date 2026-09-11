# MikeDemo AI Project Portfolio

A flat-file portfolio site showcasing six AI projects, built with the attached Web Awesome design system, in a "pixel-funky geek" style that stays accessible (real contrast, real headings, keyboard-friendly, no emojis).

## What you'll get

- **Home page (/)** — hero with pixel-styled headline, a grid of six project cards (name, one-line summary, tech-stack tags, link), and the standard site footer with your LinkedIn, X, tweet.app, and Threads links from the design system.
- **One page per project** — /projects/on-device-ai, /projects/ai-deployer, /projects/skill-builder, /projects/mikedemo-cv, /projects/mikedemo-work, /projects/pretendpro. Each shows the project name, summary, tech-stack tags, and a live link button.
- **Shared layout** — `wa-page` shell with header nav (Home + project links), `<main>`, and the `SiteFooter` pattern from the design system (social links included automatically).
- **Pixel-funky styling** — chunky pixel-style display font (loaded via `<link>`), `wa-grid`/`wa-stack` layouts, `--wa-*` tokens only for colors/spacing, crisp "hard shadow" card treatment built on tokens, subtle hover animations. Light and dark mode safe via Web Awesome theming.
- **SEO** — each route gets its own title, description, og tags; semantic HTML with a single H1 per page.

## Content (pulled from your Lovable projects)

| Page | Project | Summary | Live link |
|---|---|---|---|
| /projects/on-device-ai | On-Device AI (AI.mikedemo.dev) | Browser-based agent framework running lightweight ML models on-device | https://ai.mikedemo.dev |
| /projects/ai-deployer | AI Deployer (LOCAL.mikedemo.dev) | Deploy AI agents/models to your own VPS over SSH | https://local.mikedemo.dev |
| /projects/skill-builder | Skill Builder Bot (SKILLS.mikedemo.dev) | Guided, interactive builder for custom agent skills | https://skills.mikedemo.dev |
| /projects/mikedemo-cv | MikeDemo.cv | Online CV / resume site | https://mikedemo.cv |
| /projects/mikedemo-work | MikeDemo.work | Work/professional showcase site | https://mikedemo.work |
| /projects/pretendpro | PretendPro Office Suite (Pretend.Pro) | Parody productivity suite simulating a busy office | https://pretend.pro |

Assumptions I made (correct me if any are off): LOCAL.mikedemo.dev maps to your **AI Deployer** project, SKILLS.mikedemo.dev to **Skill Builder Bot**. MikeDemo.cv and MikeDemo.work didn't match a Lovable project by name, so I wrote placeholder summaries you can edit in one data file.

## Technical details

- **Data-driven content**: a single `src/data/projects.ts` file holds all six projects (name, slug, summary, tech stack, URL). Adding/editing a project later = editing one file.
- **Routes**: rewrite `src/routes/index.tsx`; add `src/routes/projects.$slug.tsx` (one dynamic detail page instead of six files); each with `head()` metadata. Nav links use `<Link>`.
- **Design system**: use `WebAwesomeLoader`, `WaPage`, `WaCard`, `WaTag`, `WaButton`, `WaIcon`, and the `SiteFooter` pattern from `@/design-system/font-awsome-web-awesome-171158`; theme classes on `<html>`; no hardcoded colors — `--wa-*` tokens only.
- **Fonts**: pixel display font + readable body font via `<link>` in `__root.tsx` head (not CSS `@import`).
- **Verification**: build check plus a quick browser pass on desktop + mobile widths to confirm contrast, nav, and footer.
