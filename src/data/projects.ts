/**
 * Portfolio content types. Project records live in
 * src/data/projects.generated.ts — the committed file is the source of truth
 * since the site moved to SpaceFast without the Cloud database; only the
 * bundled logo images stay in code.
 */
import agentKeySignInLogo from "@/assets/project-icons/agentkey-sign-in.png";
import aiDeployerLogo from "@/assets/project-icons/ai-deployer.svg";
import agentSkillsLogo from "@/assets/project-icons/agent-skills.png";
import awesomeAdventureCvLogo from "@/assets/project-icons/awesome-adventure-cv.png";
import bobModernizationFactoryLogo from "@/assets/project-icons/bob-modernization-factory.png";
import boltLocalLogo from "@/assets/project-icons/boltlocal.png";
import bugleCrownsLogo from "@/assets/project-icons/bugle-crowns.png";
import ceoOwlLogo from "@/assets/project-icons/ceo-owl.jpg";
import crosspostLogo from "@/assets/project-icons/crosspost.png";
import designSystemsLogo from "@/assets/project-icons/design-systems.svg";
import freshInkLogo from "@/assets/project-icons/fresh-ink.svg";
import gamingMultiverseReasonerLogo from "@/assets/project-icons/gaming-multiverse-reasoner.png";
import gitCheckLogo from "@/assets/project-icons/gitcheck.png";
import grassJournalLogo from "@/assets/project-icons/grass-journal.png";
import liteAnalyticsLogo from "@/assets/project-icons/lite-analytics.svg";
import localModelHubLogo from "@/assets/project-icons/localmodel-hub.png";
import magicMantaLogo from "@/assets/project-icons/magic-manta.png";
import migrateMeLogo from "@/assets/project-icons/migrateme.png";
import mikedemoPortfolioLogo from "@/assets/project-icons/mikedemo-portfolio.png";
import onDeviceAiLogo from "@/assets/project-icons/on-device-ai.svg";
import pretendProLogo from "@/assets/project-icons/pretendpro.png";
import prideBlobsLogo from "@/assets/project-icons/pride-blobs.png";
import queerCadeConnectLogo from "@/assets/project-icons/queercade-connect.png";
import rainbowJotLogo from "@/assets/project-icons/rainbow-jot.png";
import skillFinderLogo from "@/assets/project-icons/skill-finder-plus.svg";
import staLogo from "@/assets/project-icons/sta-2e-d20-roller.jpg";
import truthOpsLogo from "@/assets/project-icons/truthops.png";
import verdictLogo from "@/assets/project-icons/verdict.png";

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
  "agentkey-sign-in": agentKeySignInLogo,
  "ai-deployer": aiDeployerLogo,
  "agent-skills": agentSkillsLogo,
  "awesome-adventure-cv": awesomeAdventureCvLogo,
  "bob-modernization-factory": bobModernizationFactoryLogo,
  boltlocal: boltLocalLogo,
  "bugle-crowns": bugleCrownsLogo,
  "ceo-owl": ceoOwlLogo,
  crosspost: crosspostLogo,
  "awesome-design-system": designSystemsLogo,
  freshink: freshInkLogo,
  "gaming-multiverse-reasoner": gamingMultiverseReasonerLogo,
  gitcheck: gitCheckLogo,
  "grass-journal": grassJournalLogo,
  "lite-analytics": liteAnalyticsLogo,
  "localmodel-hub": localModelHubLogo,
  "magic-manta": magicMantaLogo,
  migrateme: migrateMeLogo,
  "mikedemo-portfolio": mikedemoPortfolioLogo,
  "on-device-ai": onDeviceAiLogo,
  pretendpro: pretendProLogo,
  "pride-blobs": prideBlobsLogo,
  "queercade-connect": queerCadeConnectLogo,
  "rainbow-jot": rainbowJotLogo,
  "skill-finder-plus": skillFinderLogo,
  "sta-2e-d20-roller": staLogo,
  truthops: truthOpsLogo,
  verdict: verdictLogo,
};

export function findProject(projects: readonly Project[], slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
