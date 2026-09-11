# Update Bugle Crowns Week 1 match log and page details

The user has supplied the actual order, scores, and possession figures for all 10 Week 1 matches from the AWS Agentic Football Cup Player Portal. The current `matchLog` in `src/data/bugle-crowns.ts` has several matches out of order and is missing per-match possession data. The user also wants the cup organizer credit and the AI-player stack surfaced on the page.

## What to change

1. Extend `MatchLogEntry` in `src/data/bugle-crowns.ts` with an optional `possession: number` field and an optional `playedAt: string` field for match timestamps.
2. Reorder and rewrite `matchLog` to match the user's supplied sequence:
   1. Bugle Flotillas — L 2–5, 36% possession
   2. Bugle Lancers — W 4–1, 51% possession
   3. Bugle Oars — L 1–2, 53% possession
   4. Bugle Owls — L 2–3, 56% possession
   5. Bugle Eagles — W 4–0, 42% possession
   6. Bugle Bastions — W 3–2, 51% possession
   7. Bugle Pioneers — W 4–3, 49% possession
   8. Copper Bandits — W 4–3, 51% possession
   9. Copper Canyons — W 3–2, 53% possession
   10. Bugle Hornets — L 1–2, 60% possession
3. Update the one-line `summary` for each match to include the possession figure and keep the narrative consistent with the existing voice.
4. Update `latestMatch` so the narrative still refers to Match 10 (Bugle Hornets) correctly.
5. Add a credit line on `src/routes/bugle-crowns.tsx` near the page subtitle/hero: "Run by AWSOfficial Alpha Season, supported by Minds from Animoca Brands."
6. Add a "Squad stack" or tech-stack section listing the AI services used for the players: Microsoft Copilot, Perplexity, Grok Minds, Nova Pro, Nova Micro, plus GitHub Copilot for prompting help.
7. If the standings table on `src/routes/bugle-crowns.tsx` derives rows from `matchLog`, no template changes are needed; the table will automatically reflect the new order.
8. Run typecheck and a quick browser preview of the Bugle Crowns page to confirm the corrected 10-match order, organizer credit, and squad stack appear correctly.
