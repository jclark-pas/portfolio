"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import beats from "./beats.module.css";

// the two token diagrams from the design system, one tab each. The images are
// self-framed SVGs, so they sit flush inside the card.
const TABS = [
  {
    key: "color",
    label: "Color tokens",
    title: "Color tokens",
    body: "Fifteen color themes, or the full system to tune your own. Every color cascades through the plan on screen and in print, the pitch deck and the idea canvas: charts, links, highlights, statements and widgets.",
    src: "/images/liveplan/color-tokens.svg",
    alt: "Color token variables for the LivePlan theming system: surface, surface-card, surface-sidebar, primary, body-text, accent 1 to 3 and border, shown beside ten theme palettes",
    width: 1846,
    height: 696,
  },
  {
    key: "type",
    label: "Typography tokens",
    title: "Typography tokens",
    body: "Nine font pairings, from Bricolage and Poppins to Playfair and Source Serif. With fifteen palettes, that is 135 ways for a plan to look like the business it describes.",
    src: "/images/liveplan/type-token.svg",
    alt: "Typography tokens across LivePlan themes: the same plan headings and body text set in each of the nine curated font pairings",
    width: 2232,
    height: 976,
  },
] as const;

export default function TokenTabs() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("color");
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div className={beats.tokens}>
      <div className={styles.toggleGroup} role="tablist" aria-label="Design tokens">
        {TABS.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`token-tab-${t.key}`}
              aria-selected={on}
              aria-controls={`token-panel-${t.key}`}
              tabIndex={on ? 0 : -1}
              className={`${styles.toggleButton} ${on ? styles.toggleButtonActive : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        key={tab.key}
        id={`token-panel-${tab.key}`}
        role="tabpanel"
        aria-labelledby={`token-tab-${tab.key}`}
        className={beats.tokenPanel}
      >
        <h4 className={beats.tokenTitle}>{tab.title}</h4>
        <p className={beats.tokenBody}>{tab.body}</p>
        <Image
          src={tab.src}
          alt={tab.alt}
          width={tab.width}
          height={tab.height}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className={beats.tokenImg}
          unoptimized
        />
      </div>
    </div>
  );
}
