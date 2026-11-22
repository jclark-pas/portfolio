import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  company: string;
  year?: number;
  title: string;
  description: string;
  heroImage: string;
  imageAlt?: string;
  imageWidth: number;
  imageHeight: number;
  imageMaxWidth?: number;
  palette?: "forecast" | "liveplan" | "canvas" | "safari" | "mint" | "violet" | "coral" | "sage";
  /** Composed artwork already has its own silhouette and shadow. */
  floatingImage?: boolean;
  artwork?: ReactNode;
  facts?: { label: string; value: ReactNode }[];
}

export default function CaseStudyHero({
  company,
  year,
  title,
  description,
  heroImage,
  imageAlt = title,
  imageWidth,
  imageHeight,
  imageMaxWidth = 800,
  palette = "forecast",
  floatingImage = false,
  artwork,
  facts,
}: CaseStudyHeroProps) {
  // Keep two source pixels per CSS pixel on Retina screens, with a quieter
  // maximum size even when a larger export is available.
  const displayWidth = Math.min(imageMaxWidth, 800, Math.floor(imageWidth / 2));

  return (
    <section className={`${styles.hero} ${styles[palette] ?? ""}`}>
      <div className={styles.heroBackground} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroIntro}>
          <p className={styles.company}>{company}{year ? ` / ${year}` : ""}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.heroLine}>{description}</p>
        </div>
        <div className={styles.heroMedia} style={{ maxWidth: displayWidth }}>
          {artwork ?? <div className={floatingImage ? undefined : styles.heroVisual}>
            <Image
              src={heroImage}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              priority
              quality={90}
              sizes={`(max-width: 480px) min(calc(100vw - 32px), ${displayWidth}px), min(calc(100vw - 80px), ${displayWidth}px)`}
              className={styles.heroImg}
            />
          </div>}
        </div>
        {facts && facts.length > 0 && (
          <dl className={`${styles.heroMeta} ${facts.length === 4 ? styles.fourFacts : ""}`}>
            {facts.map(({ label, value }) => (
              <div className={styles.metaCell} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
