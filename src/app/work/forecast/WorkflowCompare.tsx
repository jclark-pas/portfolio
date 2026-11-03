"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  User,
  Target,
  MagnifyingGlass,
  TrendUp,
  SlidersHorizontal,
  Check,
} from "@phosphor-icons/react";
import styles from "./WorkflowCompare.module.css";

// the three places the work happened — each shown with its real app icon.
// app glyphs (brand: false) are masked so they tint with the tile color;
// QuickBooks keeps its full-colour brand mark.
const TOOLS = [
  { name: "Dashboard", icon: "/images/forecast/dashboard.svg", brand: false },
  { name: "QuickBooks", icon: "/images/forecast/qbo-logo.svg", brand: true },
  { name: "Forecast", icon: "/images/forecast/forecast.svg", brand: false },
];

const STEPS = [
  {
    seq: "First,",
    headline: "I want to see how I’m tracking against my forecast.",
    lead: "That information is in the…",
    tool: 0,
    label: "Track",
    icon: Target,
  },
  {
    seq: "Then,",
    headline: "I might have questions about the numbers I’m seeing.",
    lead: "So I need to head over to…",
    tool: 1,
    label: "Investigate",
    icon: MagnifyingGlass,
  },
  {
    seq: "After that,",
    headline: "I need to spot trends and opportunities.",
    lead: "To do that, I’ll go back to the…",
    tool: 0,
    label: "Spot trends",
    icon: TrendUp,
  },
  {
    seq: "Finally,",
    headline: "I need to adjust my forecast based on what I found.",
    lead: "I can’t do that here — only in the…",
    tool: 2,
    label: "Adjust",
    icon: SlidersHorizontal,
  },
];

// after: the same needs, but every one is met in one place
const AFTER_LEAD = "Now I can do all of it right here, in the…";

// dwell on each need before advancing. The story plays Before straight into
// After; After's last need dwells twice as long so the restart reads as a
// deliberate beat, not a skip.
const STEP_MS = 4800;
const LAST = STEPS.length - 1;

// The diagram is drawn on a fixed 600×270 grid: the SVG uses it as its viewBox
// and the HTML tiles are placed at percentages of it, so wires and tiles stay
// locked together at any width without measuring the DOM.
const W = 600;
const H = 270;
const at = (p: { x: number; y: number }) =>
  ({ "--x": `${(p.x / W) * 100}%`, "--y": `${(p.y / H) * 100}%` }) as CSSProperties;

// tiles are 64 units square, so ±32 reaches an edge
const USER = { x: 300, y: 44 };
const USER_FOOT = USER.y + 32;

// before: one tile per app along the bottom, wired to the user with
// GitBook-style elbowed connectors
const APP_POS = [
  { x: 120, y: 200 },
  { x: 300, y: 200 },
  { x: 480, y: 200 },
];
const WIRES = [
  "M288 76 V110 Q288 122 276 122 H132 Q120 122 120 134 V168",
  "M300 76 V168",
  "M312 76 V110 Q312 122 324 122 H468 Q480 122 480 134 V168",
];

// after: the forecast becomes a hub ringed by a loop track. Each need is a
// station on the loop, and a comet travels the track from one to the next.
const LOOP_L = 40;
const LOOP_R = 560;
const LOOP_T = 112;
const LOOP_B = 220;
const R = (LOOP_B - LOOP_T) / 2;
const LOOP = `M${LOOP_L + R} ${LOOP_T} H${LOOP_R - R} A${R} ${R} 0 0 1 ${LOOP_R - R} ${LOOP_B} H${LOOP_L + R} A${R} ${R} 0 0 1 ${LOOP_L + R} ${LOOP_T} Z`;
const ENTRY = `M${USER.x} ${USER_FOOT} V${LOOP_T}`;
const HUB = { x: 300, y: (LOOP_T + LOOP_B) / 2 };
const STRAIGHT = LOOP_R - LOOP_L - 2 * R;
const ARC = Math.PI * R;
const LOOP_LEN = 2 * STRAIGHT + 2 * ARC;
// distance along LOOP (it starts top-left, heading right) to a point on the
// top run, or on the bottom run (reached after the top run and right arc)
const onTop = (x: number) => ({ x, y: LOOP_T, d: x - (LOOP_L + R) });
const onBottom = (x: number) => ({
  x,
  y: LOOP_B,
  d: STRAIGHT + ARC + (LOOP_R - R - x),
});
const STATIONS = [onTop(150), onTop(450), onBottom(450), onBottom(150)];
// where each station sits along the loop, as a % of its length
const stationPct = (k: number) => (STATIONS[k].d / LOOP_LEN) * 100;
// the comet's length, as a % of the loop
const COMET = 10;

