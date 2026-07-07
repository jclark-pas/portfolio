import styles from "./Approach.module.css";

/** How I work — principles, not process. Grounded in the work, said plainly. */
const principles = [
  {
    title: "Design for what people do, not what they say.",
    body: "I pair interviews with behavioral data, so the roadmap follows real behavior instead of stated preference.",
  },
  {
    title: "Put intelligence at the point of need.",
    body: "AI earns its place when it’s embedded where the work happens — writing, review, forecasting — not bolted on as a chatbot.",
  },
  {
    title: "Systems over screens.",
    body: "Token-based systems and a theming engine that let a small team ship a consistent product — and a dozen themes — without redrawing it each time.",
  },
  {
    title: "Ship to learn.",
    body: "Concept to MVP in weeks, not quarters. Idea Canvas went from idea to shipped in three — then the data told us where to go next.",
  },
  {
    title: "Make the complex feel obvious.",
    body: "Financial tools are where I do my sharpest work: taking dense, intimidating data and making the next decision feel easy.",
  },
  {
    title: "Lift the team, not just the work.",
    body: "I’ve built design teams from scratch and mentored designers into their best work. The multiplier is the point.",
  },
];

export default function Approach() {
  return (
    <ol className={styles.principleList}>
      {principles.map((p, i) => (
        <li key={p.title} className={styles.principle}>
          <span className={styles.principleNum} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className={styles.principleText}>
            <p className={styles.principleTitle}>{p.title}</p>
            <p className={styles.principleBody}>{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
