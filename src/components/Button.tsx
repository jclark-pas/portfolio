import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
  /** Render as a plain anchor that opens in a new tab — for off-site links. */
  external?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  size = "default",
  external = false,
  children,
  onClick,
}: ButtonProps) {
  const className = `${styles.button} ${styles[variant]}${
    size === "small" ? ` ${styles.small}` : ""
  }`;

  if (href && external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
