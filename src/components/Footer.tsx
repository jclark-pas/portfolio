import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Colophon.</h2>
        <h3 className={styles.subheading}>Why a Figma Prototype?</h3>
        <p className={styles.text}>
          While the end goal of a digital product is always code, the tool of
          choice for designers is (almost always) Figma. To that end, it&apos;s
          important for you &mdash; as a potential employer &mdash; to see my
          skills in the tool of the trade. So, while unconventional, a Figma
          prototype should give you insight into my design systems thinking and
          mastery of Figma.
        </p>
      </div>
    </footer>
  );
}