type Mode = "before" | "after";

// a dashed, marching outline drawn just outside a tile (shown when active)
function Ring({ rx }: { rx: number }) {
  return (
    <svg className={styles.ring} aria-hidden="true">
      <rect width="100%" height="100%" rx={rx} />
    </svg>
  );
}

function AppGlyph({ tool }: { tool: (typeof TOOLS)[number] }) {
  return tool.brand ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={tool.icon} alt="" className={styles.brandIcon} aria-hidden="true" />
  ) : (
    <span
      className={styles.appIcon}
      style={{ maskImage: `url(${tool.icon})`, WebkitMaskImage: `url(${tool.icon})` }}
      aria-hidden="true"
    />
  );
}

export default function WorkflowCompare() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("before");
  // the story starts the first time it scrolls into view...
  const [started, setStarted] = useState(false);
  // ...and holds on the current need while a reader hovers, tabs into it, or
  // taps it on a touch screen (tap again to let it run). Tracked separately so
  // ending one kind of hold doesn't cancel another.
  const [hoverHold, setHoverHold] = useState(false);
  const [focusHold, setFocusHold] = useState(false);
  const [touchHold, setTouchHold] = useState(false);
  // ambient motion (marching wires, comet) only runs while on screen
  const [live, setLive] = useState(false);
  // where the comet sits on the loop, in % — it only ever moves to the nearest
  // copy of the next station, so stepping past the last one keeps orbiting
  const [comet, setComet] = useState(stationPct(0));
  // bumps on each entry to After so the comet mounts in place, not mid-flight
  const [afterRun, setAfterRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // There are no playback controls, so the needs advance for everyone —
  // reduced-motion visitors included (their CSS drops the motion, so the text
  // and diagram just change in place). Everything rests while off screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // the newest entry wins if several crossings queued up
        const e = entries[entries.length - 1];
        setLive(e.isIntersecting);
        if (e.intersectionRatio >= 0.4) setStarted(true);
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // the story only advances while it's on screen and nobody is holding it
  const running = started && live && !hoverHold && !focusHold && !touchHold;
  const before = mode === "before";
  const dwell = !before && active === LAST ? STEP_MS * 2 : STEP_MS;

  // move to a need in a scene; going to After (fresh, or restarting it from
  // its tab) parks the comet on that need's station and remounts it, so it
  // never flies there — or backwards round the loop — from its last spot
  const enter = (m: Mode, step: number) => {
    if (m === "after") {
      setComet(stationPct(step));
      setAfterRun((r) => r + 1);
    }
    setMode(m);
    setActive(step);
  };

  // play through Before, roll straight into After, then loop back to Before.
  // a hold clears the timer, so the need gets its full dwell on release.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (active < LAST) setActive(active + 1);
      else enter(before ? "after" : "before", 0);
    }, dwell);
    return () => window.clearTimeout(t);
    // enter() closes over mode, which is a dependency here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, active, mode]);

  // in After, glide the comet to the active need's station
  useEffect(() => {
    if (mode !== "after") return;
    const target = stationPct(active);
    setComet((c) => target + 100 * Math.round((c - target) / 100));
  }, [active, mode]);

  const cur = STEPS[active];
  const activeTool = before ? cur.tool : 2;

  // a scene's dots: done, current, or still to come
  const dotState = (m: Mode, k: number) => {
    if (m !== mode) return m === "before" ? styles.done : "";
    if (k < active) return styles.done;
    return k === active ? styles.now : "";
  };

  return (
    <div
      className={styles.wrap}
      ref={rootRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHoverHold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHoverHold(false)}
      // a tap anywhere but the tabs toggles a touch hold
      onPointerUp={(e) => {
        if (e.pointerType !== "touch") return;
        if ((e.target as Element).closest('[role="tablist"]')) return;
        setTouchHold((h) => !h);
      }}
      // only keyboard focus holds; a mouse click on a tab shouldn't pin it
      onFocus={(e) => e.target.matches(":focus-visible") && setFocusHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusHold(false);
      }}
    >
      <h3 className={styles.title}>User Journey</h3>

      {/* before / after toggle, doubling as the story's progress: a dot per
          need, the current one filling over its dwell. After nudges when it's
          up next, so the second half is easy to find. */}
      <div
        className={styles.toggle}
        role="tablist"
        aria-label="Before or after"
        data-playing={running || undefined}
      >
        {(["before", "after"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            className={`${styles.seg} ${mode === m ? styles.segOn : ""} ${
              m === "after" && before && active === LAST ? styles.segNext : ""
            }`}
            onClick={() => enter(m, 0)}
          >
            {m === "before" ? "Before" : "After"}
            <span className={styles.dots} aria-hidden="true">
              {STEPS.map((s, k) => (
                <span key={s.label} className={`${styles.dot} ${dotState(m, k)}`}>
                  {m === mode && k === active ? (
                    <span
                      key={`${mode}-${active}-${running}`}
                      className={styles.fill}
                      style={{ "--dwell": `${dwell}ms` } as CSSProperties}
                    />
                  ) : null}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {/* the user need — voiced in a speech bubble pointing at the user below.
          keyed so each step's need re-animates in (staggered fade-up). */}
      <div className={styles.bubble}>
        <div key={`${active}-${mode}`} className={styles.need}>
          <p className={styles.seq}>{cur.seq}</p>
          <p className={styles.headline}>{cur.headline}</p>
          <p className={styles.lead}>{before ? cur.lead : AFTER_LEAD}</p>
        </div>
      </div>

      <div className={styles.canvas} data-mode={mode} data-live={live || undefined}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          {/* before: wires fan from the user to each app; the active one
              marches and carries a pulse down to the app */}
          <g className={styles.beforeLayer}>
            {WIRES.map((d, k) => (
              <path
                key={TOOLS[k].name}
                d={d}
                className={`${styles.wire} ${k === activeTool ? styles.wireOn : ""}`}
              />
            ))}
            {before ? (
              <path
                key={`pulse-${active}`}
                d={WIRES[activeTool]}
                pathLength={100}
                className={styles.pulse}
              />
            ) : null}
            {APP_POS.map((p, k) => (
              <circle
                key={TOOLS[k].name}
                cx={p.x}
                cy={p.y - 32}
                r={3.5}
                className={`${styles.port} ${k === activeTool ? styles.portOn : ""}`}
              />
            ))}
          </g>

          {/* after: one loop around the forecast, a comet orbiting it */}
          <g className={styles.afterLayer}>
            <path d={LOOP} className={styles.loop} />
            {(["comet", "cometCore"] as const).map((c) => (
              <path
                key={`${c}-${afterRun}`}
                d={LOOP}
                pathLength={100}
                className={styles[c]}
                style={{ strokeDashoffset: -(comet - COMET / 2) }}
              />
            ))}
            <path d={ENTRY} className={`${styles.wire} ${styles.wireOn}`} />
            <path d={ENTRY} pathLength={100} className={styles.pulse} />
            <circle cx={USER.x} cy={LOOP_T} r={3.5} className={styles.portOn} />
          </g>

          <circle cx={USER.x} cy={USER_FOOT} r={3.5} className={styles.portOn} />
        </svg>

        <div className={`${styles.tile} ${styles.user}`} style={at(USER)}>
          <span className={styles.avatar}>
            <User size="58%" aria-hidden="true" />
          </span>
        </div>

        {TOOLS.map((t, k) => (
          <div
            key={t.name}
            className={`${styles.tile} ${styles.app} ${
              before && k === activeTool ? styles.on : ""
            }`}
            style={at(before ? APP_POS[k] : HUB)}
            aria-hidden={!before}
          >
            <Ring rx={17} />
            <AppGlyph tool={t} />
            <span className={styles.label}>{t.name}</span>
          </div>
        ))}

        <div className={`${styles.tile} ${styles.hub}`} style={at(HUB)} aria-hidden={before}>
          <Ring rx={17} />
          <AppGlyph tool={TOOLS[2]} />
          <span className={styles.hubLabel}>{TOOLS[2].name}</span>
        </div>

        {STEPS.map((s, k) => {
          const Glyph = s.icon;
          return (
            <div
              key={s.label}
              className={`${styles.tile} ${styles.station} ${
                !before && k === active ? styles.on : ""
              } ${k < 2 ? styles.top : ""}`}
              style={{ ...at(STATIONS[k]), "--i": k } as CSSProperties}
              aria-hidden={before}
            >
              <Ring rx={17} />
              <Glyph size="46%" aria-hidden="true" />
              {!before && k <= active ? (
                <span className={styles.check}>
                  <Check size="62%" weight="bold" aria-hidden="true" />
                </span>
              ) : null}
              <span className={styles.label}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
