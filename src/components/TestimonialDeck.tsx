"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Testimonial, { TestimonialData } from "./Testimonial";
import styles from "./TestimonialDeck.module.css";

// Offset (px) between each card peeking out of the stack
const PEEK = 4;

export default function TestimonialDeck({
  testimonials,
}: {
  testimonials: TestimonialData[];
}) {
  const [topIndex, setTopIndex] = useState(0);
  const [animating, setAnimating] = useState<{
    index: number;
    dir: "next" | "prev";
  } | null>(null);
  const [paused, setPaused] = useState(false);
  // Explicit, persistent play/pause toggled by the user (distinct from the
  // transient hover/focus pause above) — WCAG 2.2.2 Pause, Stop, Hide.
  const [userPaused, setUserPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = testimonials.length;

  // Track the reduced-motion preference; when set, the deck never auto-rotates
  // and the play/pause control is hidden (there's nothing to pause).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-advance every 10s unless the user is hovering/focused on the deck, has
  // pressed pause, or prefers reduced motion.
  useEffect(() => {
    if (paused || userPaused || reducedMotion || count <= 1) return;
    const timer = setTimeout(() => {
      setAnimating({ index: topIndex, dir: "next" });
      setTopIndex((topIndex + 1) % count);
    }, 10000);
    return () => clearTimeout(timer);
  }, [paused, userPaused, reducedMotion, topIndex, count]);

  // Backstop for onAnimationEnd: with prefers-reduced-motion the animation is
  // disabled and the event never fires, which would leave the deck locked.
  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => setAnimating(null), 750);
    return () => clearTimeout(timer);
  }, [animating]);

  const showNext = () => {
    if (animating) return;
    setAnimating({ index: topIndex, dir: "next" });
    setTopIndex((topIndex + 1) % count);
  };

  const showPrev = () => {
    if (animating) return;
    const entering = (topIndex - 1 + count) % count;
    setAnimating({ index: entering, dir: "prev" });
    setTopIndex(entering);
  };

  // Swipe support for touch devices: swipe left → next, right → prev.
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || count <= 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Ignore taps and mostly-vertical gestures (so page scroll still works)
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  return (
    <div
      className={styles.deck}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {count > 1 && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          onClick={showPrev}
          aria-label="Previous testimonial"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
      )}
      <div
        className={styles.stack}
        style={{ "--back-offset": `${(count - 1) * PEEK}px` } as CSSProperties}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {testimonials.map((testimonial, i) => {
          const pos = (i - topIndex + count) % count;
          const isAnimating = animating?.index === i;
          const animClass = isAnimating
            ? animating.dir === "next"
              ? styles.tuck
              : styles.untuck
            : "";
          return (
            <div
              key={testimonial.name}
              className={`${styles.card} ${animClass}`}
              style={
                {
                  "--tx": `${pos * PEEK}px`,
                  "--ty": `${pos * PEEK}px`,
                  zIndex: count - pos,
                } as CSSProperties
              }
              aria-hidden={pos !== 0}
              onAnimationEnd={() => isAnimating && setAnimating(null)}
            >
              <Testimonial {...testimonial} />
            </div>
          );
        })}
      </div>
      {count > 1 && (
        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={showNext}
          aria-label="Next testimonial"
        >
          <ArrowRight aria-hidden="true" />
        </button>
      )}
      {count > 1 && !reducedMotion && (
        <div className={styles.playPauseWrap}>
          <button
            type="button"
            className={styles.playPause}
            onClick={() => setUserPaused((p) => !p)}
            aria-label={
              userPaused
                ? "Play automatic testimonial rotation"
                : "Pause automatic testimonial rotation"
            }
            aria-pressed={userPaused}
          >
            {userPaused ? (
              <Play size={14} fill="currentColor" aria-hidden="true" />
            ) : (
              <Pause size={14} fill="currentColor" aria-hidden="true" />
            )}
            <span>{userPaused ? "Play" : "Pause"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
