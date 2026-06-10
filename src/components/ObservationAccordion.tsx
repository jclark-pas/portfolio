"use client";

import { useState } from "react";
import {
  ChevronDown,
  MousePointerClick,
  BarChart3,
  Bold,
  ListTree,
  Flame,
  Timer,
  ShieldCheck,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import styles from "./ObservationAccordion.module.css";

// Server components can't pass component functions across the client boundary,
// so observations reference an icon by key and we resolve it here.
const ICONS = {
  click: MousePointerClick,
  chart: BarChart3,
  bold: Bold,
  outline: ListTree,
  engagement: Flame,
  speed: Timer,
  trust: ShieldCheck,
  teaching: GraduationCap,
} satisfies Record<string, LucideIcon>;

export type ObservationIcon = keyof typeof ICONS;

export type Observation = {
  icon: ObservationIcon;
  title: string;
  // Optional bold lead-in; when present it opens the body, when absent the
  // detail stands on its own.
  summary?: string;
  detail: string;
};

export default function ObservationAccordion({
  observations,
}: {
  observations: Observation[];
}) {
  // Single-open "zipper": the first observation starts expanded, and opening
  // one collapses the others. Clicking an open row closes it (-1 = none open).
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ul className={styles.list}>
      {observations.map((o, i) => {
        const open = openIndex === i;
        const Icon = ICONS[o.icon];
        return (
          <li
            key={o.title}
            className={`${styles.item} ${open ? styles.open : ""}`}
          >
            <button
              className={styles.header}
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
            >
              <Icon
                size={24}
                strokeWidth={2}
                className={styles.icon}
                aria-hidden="true"
              />
              <h3 className={styles.title}>{o.title}</h3>
              <ChevronDown
                size={20}
                strokeWidth={2}
                className={styles.chevron}
                aria-hidden="true"
              />
            </button>
            <div className={styles.contentWrapper} aria-hidden={!open}>
              <div className={styles.contentInner}>
                <div className={styles.content}>
                  <p className={styles.body}>
                    {o.summary ? (
                      <>
                        <strong className={styles.lead}>{o.summary}</strong>{" "}
                      </>
                    ) : null}
                    {o.detail}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
