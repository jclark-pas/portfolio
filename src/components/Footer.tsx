import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Contact.</h2>
        <p className={styles.subtitle}>Ready to talk?</p>
        <div className={styles.links}>
          <a href="mailto:joshclark17@gmail.com" className={styles.contactLink}>
            joshclark17@gmail.com
          </a>
          <a href="tel:+15418449000" className={styles.contactLink}>
            541.844.9000
          </a>
        </div>
      </div>
    </footer>
  );
}
