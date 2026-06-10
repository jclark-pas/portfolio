import { Fragment } from "react";
import Link from "next/link";
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

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />

      {/* Featured Work Section */}
      <section id="work" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} ${styles.workHeader}`}>
            <p className={styles.eyebrow}>Featured Work.</p>
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
          <div className={styles.sectionHeader}>
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
            <p className={styles.eyebrow}>Resume.</p>
            <h2 className={styles.sectionTitle}>
              15+ years experience in design, product, and leadership
            </h2>
          </div>
          <div className={styles.experienceList}>
            <ExperienceEntry
              role="Staff Product Designer for LivePlan"
              company="Palo Alto Software"
              dates="March 2021 - Present"
              defaultOpen
              bullets={[
                <Fragment key="editor">
                  Led a ground-up{" "}
                  <Link href="/work/liveplan" className={styles.bulletLink}>
                    redesign of LivePlan’s decade-old business plan editor
                  </Link>{" "}
                  that cut early churn 25% and lifted collaborative plan
                  comments 63% — grounded in user interviews and Amplitude
                  session-replay research, then validated in usability tests
                  where 100% of participants asked to join the beta.
                </Fragment>,
                <Fragment key="idea-canvas">
                  <Link href="/work/idea-canvas" className={styles.bulletLink}>
                    Designed and shipped Idea Canvas
                  </Link>
                  , an AI-powered idea-validation tool, from concept to MVP in 3
                  weeks — 93% of users completed the canvas, 70% acted on an AI
                  pivot suggestion, and 91% rated the AI feedback genuinely
                  helpful — expanding LivePlan from an execution tool into a
                  discovery platform that captures users earlier in their
                  journey.
                </Fragment>,
                "Built and maintained a token-based design system and component library in Figma and code, including a theming system that shipped a dozen customizable themes at launch and now powers the pitch-deck feature — accelerating delivery speed and cross-product consistency.",
                "Championed LivePlan’s AI strategy, putting contextual, business-specific AI writing tools at the point of need; surgical user controls turned AI skeptics into power users, lifting writing engagement 42% and AI feature adoption 38%.",
                "Reframed our research and discovery culture from “what we think users want” to “what real customers actually do” — pairing qualitative interviews with behavioral data to make the case for change undeniable.",
                "Partnered as an embedded team member with engineering, product, leadership, data research, and marketing to shape a future-focused roadmap and a two-year UI/UX execution strategy.",
              ]}
              skills={[5, 5, 3, 2]}
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
              skills={[5, 5, 3, 3]}
              cta={{ href: "/work/nulia", label: "Read the Nulia story" }}
            />
            <ExperienceEntry
              role="Design Director"
              company="Twenty Ideas"
              dates="July 2017 - December 2019"
              bullets={[
                "Built a design team from the ground up, hiring and mentoring a team of five talented designers.",
                "Guided our company from a development-focused crew to a full-fledged product agency.",
                "Served on the Executive team, playing a pivotal role in expanding our tight-knit group from 8 to 24 while increasing profitability and productivity, and \u2014 most importantly \u2014 making Twenty Ideas a great place to work.",
                "Cultivated a company culture rooted in structured best practices, fostering top-tier product thinking across all client projects.",
                "Spearheaded the launch of over a dozen web and mobile products.",
              ]}
              skills={[5, 5, 5, 3]}
            />
            <ExperienceEntry
              role="Senior UI/UX Designer"
              company="Concentric Sky"
              dates="June 2012 - July 2017"
              bullets={[
                "Served as the principal expert on customer, user, and market insight for client projects across multiple industries \u2014 including education, healthcare, and public services \u2014 in a hybrid product-design and management role.",
                "Established iterative discovery and design practices for new and existing products across web, mobile, and tablet.",
                "Performed customer research and produced functional requirements, information architecture, wireframes, prototypes, and brand guidelines.",
                "Oversaw project design teams of 1-3 designers to execute UI and UX design discovery.",
                "Consistently delivered the agency’s highest levels of profitability, client satisfaction, and account longevity.",
              ]}
              skills={[5, 5, 4, 3]}
            />
          </div>

          <div className={styles.subsection}>
            <p className={styles.subsectionLabel}>Additional Experience</p>
            <div className={styles.compactList}>
              <CompactEntry
                title="Product Designer"
                subtitle="Concentric Sky • May 2011 - June 2012"
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

      <Footer />
    </>
  );
}
