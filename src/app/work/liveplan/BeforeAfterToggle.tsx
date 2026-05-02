"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

type Side = {
  body: string;
  videoSrc?: string;
};

export type Comparison = {
  title: string;
  before: Side;
  after: Side;
};

type VideoFullscreenEl = HTMLVideoElement & {
  webkitRequestFullscreen?: () => void;
  webkitEnterFullscreen?: () => void;
};

function Media({ side, label }: { side: Side; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    const v = videoRef.current as VideoFullscreenEl | null;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      // iOS Safari
      v.webkitEnterFullscreen();
    }
  };

  if (side.videoSrc) {
    return (
      <>
        <video
          ref={videoRef}
          key={side.videoSrc}
          src={side.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={styles.observationVideo}
        />
        <button
          type="button"
          onClick={handleFullscreen}
          className={styles.fullscreenButton}
          aria-label={`View ${label} video fullscreen`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 6V2h4" />
            <path d="M14 6V2h-4" />
            <path d="M2 10v4h4" />
            <path d="M14 10v4h-4" />
          </svg>
        </button>
      </>
    );
  }
  return (
    <div className={styles.observationPlaceholder}>
      <span className={styles.observationPlaceholderLabel}>
        {label} placeholder
      </span>
    </div>
  );
}

export default function BeforeAfterToggle({
  comparison,
}: {
  comparison: Comparison;
}) {
  const [mode, setMode] = useState<"before" | "after">("before");
  const active = comparison[mode];

  return (
    <div className={styles.comparison}>
      <div className={styles.toggleMedia} role="tabpanel">
        <Media side={active} label={mode === "before" ? "Before" : "After"} />
        <div
          className={styles.toggleGroup}
          role="tablist"
          aria-label={`${comparison.title} — before and after`}
        >
          {(["before", "after"] as const).map((m) => {
            const isActive = mode === m;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`${styles.toggleButton} ${
                  isActive ? styles.toggleButtonActive : ""
                }`}
                onClick={() => setMode(m)}
              >
                {m === "before" ? "Before" : "After"}
              </button>
            );
          })}
        </div>
      </div>
      <p className={styles.comparisonBody}>{active.body}</p>
    </div>
  );
}
