import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./FeaturedWorkCard.module.css";

export interface FeaturedWork {
  number: string;
  eyebrow: string;
  title: string;
  /** Short one-line descriptor shown under the title on the card. */
  subtitle: string;
  description: string;
  href: string;
  imageBackground?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Set when the image already bakes in its own corners + shadow, so the
   *  card skips its default border-radius/box-shadow (avoids double elevation). */
  imageElevated?: boolean;
  /** Anchor a transparent screenshot snug into the corner (no padding/float),
   *  letting it bleed off the edge on a soft gradient — mirrors DesignShowcase. */
  imageSnug?: boolean;
}

export default function FeaturedWorkCard({ work }: { work: FeaturedWork }) {
  return (
    <Link href={work.href} className={styles.card} aria-label={work.title}>
      <div
        className={`${styles.media}${
          work.imageSnug ? ` ${styles.mediaSnug}` : ""
        }`}
        style={
          work.imageBackground
            ? ({ "--media-gradient": work.imageBackground } as CSSProperties)
            : undefined
        }
        aria-hidden="true"
      >
        {work.image &&
          (work.imageSnug ? (
            <Image
              src={work.image}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.mediaImgSnug}
            />
          ) : (
            <Image
              src={work.image}
              alt=""
              width={work.imageWidth ?? 1600}
              height={work.imageHeight ?? 1200}
              sizes="(max-width: 900px) 100vw, 45vw"
              className={`${styles.mediaImg}${
                work.imageElevated ? ` ${styles.mediaImgElevated}` : ""
              }`}
            />
          ))}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{work.title}</h3>
        <p className={styles.subtitle}>{work.subtitle}</p>
      </div>
    </Link>
  );
}
