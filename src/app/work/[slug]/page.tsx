import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import { projects, getProject, getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <Navigation />
      <CaseStudyHero
        company={project.title}
        title={project.tagline}
        description={project.description}
        color={project.color}
        heroImage={project.heroImage}
      />

      {/* What I Did */}
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
      {project.highlights.length > 0 && (
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>Highlights</h2>
            <div className={styles.highlights}>
              {project.highlights.map((h) => (
                <div key={h.title} className={styles.highlight}>
                  {h.image && (
                    <div className={styles.highlightImage}>
                      <Image
                        src={h.image}
                        alt={h.title}
                        fill
                        sizes="(max-width: 960px) 100vw, 450px"
                        className={styles.imgCover}
                      />
                    </div>
                  )}
                  <h3>{h.title}</h3>
                  <p className={styles.bodyText}>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className={styles.section}>
          <div className={styles.inner}>
            <Testimonial
              quote={project.testimonial.quote}
              name={project.testimonial.name}
              title={project.testimonial.title}
            />
          </div>
        </section>
      )}

      {/* Detailed Sections */}
      {project.sections.map((s, i) => (
        <section key={s.title} className={styles.section}>
          <div className={styles.inner}>
            <div
              className={`${styles.twoCol} ${i % 2 === 1 ? styles.reverse : ""}`}
            >
              <div>
                <h2>{s.title}</h2>
                <p className={styles.bodyText}>{s.description}</p>
              </div>
              {s.image ? (
                <div className={styles.sectionImage}>
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 960px) 100vw, 400px"
                    className={styles.imgCover}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom Nav */}
      <nav className={styles.bottomNav}>
        <Link href={`/work/${prev.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>&larr; {prev.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>{next.title} &rarr;</span>
        </Link>
      </nav>

      <Footer />
    </>
  );
}
