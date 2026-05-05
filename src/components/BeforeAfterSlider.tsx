"use client";

import { useCallback, useRef, useState } from "react";
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
  /** CSS aspect-ratio string. Defaults to 16 / 9. */
  aspectRatio?: string;
  /** Initial divider position, 0–100. Defaults to 50. */
  initialPosition?: number;
  /** Optional className for the outer container */
  className?: string;
};

const STEP = 4;

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "16 / 9",
  initialPosition = 50,
  className,
}: Props) {
  const [position, setPosition] = useState(() =>
    Math.max(0, Math.min(100, initialPosition))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(`.${styles.layer}`)) {
      updateFromClientX(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  const valueNow = Math.round(position);

  return (
    <div
      ref={containerRef}
      className={[styles.container, className].filter(Boolean).join(" ")}
      style={{ aspectRatio }}
      onClick={handleContainerClick}
    >
      {/* AFTER (base layer, full size) */}
      <div className={styles.layer} aria-hidden="true">
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

      {/* Edge labels */}
      <span className={`${styles.edgeLabel} ${styles.edgeLabelLeft}`}>
        {beforeLabel}
      </span>
      <span className={`${styles.edgeLabel} ${styles.edgeLabelRight}`}>
        {afterLabel}
      </span>

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
