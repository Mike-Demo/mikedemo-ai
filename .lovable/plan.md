# Add Bugle Crowns to the portfolio

Add your AWS Agentic Football Cup team, Bugle Crowns, as an eighth entry in the project lineup, with a dedicated page that shows the Week 1 results.

## What you'll see

- A new Bugle Crowns card in the lineup and on the timeline, using the pixel astronaut-helmet badge you uploaded.
- Its own page with:
  - A header with the team badge, a short summary, and a link to agenticfootballcup.com.
  - Week 1 record at a glance: 6 wins, 4 losses, 28 goals for, 23 against, 1 clean sheet, rank 8 (down 1).
  - The Match 10 result vs Bugle Hornets (1-2) with its goal timeline and awards.
  - A short "what we learned" write-up from the Week 1 analysis.
  - The proposed changes for Round 2 and the practice plan, each with the reasoning behind it.
- Everything keeps the existing pixel-funky look: hard-shadow cards, Press Start 2P headings, design-system tokens only.

## Data

The Week 1 debrief you pasted was cut off partway through the recommendations. I'll build with what came through and leave the remaining recommendation entries out until you send the full file — paste it or upload the JSON and I'll fill in the rest.

## Technical notes

- Store the debrief as a typed flat file at `src/data/bugle-crowns.ts` (record, match, recommendations, practice plan, rank movement), keeping content out of components.
- Add the team to `src/data/projects.ts` with `started: "2026-09-10"` (match window start) so it sorts to the top of the reverse-chronological timeline.
- Register the uploaded helmet badge as a Lovable asset and reference it via the existing `ProjectIcon` `logo` field.
- New route `src/routes/bugle-crowns.tsx` with its own `head()` metadata (title, description, og/twitter tags); the lineup card's "Details" link points there instead of `/projects/$slug`, so `ProjectCard` gets an optional `detailPath` on the project record.
- Build the page from existing Web Awesome components (`WaCard`, `WaTag`, `WaIcon`) and current token-based classes; add new CSS only for a stat-block grid.
- Verify with typecheck, build, and a browser pass on the new route and the home timeline.
