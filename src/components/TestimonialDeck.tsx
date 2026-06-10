"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Testimonial, { TestimonialData } from "./Testimonial";
import styles from "./TestimonialDeck.module.css";

// Offset (px) between each card peeking out of the stack
const PEEK = 14;

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
  const count = testimonials.length;

  // Auto-advance every 5s unless the user is hovering or focused on the deck
  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setTimeout(() => {
      setAnimating({ index: topIndex, dir: "next" });
      setTopIndex((topIndex + 1) % count);
    }, 5000);
    return () => clearTimeout(timer);
  }, [paused, topIndex, count]);

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
          className={styles.arrow}
          onClick={showPrev}
          aria-label="Previous testimonial"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
      )}
      <div
        className={styles.stack}
        style={{ "--back-offset": `${(count - 1) * PEEK}px` } as CSSProperties}
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
          className={styles.arrow}
          onClick={showNext}
          aria-label="Next testimonial"
        >
          <ArrowRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
