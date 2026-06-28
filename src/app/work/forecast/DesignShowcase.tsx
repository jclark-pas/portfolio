"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LineChart,
  ReceiptText,
  Layers,
  TrendingUp,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import styles from "./DesignShowcase.module.css";

type Move = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** the design we shipped; null = still a labeled placeholder */
  image: string | null;
  /** backdrop the (transparent) design floats on */
  gradient: string;
};

const MOVES: Move[] = [
  {
    icon: LineChart,
    title: "Actuals, in line with the forecast",
    body: "Before, the forecast editor was blind — no current actuals, no prior years. You'd read your real numbers on a separate dashboard, switch back, and hold them in your head while editing. Now actuals sit right beside your projections, and you edit in place against real performance.",
    image: "/images/forecast/forecast-inlineactuals.png",
    gradient: "linear-gradient(135deg, #dcefe2 0%, #d8e8f3 50%, #e2e0f4 100%)",
  },
  {
    icon: ReceiptText,
    title: "A panel, not a tab-switch",
    body: "See an actuals figure and wonder what's behind it? You used to leave for QuickBooks, work out which accounts mapped to that line, and run a roll-up report. Now one click opens a transaction panel in place — spot a miscode instantly, then go fix it at the source.",
    image: "/images/forecast/forecast-panel.png",
    gradient: "linear-gradient(135deg, #fce4d6 0%, #f6dde6 50%, #e7e3f4 100%)",
  },
  {
    icon: Layers,
    title: "Structure that matches how you think",
    body: "A chart of accounts rarely matches a mental model — sometimes too granular, sometimes not enough. Forecast Groups let users build a two-level hierarchy independent of their books. One olive-oil seller put it best: same bottle, sold direct and retail — why force separate costs for the same product?",
    image: "/images/forecast/forecast-groups.png",
    gradient: "linear-gradient(135deg, #fcebcf 0%, #f8e0d6 50%, #f2dde8 100%)",
  },
  {
    icon: TrendingUp,
    title: "Context at the point of decision",
    body: "Prior-year actuals came into the editor, and the dated bar graphs gave way to modern, interactive line charts — so the history you're forecasting against is visible exactly where you're making the call.",
    image: "/images/forecast/forecast-chart.png",
    gradient: "linear-gradient(135deg, #eadff4 0%, #dde3f6 50%, #d9edf1 100%)",
  },
];

export default function DesignShowcase({
  header,
}: {
  header?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.layout}>
      {/* left — the design, crossfading as the active move changes */}
      <div className={styles.media}>
        {MOVES.map((m, i) =>
          m.image ? (
            <div
              key={m.title}
              className={`${styles.slide} ${active === i ? styles.slideActive : ""}`}
              style={{ background: m.gradient }}
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.shot}
              />
            </div>
          ) : (
            <div
              key={m.title}
              className={`${styles.slide} ${styles.placeholder} ${
                active === i ? styles.slideActive : ""
              }`}
            >
              <span>🖼 Design — {m.title}</span>
            </div>
          )
        )}
      </div>

      {/* left column — section heading above the moves */}
      <div className={styles.leftCol}>
        {header ? <div className={styles.heading}>{header}</div> : null}
        <div className={styles.list}>
          {MOVES.map((m, i) => {
          const Icon = m.icon;
          const open = active === i;
          return (
            <div
              key={m.title}
              className={`${styles.item} ${open ? styles.itemOpen : ""}`}
            >
              <button
                type="button"
                className={styles.header}
                aria-expanded={open}
                onClick={() => setActive(i)}
              >
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className={styles.title}>{m.title}</h3>
                <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
              </button>
              <div className={styles.bodyWrap} aria-hidden={!open}>
                <div className={styles.bodyInner}>
                  <p className={styles.body}>{m.body}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
