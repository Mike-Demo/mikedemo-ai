/**
 * Bugle Crowns — AWS Agentic Football Cup, Round 1 Week 1 debrief.
 * Flat-file content derived from the week's steward debrief JSON.
 */

export interface GoalEvent {
  readonly minute: number;
  readonly event: string;
}

export interface MatchResult {
  readonly opponent: string;
  readonly result: "win" | "loss" | "draw";
  readonly scoreFor: number;
  readonly scoreAgainst: number;
  readonly goalTimeline: readonly GoalEvent[];
  readonly awards: readonly string[];
}

export interface Recommendation {
  readonly id: string;
  readonly field: string;
  readonly change: string;
  readonly evidence: string;
  readonly rankingImpact: string;
  readonly status: string;
}

export interface Drill {
  readonly drill: string;
  readonly rationale: string;
}

export interface WeekRecord {
  readonly wins: number;
  readonly losses: number;
  readonly goalsFor: number;
  readonly goalsAgainst: number;
  readonly cleanSheets: number;
  readonly played: number;
  readonly possible: number;
}

export const weekId = "Round 1 · Week 1";

export const matchWindow = {
  startsAtUtc: "2026-09-10T16:00:00Z",
  endsAtUtc: "2026-09-13T15:59:59Z",
} as const;

export const weekRecord: WeekRecord = {
  wins: 6,
  losses: 4,
  goalsFor: 28,
  goalsAgainst: 23,
  cleanSheets: 1,
  played: 10,
  possible: 70,
};

export const rankMovement = {
  before: 7,
  after: 8,
  delta: -1,
  points: 221,
  note: "Rank moved 7 to 8 after the Match 10 loss. Goal difference +5. With only 10 of a possible 70 matches played, rank is based on total matches played — the best-27-of-70 rule protects the trajectory. 6 wins from the first 10 keeps Round 2 climbable.",
} as const;

export const latestMatch: MatchResult = {
  opponent: "Bugle Hornets",
  result: "loss",
  scoreFor: 1,
  scoreAgainst: 2,
  goalTimeline: [
    {
      minute: 0,
      event: "Hornets FWD goal at 20s — early chaos, minimal Crowns press engagement",
    },
    {
      minute: 1,
      event: "Hornets FWD goal at 103s — runners not tracked (our FOLLOW_PLAYER 62 ineffective)",
    },
    {
      minute: 1,
      event: "Crowns MID goal at 106s — too late in a 120-second match",
    },
  ],
  awards: [
    "MVP: MID Agent (us)",
    "Fastest: MID Agent 190ms (us)",
    "Most Tactical: Sara GK 81 commands (us)",
  ],
};

export const performanceDiagnosis: readonly string[] = [
  "Match 10: L 1-2 vs Bugle Hornets — our first league loss to a non-pressing opponent in 10 matches, played with zero audibles on pure v2.4.1.",
  "The Hornets ran a FOLLOW_PLAYER-heavy organized shape (129 commands, 32% of their 405 — the highest opponent tracking volume we have faced) plus 15 INTERCEPT, and zero PRESS_BALL. Under that shape our build-up collapsed into movement: 251 MOVE_TO (62%), our highest since the M1 Flotillas collapse.",
  "60% possession produced only 3 shots and 1 on target — the sterile-possession signature from M3. Our own defense went passive: 2 MARK, 0 INTERCEPT.",
  "Defensively it was still our best loss shape (2 conceded vs 3 in M6–M8), and Sara took Most Tactical for the 4th straight match, though GK latency crept to 981ms from 812ms.",
  "Pattern refined over 10 matches: all 6 wins came against weak-press opponents and all 4 losses against organized shapes. New finding — opponent FOLLOW_PLAYER volume is the second variable. Opponents tracking our runners at high volume (Hornets 32%, Owls 19%) shut passing lanes and force the MOVE collapse even without pressing.",
];

export const recommendations: readonly Recommendation[] = [
  {
    id: "P26-set-stance-deferred",
    field: "SET_STANCE thresholds (deferred scope)",
    change:
      "Hold SET_STANCE one more round. Opponent FOLLOW_PLAYER volume explains the collapse better than our own MOVE thresholds, and the INTERCEPT initiative may close the gap without new stance logic. Revisit after Round 2 data.",
    evidence:
      "The M10 collapse (62% MOVE) happened against an opponent with zero pressing — SET_STANCE thresholds built on opponent MARK and our MOVE thresholds do not address the tracking-shape variable.",
    rankingImpact:
      "Neutral — deferral avoids cutting an untested structural change and keeps one-change-at-a-time discipline.",
    status: "proposed",
  },
  {
    id: "follow-player-formalization-decision",
    field: "FOLLOW_PLAYER posture (all 5 positions)",
    change:
      "Decision item: formalize FOLLOW_PLAYER as an explicit instruction, or leave it emergent. Coach recommendation is to leave it alone.",
    evidence:
      "Trajectory M6–M10: 86, 54, 180, 109, 62. Zero audibles in M8–M10 confirms a prompt-evolved origin; it appeared during the 4-match win streak and normalized without intervention.",
    rankingImpact: "No change proposed — documentation only, zero rank risk.",
    status: "proposed",
  },
];

export const practiceFocus =
  "Organized-shape counter: testing the INTERCEPT initiative before Round 2";

export const drills: readonly Drill[] = [
  {
    drill:
      "Run 2-3 practice matches vs the benchmark with the P27 INTERCEPT patch applied to DEF + MID, zero touchline audibles",
    rationale:
      "Validates the patch fires without human input — the same test protocol that cleared P21",
  },
  {
    drill:
      "In Round 2 real matches, note each opponent's FOLLOW_PLAYER volume — if an opponent exceeds ~25% tracking, expect the MOVE collapse and do not panic-patch mid-match",
    rationale: "Tracking-shape threshold finding from M4 (Owls 19%) and M10 (Hornets 32%)",
  },
];
