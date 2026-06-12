import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import { getProject, getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata = { title: "Nulia" };

export default function NuliaPage() {
  const project = getProject("nulia")!;
  const { prev, next } = getAdjacentProjects("nulia");

  const [accessibility, teams] = project.highlights;
  const [userPortal, partnerPortal, managerInsights] = project.sections;

  return (
    <>
      <Navigation />
      <main id="main">
      <CaseStudyHero
        company={project.title}
        year={project.year}
        title={project.tagline}
        description={project.description}
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

      {/* User Portal */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.inner}>
          <div className={styles.splitRow}>
            <div className={styles.splitText}>
              <h2>{userPortal.title}</h2>
              <p className={styles.bodyText}>{userPortal.description}</p>
            </div>
            <div className={styles.gradientInset}>
              <Image
                src="/images/nulia/user-portal-screen.png"
                alt={userPortal.title}
                width={1246}
                height={1960}
                sizes="(max-width: 960px) 100vw, 680px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility audit + Microsoft Teams App */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.dualRow}>
            <div className={styles.dualCol}>
              <div className={styles.gradientCard}>
                <span className={styles.wcagText}>WCAG 2.2</span>
              </div>
              <div>
                <h3>{accessibility.title}</h3>
                <p className={styles.bodyText}>{accessibility.description}</p>
              </div>
            </div>
            <div className={styles.dualCol}>
              <div className={styles.gradientCard}>
                <Image
                  src="/images/nulia/teams-app-screen.png"
                  alt={teams.title}
                  width={892}
                  height={460}
                  sizes="(max-width: 960px) 100vw, 540px"
                />
              </div>
              <div>
                <h3>{teams.title}</h3>
                <p className={styles.bodyText}>{teams.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Portal */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.inner}>
          <div className={styles.splitRow}>
            <div className={styles.splitText}>
              <h2>{partnerPortal.title}</h2>
              <p className={styles.bodyText}>{partnerPortal.description}</p>
            </div>
            <div className={styles.gradientInset}>
              <Image
                src="/images/nulia/partner-portal-screen.png"
                alt={partnerPortal.title}
                width={1262}
                height={2095}
                sizes="(max-width: 960px) 100vw, 680px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manager Insights */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.splitRow}>
            <div className={styles.splitText}>
              <h2>{managerInsights.title}</h2>
              <p className={styles.bodyText}>{managerInsights.description}</p>
            </div>
            <div className={styles.gradientInset}>
              <Image
                src="/images/nulia/manager-insights-screen.png"
                alt={managerInsights.title}
                width={1262}
                height={1208}
                sizes="(max-width: 960px) 100vw, 680px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <CaseStudyNav prev={prev} next={next} />

      </main>
      <Footer />
    </>
  );
}
