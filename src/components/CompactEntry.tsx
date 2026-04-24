import styles from "./CompactEntry.module.css";

interface CompactEntryProps {
  title: string;
  subtitle: string | string[];
}

export default function CompactEntry({ title, subtitle }: CompactEntryProps) {
  const lines = Array.isArray(subtitle) ? subtitle : [subtitle];
  return (
    <div className={styles.entry}>
      <p className={styles.title}>{title}</p>
      <div className={styles.subtitle}>
        {lines.map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </div>
    </div>
  );
}
