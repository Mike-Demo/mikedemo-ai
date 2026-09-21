# Bugle Crowns page: Week 2 data + season charts

Add the Week 2 results and season standing from the AFC League API feed, and visualize both weeks with pixel-styled charts. Both weeks render in the same compact card format, newest first.

## What you'll see

- A **season standing** line near the top: 24th of 422 in League A, 458 points, 20 played, 12W–8L, 62 for / 44 against (+18), 4 clean sheets.
- A new **charts section** above the match lists, all in the retro pixel style:
  - **Results strip** — 20 matches in play order, each a win/loss block (green/red), with a divider between the weeks.
  - **Goals per week** — paired bars: 28 for / 23 against (Week 1), 34 for / 21 against (Week 2).
  - **Possession per match** — a bar per match showing our possession %, colored by win/loss.
- Two matching collapsible sections, **reverse chronological** — Week 2 first (open by default), then Week 1:
  - Each match is the same compact card: opponent, W/L score, kickoff time, shots/on-target for both sides, possession.
  - Week 1's existing cards gain shots/on-target (now available from the feed) so both weeks match; its longer narrative summaries stay on the cards, and the Match 10 goal timeline stays.
- A **footnote** noting the fastest logged goal (4.98s vs Chalk Hunters, wildcard ticket pending).
- The page intro, title metadata, and SportsTeam structured data updated to cover both weeks.

## Technical details

- `src/data/bugle-crowns.ts`: add shots/on-target to the match shape and the Week 1 entries (from the feed), the ten Week 2 entries with their stats, `week2Record`, and `seasonStanding`. Existing Week 1 narratives, goal timeline, and the rest stay untouched. Week 2 gets stats-only cards — the feed carries no command-level detail, so no invented summaries.
- New `src/components/BugleCharts.tsx`: hand-rolled bars/blocks styled with existing NES tokens (`--nes-success`, `--nes-error`, etc.) — no chart library (recharts was removed for payload size and stays out). Every chart gets an accessible text equivalent: visually-hidden tables or `role="img"` with full `aria-label` data.
- `src/routes/bugle-crowns.tsx`: render the standing, charts, and both week sections (Week 2 first, open; Week 1 collapsed), one shared match-card renderer for both weeks; update intro copy and meta description to "Weeks 1 and 2".
- Kickoff times are UTC from the feed; displayed in the same Chicago-local format as now.

## Verification

- `bun run typecheck` and the full build pass; `/bugle-crowns` still prerenders.
- Browser check at desktop and mobile: charts legible, Week 2 on top and open by default, both weeks use the same card layout, numbers match the feed (20 matches, 12W–8L, +18, 4 clean sheets).
