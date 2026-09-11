/** Formats an ISO date (YYYY-MM-DD) as a short month + year label in UTC. */
export function formatMonthYear(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
