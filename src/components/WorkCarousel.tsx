"use client";

import { useEffect, useRef, useState } from "react";
import WorkCard from "./WorkCard";
import type { Project } from "@/data/projects";
import styles from "./WorkCarousel.module.css";

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`.${styles.slide}`);
    const step = slide ? slide.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.track} ref={trackRef}>
        {projects.map((project) => (
          <div key={project.slug} className={styles.slide}>
            <WorkCard project={project} />
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous projects"
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next projects"
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  const rotate = direction === "left" ? 180 : 0;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
