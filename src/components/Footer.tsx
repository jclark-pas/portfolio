import Link from "next/link";
import styles from "./Footer.module.css";

const explore = [
  { label: "Work", href: "/work" },
  { label: "My Story", href: "/my-story" },
  { label: "Style Guide", href: "/styleGuide" },
  { label: "Contact", href: "#contact" },
];

const connect = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joshclark17/" },
  { label: "Dribbble", href: "https://dribbble.com/joshclark17" },
  { label: "GitHub", href: "https://github.com/jclark-pas" },
  { label: "Resume", href: "https://drive.google.com/file/d/1DGHqxANFJxMhypH82vOhf_COCVt8VIAj/view?usp=sharing" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.cta}>
            <p className={styles.eyebrow}>Ready to talk?</p>
            <a href="mailto:joshclark17@gmail.com" className={styles.email}>
              joshclark17@gmail.com
            </a>
            <p className={styles.role}>
              Experienced Product Designer &amp; Leader in Eugene, Oregon
            </p>
            <p className={styles.availability}>
              <span className={styles.dot} aria-hidden="true" />
              Open to Product Design + Product Leadership Roles
            </p>
            <a href="tel:+15418449000" className={styles.phone}>
              541.844.9000
            </a>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            <div className={styles.column}>
              <h3 className={styles.colHeading}>Explore</h3>
              <ul>
                {explore.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("#") ? (
                      <a href={item.href} className={styles.navLink}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={styles.navLink}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <h3 className={styles.colHeading}>Connect</h3>
              <ul>
                {connect.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={styles.navLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.meta}>
          <p>&copy; {year} Josh Clark</p>
          <p className={styles.builtWith}>Designed &amp; built with Next.js</p>
          <a href="#top" className={styles.backToTop}>
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
