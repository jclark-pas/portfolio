import Image from "next/image";
import Button from "./Button";
import joshHero from "../../public/josh-hero-v2.png";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <Image
          src={joshHero}
          alt="Portrait illustration of Josh Clark"
          priority
          sizes="(max-width: 960px) 360px, 550px"
          className={styles.portrait}
        />
        <div className={styles.content}>
          <p className={styles.eyebrow}>Product Leader based in Eugene, Oregon</p>
          <h1 className={styles.headline}>Good design opens&nbsp;doors.</h1>
          <p className={styles.dek}>
            I&rsquo;m a product designer and leader who makes complex software
            feel effortless. Working alongside teams, I uncover what&rsquo;s
            really getting in users&rsquo; way &mdash; then design the simplest
            path through it, so more people get&nbsp;in.
          </p>
          <div className={styles.actions}>
            <Button href="/work">See Work</Button>
            <Button href="#resume" variant="secondary">
              Get to know Josh
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
