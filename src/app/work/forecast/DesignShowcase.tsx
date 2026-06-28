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
  /** the design we shipped */
  image: string;
  /** backdrop the (transparent) design floats on */
  gradient: string;
};

const MOVES: Move[] = [
  {
    icon: LineChart,
    title: "Actuals that update the forecast",
    body: "Actuals and prior years now sit inline in the forecast editor, recalculating your future projections from your real past performance — where the editor used to run blind to both.",
    image: "/images/forecast/forecast-inlineactuals.png",
    gradient: "linear-gradient(135deg, #dcefe2 0%, #d8e8f3 50%, #e2e0f4 100%)",
  },
  {
    icon: ReceiptText,
    title: "A transaction panel, to keep you in flow",
    body: "One click on any actuals figure opens a transaction panel right in place — so checking what's behind a number no longer means leaving for QuickBooks and running a roll-up report, or breaking your forecast flow.",
    image: "/images/forecast/forecast-panel.png",
    gradient: "linear-gradient(135deg, #fce4d6 0%, #f6dde6 50%, #e7e3f4 100%)",
  },
  {
    icon: Layers,
    title: "Forecast groups for organization",
    body: "Forecast Groups build a two-level hierarchy independent of your books, so the forecast matches how you actually think — not a chart of accounts that's too granular here and not enough there. A win even for forecasters without actuals.",
    image: "/images/forecast/forecast-groups.png",
    gradient: "linear-gradient(135deg, #fcebcf 0%, #f8e0d6 50%, #f2dde8 100%)",
  },
  {
    icon: TrendingUp,
    title: "Not just charts — a timeline of performance",
    body: "Interactive line charts now carry prior-year actuals right into the editor, replacing the dated bar graphs — so the history you're forecasting against sits exactly where you make the call.",
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
        {MOVES.map((m, i) => (
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
        ))}
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
                  <Icon size={24} strokeWidth={2} />
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
