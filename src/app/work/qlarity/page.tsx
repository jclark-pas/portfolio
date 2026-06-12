import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import { getProject, getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";

export const metadata = { title: "Qlarity" };

export default function QlarityPage() {
  const project = getProject("qlarity")!;
  const { prev, next } = getAdjacentProjects("qlarity");

  const [onTheGo, realLife] = project.highlights;
  const [peace, screening, therapeutic] = project.sections;

  // Feature rows: image alternates left/right; only "On-the-go" is tinted.
  const rows = [
    { ...onTheGo, src: "/images/qlarity/on-the-go-screen.png", w: 1136, h: 1136, imageLeft: true, tinted: true },
    { ...realLife, src: "/images/qlarity/real-life-help-screen.png", w: 1136, h: 846, imageLeft: false, tinted: false },
    { ...peace, src: "/images/qlarity/peace-of-mind-screen.png", w: 1136, h: 648, imageLeft: true, tinted: false },
    { ...screening, src: "/images/qlarity/screening-screen.png", w: 1056, h: 612, imageLeft: false, tinted: false },
    { ...therapeutic, src: "/images/qlarity/therapeutic-screen-v2.png", w: 1437, h: 1275, imageLeft: true, tinted: false },
  ];

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

      {/* Feature rows */}
      {rows.map((row) => {
        const image = (
          <div key="img" className={styles.splitImage}>
            <Image
              src={row.src}
              alt={row.title}
              width={row.w}
              height={row.h}
              sizes="(max-width: 960px) 100vw, 540px"
            />
          </div>
        );
        const text = (
          <div key="text" className={styles.splitText}>
            <h2>{row.title}</h2>
            <p className={styles.bodyText}>{row.description}</p>
          </div>
        );
        return (
          <section
            key={row.title}
            className={`${styles.section} ${row.tinted ? styles.altBg : ""}`}
          >
            <div className={styles.inner}>
              <div className={`${styles.splitRow} ${row.imageLeft ? styles.imgLeft : styles.imgRight}`}>
                {row.imageLeft ? [image, text] : [text, image]}
              </div>
            </div>
          </section>
        );
      })}

      <CaseStudyNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
