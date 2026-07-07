"use client";

import { useEffect, useRef } from "react";
import { timelineRoles } from "@/data/experience";
import styles from "./WorkTimeline.module.css";

/**
 * Horizontal, swipeable work history. Same full-bleed mechanics as
 * FeaturedWorkSlider — the track bleeds to the viewport edges, the first/last
 * node still align to the content column, and the edge scrims ease in with
 * scroll distance. A continuous rail runs through the node dots so the row
 * reads as one timeline rather than a set of cards.
 */
export default function WorkTimeline() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftFadeRef = useRef<HTMLDivElement>(null);
  const rightFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const RAMP = 48;

    const measureGutter = () => {
      const parent = viewport.parentElement;
      if (!parent) return;
      const gutter = Math.max(0, Math.round(parent.getBoundingClientRect().left));
      viewport.style.setProperty("--gutter", `${gutter}px`);
    };

    const updateFade = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      const overflow = scrollWidth - clientWidth;
      const left = overflow > 0 ? Math.min(scrollLeft / RAMP, 1) : 0;
      const right =
        overflow > 0 ? Math.min((overflow - scrollLeft) / RAMP, 1) : 0;
      if (leftFadeRef.current) leftFadeRef.current.style.opacity = String(left);
      if (rightFadeRef.current)
        rightFadeRef.current.style.opacity = String(right);
    };

    const onResize = () => {
      measureGutter();
      updateFade();
    };

    measureGutter();
    updateFade();
    track.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={viewportRef} className={styles.viewport}>
      <div ref={trackRef} className={styles.track}>
        {timelineRoles.map((r) => (
          <article key={r.company + r.dates} className={styles.node}>
            <div className={styles.rail}>
              <span
                className={`${styles.dot} ${r.current ? styles.dotCurrent : ""}`}
                aria-hidden="true"
              />
            </div>
            <p className={styles.dates}>
              {r.dates}
              {r.current ? <span className={styles.nowTag}>Now</span> : null}
            </p>
            <h3 className={styles.company}>{r.company}</h3>
            <p className={styles.role}>{r.role}</p>
            <p className={styles.outcome}>{r.outcome}</p>
          </article>
        ))}
      </div>
      <div
        ref={leftFadeRef}
        className={`${styles.fade} ${styles.fadeLeft}`}
        aria-hidden="true"
      />
      <div
        ref={rightFadeRef}
        className={`${styles.fade} ${styles.fadeRight}`}
        aria-hidden="true"
      />
    </div>
  );
}
