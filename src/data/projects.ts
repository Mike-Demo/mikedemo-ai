/**
 * Portfolio content types. Project records live in the Cloud database
 * (public.projects); only the bundled logo images stay in code.
 */
import aiDeployerLogo from "@/assets/project-icons/ai-deployer.svg";
import awesomeAdventureCvLogo from "@/assets/project-icons/awesome-adventure-cv.png";
import bugleCrownsLogo from "@/assets/project-icons/bugle-crowns.png";
import crosspostLogo from "@/assets/project-icons/crosspost.png";
import onDeviceAiLogo from "@/assets/project-icons/on-device-ai.svg";
import pretendProLogo from "@/assets/project-icons/pretendpro.png";
import prideBlobsLogo from "@/assets/project-icons/pride-blobs.png";
import queerCadeConnectLogo from "@/assets/project-icons/queercade-connect.png";
import skillFinderLogo from "@/assets/project-icons/skill-finder-plus.svg";
import staLogo from "@/assets/project-icons/sta-2e-d20-roller.jpg";

export interface ProjectCredit {
  readonly name: string;
  readonly url: string;
}

export interface ProjectSite {
  readonly name: string;
  readonly url: string;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly domain: string;
  readonly summary: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly url: string;
  readonly icon: string;
  /** The project's own site icon, when it publishes one. */
  readonly logo?: string;
  /** ISO date the project was first built. */
  readonly started: string;
  /** Set when the project has a bespoke detail page instead of /projects/$slug. */
  readonly detailPath?: "/bugle-crowns";
  /** Upstream projects and source material worth crediting. */
  readonly credits?: readonly ProjectCredit[];
  /** Multiple live destinations when one portfolio entry represents a related project family. */
  readonly sites?: readonly ProjectSite[];
}

/** Bundled site icons, matched to a project by slug. */
export const projectLogos: Readonly<Record<string, string>> = {
  "ai-deployer": aiDeployerLogo,
  "awesome-adventure-cv": awesomeAdventureCvLogo,
  "bugle-crowns": bugleCrownsLogo,
  crosspost: crosspostLogo,
  "on-device-ai": onDeviceAiLogo,
  pretendpro: pretendProLogo,
  "pride-blobs": prideBlobsLogo,
  "queercade-connect": queerCadeConnectLogo,
  "skill-finder-plus": skillFinderLogo,
  "sta-2e-d20-roller": staLogo,
};

export function findProject(projects: readonly Project[], slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
