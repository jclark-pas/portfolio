import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Style Guide — Josh Clark",
  robots: { index: false, follow: false },
};

const colorTokens = [
  { name: "--color-accent", light: "#DB3914", dark: "#F26B47", note: "Primary brand accent (light bg)" },
  { name: "--color-accent-on-dark", light: "#F26B47", dark: "#F26B47", note: "Brighter accent for dark surfaces" },
  { name: "--color-surface", light: "#FDFBF7", dark: "#1F3939", note: "Page background" },
  { name: "--color-surface-invert", light: "#0B0921", dark: "#FDFBF7", note: "Inverted surface (dark sections)" },
  { name: "--color-text", light: "#0B0921", dark: "#FDFBF7", note: "Primary text" },
  { name: "--color-text-secondary", light: "#130F38", dark: "#C8D8CF", note: "Body / secondary text" },
  { name: "--color-text-invert", light: "#EFE9DB", dark: "#1F3939", note: "Text on dark surfaces" },
  { name: "--color-bg-card", light: "rgba(239, 233, 219, 0.5)", dark: "rgba(57, 87, 82, 0.6)", note: "Card / panel surface" },
  { name: "--color-border", light: "#E3DBCA", dark: "rgba(227, 219, 202, 0.25)", note: "Subtle dividers" },
];

type TypeRow = {
  label: string;
  token: string;
  family: "sans" | "serif";
  size: string;
  lineHeight: string;
  weight: number;
  sample?: string;
};

const typeScale: TypeRow[] = [
  { label: "Display / H1", token: "--font-h1 / --line-h1", family: "serif", size: "56px", lineHeight: "68px", weight: 700, sample: "The quick brown fox" },
  { label: "Heading 2", token: "--font-h2 / --line-h2", family: "sans", size: "32px", lineHeight: "40px", weight: 600, sample: "The quick brown fox" },
  { label: "Heading 3", token: "--font-h3 / --line-h3", family: "sans", size: "24px", lineHeight: "32px", weight: 600, sample: "The quick brown fox" },
  { label: "Heading 4", token: "--font-h4 / --line-h4", family: "sans", size: "20px", lineHeight: "28px", weight: 600, sample: "The quick brown fox" },
  { label: "Body 1", token: "--font-body1 / --line-body1", family: "sans", size: "18px", lineHeight: "32px", weight: 400, sample: "The quick brown fox jumps over the lazy dog. Designers iterate, ship, and learn." },
  { label: "Body 2", token: "--font-body2 / --line-body2", family: "sans", size: "16px", lineHeight: "24px", weight: 400, sample: "The quick brown fox jumps over the lazy dog." },
];

const spacingTokens = [
  { name: "--space-xs", desktop: "4px", tablet: "2px", mobile: "2px" },
  { name: "--space-sm", desktop: "8px", tablet: "4px", mobile: "4px" },
  { name: "--space-md", desktop: "16px", tablet: "8px", mobile: "8px" },
  { name: "--space-lg", desktop: "24px", tablet: "16px", mobile: "12px" },
  { name: "--space-xl", desktop: "32px", tablet: "24px", mobile: "16px" },
  { name: "--space-xxl", desktop: "40px", tablet: "40px", mobile: "24px" },
  { name: "--space-xxxl", desktop: "64px", tablet: "64px", mobile: "40px" },
];

const radiusTokens = [
  { name: "--radius-sm", value: "4px" },
  { name: "--radius-md", value: "4px" },
  { name: "--radius-lg", value: "8px" },
  { name: "--radius-xl", value: "8px" },
  { name: "--radius-full", value: "60px (pill)" },
];

const icons: { name: string; usage: string; svg: React.ReactNode }[] = [
  {
    name: "Sun",
    usage: "Theme toggle (light → dark)",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    name: "Moon",
    usage: "Theme toggle (dark → light)",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    name: "Plus",
    usage: "Expand experience entry",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    name: "Minus",
    usage: "Collapse experience entry",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    name: "Fullscreen",
    usage: "Expand video to fullscreen",
    svg: (
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 6V2h4" />
        <path d="M14 6V2h-4" />
        <path d="M2 10v4h4" />
        <path d="M14 10v4h-4" />
      </svg>
    ),
  },
];

