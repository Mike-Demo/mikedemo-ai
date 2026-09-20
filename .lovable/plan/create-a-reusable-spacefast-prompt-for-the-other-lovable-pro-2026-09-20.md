# Create a reusable Spacefast-prompt for the other Lovable projects

## Goal
Write a parameterized prompt that you can paste into each of the other projects
(On-Device AI, Awesome Adventure CV, Rainbow Jot, PretendPro Office Suite,
STA 2e D20 Roller, Pride Blobs) so the AI there generates a static-hosting build
spec matching the structure and tone of this repo's `SPACEFAST.md`.

## What will be produced
1. A single markdown prompt file (`docs/spacefast-prompt.md` in this project, and
   a copy in `/mnt/documents/mikedemo-spacefast-prompt.md` for easy sharing).
2. The prompt will ask the target project's AI to:
   - Inspect the repo and confirm it can be fully static (no login, per-user
     pages, webhooks, cron, or request-time server functions).
   - If static, generate a `SPACEFAST.md` tailored to that project's actual
     stack, routes, data source, and output directory.
   - Keep the same sections as this project's spec: build settings, what gets
     published, project/data strategy, staging vs production, and future-change
     notes.
   - Preserve the step-by-step, caveat-heavy tone of the current
     `SPACEFAST.md`.
3. Placeholders for project-specific values: project name, custom domain,
   Lovable preview URL, install/build/output commands, and route list.

## How it will be done
- Use the structure of the current `SPACEFAST.md` as the template.
- Generalize the TanStack-Start-specific instructions into conditional guidance
  ("If using TanStack Start...", "If using Next.js...", "If using plain Vite...").
- Include a short "static check" gate at the top, identical to the one used here.
- Add an explicit instruction not to touch GitHub, DNS, or publishing/login steps,
  matching your constraint.
- Keep the prompt under 200 lines so it is easy to paste.

## Deliverables
- `docs/spacefast-prompt.md`
- `/mnt/documents/mikedemo-spacefast-prompt.md`

## Out of scope
- Running the prompt on the other projects (you will do that).
- Changing the other projects' code from this project.
- Modifying this project's `SPACEFAST.md`.
