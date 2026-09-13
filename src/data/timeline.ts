/**
 * Unified homepage timeline: projects and credentials/milestones.
 */
import type { Project } from "./projects";
export interface Credential {
  readonly kind: "credential";
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly period: string;
  readonly summary: string;
  readonly url: string;
  readonly icon: string;
  /** ISO date the credential was awarded or completed. */
  readonly started: string;
}

export type TimelineItem =
  | (Project & { kind: "project" })
  | Credential;

export const credentials: readonly Credential[] = [
  {
    kind: "credential",
    id: "mit-no-code-ai-ml",
    title: "No Code AI and Machine Learning: Building Data Science Solutions",
    issuer: "MIT Professional Education",
    period: "Jan – April 2025",
    summary: "AI and Machine Learning",
    url: "https://www.credential.net/3e8d52c3-ec84-4ee2-b0e9-51e2aeed8a4b",
    icon: "graduation-cap",
    started: "2025-04-30",
  },
];

