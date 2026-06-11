import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./CaseStudyNav.module.css";

interface NavItem {
  slug: string;
  title: string;
  navTitle?: string;
}

export default function CaseStudyNav({
  prev,
  next,
}: {
  prev: NavItem;
  next: NavItem;
}) {
  return (
    <nav className={styles.bottomNav}>
      <Link href={`/work/${prev.slug}`} className={`${styles.navLink} ${styles.prev}`}>
        <ArrowLeft className={styles.icon} size={20} aria-hidden="true" />
        <span className={styles.navLabel}>{prev.navTitle ?? prev.title}</span>
      </Link>
      <Link href={`/work/${next.slug}`} className={`${styles.navLink} ${styles.next}`}>
        <span className={styles.navLabel}>{next.navTitle ?? next.title}</span>
        <ArrowRight className={styles.icon} size={20} aria-hidden="true" />
      </Link>
    </nav>
  );
}
