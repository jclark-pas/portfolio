import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { PersonalProject } from "@/data/personalProjects";
import ProjectThumbnail from "./ProjectThumbnail";
import styles from "./PersonalProjectCard.module.css";

// A work card that leaves the site: the whole card is the link, and the
// footer line says where it goes.
export default function PersonalProjectCard({ project }: { project: PersonalProject }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.thumb}>
        <ProjectThumbnail data={project.thumbnail} title={project.title} />
      </div>
      <div className={styles.body}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.platforms}>{project.platforms}</span>
        </div>
        <p className={styles.description}>{project.description}</p>
        <span className={styles.visit}>
          {project.host}
          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          <span className={styles.srOnly}>(opens in a new tab)</span>
        </span>
      </div>
    </a>
  );
}
