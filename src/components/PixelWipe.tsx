import { useRouterState } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

const BLOCK_COUNT = 24;

/**
 * Blocky 8-bit wipe that plays once per navigation, then unmounts. Purely
 * decorative and disabled for reduced-motion users via CSS.
 */
export function PixelWipe(): ReactElement | null {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="pixel-wipe" aria-hidden="true">
      {Array.from({ length: BLOCK_COUNT }, (_, index) => (
        <span
          key={index}
          className="pixel-wipe-block"
          data-column={index % 8}
          data-row={Math.floor(index / 8)}
        />
      ))}
    </div>
  );
}
