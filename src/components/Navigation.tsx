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

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

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
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <Link
          href="/work"
          className={linkClass("/work")}
          aria-current={isActive("/work") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Work
        </Link>
        <Link
          href="/my-story"
          className={linkClass("/my-story")}
          aria-current={isActive("/my-story") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          My Story
        </Link>
        <Link
          href="/#contact"
          className={linkClass("/#contact")}
          aria-current={isActive("/#contact") ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </nav>
  );
}
