import type { ReactElement } from "react";

import { WaIcon, WaTag } from "@/design-system/font-awsome-web-awesome-171158";

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
    <ul className="tag-list wa-cluster wa-gap-2xs" aria-label={label}>
      {items.map((item) => {
        const icon = getTechIcon(item);
        return (
          <li key={item}>
            <WaTag variant="brand" appearance={appearance} size={size}>
              <WaIcon
                name={icon.name}
                family={icon.family ?? "classic"}
                aria-hidden="true"
                className="tag-icon"
              />
              {item}
            </WaTag>
          </li>
        );
      })}
    </ul>
  );
}
