"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./JourneyFunnel.module.css";

type Category = "pains" | "needs" | "desires";
type Signal = { text: string; category: Category };

type Step = {
  range: string;
  job: string;
  /** geometry, as % of the funnel container's width */
  topEdge: number;
  bottomEdge: number;
  signals: Signal[];
  /** editorial callout shown inside the segment, above the eyebrow */
  callout?: string;
};

/**
 * The lifecycle jobs-to-be-done funnel I built to make the strategic case.
 * Most users — and most of the churn — sit at the wide top; the forecasting
 * and actuals work served the narrow bottom. Hovering a segment scatters that
 * step's pains / needs / desires out of the top, like they spilled from inside.
 */
const STEPS: Step[] = [
  {
    range: "0–60 days",
    job: "I need to put together a plan",
    callout: "Our users were struggling here",
    topEdge: 100,
    bottomEdge: 80,
    signals: [
      { text: "Writing from a blank slate is exhausting", category: "pains" },
      { text: "Re-writing inaccurate AI is tedious", category: "pains" },
      { text: "Guidance on the right questions to answer", category: "needs" },
      { text: "A finished business plan document", category: "needs" },
      { text: "AI will help me write my plan", category: "desires" },
      { text: "AI will help me prepare my forecast", category: "desires" },
      { text: "I expect the system to draft my plan and financials", category: "desires" },
    ],
  },
  {
    range: "60–90 days",
    job: "I need to share, publish & present my plan",
    topEdge: 80,
    bottomEdge: 60,
    signals: [
      { text: "Not knowing if anyone's actually reading my plan", category: "pains" },
      { text: "Share my plan with an investor", category: "needs" },
      { text: "An impressive presentation deck", category: "needs" },
      { text: "Export to PDF with a polished template", category: "desires" },
    ],
  },
  {
    range: "90–120 days",
    job: "I need to execute my plan",
    topEdge: 60,
    bottomEdge: 42,
    signals: [
      { text: "Standing up bookkeeping from scratch", category: "pains" },
      { text: "Apply for a loan", category: "needs" },
      { text: "Get liability insurance", category: "needs" },
      { text: "Buy equipment", category: "needs" },
      { text: "Secure a lease", category: "needs" },
      { text: "Hire my first employees", category: "desires" },
    ],
  },
  {
    range: "120+ days",
    job: "I need to run my successful business",
    callout: "We were working here",
    topEdge: 42,
    bottomEdge: 34,
    signals: [
      { text: "Bouncing between QuickBooks and my forecast", category: "pains" },
      { text: "Manage my cash", category: "needs" },
      { text: "Review my transactions for accuracy", category: "needs" },
      { text: "Adjust my forecast against actual performance", category: "needs" },
      { text: "Compare this year against last", category: "needs" },
      { text: "Add a product line", category: "desires" },
      { text: "See if I can give raises to my employees", category: "desires" },
      { text: "Reconsider my business model", category: "desires" },
    ],
  },
];

const LEGEND: { category: Category; label: string }[] = [
  { category: "pains", label: "Pains" },
  { category: "needs", label: "Needs" },
  { category: "desires", label: "Desires" },
];

// Fill deepens and drifts coral → rose down the funnel (a nod to the FigJam
// pink, kept in the warm brand family). Vibrant enough for cream text on navy.
const BAND_FILLS = ["#C2563F", "#CB5050", "#D44A5C", "#DD4369"];

function bandVars(step: Step, i: number) {
  const w = step.topEdge;
  // clip inset at the bottom, as a % of the band's OWN box width
  const inset = (((step.topEdge - step.bottomEdge) / 2) / step.topEdge) * 100;
  // size content to ~90% of the band's mid-height width (where the centered
  // label sits) so the text keeps a margin from the sloped sides
  const cw = ((((step.topEdge + step.bottomEdge) / 2) / step.topEdge) * 100) * 0.9;
  return {
    "--w": `${w}%`,
    "--inset": `${inset}%`,
    "--cw": `${cw}%`,
    "--fill": BAND_FILLS[i] ?? BAND_FILLS[BAND_FILLS.length - 1],
    "--i": i,
  } as React.CSSProperties;
}

// Where each chip lands when it bursts out of the top — a wide upward fountain,
// deterministic so it's stable across renders. j = index, n = count in the step.
function chipVars(j: number, n: number) {
  // Spread left → right across the segment's top edge…
  const xFrac = n === 1 ? 0 : (j / (n - 1)) * 2 - 1; // -1..1
  const reachX = 250; // keep narrow so outer chips stay on-screen
  const tx = Math.round(xFrac * reachX);
  // …and cycle three height tiers so they stack taller, not wider.
  const tiers = [44, 92, 140];
  const arc = Math.round(Math.abs(xFrac) * 14); // outer chips dip slightly
  const ty = -(tiers[j % 3] - arc);
  const rot = (j % 2 === 0 ? 1 : -1) * (2 + ((j * 13) % 5)); // small tilt
  return {
    "--tx": tx,
    "--ty": ty,
    "--rot": rot,
    "--j": j,
  } as React.CSSProperties;
}

export default function JourneyFunnel() {
  const [formed, setFormed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setFormed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setFormed(true), 200);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={`${styles.figure} ${formed ? styles.formed : ""}`}>
        <div className={styles.funnel} aria-label="Customer journey stages">
          {STEPS.map((step, i) => (
            <div key={step.range} className={styles.bandRow} style={bandVars(step, i)}>
              <button
                type="button"
                className={`${styles.band} ${step.callout ? styles.bandTall : ""}`}
                aria-label={`${step.range}: ${step.job}. ${step.signals
                  .map((s) => s.text)
                  .join("; ")}`}
              >
                <span className={styles.bandInner}>
                  <span className={styles.range}>{step.range}</span>
                  <span className={styles.job}>{step.job}</span>
                  {step.callout ? (
                    <span className={styles.callout}>{step.callout}</span>
                  ) : null}
                </span>
              </button>

              {/* chips live OUTSIDE the clipped band so they can fly free */}
              <div className={styles.burst} aria-hidden="true">
                {step.signals.map((sig, j) => (
                  <span
                    key={sig.text}
                    className={styles.flyChip}
                    style={chipVars(j, step.signals.length)}
                  >
                    <span className={`${styles.dot} ${styles[sig.category]}`} />
                    {sig.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendHint}>Hover a stage</span>
        {LEGEND.map((l) => (
          <span key={l.category} className={styles.legendItem}>
            <span className={`${styles.dot} ${styles[l.category]}`} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
