"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return (document.documentElement.dataset.theme as Theme) || "light";
}

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  const linkClass = (href: string) =>
    `${styles.link} ${isActive(href) ? styles.active : ""}`;

  const mobileLinkClass = (href: string) =>
    `${styles.mobileLink} ${isActive(href) ? styles.active : ""}`;

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const themeIcon =
    theme === "dark" ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Josh Clark
        </Link>
        <div className={styles.links}>
          <Link
            href="/work"
            className={linkClass("/work")}
            aria-current={isActive("/work") ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            href="/my-story"
            className={linkClass("/my-story")}
            aria-current={isActive("/my-story") ? "page" : undefined}
          >
            My Story
          </Link>
          <Link
            href="/#contact"
            className={linkClass("/#contact")}
            aria-current={isActive("/#contact") ? "page" : undefined}
          >
            Contact
          </Link>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {themeIcon}
          </button>
        </div>
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`${styles.shroud} ${menuOpen ? styles.shroudOpen : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <div
          className={styles.shroudInner}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/work"
            className={mobileLinkClass("/work")}
            aria-current={isActive("/work") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/my-story"
            className={mobileLinkClass("/my-story")}
            aria-current={isActive("/my-story") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            My Story
          </Link>
          <Link
            href="/#contact"
            className={mobileLinkClass("/#contact")}
            aria-current={isActive("/#contact") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <button
            type="button"
            className={styles.mobileThemeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {themeIcon}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
