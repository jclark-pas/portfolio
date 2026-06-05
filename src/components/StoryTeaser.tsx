import Link from "next/link";
import Image from "next/image";
import styles from "./StoryTeaser.module.css";

export default function StoryTeaser() {
  return (
    <Link href="/my-story" className={styles.card} aria-label="Read my story">
      <div className={styles.media}>
        <Image
          src="/images/my-story/day3.JPG"
          alt="Josh, in a hospital gown and wheelchair, outside with his two kids near a waterfall"
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className={styles.img}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>My Story</p>
        <h3 className={styles.headline}>
          How the worst day of my life made me a better design leader.
        </h3>
        <p className={styles.body}>
          There&rsquo;s a story underneath the r&eacute;sum&eacute; — one that
          reshaped how I lead, how I design, and who I refuse to leave out.
        </p>
        <span className={styles.cta}>
          Read my story <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
