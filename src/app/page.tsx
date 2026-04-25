import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WorkCarousel from "@/components/WorkCarousel";
import FeaturedWorkCard, {
  type FeaturedWork,
} from "@/components/FeaturedWorkCard";
import Testimonial from "@/components/Testimonial";
import ExperienceEntry from "@/components/ExperienceEntry";
import CompactEntry from "@/components/CompactEntry";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

const featuredWork: FeaturedWork[] = [
  {
    number: "01",
    eyebrow: "LivePlan · Plan Editor",
    title: "Redesigning the Plan",
    description:
      "Reimagining a decade-old business plan editor — making it faster to write, easier to customize, and smarter with AI while maintaining the structure investors trust.",
    tags: [
      "Strategy",
      "User Research",
      "Design Systems",
      "AI Integration",
      "Product Design",
    ],
    href: "/work/liveplan",
    imageBackground:
      "linear-gradient(135deg, #214E41 0%, #009660 35%, #6EAD59 65%, #FFCC50 100%)",
  },
  {
    number: "02",
    eyebrow: "LivePlan · Design System",
    title: "Scaling Design with AI",
    description:
      "Building Evergreen — a token-based design system that powers print, product, and pitch decks — paired with AI-driven workflows that accelerated our team's output.",
    tags: [
      "Design Systems",
      "Tokens",
      "AI Process",
      "Team Leadership",
      "Documentation",
    ],
    href: "#",
    imageBackground:
      "linear-gradient(135deg, #1F3939 0%, #57766A 50%, #E8A33A 100%)",
  },
  {
    number: "03",
    eyebrow: "LivePlan · Idea Canvas",
    title: "From Idea to Plan",
    description:
      "An AI-assisted canvas that helps entrepreneurs shape a fuzzy idea into a fundable plan — moving users from blank page to first draft in minutes.",
    tags: ["Product Strategy", "AI", "Onboarding", "Information Design"],
    href: "#",
    imageBackground:
      "linear-gradient(135deg, #6F4AC7 0%, #3B82C9 50%, #F26A5D 100%)",
  },
];

const otherProjects = projects.filter((p) => p.slug !== "liveplan");

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />

      {/* Featured Work Section */}
      <section id="work" className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Featured Work.</p>
            <h2 className={styles.sectionTitleLg}>
              Three stories from LivePlan
            </h2>
          </div>
          <div className={styles.featuredList}>
            {featuredWork.map((work) => (
              <FeaturedWorkCard key={work.number} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* More Work Section */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.subsectionLabel}>More Work</p>
          </div>
          <WorkCarousel projects={otherProjects} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Testimonials.</p>
            <h2 className={styles.sectionTitleLg}>Real words from real people</h2>
          </div>
          <div className={styles.testimonialGrid}>
            <Testimonial
              quote="Josh is a strong leader and mentor in UX design by encouraging and facilitating everyone across the product team to consider the user experience in their process. He's a master at asking insightful questions to get quality answers to better inform the project, business goals, and team communication."
              name="Ali Atanasov"
              title="Lead Product Designer at Reforge"
            />
            <Testimonial
              quote="Josh's experience in UX, HCI, and product design are invaluable skills to any startup or product team, and his positive attitude, hilarious spirit, and joyful approach to tackling problems are invaluable skills for any team anywhere."
              name="Laurel Benson"
              title="Senior Product Designer at Sephora"
            />
            <Testimonial
              quote="Josh is a rare individual with a range of talents including high-level strategy for product...and on top of that is fun to work with and a great team member. If you are lucky enough, I highly recommend working with him."
              name="Mike Biglan"
              title="Founder/CEO of Twenty Ideas"
            />
            <Testimonial
              quote="Josh is passionate about creating engaging and empowering experiences for all different types of users. He is a caring manager and an excellent mentor from whom I have learned a great deal."
              name="Brooke Zunja"
              title="Product Design Manager at Rithum"
            />
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Resume.</p>
            <h2 className={styles.sectionTitle}>
              15+ years experience in design, product, and leadership
            </h2>
          </div>
          <div className={styles.experienceList}>
            <ExperienceEntry
              role="Lead Product Designer for LivePlan"
              company="Palo Alto Software"
              dates="March 2021 - Present"
              bullets={[
                "Partnered with others to form a future-focused roadmap for LivePlan, detailing both the product trajectory and the anticipated customer journey.",
                "Led a complete product rebrand, creating easy-to-follow visual branding guidelines. I then put together (and continue to manage) a cohesive design system and component library in Figma and code. This greatly accelerates our capacity and consistency.",
                "Work as an embedded team member with engineers, product managers, company leadership, data research, and product marketing.",
                "Initiated a product UI/UX overhaul, broken down into a two-year execution strategy to actually get the changes going without overwhelming the delivery pipeline.",
                "Championed the charge for our company to embrace AI, coming up with a UX plan to boost how our customers do business plan writing in LivePlan.",
                "I worked on making our user research and customer discovery processes better, shifting us from focusing on what we think our users want to really listening to what our actual customers are saying.",
              ]}
              skills={[5, 5, 3, 2]}
            />
            <ExperienceEntry
              role="Senior Product Designer"
              company="Nulia"
              dates="January 2020 - February 2021"
              bullets={[
                "Led a complete overhaul of the UI/UX, paving the way for a global product release.",
                "Managed a complete accessibility audit, and implemented a plan to meet WCAG 2.1 compliance which was great for customers (accessibility FTW!) and business (it allowed us to sell to governments and institutions in the US and Europe).",
                "Worked directly with engineering team members.",
                "Transitioned Nulia to Figma from Sketch, and built a design system and component library from scratch.",
                "Nulia was honored as the \u201CModern Workplace: Apps & Solutions for Microsoft Teams Partner of the Year\u201D in 2020.",
              ]}
              skills={[5, 5, 3, 3]}
            />
            <ExperienceEntry
              role="Design Director"
              company="Twenty Ideas"
              dates="July 2017 - December 2019"
              bullets={[
                "Built a design team from the ground up, hiring and mentoring a group of five talented, earnest, and eager designers.",
                "Guided our company from a development-focused crew to a full-fledged product agency.",
                "Served on the Executive team, playing a pivotal role in expanding our tight-knit group from 8 to 24 while increasing profitability, nurturing productivity, and \u2013 most importantly \u2013 making Twenty Ideas a great place to work.",
                "Cultivated a company culture rooted in structured best practices, fostering top-tier product thinking across all client projects.",
                "Spearheaded the successful launch of over a dozen web and mobile products, each one a testament to our team\u2019s growth and cohesive effort.",
              ]}
              skills={[5, 5, 5, 3]}
            />
            <ExperienceEntry
              role="Senior UI/UX Designer"
              company="Concentric Sky"
              dates="June 2012 - July 2017"
              bullets={[
                "A product design and management hybrid role that served as the principal expert of customer, business, and user data, business, and market knowledge for client projects across multiple industries \u2014 including education, healthcare, and public services.",
                "Established the foundation for iterative discovery and design for new and existing products across web, mobile and tablet platforms.",
                "Performed customer research, architected functional requirements and information architecture, wireframes, prototypes, and brand guidelines.",
                "Oversaw project design teams of 1-3 designers to execute UI and UX design discovery.",
                "Consistently maintained projects with the highest level of profitability, client satisfaction, and project longevity across the entire agency.",
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
                title="Valparaiso University"
                subtitle={["Bachelor of Arts with Honors", "Cum Laude • 2002"]}
              />
              <CompactEntry
                title="George Fox University"
                subtitle={["Master of Divinity (M.Div)", "Magna Cum Laude • 2010"]}
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
