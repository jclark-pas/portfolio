import Link from "next/link";
import { Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedWorkSlider from "@/components/FeaturedWorkSlider";
import TestimonialDeck from "@/components/TestimonialDeck";
import Approach from "@/components/Approach";
import WorkTimeline from "@/components/WorkTimeline";
import StoryTeaser from "@/components/StoryTeaser";
import Footer from "@/components/Footer";
import { featuredWork } from "@/data/featuredWork";
import { testimonials } from "@/data/testimonials";
import styles from "./page.module.css";

const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1DGHqxANFJxMhypH82vOhf_COCVt8VIAj";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
      <Hero />

      {/* Featured Work Section */}
      <section id="work" className={styles.section} aria-labelledby="featured-work-heading">
        <div className={`${styles.sectionInner} ${styles.workInner}`}>
          <h2 id="featured-work-heading" className="sr-only">Case Studies</h2>
          <div className={`${styles.sectionHeader} ${styles.workHeader}`}>
            <div className={styles.workHeaderText}>
              <p className={styles.eyebrow} aria-hidden="true">Case Studies.</p>
              <p className={styles.workSubtitle}>
                A selection of my work on LivePlan
              </p>
            </div>
            <Link href="/work" className={styles.workCtaLink}>
              See all work <span aria-hidden="true">→</span>
            </Link>
          </div>
          <FeaturedWorkSlider items={featuredWork} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.section} ${styles.panel}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} ${styles.centered}`}>
            <p className={styles.eyebrow}>Testimonials.</p>
            <h2 className={styles.sectionTitleLg}>Kind words from awesome humans</h2>
          </div>
          <TestimonialDeck testimonials={testimonials} />
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} ${styles.approachTitle}`}>
              Approach
            </h2>
          </div>
          <Approach />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={`${styles.sectionTitle} ${styles.approachTitle}`}>
              Experience.
              <a
                href={RESUME_DOWNLOAD_URL}
                className={styles.eyebrowDownload}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download résumé as PDF"
                data-tooltip="Download résumé (PDF)"
              >
                <Download size={16} aria-hidden="true" />
              </a>
            </p>
          </div>
          <WorkTimeline />
          <div className={styles.storyTeaser}>
            <StoryTeaser />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </>
  );
}
