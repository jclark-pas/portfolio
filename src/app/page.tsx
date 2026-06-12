import Link from "next/link";
import { Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import TestimonialDeck from "@/components/TestimonialDeck";
import ExperienceEntry from "@/components/ExperienceEntry";
import CompactEntry from "@/components/CompactEntry";
import StoryTeaser from "@/components/StoryTeaser";
import Footer from "@/components/Footer";
import { featuredWork } from "@/data/featuredWork";
import { testimonials } from "@/data/testimonials";
import styles from "./page.module.css";

const planEditorFeature = featuredWork[0];
const ideaCanvasFeature = featuredWork[1];

const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1FxqJBJbCU9N4INfEJqP8qQQM5SbhITbo";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
      <Hero />

      {/* Featured Work Section */}
      <section id="work" className={styles.section} aria-labelledby="featured-work-heading">
        <div className={styles.sectionInner}>
          <h2 id="featured-work-heading" className="sr-only">Featured Work</h2>
          <div className={`${styles.sectionHeader} ${styles.workHeader}`}>
            <p className={styles.eyebrow} aria-hidden="true">Featured Work.</p>
            <Link href="/work" className={styles.workCtaLink}>
              See all work <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.featuredList}>
            <FeaturedWorkCard work={planEditorFeature} />
            <FeaturedWorkCard work={ideaCanvasFeature} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} ${styles.centered}`}>
            <p className={styles.eyebrow}>Testimonials.</p>
            <h2 className={styles.sectionTitleLg}>Kind words from awesome humans</h2>
          </div>
          <TestimonialDeck testimonials={testimonials} />
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>
              Resume.
              <a
                href={RESUME_DOWNLOAD_URL}
                className={styles.eyebrowDownload}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download résumé as PDF"
                data-tooltip="Download as PDF"
              >
                <Download size={16} aria-hidden="true" />
              </a>
            </p>
            <h2 className={styles.sectionTitle}>
              15+ years experience in design, product, and leadership
            </h2>
          </div>
          <div className={styles.experienceList}>
            <ExperienceEntry
              role="Staff Product Designer, LivePlan"
              company="Palo Alto Software"
              dates="March 2021 - Present"
              defaultOpen
              bullets={[
                "Led a ground-up redesign of LivePlan’s decade-old business plan editor, cutting early churn 25% and lifting collaborative plan comments 63%.",
                "Designed and shipped Idea Canvas, an AI idea-validation tool, from concept to MVP in 3 weeks — 93% completion, and 70% of users acted on an AI pivot suggestion.",
                "Built LivePlan’s token-based design system in Figma and code, including a theming engine that shipped a dozen themes at launch and now powers the pitch-deck feature.",
                "Championed LivePlan’s AI strategy, putting business-specific writing tools at the point of need — lifting writing engagement 42% and AI feature adoption 38%.",
                "Reframed research culture from “what we think users want” to “what customers actually do,” pairing interviews with behavioral data to shape a two-year product roadmap.",
              ]}
              focusAreas={["AI Product Design", "Design Systems", "Product Strategy"]}
              cta={[
                { href: "/work/liveplan", label: "Redesigning the Plan" },
                { href: "/work/idea-canvas", label: "Idea Canvas" },
              ]}
            />
            <ExperienceEntry
              role="Senior Product Designer"
              company="Nulia"
              dates="January 2020 - February 2021"
              bullets={[
                "Led a complete overhaul of the UI/UX, paving the way for a global product release.",
                "Ran a full accessibility audit and implemented a plan to reach WCAG 2.1 AA compliance \u2014 improving the experience for all users and unlocking sales to government and institutional customers across the US and Europe.",
                "Migrated Nulia from Sketch to Figma and built a design system and component library from scratch.",
                "Helped Nulia earn the \u201CModern Workplace: Apps & Solutions for Microsoft Teams Partner of the Year\u201D award in 2020.",
              ]}
              focusAreas={["Accessibility (WCAG 2.1)", "Design Systems", "Global UX"]}
              cta={{ href: "/work/nulia", label: "Nulia" }}
            />
            <ExperienceEntry
              role="Design Director"
              company="Twenty Ideas"
              dates="July 2017 - December 2019"
              bullets={[
                "Built the design team from scratch, hiring and mentoring five designers.",
                "Guided our company from a development-focused crew to a full-fledged product agency.",
                "Served on the executive team as we grew from 8 to 24, increasing profitability while keeping Twenty Ideas a great place to work.",
                "Spearheaded the launch of over a dozen web and mobile products.",
              ]}
              focusAreas={["Design Leadership", "Hiring & Mentorship", "Team Building"]}
              cta={[
                { href: "/work/qlarity", label: "Qlarity" },
                { href: "/work/intrevent", label: "Intrevent" },
                { href: "/work/learningwrite", label: "LearningWrite" },
              ]}
            />
            <ExperienceEntry
              role="Senior UI/UX Designer"
              company="Concentric Sky (now part of Instructure)"
              dates="June 2012 - July 2017"
              bullets={[
                "Served as the principal expert on customer and market insight for client work across education, healthcare, and public services, in a hybrid design/management role.",
                "Established iterative discovery and design practices for new and existing products across web, mobile, and tablet.",
                "Consistently delivered the agency’s highest levels of profitability, client satisfaction, and account longevity.",
              ]}
              focusAreas={["User Research", "Product Discovery", "UX/UI Design"]}
              cta={{ href: "/work/ktek", label: "KinderTek" }}
            />
          </div>

          <div className={styles.subsection}>
            <p className={styles.subsectionLabel}>Additional Experience</p>
            <div className={styles.compactList}>
              <CompactEntry
                title="Product Designer"
                subtitle="Concentric Sky (now part of Instructure) • May 2011 - June 2012"
              />
              <CompactEntry
                title="Lead Marketing Designer"
                subtitle="Palo Alto Software • May 2010 - May 2011"
              />
              <CompactEntry
                title="Owner"
                subtitle="Origen Creatives • August 2003 - May 2010"
              />
            </div>
          </div>

          <div className={styles.subsection}>
            <p className={styles.subsectionLabel}>Education</p>
            <div className={styles.compactList}>
              <CompactEntry
                title="George Fox University"
                subtitle={["Master of Divinity (M.Div)", "Magna Cum Laude • 2010"]}
              />
              <CompactEntry
                title="Valparaiso University"
                subtitle={["Bachelor of Arts with Honors", "Cum Laude • 2002"]}
              />
            </div>
          </div>

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
