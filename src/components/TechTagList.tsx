import type { ReactElement } from "react";

import { getTechIcon } from "@/lib/tech-icons";

export type TechTagListProps = {
  readonly items: readonly string[];
  readonly appearance?: "filled" | "outlined";
  readonly size?: "small" | "medium" | "large";
  readonly label?: string;
};

/** Markerless list of technology tags, each with its brand or category icon. */
export function TechTagList({
  items,
  appearance = "filled",
  size = "medium",
  label,
}: TechTagListProps): ReactElement {
  return (
    <ul className={`tag-list tag-list-${appearance} tag-list-${size}`} aria-label={label}>
      {items.map((item) => {
        const icon = getTechIcon(item);
        const family = icon.family === "brands" ? "fa-brands" : "fa-solid";
        return (
          <li key={item} className="tech-chip">
            <i className={`${family} fa-${icon.name}`} aria-hidden="true" /> {item}
          </li>
        );
      })}
    </ul>
  );
}
