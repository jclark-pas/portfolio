"use client";

import { useEffect, useRef, useState } from "react";
import {
  Lightbulb,
  NotePencil,
  PresentationChart,
  Storefront,
  ChartLineUp,
} from "@phosphor-icons/react";
import styles from "./JourneyTrack.module.css";

/**
 * The customer lifecycle as one track of jobs-to-be-done. Two markers make the
 * strategic case at a glance: most users sat at Plan, while the forecasting
 * work served Run — and the stretch between them is the problem. Hovering,
 * focusing, or tapping a stage brings up a voice-of-the-customer bubble: the
 * job in their words, and their sharpest pain.
 *
 * The people in the bubbles are illustrative personas, not real customers —
 * the jobs and pains come from the research, the names and roles don't. Their
 * avatars are DiceBear "Notionists" by Zoish (CC0), generated once and saved
 * in /public/images/forecast/personas.
 */
const STAGES = [
  {
    name: "Validate",
    range: "Pre-signup",
    job: "I need to know if my idea is worth pursuing",
    pain: "I might be talking myself into a bad idea",
    icon: Lightbulb,
    who: "Maya R.",
    avatar: "/images/forecast/personas/maya.svg",
    role: "Thinking about a dog-grooming van",
    hue: "#6C5CE7",
  },
  {
    name: "Plan",
    range: "0–60 days",
    job: "I need to put together a plan",
    pain: "Writing from a blank slate is exhausting",
    icon: NotePencil,
    who: "Dev P.",
    avatar: "/images/forecast/personas/dev.svg",
    role: "Planning a food truck",
    hue: "#FE551B",
  },
  {
    name: "Share",
    range: "60–90 days",
    job: "I need to share, publish & present my plan",
    pain: "Not knowing if anyone’s actually reading my plan",
    icon: PresentationChart,
    who: "Lena K.",
    avatar: "/images/forecast/personas/lena.svg",
    role: "Pitching her first investor",
    hue: "#2B8FD6",
  },
  {
    name: "Execute",
    range: "90–120 days",
    job: "I need to execute my plan",
    pain: "Standing up bookkeeping from scratch",
    icon: Storefront,
    who: "Marcus T.",
    avatar: "/images/forecast/personas/marcus.svg",
    role: "Signing a lease this week",
    hue: "#1F9D6B",
  },
  {
    name: "Run",
    range: "120+ days",
    job: "I need to run my successful business",
    pain: "Bouncing between QuickBooks and my forecast",
    icon: ChartLineUp,
    who: "Priya S.",
    avatar: "/images/forecast/personas/priya.svg",
    role: "Running a bakery, year two",
    hue: "#C2418E",
  },
];



// where most users were, and where the forecasting work was aimed
const USERS_AT = 1;
const BUILT_AT = 4;

// the rail, gap, and bracket are laid out from the column count, so they stay
// on the tile centres if a stage is added or a marker moves
const COLS = STAGES.length;
const centre = (i: number) => `${((i + 0.5) / COLS) * 100}%`;
// half a column, as a % of the bracket's own span, to land on the centres
const BRACKET_INSET = `${50 / (BUILT_AT - USERS_AT + 1)}%`;

// a dashed, marching outline drawn just outside the selected tile
// (rx = the tile's 12px radius + the ring's 5px offset)
function Ring() {
  return (
    <svg className={styles.ring} aria-hidden="true">
      <rect width="100%" height="100%" rx={17} />
    </svg>
  );
}

export default function JourneyTrack() {
  // the stage whose customer speaks in the bubble; starts where most users were
  const [active, setActive] = useState(USERS_AT);
  // plays the entrance once it scrolls into view
  const [shown, setShown] = useState(false);
  // ambient loops (marching dashes, pulse) only run while on screen
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // the newest entry wins if several crossings queued up
        const e = entries[entries.length - 1];
        setLive(e.isIntersecting);
        if (e.intersectionRatio >= 0.3) setShown(true);
      },
      { threshold: [0, 0.3] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stage = STAGES[active];

  return (
    <div
      ref={ref}
      className={styles.wrap}
      data-shown={shown || undefined}
      data-live={live || undefined}
    >
      {/* the voice of the customer at the selected stage, in a bubble above
          the track whose tail points down at its tile. --cp is that tile's
          centre as a fraction of the width; the CSS slides the bubble over it,
          kept in bounds. The buttons already carry this text, so the bubble
          is visual only. */}
      <div
        className={styles.voice}
        style={{ "--cp": (active + 0.5) / COLS, "--hue": stage.hue } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className={styles.bubble}>
          <div key={active} className={styles.bubbleInner}>
            <div className={styles.who}>
              <span className={styles.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stage.avatar} alt="" width={40} height={40} />
              </span>
              <span>
                <span className={styles.whoName}>{stage.who}</span>
                <span className={styles.whoRole}>{stage.role}</span>
              </span>
            </div>
            <p className={styles.quote}>“{stage.job}”</p>
            <p className={styles.pain}>
              <span className={styles.painTag}>Pain</span>
              {stage.pain}
            </p>
          </div>
        </div>
        <span className={styles.tail} />
      </div>

      <div
        className={styles.track}
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {/* the line runs tile centre to tile centre; the stretch from where
            users were to where we built marches orange with a pulse on it */}
        <svg className={styles.line} aria-hidden="true">
          <line x1={centre(0)} x2={centre(COLS - 1)} y1="4" y2="4" className={styles.rail} />
          <line
            x1={centre(USERS_AT)}
            x2={centre(BUILT_AT)}
            y1="4"
            y2="4"
            className={styles.gapLine}
          />
          <line
            x1={centre(USERS_AT)}
            x2={centre(BUILT_AT)}
            y1="4"
            y2="4"
            pathLength={100}
            className={styles.pulse}
          />
        </svg>

        {/* the markers describe their stage's button for screen readers */}
        <span
          id="journey-users"
          className={`${styles.marker} ${styles.markerUsers}`}
          style={{ gridColumn: USERS_AT + 1 }}
        >
          Most users
        </span>
        <span
          id="journey-built"
          className={`${styles.marker} ${styles.markerBuilt}`}
          style={{ gridColumn: BUILT_AT + 1 }}
        >
          We built here
        </span>

        {STAGES.map((s, i) => {
          const Glyph = s.icon;
          return (
            <button
              key={s.name}
              type="button"
              className={`${styles.stage} ${i === active ? styles.on : ""} ${
                i === USERS_AT ? styles.users : ""
              } ${i === BUILT_AT ? styles.built : ""}`}
              style={{ gridColumn: i + 1, "--i": i } as React.CSSProperties}
              // the button carries the job and pain itself, so the visual
              // bubble below needn't announce on every focus
              aria-label={`${s.name}, ${s.range}: ${s.job}. Pain: ${s.pain}`}
              aria-describedby={
                i === USERS_AT ? "journey-users" : i === BUILT_AT ? "journey-built" : undefined
              }
              aria-current={i === active || undefined}
              // mouse only — a touch that starts a scroll shouldn't select
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className={styles.tile}>
                <Ring />
                <Glyph size="46%" aria-hidden="true" />
              </span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.range}>{s.range}</span>
            </button>
          );
        })}

        {/* how far apart the two markers sit */}
        <div
          className={styles.gap}
          style={{
            gridColumn: `${USERS_AT + 1} / ${BUILT_AT + 2}`,
            paddingInline: BRACKET_INSET,
          }}
        >
          <span className={styles.gapLabel}>Months, if not years, away</span>
        </div>
      </div>

    </div>
  );
}
