import Navigation from "@/components/Navigation";
import WorkCard from "@/components/WorkCard";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { featuredWork, featuredSlugs } from "@/data/featuredWork";
import styles from "./page.module.css";

export const metadata = { title: "Work" };

const otherProjects = projects.filter((p) => !featuredSlugs.has(p.slug));

export default function WorkIndexPage() {
  return (
    <>
      <Navigation />
      <main id="main">

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.eyebrow}>Work.</p>
          <h1 className={styles.headline}>
            A decade and a half of product design
          </h1>
          <p className={styles.lead}>
            Selected case studies and projects across LivePlan and earlier
            roles — spanning product strategy, design systems, AI, and research.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.subsectionLabel}>Featured</p>
          </div>
          <FeaturedWorkSlider items={featuredWork} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.subsectionLabel}>More Work</p>
          </div>
          <div className={styles.moreWorkGrid}>
            {otherProjects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
