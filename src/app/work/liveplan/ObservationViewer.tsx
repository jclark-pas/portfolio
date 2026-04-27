"use client";

import { useState } from "react";
import styles from "./page.module.css";

export type Observation = {
  title: string;
  body: string;
  videoSrc?: string;
};

function Media({ obs }: { obs: Observation }) {
  if (obs.videoSrc) {
    return (
      <video
        key={obs.videoSrc}
        src={obs.videoSrc}
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
        Video placeholder
      </span>
      <span className={styles.observationPlaceholderTitle}>{obs.title}</span>
    </div>
  );
}

export default function ObservationViewer({
  items,
}: {
  items: Observation[];
}) {
  const [selected, setSelected] = useState(0);
  const active = items[selected];

  return (
    <div className={styles.twoCol}>
      <div>
        <p className={styles.eyebrow}>Behavioral Analysis</p>
        <h2 className={styles.sectionHeading}>
          Watching users struggle (and succeed)
        </h2>
        <p className={styles.prose}>
          Session replays in Amplitude revealed patterns that interviews alone
          couldn’t surface. I watched users work around our limitations in
          creative — and frustrating — ways.
        </p>
        <ul
          className={styles.observationList}
          role="tablist"
          aria-label="User struggles"
        >
          {items.map((o, i) => {
            const isSelected = i === selected;
            return (
              <li key={o.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`observation-panel-${i}`}
                  id={`observation-tab-${i}`}
                  tabIndex={isSelected ? 0 : -1}
                  className={`${styles.observationButton} ${
                    isSelected ? styles.observationButtonActive : ""
                  }`}
                  onClick={() => setSelected(i)}
                >
                  <p className={styles.observationTitle}>{o.title}</p>
                  <p className={styles.observationBody}>{o.body}</p>
                </button>
                {isSelected && (
                  <div
                    id={`observation-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`observation-tab-${i}`}
                    className={styles.observationInlinePanel}
                  >
                    <Media obs={o} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`observation-tab-${selected}`}
        className={styles.sideImage}
      >
        <Media obs={active} />
      </div>
    </div>
  );
}
