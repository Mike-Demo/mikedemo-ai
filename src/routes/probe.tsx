import { createFileRoute } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { listProjects } from "@/lib/projects.functions";

export const Route = createFileRoute("/probe")({
  loader: async () => {
    const r = await listProjects();
    console.log("PROBE LOADER", r.length);
    return { count: r.length };
  },
  component: Probe,
});

function Probe(): ReactElement {
  const data = Route.useLoaderData();
  return <p id="probe">count: {String(data?.count)}</p>;
}
