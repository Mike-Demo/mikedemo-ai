import type { ReactElement } from "react";

import type { MatchLogEntry, WeekRecord } from "@/data/bugle-crowns";

interface BugleChartsProps {
  readonly week1: readonly MatchLogEntry[];
  readonly week2: readonly MatchLogEntry[];
  readonly week1Record: WeekRecord;
  readonly week2Record: WeekRecord;
}

function resultLabel(match: MatchLogEntry): string {
  return `${match.result === "win" ? "Won" : "Lost"} ${match.scoreFor}-${match.scoreAgainst} vs ${match.opponent}`;
}

/** Win/loss block strip across both weeks, in play order, with a week divider. */
function ResultsStrip({ week1, week2 }: { readonly week1: readonly MatchLogEntry[]; readonly week2: readonly MatchLogEntry[] }): ReactElement {
  const renderBlock = (match: MatchLogEntry, index: number): ReactElement => (
    <li key={`${match.opponent}-${index}`} className="bc-strip-item">
      <span
        aria-hidden="true"
        className={`bc-strip-cell ${match.result === "win" ? "bc-win" : "bc-loss"}`}
      />
      <span className="visually-hidden">
        Match {index + 1}: {resultLabel(match)}
      </span>
    </li>
  );

  return (
    <section aria-labelledby="bc-strip-heading" className="stack stack-xs">
      <h4 id="bc-strip-heading" className="pixel-display bc-chart-title">
        Results · 20 matches
      </h4>
      <ol className="bc-strip" aria-label="Match results in play order">
        {week1.map((match, index) => renderBlock(match, index))}
        <li aria-hidden="true" className="bc-strip-divider" />
        {week2.map((match, index) => renderBlock(match, index))}
      </ol>
      <p className="quiet-small">Week 1 (left of the divider) then Week 2, in play order.</p>
    </section>
  );
}

/** Goals for / against per week as paired horizontal bars. */
function GoalsChart({ week1Record, week2Record }: { readonly week1Record: WeekRecord; readonly week2Record: WeekRecord }): ReactElement {
  const max = Math.max(
    week1Record.goalsFor,
    week1Record.goalsAgainst,
    week2Record.goalsFor,
    week2Record.goalsAgainst,
  );
  const rows = [
    { label: "W1 for", value: week1Record.goalsFor, tone: "bc-win" },
    { label: "W1 against", value: week1Record.goalsAgainst, tone: "bc-loss" },
    { label: "W2 for", value: week2Record.goalsFor, tone: "bc-win" },
    { label: "W2 against", value: week2Record.goalsAgainst, tone: "bc-loss" },
  ] as const;

  return (
    <section aria-labelledby="bc-goals-heading" className="stack stack-xs">
      <h4 id="bc-goals-heading" className="pixel-display bc-chart-title">
        Goals per week
      </h4>
      <div className="stack stack-xs">
        {rows.map((row) => (
          <div key={row.label} className="bc-bar-row">
            <span className="pixel-display bc-bar-label">{row.label}</span>
            <span className="bc-bar-track">
              <span
                className={`bc-bar-fill ${row.tone}`}
                style={{ inlineSize: `${Math.round((row.value / max) * 100)}%` }}
              />
            </span>
            <span className="pixel-display bc-bar-value">{row.value}</span>
          </div>
        ))}
      </div>
      <table className="visually-hidden">
        <caption>Goals scored and conceded per week</caption>
        <thead>
          <tr><th>Week</th><th>Goals for</th><th>Goals against</th></tr>
        </thead>
        <tbody>
          <tr><td>Week 1</td><td>{week1Record.goalsFor}</td><td>{week1Record.goalsAgainst}</td></tr>
          <tr><td>Week 2</td><td>{week2Record.goalsFor}</td><td>{week2Record.goalsAgainst}</td></tr>
        </tbody>
      </table>
    </section>
  );
}

/** Our possession share per match, one bar per match, colored by result. */
function PossessionChart({ week1, week2 }: { readonly week1: readonly MatchLogEntry[]; readonly week2: readonly MatchLogEntry[] }): ReactElement {
  const renderRow = (match: MatchLogEntry, week: string, index: number): ReactElement | null => {
    if (match.possession === undefined) return null;
    return (
      <div key={`${week}-${match.match}`} className="bc-bar-row">
        <span className="pixel-display bc-bar-label">
          {week} M{index + 1}
        </span>
        <span className="bc-bar-track">
          <span
            className={`bc-bar-fill ${match.result === "win" ? "bc-win" : "bc-loss"}`}
            style={{ inlineSize: `${match.possession}%` }}
          />
        </span>
        <span className="pixel-display bc-bar-value">{match.possession}%</span>
        <span className="visually-hidden"> — {resultLabel(match)}</span>
      </div>
    );
  };

  return (
    <section aria-labelledby="bc-poss-heading" className="stack stack-xs">
      <h4 id="bc-poss-heading" className="pixel-display bc-chart-title">
        Possession per match
      </h4>
      <div className="stack stack-xs">
        {week2.map((match, index) => renderRow(match, "W2", index))}
        {week1.map((match, index) => renderRow(match, "W1", index))}
      </div>
      <p className="quiet-small">Our share of possession; green bars are wins, red are losses.</p>
    </section>
  );
}

/**
 * Pixel-styled season charts for the Bugle Crowns page: results strip,
 * goals per week, and possession per match. Hand-rolled with NES color
 * tokens — no chart library.
 */
export function BugleCharts(props: BugleChartsProps): ReactElement {
  return (
    <div className="stack stack-l">
      <ResultsStrip week1={props.week1} week2={props.week2} />
      <GoalsChart week1Record={props.week1Record} week2Record={props.week2Record} />
      <PossessionChart week1={props.week1} week2={props.week2} />
    </div>
  );
}
