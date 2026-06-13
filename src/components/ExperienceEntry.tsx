"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import styles from "./ExperienceEntry.module.css";

interface ExperienceEntryProps {
  role: string;
  company: string;
  dates: string;
  bullets: ReactNode[];
  focusAreas: string[];
  cta?: CTA | CTA[];
  defaultOpen?: boolean;
}

type CTA = { href: string; label: string };

export default function ExperienceEntry({
  role,
  company,
  dates,
  bullets,
  focusAreas,
  cta,
  defaultOpen = false,
}: ExperienceEntryProps) {
  const [open, setOpen] = useState(defaultOpen);
  const ctas = cta ? (Array.isArray(cta) ? cta : [cta]) : [];

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
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </span>
      </button>
      <div className={styles.contentWrapper} aria-hidden={!open}>
        <div className={styles.contentInner}>
          <div className={styles.content}>
            <div className={styles.bulletsCol}>
              <ul className={styles.bullets}>
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {ctas.length > 0 ? (
                <p className={styles.cta}>
                  <span className={styles.ctaLabel}>
                    {ctas.length > 1 ? "Case Studies: " : "Case Study: "}
                  </span>
                  {ctas.map((c, i) => (
                    <span key={c.href}>
                      {i > 0 ? ", " : ""}
                      <Link href={c.href} className={styles.ctaLink}>
                        {c.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
            <div className={styles.focus}>
              <p className={styles.focusLabel}>Focus Areas</p>
              <div className={styles.focusBadges}>
                {focusAreas.map((f) => (
                  <span key={f} className={styles.focusBadge}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 15 12 9 18 15" />
    </svg>
  );
}
