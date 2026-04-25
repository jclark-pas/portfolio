"use client";

import { useState } from "react";
import styles from "./ExperienceEntry.module.css";

const SKILLS = [
  { label: "Design", color: "#32D4A4" },
  { label: "Product Leadership", color: "#32AAEF" },
  { label: "Team Leadership", color: "#1348A5" },
  { label: "Development", color: "#FF623E" },
] as const;

export type SkillRatings = [number, number, number, number];

interface ExperienceEntryProps {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
  skills: SkillRatings;
}

export default function ExperienceEntry({
  role,
  company,
  dates,
  bullets,
  skills,
}: ExperienceEntryProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.entry} ${open ? styles.open : ""}`}>
      <button
        className={styles.header}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className={styles.headerText}>
          <p className={styles.meta}>
            {company}
            <span className={styles.metaBullet}> • </span>
            {dates}
          </p>
          <p className={styles.role}>{role}</p>
        </div>
        <span className={styles.toggle} aria-hidden="true">
          {open ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>
      <div className={styles.contentWrapper} aria-hidden={!open}>
        <div className={styles.contentInner}>
          <div className={styles.content}>
            <ul className={styles.bullets}>
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className={styles.skills}>
              {SKILLS.map((skill, i) => (
                <div key={skill.label} className={styles.skillRow}>
                  <span className={styles.skillLabel}>{skill.label}</span>
                  <div
                    className={styles.skillDots}
                    style={{ color: skill.color }}
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        className={`${styles.skillDot} ${
                          j < skills[i] ? styles.filled : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
