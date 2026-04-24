import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import ProjectThumbnail from "./ProjectThumbnail";
import styles from "./WorkCard.module.css";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      {project.thumbnailData ? (
        <ProjectThumbnail data={project.thumbnailData} title={project.title} />
      ) : (
        <div className={styles.thumbnailWrap}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 960px) 100vw, 50vw"
            className={styles.thumbnailImg}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
      </div>
    </Link>
  );
}
