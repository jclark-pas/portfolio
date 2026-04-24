import styles from "./Testimonial.module.css";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
}

export default function Testimonial({ quote, name, title }: TestimonialProps) {
  return (
    <div className={styles.card}>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.author}>
        <div className={styles.avatar} />
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </div>
  );
}
