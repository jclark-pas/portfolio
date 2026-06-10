import Image from "next/image";
import styles from "./Testimonial.module.css";

export interface TestimonialData {
  quote: string;
  name: string;
  title: string;
  avatar?: string;
}

export default function Testimonial({ quote, name, title, avatar }: TestimonialData) {
  return (
    <div className={styles.card}>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.author}>
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatar} />
        )}
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </div>
  );
}
