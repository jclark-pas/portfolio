"use client";

import { useState } from "react";
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

function Media({ side, label }: { side: Side; label: string }) {
  if (side.videoSrc) {
    return (
      <video
        key={side.videoSrc}
        src={side.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={styles.observationVideo}
      />
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
      <div className={styles.comparisonHeader}>
        <h3 className={styles.comparisonTitle}>{comparison.title}</h3>
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
      <div className={styles.toggleMedia} role="tabpanel">
        <Media side={active} label={mode === "before" ? "Before" : "After"} />
      </div>
      <p className={styles.comparisonBody}>{active.body}</p>
    </div>
  );
}
