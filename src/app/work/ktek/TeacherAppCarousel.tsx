"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./TeacherAppCarousel.module.css";

interface Slide {
  src: string;
  alt: string;
}

export default function TeacherAppCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(calc((var(--slide-w) + var(--gap)) * ${-index}))` }}
        >
          {slides.map((slide) => (
            <div key={slide.src} className={styles.slide}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 700px) 86vw, 728px"
                className={styles.img}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous screen"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => go(index - 1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next screen"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => go(index + 1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Teacher app screens">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to screen ${i + 1}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
