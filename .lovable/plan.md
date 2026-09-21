# Bugle Crowns page: Week 2 data + season charts

Add the Week 2 results and season standing from the AFC League API feed, and visualize both weeks with pixel-styled charts. Match-by-match detail stays available in collapsed sections.

## What you'll see

- A **season standing** line near the top: 24th of 422 in League A, 458 points, 20 played, 12W–8L, 62 for / 44 against (+18), 4 clean sheets.
- A new **charts section** above the match lists, all in the retro pixel style:
  - **Results strip** — 20 matches in order, each a win/loss block (green/red), week divider between match 10 and 11.
  - **Goals per week** — paired bars: 28 for / 23 against (Week 1), 34 for / 21 against (Week 2).
  - **Possession per match** — a bar per match showing our possession %, colored by win/loss.
- **Week 1 · full debrief** stays exactly as it is (open by default).
- **Week 2 · all matches** as a second collapsed section: one compact card per match with opponent, score, shots/on-target for both sides, and possession. No invented narratives — the feed only carries summary stats, so the cards show just those numbers.
- A **footnote** noting the fastest logged goal (4.98s vs Chalk Hunters, wildcard ticket pending).
- The page intro, title metadata, and SportsTeam structured data updated to cover both weeks.

## Technical details

- `src/data/bugle-crowns.ts`: add a `MatchStats` shape (shots/on-target/possession per side), the ten Week 2 entries, `week2Record`, and `seasonStanding`; keep all Week 1 content untouched.
- New `src/components/BugleCharts.tsx`: hand-rolled bars/blocks styled with existing NES tokens (`--nes-success`, `--nes-error`, etc.) — no chart library (recharts was removed for payload size and stays out). Every chart gets an accessible text equivalent: visually-hidden tables or `role="img"` with full `aria-label` data.
- `src/routes/bugle-crowns.tsx`: render the standing, charts, and the second collapsible; update the intro copy and meta description ("Weeks 1 and 2"); Week 1 section unchanged.
- Week 2 timestamps are UTC kickoffs from the feed; displayed in the same Chicago-local format as Week 1.

## Verification

- `bun run typecheck` and the full build pass; `/bugle-crowns` still prerenders.
- Browser check at desktop and mobile: charts render and are legible, both collapsible sections open correctly, numbers match the feed (20 matches, 12W–8L, +18).
