import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import { getProject, getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata = { title: "Intrevent" };

export default function IntreventPage() {
  const project = getProject("intrevent")!;
  const { prev, next } = getAdjacentProjects("intrevent");

  const branding = project.highlights[0];

  return (
    <>
      <Navigation />
      <CaseStudyHero
        company={project.title}
        year={project.year}
        title={project.tagline}
        description={project.description}
        heroImage="/images/intrevent/hero-framed.png"
        imageBackground="rgba(0, 0, 0, 0.2)"
        imageWidth={1344}
        imageHeight={904}
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

      {/* Highlights */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>Highlights</h2>
          <div className={styles.stack}>
            <div className={styles.gradientInset}>
              <Image
                src="/images/intrevent/dashboard-screen.png"
                alt="Intrevent dashboard — events organized across teams, tasks, and venues"
                width={2080}
                height={1343}
                sizes="(max-width: 960px) 100vw, 1120px"
              />
            </div>

            <div className={styles.gradientInset}>
              <Image
                src="/images/intrevent/tasks-screen.png"
                alt="Intrevent task management view"
                width={2080}
                height={1348}
                sizes="(max-width: 960px) 100vw, 1120px"
              />
            </div>

            <div className={styles.splitRow}>
              <div className={styles.gradientInset}>
                <Image
                  src="/images/intrevent/branding-screen.png"
                  alt={branding.title}
                  width={936}
                  height={632}
                  sizes="(max-width: 960px) 100vw, 540px"
                />
              </div>
              <div className={styles.splitText}>
                <h2>{branding.title}</h2>
                <p className={styles.bodyText}>{branding.description}</p>
              </div>
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
