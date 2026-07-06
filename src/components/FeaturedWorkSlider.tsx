"use client";

import { useEffect, useRef } from "react";
import FeaturedWorkCard, { type FeaturedWork } from "./FeaturedWorkCard";
import styles from "./FeaturedWorkSlider.module.css";

/**
 * Fixed-width case-study cards that sit statically while they all fit, and turn
 * into a horizontal swipe track once the viewport gets too narrow. The track
 * bleeds to the viewport edges (so cards scroll off the page, not the column),
 * while the first/last card still align with the content column. The edge
 * scrims ease in proportionally as you scroll rather than popping on.
 */
export default function FeaturedWorkSlider({
  items,
}: {
  items: FeaturedWork[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftFadeRef = useRef<HTMLDivElement>(null);
  const rightFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    // px of scroll over which each edge fade eases from 0 → full
    const RAMP = 48;

    // The content column's inset, measured from the (un-bled) parent so the CSS
    // stays page-agnostic. Drives both the track's leading/trailing padding
    // (card alignment) and the viewport's negative margin (full-bleed).
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
        {items.map((work) => (
          <div key={work.href} className={styles.item}>
            <FeaturedWorkCard work={work} />
          </div>
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
