import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * PixelAppreciateButton — a rainbow pixel-heart kudos button for project pages.
 *
 * A pixel-art fork of the open-source Appreciate Button
 * (https://github.com/Mike-Demo/appreciate-button-pixel, MIT, forked from
 * https://github.com/medhatdawoud/appreciate-button).
 *
 * Each visitor gets 10 appreciations per project, tracked in localStorage.
 * Clicking fills the heart bottom-up with rainbow stripes, pixel by pixel.
 * Totals persist via QueerCade's public appreciations API
 * (https://queercade.mikedemo.dev/api/public/v1/appreciations/:slug),
 * which allows all origins. Slugs are namespaced
 * (`portfolio-<project-slug>`) so they never collide with game slugs.
 */

const ALLOWANCE = 10;
const DEFAULT_API_BASE = "https://queercade.mikedemo.dev/api/public/v1/appreciations";
const DEFAULT_STORAGE_PREFIX = "md-appreciate:";

/** 7x6 pixel heart. X = pixel. */
const HEART: readonly string[] = [
  ".XX.XX.",
  "XXXXXXX",
  "XXXXXXX",
  ".XXXXX.",
  "..XXX..",
  "...X...",
];

/** Rainbow flag stripes, top row to bottom row. */
const RAINBOW: readonly string[] = [
  "#E40303",
  "#FF8C00",
  "#FFED00",
  "#008026",
  "#24408E",
  "#732982",
];

const EMPTY_PIXEL = "#3b3f4b";
const PIXEL_SIZE = 8;

interface HeartPixel {
  readonly x: number;
  readonly y: number;
}

const PIXELS: readonly HeartPixel[] = HEART.flatMap((line, y) =>
  [...line].flatMap((ch, x) => (ch === "X" ? [{ x, y }] : [])),
);

/** Fill order: bottom row first, left to right within a row. */
const FILL_ORDER: readonly HeartPixel[] = [...PIXELS].sort((a, b) => b.y - a.y || a.x - b.x);

function readUsed(prefix: string, slug: string): number {
  try {
    const raw = window.localStorage.getItem(`${prefix}${slug}`);
    const n = raw === null ? 0 : Number.parseInt(raw, 10);
    return Number.isFinite(n) ? Math.min(Math.max(n, 0), ALLOWANCE) : 0;
  } catch {
    return 0;
  }
}

function writeUsed(prefix: string, slug: string, used: number): void {
  try {
    window.localStorage.setItem(`${prefix}${slug}`, String(used));
  } catch {
    /* storage unavailable — allowance just won't persist */
  }
}

/** Short, quiet square-wave blip. Pitch climbs as the heart fills. */
function playBlip(fillRatio: number): void {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 440 + fillRatio * 440;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
    void ctx.resume().finally(() => window.setTimeout(() => void ctx.close(), 200));
  } catch {
    /* audio unavailable — the button still works */
  }
}

interface BurstParticle {
  readonly id: number;
  readonly dx: number;
  readonly dy: number;
  readonly color: string;
  readonly size: number;
}

let burstId = 0;

interface PixelAppreciateButtonProps {
  /** Namespaced API slug, e.g. `portfolio-lite-analytics`. */
  readonly slug: string;
  /** Project name, used in the accessible label. */
  readonly title: string;
  readonly apiBase?: string;
  readonly storagePrefix?: string;
}

export function PixelAppreciateButton({
  slug,
  title,
  apiBase = DEFAULT_API_BASE,
  storagePrefix = DEFAULT_STORAGE_PREFIX,
}: PixelAppreciateButtonProps) {
  const [total, setTotal] = useState<number | null>(null);
  const [used, setUsed] = useState<number>(0);
  const [bursts, setBursts] = useState<readonly BurstParticle[]>([]);
  const [popping, setPopping] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    setUsed(readUsed(storagePrefix, slug));
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    fetch(`${apiBase}/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { total?: number } | null) => {
        if (!cancelled && data && typeof data.total === "number") setTotal(data.total);
      })
      .catch(() => {
        /* count stays hidden until the API answers */
      });
    return () => {
      cancelled = true;
    };
  }, [apiBase, storagePrefix, slug]);

  const remaining = ALLOWANCE - used;
  const filledCount = Math.round((used / ALLOWANCE) * PIXELS.length);
  const filled = new Set(FILL_ORDER.slice(0, filledCount).map((p) => `${p.x},${p.y}`));

  const handleClick = useCallback(() => {
    if (remaining <= 0) return;
    const nextUsed = used + 1;
    setUsed(nextUsed);
    writeUsed(storagePrefix, slug, nextUsed);
    setTotal((t) => (t === null ? 1 : t + 1));
    setPopping(true);
    window.setTimeout(() => setPopping(false), 180);
    playBlip(nextUsed / ALLOWANCE);

    if (!reduceMotion.current) {
      const particles: BurstParticle[] = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        const distance = 34 + Math.random() * 22;
        return {
          id: burstId++,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          color: RAINBOW[i % RAINBOW.length],
          size: 4 + Math.floor(Math.random() * 5),
        };
      });
      const ids = new Set(particles.map((p) => p.id));
      setBursts((b) => [...b, ...particles]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((p) => !ids.has(p.id)));
      }, 650);
    }

    fetch(`${apiBase}/${slug}`, { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { total?: number } | null) => {
        if (data && typeof data.total === "number") setTotal(data.total);
      })
      .catch(() => {
        /* optimistic count stands */
      });
  }, [remaining, used, apiBase, storagePrefix, slug]);

  const width = 7 * PIXEL_SIZE;
  const height = 6 * PIXEL_SIZE;

  return (
    <div className="pixel-appreciate">
      <button
        type="button"
        className={`pixel-appreciate-btn${popping ? " is-popping" : ""}`}
        onClick={handleClick}
        disabled={remaining <= 0}
        aria-label={
          remaining > 0
            ? `Appreciate ${title} (${remaining} of ${ALLOWANCE} left)`
            : `You appreciated ${title} — thanks!`
        }
        title={remaining > 0 ? "Show some love" : "Thanks for the love!"}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          shapeRendering="crispEdges"
          role="img"
          aria-hidden="true"
        >
          {PIXELS.map((p) => {
            const isFilled = filled.has(`${p.x},${p.y}`);
            return (
              <rect
                key={`${p.x},${p.y}`}
                x={p.x * PIXEL_SIZE}
                y={p.y * PIXEL_SIZE}
                width={PIXEL_SIZE}
                height={PIXEL_SIZE}
                fill={isFilled ? RAINBOW[p.y] : EMPTY_PIXEL}
              />
            );
          })}
        </svg>
        {bursts.map((p) => (
          <span
            key={p.id}
            className="pixel-appreciate-particle"
            style={
              {
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                background: p.color,
                width: p.size,
                height: p.size,
              } as CSSProperties
            }
          />
        ))}
      </button>
      <div className="pixel-appreciate-meta">
        <span className="pixel-appreciate-count">{total === null ? "…" : total.toLocaleString()}</span>
        <span className="pixel-appreciate-label">
          {remaining > 0 ? "appreciations — tap the heart" : "thanks for the love!"}
        </span>
      </div>
    </div>
  );
}
