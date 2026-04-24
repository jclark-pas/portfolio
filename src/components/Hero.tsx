import Image from "next/image";
import Button from "./Button";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Image
          src="/josh-hero.png"
          alt="Portrait illustration of Josh Clark"
          width={550}
          height={476}
          priority
          className={styles.portrait}
        />
        <div className={styles.content}>
          <p className={styles.eyebrow}>Product Leader based in Eugene, Oregon</p>
          <h1 className={styles.headline}>
            I design digital environments of access, so the excluded can be
            included.
          </h1>
          <div className={styles.actions}>
            <Button href="#contact">Get in touch</Button>
            <Button href="#work" variant="secondary">
              Get to know Josh
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
