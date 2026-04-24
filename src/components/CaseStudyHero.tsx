import Image from "next/image";
import styles from "./CaseStudyHero.module.css";

interface CaseStudyHeroProps {
  company: string;
  title: string;
  description: string;
  color: string;
  heroImage: string;
}

export default function CaseStudyHero({
  company,
  title,
  description,
  color,
  heroImage,
}: CaseStudyHeroProps) {
  return (
    <section className={styles.hero} style={{ background: color }}>
      <div className={styles.inner}>
        <p className={styles.company}>{company}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{description}</p>
        <div className={styles.imageArea}>
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="960px"
            className={styles.heroImg}
          />
        </div>
      </div>
    </section>
  );
}
