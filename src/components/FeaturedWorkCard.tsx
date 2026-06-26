import Link from "next/link";
import Image from "next/image";
import styles from "./FeaturedWorkCard.module.css";

export interface FeaturedWork {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  imageBackground?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Set when the image already bakes in its own corners + shadow, so the
   *  card skips its default border-radius/box-shadow (avoids double elevation). */
  imageElevated?: boolean;
}

export default function FeaturedWorkCard({
  work,
  stacked = false,
}: {
  work: FeaturedWork;
  /** Force the image-on-top / content-below layout at any width (for two-up grids). */
  stacked?: boolean;
}) {
  return (
    <Link
      href={work.href}
      className={`${styles.card}${stacked ? ` ${styles.cardStacked}` : ""}`}
      aria-label={work.title}
    >
      <div
        className={styles.media}
        style={
          work.imageBackground ? { background: work.imageBackground } : undefined
        }
        aria-hidden="true"
      >
        {work.image && (
          <Image
            src={work.image}
            alt=""
            width={work.imageWidth ?? 1600}
            height={work.imageHeight ?? 1200}
            sizes="(max-width: 900px) 100vw, 60vw"
            className={`${styles.mediaImg}${
              work.imageElevated ? ` ${styles.mediaImgElevated}` : ""
            }`}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.meta}>
          <span className={styles.number}>{work.number}</span>
          <span className={styles.eyebrow}>{work.eyebrow}</span>
        </p>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.description}>{work.description}</p>
        <span className={styles.cta}>
          Read case study <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
