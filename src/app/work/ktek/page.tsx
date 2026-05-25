import Image from "next/image";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import { getProject, getAdjacentProjects } from "@/data/projects";
import TeacherAppCarousel from "./TeacherAppCarousel";
import styles from "./page.module.css";

const teacherSlides = [
  { src: "/images/ktek/teacher-01-blank-v2.png", alt: "Empty class roster — the teacher app's starting state" },
  { src: "/images/ktek/teacher-02-add-student-v2.png", alt: "Adding a new student to a class" },
  { src: "/images/ktek/teacher-03-main-v2.png", alt: "Student progress dashboard across common core standards" },
  { src: "/images/ktek/teacher-04-notes-v2.png", alt: "Teacher notes on a student's progress" },
  { src: "/images/ktek/teacher-05-activity-type-v2.png", alt: "Choosing an activity type" },
  { src: "/images/ktek/teacher-06-add-note-v2.png", alt: "Adding a note about a student" },
  { src: "/images/ktek/teacher-07-app-passcode-v2.png", alt: "Auto-generated image passcode for a student" },
];

export default function KtekPage() {
  const project = getProject("ktek")!;
  const { prev, next } = getAdjacentProjects("ktek");

  // Figma layout pairing:
  //   Row 1 — engagement image (iPad grid) carries two text units
  //   Row 2 — scrapbook image carries the rewards copy
  const [engagement, modelLeadTest] = project.highlights;
  const rewards = project.sections[0];
  const teacherApp = project.sections[1];

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

      {/* Stacked feature section */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.featureRows}>
            <div className={styles.featureRow}>
              <div className={styles.featureImage}>
                <Image
                  src={engagement.image!}
                  alt={engagement.title}
                  width={1088}
                  height={1088}
                />
              </div>
              <div className={styles.featureText}>
                <div>
                  <h3>{engagement.title}</h3>
                  <p className={styles.bodyText}>{engagement.description}</p>
                </div>
                <div>
                  <h3>{modelLeadTest.title}</h3>
                  <p className={styles.bodyText}>{modelLeadTest.description}</p>
                </div>
              </div>
            </div>

            <div className={styles.featureRow}>
              <div className={styles.featureImage}>
                <Image
                  src={modelLeadTest.image!}
                  alt={rewards.title}
                  width={1080}
                  height={928}
                />
              </div>
              <div className={styles.featureText}>
                <div>
                  <h3>{rewards.title}</h3>
                  <p className={styles.bodyText}>{rewards.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher app carousel */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <TeacherAppCarousel slides={teacherSlides} />
          <div className={styles.teacherText}>
            <h2>{teacherApp.title}</h2>
            <p className={styles.bodyText}>{teacherApp.description}</p>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <CaseStudyNav prev={prev} next={next} />

      <Footer />
    </>
  );
}
