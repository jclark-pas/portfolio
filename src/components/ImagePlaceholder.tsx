import styles from "./ImagePlaceholder.module.css";

type Props = {
  /** Aspect ratio expressed as a CSS aspect-ratio string, e.g. "16 / 9" */
  aspectRatio?: string;
  /** Short description of what the image will show */
  label: string;
  /** Optional longer guidance about the asset to capture */
  guidance?: string;
  /** Optional theme — "dark" inverts colors for placement on dark surfaces */
  variant?: "default" | "dark";
  className?: string;
};

export default function ImagePlaceholder({
  aspectRatio = "16 / 9",
  label,
  guidance,
  variant = "default",
  className,
}: Props) {
  const classes = [
    styles.placeholder,
    variant === "dark" ? styles.placeholderDark : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={{ aspectRatio }}
      role="img"
      aria-label={label + (guidance ? ` — ${guidance}` : "")}
    >
      <div className={styles.iconWell} aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      <p className={styles.label}>{label}</p>
      {guidance ? <p className={styles.guidance}>{guidance}</p> : null}
    </div>
  );
}