export default function StyleGuidePage() {
  return (
    <>
      <Navigation />
      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.kicker}>Internal · Not Published</p>
          <h1 className={styles.title}>Style Guide</h1>
          <p className={styles.lede}>
            Living reference for the design tokens powering this portfolio. Numbers
            shown reflect the current values in <code>globals.css</code>; rendered
            samples use the live CSS custom properties.
          </p>
        </header>

        {/* Colors */}
        <section className={styles.section} id="colors">
          <h2 className={styles.sectionTitle}>Colors</h2>
          <p className={styles.sectionLede}>
            Two-token accent system: <code>--color-accent</code> for light surfaces,{" "}
            <code>--color-accent-on-dark</code> for dark sections (cascaded via{" "}
            <code>.darkSection</code>, <code>.hero</code>, and <code>.footer</code>).
          </p>
          <div className={styles.colorGrid}>
            {colorTokens.map((c) => (
              <div key={c.name} className={styles.colorCard}>
                <div className={styles.colorSwatchPair}>
                  <div className={styles.colorSwatch} style={{ background: c.light }}>
                    <span className={styles.swatchTag}>Light</span>
                  </div>
                  <div className={`${styles.colorSwatch} ${styles.colorSwatchDark}`} style={{ background: c.dark }}>
                    <span className={styles.swatchTag}>Dark</span>
                  </div>
                </div>
                <div className={styles.colorMeta}>
                  <code className={styles.tokenName}>{c.name}</code>
                  <p className={styles.colorNote}>{c.note}</p>
                  <dl className={styles.colorValues}>
                    <div>
                      <dt>Light</dt>
                      <dd>{c.light}</dd>
                    </div>
                    <div>
                      <dt>Dark</dt>
                      <dd>{c.dark}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className={styles.section} id="typography">
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.sectionLede}>
            Two families: <strong>Bricolage Grotesque</strong> for display (H1 only),{" "}
            <strong>Poppins</strong> for everything else. Sizes scale down at 960px
            (tablet) and 480px (mobile).
          </p>
          <div className={styles.typeStack}>
            {typeScale.map((t) => (
              <div key={t.label} className={styles.typeRow}>
                <div className={styles.typeMeta}>
                  <p className={styles.typeLabel}>{t.label}</p>
                  <code className={styles.tokenName}>{t.token}</code>
                  <p className={styles.typeSpec}>
                    {t.family === "serif" ? "Bricolage Grotesque" : "Poppins"} ·{" "}
                    {t.weight} · {t.size} / {t.lineHeight}
                  </p>
                </div>
                <p
                  className={styles.typeSample}
                  style={{
                    fontFamily:
                      t.family === "serif"
                        ? "var(--font-bricolage), system-ui, sans-serif"
                        : "var(--font-poppins), system-ui, sans-serif",
                    fontSize: t.size,
                    lineHeight: t.lineHeight,
                    fontWeight: t.weight,
                  }}
                >
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className={styles.section} id="spacing">
          <h2 className={styles.sectionTitle}>Spacing</h2>
          <p className={styles.sectionLede}>
            7-step scale. Values shrink at the tablet (960px) and mobile (480px)
            breakpoints — bars below show the live (current viewport) value.
          </p>
          <div className={styles.spacingTable}>
            <div className={`${styles.spacingRow} ${styles.spacingHead}`}>
              <span>Token</span>
              <span>Desktop</span>
              <span>Tablet</span>
              <span>Mobile</span>
              <span>Sample (live)</span>
            </div>
            {spacingTokens.map((s) => (
              <div key={s.name} className={styles.spacingRow}>
                <code className={styles.tokenName}>{s.name}</code>
                <span>{s.desktop}</span>
                <span>{s.tablet}</span>
                <span>{s.mobile}</span>
                <span className={styles.spacingBar} style={{ width: `var(${s.name})` }} />
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section className={styles.section} id="radius">
          <h2 className={styles.sectionTitle}>Radius</h2>
          <p className={styles.sectionLede}>
            Soft corners across the system; <code>--radius-full</code> is reserved
            for pills (toggle, status chips).
          </p>
          <div className={styles.radiusGrid}>
            {radiusTokens.map((r) => (
              <div key={r.name} className={styles.radiusCard}>
                <div
                  className={styles.radiusBox}
                  style={{ borderRadius: `var(${r.name})` }}
                />
                <code className={styles.tokenName}>{r.name}</code>
                <p className={styles.radiusValue}>{r.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Icons */}
        <section className={styles.section} id="icons">
          <h2 className={styles.sectionTitle}>Icons</h2>
          <p className={styles.sectionLede}>
            All icons are inline SVG, stroked with <code>currentColor</code>, so they
            inherit text color and adapt to theme automatically.
          </p>
          <div className={styles.iconGrid}>
            {icons.map((i) => (
              <div key={i.name} className={styles.iconCard}>
                <div className={styles.iconWell}>{i.svg}</div>
                <p className={styles.iconName}>{i.name}</p>
                <p className={styles.iconUsage}>{i.usage}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
