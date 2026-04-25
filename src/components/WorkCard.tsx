import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectThumbnail from "./ProjectThumbnail";
import styles from "./WorkCard.module.css";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      {project.thumbnailData ? (
        <ProjectThumbnail data={project.thumbnailData} title={project.title} />
      ) : (
        <div className={styles.thumbnailWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className={styles.thumbnailImg}
          />
        </div>
      )}
      <p className={styles.description}>{project.description}</p>
    </Link>
  );
}
