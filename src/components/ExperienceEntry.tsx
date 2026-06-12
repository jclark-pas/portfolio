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
          {open ? <MinusIcon /> : <PlusIcon />}
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
