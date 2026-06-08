import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import { getProject, getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata = { title: "LearningWrite" };

const CREATE_ASSIGNMENT_VIDEO = "/images/learningwrite/create-assignment.mp4";

export default function LearningWritePage() {
  const project = getProject("learningwrite")!;
  const { prev, next } = getAdjacentProjects("learningwrite");

  const [delightful, assignment] = project.highlights;
  const inClassroom = project.sections[0];
  const roles = project.sections[1];

  return (
    <>
      <Navigation />
      <CaseStudyHero
        company={project.title}
        year={project.year}
        title={project.tagline}
        description={project.description}
        color={project.color}
        heroImage={project.heroImage}
      />

      {/* What I did */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.twoCol}>
            <div>
              <h2>What I did.</h2>
              <div className={styles.bodyText}>
                {project.whatIDid.split("\n").map((p, i) => (
                  <p key={i} style={i > 0 ? { marginTop: "var(--space-md)" } : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className={styles.rolesHeading}>Roles</h3>
              <ul className={styles.rolesList}>
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assignment management — full-width animated block above the zipper */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.inner}>
          <h2 className={styles.blockHeading}>{assignment.title}</h2>
          <p className={`${styles.bodyText} ${styles.blockIntro}`}>
            {assignment.description}
          </p>
          <div className={styles.blockImage}>
            <video
              src={CREATE_ASSIGNMENT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              aria-label={assignment.title}
            />
          </div>
        </div>
      </section>

      {/* Stacked zipper */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.featureRows}>
            <div className={styles.featureRow}>
              <div className={styles.featureImage}>
                <Image
                  src="/images/learningwrite/delightful.png"
                  alt={delightful.title}
                  width={1088}
                  height={641}
                />
              </div>
              <div className={styles.featureText}>
                <h3>{delightful.title}</h3>
                <p className={styles.bodyText}>{delightful.description}</p>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.featureImage}>
                <Image
                  src="/images/learningwrite/admin-portals.png"
                  alt={inClassroom.title}
                  width={1320}
                  height={1052}
                />
              </div>
              <div className={styles.featureText}>
                <h3>{inClassroom.title}</h3>
                <p className={styles.bodyText}>{inClassroom.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role management ecosystem — its own section, text left, image right */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.inner}>
          <div className={styles.splitRow}>
            <div>
              <h2>{roles.title}</h2>
              <p className={styles.bodyText}>{roles.description}</p>
            </div>
            <div className={styles.splitImage}>
              <Image
                src="/images/learningwrite/writing-prompts.png"
                alt={roles.title}
                width={1080}
                height={748}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <CaseStudyNav prev={prev} next={next} />

      <Footer />
    </>
  );
}
