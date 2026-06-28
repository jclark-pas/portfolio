"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  LineChart,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  UserRound,
} from "lucide-react";
import styles from "./WorkflowCompare.module.css";

const TOOLS = [
  { name: "Dashboard", Icon: LayoutDashboard },
  { name: "QuickBooks", Icon: ReceiptText },
  { name: "The forecast", Icon: LineChart },
];

const STEPS = [
  { job: "I need to see how I’m tracking", tool: 0, trail: "Opened the dashboard" },
  { job: "I need to trust my actuals", tool: 1, trail: "Jumped to QuickBooks" },
  { job: "I need to spot trends and opportunities", tool: 0, trail: "Back to the dashboard" },
  { job: "I need to adjust my forecast", tool: 2, trail: "Finally, into the forecast" },
];

function switchesUpTo(n: number) {
  let s = 0;
  for (let k = 1; k <= n; k++) if (STEPS[k].tool !== STEPS[k - 1].tool) s++;
  return s;
}

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
  const rootRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(
      () => setActive((a) => (a + 1) % STEPS.length),
      1700
    );
    return () => window.clearInterval(t);
  }, [playing]);

  const go = useCallback((n: number) => {
    setPlaying(false);
    setActive(((n % STEPS.length) + STEPS.length) % STEPS.length);
  }, []);

  const cur = STEPS[active];
  const before = mode === "before";
  const activeTool = before ? cur.tool : 2;

  return (
    <div className={styles.wrap} ref={rootRef}>
      {/* before / after toggle */}
      <div className={styles.toggle} role="tablist" aria-label="Before or after">
        <button
          type="button"
          role="tab"
          aria-selected={before}
          className={`${styles.seg} ${before ? styles.segOn : ""}`}
          onClick={() => setMode("before")}
        >
          Before
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!before}
          className={`${styles.seg} ${!before ? styles.segOn : ""}`}
          onClick={() => setMode("after")}
        >
          After
        </button>
      </div>

      {/* the user need — the focal point */}
      <div
        className={styles.user}
        role="img"
        aria-label={`User need ${active + 1} of 4`}
      >
        <UserRound size={22} aria-hidden="true" />
      </div>
      <h3 className={styles.jobTitle}>{cur.job}</h3>

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
              const midY = geo.sy + (n.top - geo.sy) * 0.5;
              const d = `M ${geo.sx} ${geo.sy} C ${geo.sx} ${midY}, ${n.cx} ${midY}, ${n.cx} ${n.top}`;
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

        <div className={styles.nodes} ref={nodesRef}>
          {TOOLS.map((t, k) => {
            const Icon = t.Icon;
            const on = k === activeTool;
            const dim = !before && k !== 2;
            return (
              <div
                key={t.name}
                className={`${styles.node} ${on ? styles.nodeOn : ""} ${
                  dim ? styles.dimmed : ""
                }`}
              >
                <Icon className={styles.nodeIcon} size={22} aria-hidden="true" />
                <span className={styles.nodeLabel}>{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* status line */}
      <p className={styles.status}>
        <span className={styles.switchNum}>{before ? switchesUpTo(active) : 0}</span>{" "}
        app switches
        <span className={styles.dotSep} aria-hidden="true">
          ·
        </span>
        {before ? cur.trail : "Never left the forecast"}
      </p>

      {/* step controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          aria-label="Previous need"
          onClick={() => go(active - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className={styles.btn}
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <div className={styles.dots}>
          {STEPS.map((s, i) => (
            <button
              key={s.job}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotOn : ""}`}
              aria-label={`Go to need ${i + 1}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.btn}
          aria-label="Next need"
          onClick={() => go(active + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
