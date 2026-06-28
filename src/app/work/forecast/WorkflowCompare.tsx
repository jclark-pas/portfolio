"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  UserRound,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";
import styles from "./WorkflowCompare.module.css";

// the three places the work happened — each shown with its real app icon.
// app glyphs (brand: false) are masked so they tint with the node color;
// QuickBooks keeps its full-colour brand mark.
const TOOLS = [
  { name: "Dashboard", icon: "/images/forecast/dashboard.svg", brand: false },
  { name: "QuickBooks", icon: "/images/forecast/qbo-logo.svg", brand: true },
  { name: "The forecast", icon: "/images/forecast/forecast.svg", brand: false },
];

const STEPS = [
  {
    seq: "First,",
    headline: "I want to see how I’m tracking against my forecast.",
    lead: "That information is in the…",
    tool: 0,
  },
  {
    seq: "Then,",
    headline: "I might have questions about the numbers I’m seeing.",
    lead: "So I need to head over to…",
    tool: 1,
  },
  {
    seq: "After that,",
    headline: "I need to spot trends and opportunities.",
    lead: "To do that, I’ll go back to the…",
    tool: 0,
  },
  {
    seq: "Finally,",
    headline: "I need to adjust my forecast based on what I found.",
    lead: "I can’t do that here — only in the…",
    tool: 2,
  },
];

// after: the same needs, but every one is met in one place
const AFTER_LEAD = "Now I can do all of it right here, in the…";

// wires (and the avatar) stop this far above the cards so the avatar
// hovers over an app rather than covering its icon
const NODE_GAP = 26;

// dwell on each need before advancing; the wrap-around back to the first need
// waits twice as long so the restart reads as a deliberate beat, not a skip
const STEP_MS = 4800;

type Mode = "before" | "after";
type Geo = {
  w: number;
  sx: number;
  sy: number;
  h: number;
  nodes: { cx: number; top: number }[];
};

export default function WorkflowCompare() {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<Mode>("before");
  const [playing, setPlaying] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);
  // the avatar's journey path; `id` bumps only on a real move so it replays
  const [travel, setTravel] = useState<{ d: string; id: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevToolRef = useRef<number | null>(null);
  const travelIdRef = useRef(1);

  // measure the wire geometry: source point (top) + each tool's top-centre
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const nodesEl = nodesRef.current;
      if (!track || !nodesEl) return;
      const tr = track.getBoundingClientRect();
      const nodes = ([...nodesEl.children] as HTMLElement[]).map((n) => {
        const r = n.getBoundingClientRect();
        return { cx: r.left - tr.left + r.width / 2, top: r.top - tr.top };
      });
      if (!nodes.length) return;
      const h = Math.min(...nodes.map((n) => n.top));
      setGeo({ w: tr.width, sx: tr.width / 2, sy: 6, h, nodes });
    };
    measure();
    // re-measure once the web font lands, so the wires/avatar don't sit on
    // pre-font geometry on first paint
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // autoplay through the needs once it scrolls into view (unless reduced motion)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPlaying(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
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
  }, [playing, active]);

  const go = useCallback((n: number) => {
    setPlaying(false);
    setActive(((n % STEPS.length) + STEPS.length) % STEPS.length);
  }, []);

  const replay = useCallback(() => {
    // forget where the avatar was parked so it re-enters from the source
    // (the top dot near the need) rather than travelling from the forecast
    prevToolRef.current = null;
    setActive(0);
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  // flipping Before/After replays the loop from the first need
  const switchMode = useCallback((m: Mode) => {
    setMode(m);
    setActive(0);
    setPlaying(true);
  }, []);

  // the run has finished its pass and is parked on the last need
  const atEnd = !playing && active === STEPS.length - 1;

  const cur = STEPS[active];
  const before = mode === "before";
  const activeTool = before ? cur.tool : 2;

  // build the avatar's travel path. A move retraces from where it stands, back
  // up to the branch point, then down to the next app — one continuous journey.
  useEffect(() => {
    if (!geo) return;
    const to = geo.nodes[activeTool];
    if (!to) return;
    const wireTo = (n: { cx: number; top: number }) => {
      const end = n.top - NODE_GAP;
      const mid = geo.sy + (end - geo.sy) * 0.5;
      return { end, mid };
    };
    const t = wireTo(to);
    const simple = `M ${geo.sx} ${geo.sy} C ${geo.sx} ${t.mid}, ${to.cx} ${t.mid}, ${to.cx} ${t.end}`;
    const prev = prevToolRef.current;
    if (prev != null && prev === activeTool) {
      // no real move (After mode stays on the forecast, or a resize):
      // reposition without replaying the animation
      setTravel((cur) => ({ d: simple, id: cur ? cur.id : travelIdRef.current }));
    } else if (prev == null) {
      // fresh entrance (first load or replay): drop in from the source down
      // to the node, animating the whole way
      travelIdRef.current += 1;
      setTravel({ d: simple, id: travelIdRef.current });
    } else {
      const from = geo.nodes[prev];
      const f = wireTo(from);
      // from the current app → up to the source → down to the next app
      const d =
        `M ${from.cx} ${f.end} C ${from.cx} ${f.mid}, ${geo.sx} ${f.mid}, ${geo.sx} ${geo.sy}` +
        ` C ${geo.sx} ${t.mid}, ${to.cx} ${t.mid}, ${to.cx} ${t.end}`;
      travelIdRef.current += 1;
      setTravel({ d, id: travelIdRef.current });
    }
    prevToolRef.current = activeTool;
  }, [activeTool, geo]);

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

      {/* wires fan from the need down to the apps; tool nodes below */}
      <div className={styles.track} ref={trackRef}>
        {geo ? (
          <svg
            className={styles.wires}
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            aria-hidden="true"
          >
            {geo.nodes.map((n, k) => {
              const on = k === activeTool;
              const dim = !before && k !== 2;
              const end = n.top - NODE_GAP;
              const midY = geo.sy + (end - geo.sy) * 0.5;
              const d = `M ${geo.sx} ${geo.sy} C ${geo.sx} ${midY}, ${n.cx} ${midY}, ${n.cx} ${end}`;
              return (
                <path
                  key={TOOLS[k].name}
                  d={d}
                  className={`${styles.wire} ${on ? styles.wireOn : ""} ${
                    dim ? styles.wireDim : ""
                  }`}
                />
              );
            })}
            <circle cx={geo.sx} cy={geo.sy} r="3.5" className={styles.source} />
          </svg>
        ) : null}

        {travel ? (
          <div
            key={travel.id}
            className={styles.traveler}
            style={{ offsetPath: `path('${travel.d}')` }}
            role="img"
            aria-label="The user, moving to the app"
          >
            <UserRound size={18} aria-hidden="true" />
          </div>
        ) : null}

        <div className={styles.nodes} ref={nodesRef}>
          {TOOLS.map((t, k) => {
            const on = k === activeTool;
            const dim = !before && k !== 2;
            return (
              <div
                key={t.name}
                className={`${styles.node} ${on ? styles.nodeOn : ""} ${
                  dim ? styles.dimmed : ""
                }`}
              >
                {t.brand ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.icon}
                    alt=""
                    width={22}
                    height={22}
                    className={styles.nodeIcon}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className={styles.appIcon}
                    style={{
                      maskImage: `url(${t.icon})`,
                      WebkitMaskImage: `url(${t.icon})`,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.nodeLabel}>{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>

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
              <Pause size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ) : (
              <Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
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
