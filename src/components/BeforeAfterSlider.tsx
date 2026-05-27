"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BeforeAfterSlider.module.css";

type Props = {
  /** Content shown on the left side (the "old" experience) */
  before: React.ReactNode;
  /** Content shown on the right side (the "new" experience) */
  after: React.ReactNode;
  /** Short label used for the left edge ribbon and accessibility */
  beforeLabel?: string;
  /** Short label used for the right edge ribbon and accessibility */
  afterLabel?: string;
  /** Initial divider position, 0–100. Defaults to 50. */
  initialPosition?: number;
  /** Animate from "complete before" → "complete after" → resting position
   *  the first time the slider scrolls into view. Default true. */
  animateOnEnter?: boolean;
  /** Optional className for the outer container */
  className?: string;
};

const STEP = 4;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  animateOnEnter = true,
  className,
}: Props) {
  const clampedInitial = Math.max(0, Math.min(100, initialPosition));
  // When the entrance animation will run, start at "complete before" so the
  // initial paint matches the first keyframe and there's no visible snap when
  // the slider enters the viewport.
  const [position, setPosition] = useState(
    animateOnEnter ? 100 : clampedInitial
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const animatingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const cancelAnimation = useCallback(() => {
    animatingRef.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Entrance animation: hold at "complete before" → glide to "complete after"
  // → settle at initialPosition. Runs once, only when the slider first scrolls
  // into view. Honors prefers-reduced-motion. Any user interaction cancels it.
  useEffect(() => {
    if (!animateOnEnter || hasAnimatedRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) {
        hasAnimatedRef.current = true;
        // Reduced-motion users skip the animation but still get the final
        // resting state ("complete after") rather than being stuck at "before".
        setPosition(0);
        return;
      }
    }
    if (typeof IntersectionObserver === "undefined") {
      hasAnimatedRef.current = true;
      setPosition(0);
      return;
    }

    const runEntrance = () => {
      const keyframes = [
        { t: 0, pos: 100 }, // start at "complete before"
        { t: 250, pos: 100 }, // hold "complete before"
        { t: 1350, pos: 0 }, // glide to "complete after" (1100ms) and stay
      ];
      const totalDuration = keyframes[keyframes.length - 1].t;
      const startTime = performance.now();
      animatingRef.current = true;

      const frame = (now: number) => {
        if (!animatingRef.current) return;
        const elapsed = now - startTime;
        if (elapsed >= totalDuration) {
          setPosition(keyframes[keyframes.length - 1].pos);
          animatingRef.current = false;
          rafRef.current = null;
          return;
        }
        let i = 0;
        while (i < keyframes.length - 2 && keyframes[i + 1].t <= elapsed) i++;
        const a = keyframes[i];
        const b = keyframes[i + 1];
        const segLen = b.t - a.t;
        const segProgress = segLen > 0 ? (elapsed - a.t) / segLen : 1;
        const eased = easeInOutCubic(Math.max(0, Math.min(1, segProgress)));
        setPosition(a.pos + (b.pos - a.pos) * eased);
        rafRef.current = requestAnimationFrame(frame);
      };

      rafRef.current = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.4 && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.disconnect();
            runEntrance();
          }
        }
      },
      { threshold: [0, 0.25, 0.4, 0.6, 1] }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimation();
    };
  }, [animateOnEnter, clampedInitial, cancelAnimation]);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelAnimation();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Click anywhere on the slider to jump the divider there
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(`.${styles.layer}, .${styles.base}`)) {
      cancelAnimation();
      updateFromClientX(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      cancelAnimation();
      setPosition((p) => Math.max(0, p - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      cancelAnimation();
      setPosition((p) => Math.min(100, p + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      cancelAnimation();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      cancelAnimation();
      setPosition(100);
    }
  };

  const valueNow = Math.round(position);

  return (
    <div
      ref={containerRef}
      className={[styles.container, className].filter(Boolean).join(" ")}
      onClick={handleContainerClick}
    >
      {/* AFTER (base layer, in normal flow — sets the container height) */}
      <div className={styles.base} aria-hidden="true">
        {after}
      </div>

      {/* BEFORE (clipped overlay, only the left portion is visible) */}
      <div
        className={styles.layer}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        {before}
      </div>

      {/* Divider line */}
      <div
        className={styles.divider}
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />

      {/* Drag handle */}
      <button
        type="button"
        className={styles.handle}
        style={{ left: `${position}%` }}
        role="slider"
        aria-label={`Reveal ${afterLabel}: drag to compare ${beforeLabel} and ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={valueNow}
        aria-valuetext={`${valueNow}% ${afterLabel} revealed`}
        aria-orientation="horizontal"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="5 3 1 7 5 11" />
          <polyline points="9 3 13 7 9 11" />
        </svg>
      </button>
    </div>
  );
}
