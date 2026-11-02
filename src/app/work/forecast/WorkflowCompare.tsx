"use client";

import {
  useCallback,
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
  CaretLeft as ChevronLeft,
  CaretRight as ChevronRight,
  ArrowCounterClockwise as RotateCcw,
  Play,
  Pause,
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

// dwell on each need before advancing; the wrap-around back to the first need
// waits twice as long so the restart reads as a deliberate beat, not a skip
const STEP_MS = 4800;

// The diagram is drawn on a fixed 600×320 grid: the SVG uses it as its viewBox
// and the HTML tiles are placed at percentages of it, so wires and tiles stay
// locked together at any width without measuring the DOM.
const W = 600;
const H = 320;
const at = (p: { x: number; y: number }) =>
  ({ "--x": `${(p.x / W) * 100}%`, "--y": `${(p.y / H) * 100}%` }) as CSSProperties;

const USER = { x: 300, y: 56 };

// before: one tile per app along the bottom, wired to the user with
// GitBook-style elbowed connectors (tiles are 64 units, so ±32 to an edge)
const APP_POS = [
  { x: 120, y: 236 },
  { x: 300, y: 236 },
  { x: 480, y: 236 },
];
const WIRES = [
  "M288 88 V134 Q288 146 276 146 H132 Q120 146 120 158 V204",
  "M300 88 V204",
  "M312 88 V134 Q312 146 324 146 H468 Q480 146 480 158 V204",
];

// after: the forecast becomes a hub ringed by a loop track. Each need is a
// station on the loop, and a comet travels the track from one to the next.
const HUB = { x: 300, y: 200 };
const LOOP = "M100 140 H500 A60 60 0 0 1 500 260 H100 A60 60 0 0 1 100 140 Z";
const ENTRY = "M300 88 V140";
const ARC = Math.PI * 60;
const LOOP_LEN = 800 + 2 * ARC;
const STATIONS = [
  { x: 150, y: 140, d: 50 },
  { x: 450, y: 140, d: 350 },
  { x: 450, y: 260, d: 400 + ARC + 50 },
  { x: 150, y: 260, d: 400 + ARC + 350 },
];
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
  const [playing, setPlaying] = useState(false);
  // ambient motion (marching wires, comet) only runs while on screen
  const [live, setLive] = useState(false);
  // where the comet sits on the loop, in % — it only ever moves to the nearest
  // copy of the next station, so stepping past the last one keeps orbiting
  const [comet, setComet] = useState(stationPct(0));
  // bumps on each entry to After so the comet mounts in place, not mid-flight
  const [afterRun, setAfterRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // reduced-motion visitors step through by hand; nothing autoplays
  const reducedRef = useRef(false);

  // autoplay through the needs once it scrolls into view (unless reduced
  // motion), and pause the ambient loops whenever it's off screen
  useEffect(() => {
    const el = rootRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        // the newest entry wins if several crossings queued up
        const e = entries[entries.length - 1];
        setLive(e.isIntersecting);
        if (!reduced && !started && e.intersectionRatio >= 0.4) {
          started = true;
          setPlaying(true);
        }
      },
      { threshold: [0, 0.4] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // play through the needs on a continuous loop; the wrap from the last need
  // back to the first dwells twice as long so the restart reads deliberately
  useEffect(() => {
    if (!playing) return;
    const last = active >= STEPS.length - 1;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % STEPS.length),
      last ? STEP_MS * 2 : STEP_MS
    );
    return () => window.clearTimeout(t);
    // mode restarts the dwell, so a fresh scene gets its full time on step one
  }, [playing, active, mode]);

  // in After, glide the comet to the active need's station
  useEffect(() => {
    if (mode !== "after") return;
    const target = stationPct(active);
    setComet((c) => target + 100 * Math.round((c - target) / 100));
  }, [active, mode]);

  const go = useCallback((n: number) => {
    setPlaying(false);
    setActive(((n % STEPS.length) + STEPS.length) % STEPS.length);
  }, []);

  const replay = useCallback(() => {
    setActive(0);
    setPlaying(!reducedRef.current);
  }, []);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  // flipping Before/After replays the loop from the first need
  const switchMode = useCallback(
    (m: Mode) => {
      if (m === "after" && mode !== "after") {
        setComet(stationPct(0));
        setAfterRun((r) => r + 1);
      }
      setMode(m);
      setActive(0);
      setPlaying(!reducedRef.current);
    },
    [mode]
  );

  // the run has finished its pass and is parked on the last need
  const atEnd = !playing && active === STEPS.length - 1;

  const cur = STEPS[active];
  const before = mode === "before";
  const activeTool = before ? cur.tool : 2;

  // how fragmented the work has been so far: apps touched, and hops between them
  const path = before ? STEPS.slice(0, active + 1).map((s) => s.tool) : [2];
  const apps = new Set(path).size;
  const switches = path.filter((t, i) => i > 0 && t !== path[i - 1]).length;

  return (
    <div className={styles.wrap} ref={rootRef}>
      <h3 className={styles.title}>User Journey</h3>

      {/* before / after toggle — flips the whole loop */}
      <div className={styles.toggle} role="tablist" aria-label="Before or after">
        <button
          type="button"
          role="tab"
          aria-selected={before}
          className={`${styles.seg} ${before ? styles.segOn : ""}`}
          onClick={() => switchMode("before")}
        >
          Before
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!before}
          className={`${styles.seg} ${!before ? styles.segOn : ""}`}
          onClick={() => switchMode("after")}
        >
          After
        </button>
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
            <circle cx={300} cy={140} r={3.5} className={styles.portOn} />
          </g>

          <circle cx={USER.x} cy={88} r={3.5} className={styles.portOn} />
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

      {/* the cost of the journey so far — keyed so a changed count pops */}
      <p className={styles.stats}>
        <span>
          <b key={`apps-${apps}`}>{apps}</b> {apps === 1 ? "app" : "apps"}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          <b key={`switches-${switches}`}>{switches}</b>{" "}
          {switches === 1 ? "switch" : "switches"}
        </span>
      </p>

      {/* arrows flank a centre control: play/pause while progressing,
          ⟲ Replay once the run has ended */}
      <div className={styles.progress}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous need"
          onClick={() => go(active - 1)}
          disabled={active === 0}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {atEnd ? (
          <button
            type="button"
            className={`${styles.ctrlBtn} ${styles.replay}`}
            onClick={replay}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Replay
          </button>
        ) : (
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={13} aria-hidden="true" />
            ) : (
              <Play size={13} aria-hidden="true" />
            )}
            {playing ? "Pause" : "Play"}
          </button>
        )}

        <button
          type="button"
          className={styles.arrow}
          aria-label="Next need"
          onClick={() => go(active + 1)}
          disabled={active === STEPS.length - 1}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
