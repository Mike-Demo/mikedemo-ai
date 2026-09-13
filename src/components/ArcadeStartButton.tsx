import type { ButtonHTMLAttributes, ReactElement } from "react";

/**
 * A chunky arcade-cabinet "START" button in the NES visual language.
 * Uses the local pixel font, hard shadow, and beveled pixel borders.
 */
export function ArcadeStartButton({
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <button type={type} className="arcade-start-button" {...props}>
      <span className="arcade-start-button-face">{children}</span>
      <span className="arcade-start-button-glint" aria-hidden="true" />
      <span className="arcade-start-button-corner top-left" aria-hidden="true" />
      <span className="arcade-start-button-corner top-right" aria-hidden="true" />
      <span className="arcade-start-button-corner bottom-left" aria-hidden="true" />
      <span className="arcade-start-button-corner bottom-right" aria-hidden="true" />
      <span className="insert-coin-hint" aria-hidden="true">
        INSERT COIN
      </span>
    </button>
  );
}
