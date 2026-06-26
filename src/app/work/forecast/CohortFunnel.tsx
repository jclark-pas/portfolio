"use client";

import { useEffect, useRef, useState } from "react";

export type CohortRow = { label: string; note: string; width: string };

/**
 * The cohort-shrink funnel. Every bar starts at full width (like "Active
 * accounts") and then collapses to its true proportion once the card scrolls
 * into view — you watch the drop-off happen. Labels ride each bar's tip, so
 * they slide left as the bars shrink. Honors prefers-reduced-motion.
 */
export default function CohortFunnel({ rows }: { rows: CohortRow[] }) {
  const [shrunk, setShrunk] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShrunk(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Let the full-width state paint for a beat before collapsing.
            window.setTimeout(() => setShrunk(true), 200);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        marginTop: "var(--space-xxl)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
        padding: "var(--space-xl)",
        background: "rgba(253, 251, 247, 0.05)",
        border: "1px solid rgba(253, 251, 247, 0.14)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          style={{ width: "66%", display: "flex", alignItems: "center", gap: "14px" }}
        >
          <div
            style={{
              width: shrunk ? row.width : "100%",
              minWidth: "4px",
              height: "34px",
              flexShrink: 0,
              borderRadius: "var(--radius-md)",
              background: "var(--color-accent-on-dark)",
              transition: "width 900ms cubic-bezier(0.22, 1, 0.36, 1)",
              transitionDelay: `${i * 110}ms`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.2,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "15px", color: "rgba(253,251,247,0.92)" }}>
              {row.label}
            </span>
            {row.note ? (
              <em style={{ fontSize: "13px", color: "rgba(253,251,247,0.55)" }}>
                {row.note}
              </em>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
