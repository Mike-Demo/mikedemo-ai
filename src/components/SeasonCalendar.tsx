import type { ReactElement } from "react";

import { seasonSchedule } from "@/data/bugle-crowns";
import type { ScheduleEntry } from "@/data/bugle-crowns";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Months of the 2026 Alpha Season that contain schedule events. */
const SEASON_MONTHS = [
  { year: 2026, month: 8 }, // September
  { year: 2026, month: 9 }, // October
  { year: 2026, month: 10 }, // November
  { year: 2026, month: 11 }, // December
] as const;

/** Text equivalent for the colour used on each event chip. */
const STATUS_TEXT: Readonly<Record<ScheduleEntry["status"], string>> = {
  done: "Played",
  upcoming: "Upcoming week",
  milestone: "Milestone",
};

function toIso(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function entriesOn(iso: string): readonly ScheduleEntry[] {
  return seasonSchedule.filter((entry) => iso >= entry.start && iso <= entry.end);
}

function MonthGrid({ year, month }: { year: number; month: number }): ReactElement {
  const monthName = new Date(year, month, 1).toLocaleString("en-US", { month: "long" });
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section aria-label={monthName} className="calendar-month">
      <h3 className="pixel-display calendar-month-name">
        {monthName} {year}
      </h3>
      <div className="calendar-weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day} className="calendar-weekday">
            {day}
          </span>
        ))}
      </div>
      <ul className="calendar-days">
        {cells.map((day, index) => {
          if (day === null) {
            return (
              <li
                key={`blank-${index}`}
                className="calendar-cell calendar-cell-blank"
                aria-hidden="true"
              />
            );
          }
          const iso = toIso(year, month, day);
          const events = entriesOn(iso);
          return (
            <li
              key={iso}
              className={`calendar-cell${events.length > 0 ? " calendar-cell-event" : ""}`}
            >
              <span className="calendar-day-number">
                <span className="visually-hidden">{`${monthName} `}</span>
                {day}
              </span>
              {events.map((event) => (
                <span
                  key={event.label}
                  className={`calendar-event calendar-event-${event.status}`}
                >
                  <span className="visually-hidden">{`${STATUS_TEXT[event.status]}: `}</span>
                  {event.label}
                </span>
              ))}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function SeasonCalendar(): ReactElement {
  return (
    <div className="stack stack-m">
      <div className="calendar-grid">
        {SEASON_MONTHS.map(({ year, month }) => (
          <MonthGrid key={`${year}-${month}`} year={year} month={month} />
        ))}
      </div>
      <ul className="cluster cluster-m calendar-legend">
        <li>
          <span className="calendar-event calendar-event-done" aria-hidden="true" /> Played
        </li>
        <li>
          <span className="calendar-event calendar-event-upcoming" aria-hidden="true" /> Upcoming
          week
        </li>
        <li>
          <span className="calendar-event calendar-event-milestone" aria-hidden="true" /> Milestone
        </li>
      </ul>
    </div>
  );
}
