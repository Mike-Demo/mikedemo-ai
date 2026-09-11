/**
 * Bugle Crowns — AWS Agentic Football Cup, Round 1 Week 1 debrief.
 * Flat-file content derived from the week's steward debrief JSON and the
 * Player Portal match reports.
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

export interface MatchLogEntry {
  readonly match: number;
  readonly opponent: string;
  readonly result: "win" | "loss" | "draw";
  readonly scoreFor: number;
  readonly scoreAgainst: number;
  readonly possession?: number;
  readonly playedAt?: string;
  readonly summary: string;
}

/** All ten Round 1 Week 1 matches, in the order they were played. */
export const matchLog: readonly MatchLogEntry[] = [
  {
    match: 1,
    opponent: "Bugle Flotillas",
    result: "loss",
    scoreFor: 2,
    scoreAgainst: 5,
    possession: 36,
    playedAt: "2026-09-11T09:08:00-05:00",
    summary:
      "Flotillas controlled 64% possession and 147 MARK commands while our 333 MOVE_TO instructions left coverage gaps; three goals in minute 2 settled it.",
  },
  {
    match: 2,
    opponent: "Bugle Lancers",
    result: "win",
    scoreFor: 4,
    scoreAgainst: 1,
    possession: 51,
    playedAt: "2026-09-11T09:47:00-05:00",
    summary:
      "Two goals inside the opening minute and sustained pressing overwhelmed a movement-heavy Lancers setup. Sara opened the scoring from goal.",
  },
  {
    match: 3,
    opponent: "Bugle Oars",
    result: "loss",
    scoreFor: 1,
    scoreAgainst: 2,
    possession: 53,
    playedAt: "2026-09-11T10:21:00-05:00",
    summary:
      "We dominated territory but not the final third. Oars' direct play exploited our heavy PRESS_BALL reliance and won it with 42 SHOOT commands.",
  },
  {
    match: 4,
    opponent: "Bugle Owls",
    result: "loss",
    scoreFor: 2,
    scoreAgainst: 3,
    possession: 56,
    playedAt: "2026-09-11T10:56:00-05:00",
    summary:
      "56% possession, but Owls' FOLLOW_PLAYER tracking (90 commands) cut passing lanes and their sharper shooting punished 233 MOVE_TO versus 45 SHOOT.",
  },
  {
    match: 5,
    opponent: "Bugle Eagles",
    result: "win",
    scoreFor: 4,
    scoreAgainst: 0,
    possession: 42,
    playedAt: "2026-09-11T11:32:00-05:00",
    summary:
      "The week's only clean sheet. 162 PRESS_BALL commands strangled Eagles' buildup and four rapid goals arrived despite a possession deficit.",
  },
  {
    match: 6,
    opponent: "Bugle Bastions",
    result: "win",
    scoreFor: 3,
    scoreAgainst: 2,
    possession: 51,
    playedAt: "2026-09-11T12:07:00-05:00",
    summary:
      "A frenetic three minutes of traded goals; midfield incisiveness and on-target accuracy beat the Bastions' higher shot volume.",
  },
  {
    match: 7,
    opponent: "Bugle Pioneers",
    result: "win",
    scoreFor: 4,
    scoreAgainst: 3,
    possession: 49,
    playedAt: "2026-09-11T12:54:00-05:00",
    summary:
      "A goal-heavy shootout settled by shot accuracy — 4 of 5 on target against 3 of 4 — with possession almost dead level.",
  },
  {
    match: 8,
    opponent: "Copper Bandits",
    result: "win",
    scoreFor: 4,
    scoreAgainst: 3,
    possession: 51,
    playedAt: "2026-09-11T14:10:00-05:00",
    summary:
      "Another frenetic trade of goals; forward play stayed clinical while the Bandits kept pace until the closing exchanges.",
  },
  {
    match: 9,
    opponent: "Copper Canyons",
    result: "win",
    scoreFor: 3,
    scoreAgainst: 2,
    possession: 53,
    playedAt: "2026-09-11T18:59:00-05:00",
    summary:
      "A fast-paced opener where both sides scored twice early; our finishing edge decided a tight finish despite sterile spells of possession.",
  },
  {
    match: 10,
    opponent: "Bugle Hornets",
    result: "loss",
    scoreFor: 1,
    scoreAgainst: 2,
    possession: 60,
    playedAt: "2026-09-11T20:41:00-05:00",
    summary:
      "Played on pure v2.4.1 with zero audibles. The Hornets' 129 FOLLOW_PLAYER commands collapsed our buildup into 251 MOVE_TO and 60% possession produced one shot on target.",
  },
];

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

export interface ScheduleEntry {
  readonly label: string;
  readonly dates: string;
  readonly detail: string;
  readonly status: "done" | "upcoming" | "milestone";
}

/**
 * Season calendar from https://agenticfootballcup.ai/schedule (Alpha Season,
 * 11 Sep – 25 Oct 2026). Each competition week opens Thursday and closes
 * Saturday night; the finale is live in Las Vegas.
 */
export const seasonSchedule: readonly ScheduleEntry[] = [
  {
    label: "Week 1",
    dates: "Sep 10 – 12",
    detail: "Practice + matches. Finished: 6W 4L, 28–23 goals, rank #8.",
    status: "done",
  },
  {
    label: "Week 2",
    dates: "Sep 17 – 19",
    detail: "Opens Sep 17. First test of the INTERCEPT patch against organized shapes.",
    status: "upcoming",
  },
  {
    label: "Week 3",
    dates: "Sep 24 – 26",
    detail: "Practice + matches window.",
    status: "upcoming",
  },
  {
    label: "Week 4",
    dates: "Oct 1 – 3",
    detail: "Practice + matches window.",
    status: "upcoming",
  },
  {
    label: "Week 5",
    dates: "Oct 8 – 10",
    detail: "Practice + matches window.",
    status: "upcoming",
  },
  {
    label: "Week 6",
    dates: "Oct 15 – 17",
    detail: "Practice + matches window.",
    status: "upcoming",
  },
  {
    label: "Registration closes",
    dates: "Oct 21",
    detail: "Last day to register a team for the Alpha Season.",
    status: "milestone",
  },
  {
    label: "Week 7",
    dates: "Oct 22 – 24",
    detail: "Final week. Season ends Oct 24 — top of your league after Week 7 goes to Las Vegas.",
    status: "upcoming",
  },
  {
    label: "Grand Finale · Las Vegas",
    dates: "Nov 30 – Dec 4",
    detail:
      "Six league champions and four wildcards play the Alpha Season's last match live on the re:Invent stage. 1st US$30,000 · 2nd US$15,000 · 3rd US$5,000.",
    status: "milestone",
  },
];

export const scheduleUrl = "https://agenticfootballcup.ai/schedule";
export const leaderboardUrl = "https://agenticfootballcup.ai/leaderboard";

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

/** The AI services that power the on-field agents and the coach's prompting workflow. */
export const squadStack: readonly string[] = [
  "Microsoft Copilot Cowork",
  "Perplexity",
  "Minds from Animoca Brands (GrokBot)",
  "Nova Pro",
  "Nova Micro",
  "GitHub Copilot (prompting help)",
];
