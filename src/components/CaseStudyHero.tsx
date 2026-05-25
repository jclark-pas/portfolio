import Image from "next/image";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  company: string;
  year?: number;
  title: string;
  description: string;
  color: string;
  heroImage: string;
  /** When set, the hero image sits on this background (inset/padded) instead of directly on the band. */
  imageBackground?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Use dark text instead of light — for light-colored bands. */
  darkText?: boolean;
  /** Optional accent color for the headline. */
  titleColor?: string;
}

export default function CaseStudyHero({
  company,
  year,
  title,
  description,
  color,
  heroImage,
  imageBackground,
  imageWidth,
  imageHeight,
  darkText,
  titleColor,
}: CaseStudyHeroProps) {
  return (
    <section
      className={`${styles.hero} ${darkText ? styles.darkText : ""}`}
      style={{ background: color }}
    >
      <div className={styles.inner}>
        <p className={styles.company}>
          {company}
          {year ? ` / ${year}` : ""}
        </p>
        <h1 className={styles.title} style={titleColor ? { color: titleColor } : undefined}>
          {title}
        </h1>
        <p className={styles.tagline}>{description}</p>
        {imageBackground ? (
          <div
            className={styles.imageAreaFramed}
            style={{ background: imageBackground }}
          >
            <Image
              src={heroImage}
              alt={title}
              width={imageWidth ?? 1584}
              height={imageHeight ?? 1260}
              sizes="(max-width: 1120px) 100vw, 1120px"
              className={styles.heroImgInset}
            />
          </div>
        ) : (
          <div className={styles.imageArea}>
            <Image
              src={heroImage}
              alt={title}
              fill
              sizes="960px"
              className={styles.heroImg}
            />
          </div>
        )}
      </div>
    </section>
  );
}
