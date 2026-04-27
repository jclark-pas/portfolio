import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAdjacentProjects } from "@/data/projects";
import ObservationViewer from "./ObservationViewer";
import BeforeAfterToggle from "./BeforeAfterToggle";
import styles from "./page.module.css";

const stats = [
  { value: "40%", title: "Decrease in early churn", label: "for new users" },
  { value: "42%", title: "Writing engagement", label: "more sections started" },
  { value: "38%", title: "AI feature adoption", label: "increase in usage" },
  { value: "63%", title: "Collaboration increase", label: "in plan comments" },
];

const insights = [
  {
    title: "Imposter syndrome was rampant",
    body: "Small business owners needed guidance on how to “do it right” — they craved validation that their plan would meet investor expectations.",
  },
  {
    title: "AI trust gap",
    body: "Users had access to LLMs but lacked confidence in generic output. They wanted AI that understood their specific business context.",
  },
  {
    title: "Templates felt outdated",
    body: "Users complained that plan templates looked old and couldn’t be customized to reflect their brand identity.",
  },
  {
    title: "Features were hidden",
    body: "Session replays revealed users couldn’t find AI writing tools, and when they did, they wanted more surgical control.",
  },
];

const observations = [
  {
    title: "Extra clicks wasted users’ time to do editorial tasks",
    body: "Each edit to their plan required at least two extra clicks.",
  },
  {
    title: "Users made charts in Excel and added them into LivePlan",
    body: "Our native charting tools weren’t being discovered.",
  },
  {
    title: "Users bolded entire lines to simulate headlines",
    body: "Without proper heading styles, users hacked formatting.",
  },
  {
    title: "Users struggled to customize their plan outline",
    body: "Outline customization existed — just elsewhere in the app.",
  },
];

const pillars = [
  {
    title: "Inline Everything",
    body: "Eliminate modal detail views. Let users write, edit, and refine directly in the document flow without losing context and to limit the amount of round-tripping users are required to do for editorial tasks.",
  },
  {
    title: "Design Token Theming",
    body: "Build an extensible system where themes cascade from print PDFs to on-screen editing to pitch decks — with brand customization.",
  },
  {
    title: "Contextual AI",
    body: "Surface AI writing tools at the point of need, with business-specific instructions and surgical precision over output.",
  },
];

const beforeAfter = [
  {
    title: "Inline Editing",
    before: {
      body: "Users entered a separate detail view to edit each section, losing context of their overall plan.",
    },
    after: {
      body: "Write directly in the document flow. No modals, no round-tripping.",
    },
  },
  {
    title: "AI Writing Tools",
    before: {
      body: "AI writing lived in a sidebar disconnected from what users were actually working on.",
    },
    after: {
      body: "AI suggestions appear in context, with surgical controls over tone, length, and scope.",
    },
  },
  {
    title: "Plan Outline Editing",
    before: {
      body: "Outline changes required navigating to a separate settings area, away from the content itself.",
    },
    after: {
      body: "Reorder, rename, and restructure the outline directly alongside the plan as you write.",
    },
  },
];

const typographyTokens = [
  { name: "Display", family: "Bricolage Grotesque" },
  { name: "Heading", family: "Inter Tight" },
  { name: "Body", family: "Inter" },
  { name: "Serif", family: "Source Serif" },
  { name: "Mono", family: "JetBrains Mono" },
  { name: "Classic", family: "Georgia" },
];

export default function LivePlanPage() {
  const { prev, next } = getAdjacentProjects("liveplan");

  return (
    <>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIntro}>
            <p className={styles.kicker}>LivePlan · Product Design · 2024</p>
            <h1 className={styles.heroHeadline}>
              Redesigning the Business Plan Writing Experience
            </h1>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/images/liveplan/businessplan-hero.png"
              alt="LivePlan business plan editor with executive summary, formatting toolbar, and inline AI guidance"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className={styles.heroImg}
            />
          </div>
          <p className={styles.heroDescription}>
            How user research, design systems thinking, and AI integration
            reduced early churn by 70% and transformed how entrepreneurs
            write business plans.
          </p>
          <dl className={styles.metaRow}>
            <div className={styles.metaCell}>
              <dt>Role</dt>
              <dd>Lead Product Designer</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Team</dt>
              <dd>9 Engineers, 1 PM</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Timeline</dt>
              <dd>3 months</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.statsBand}>
        <div className={styles.inner}>
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.title} className={styles.statCard}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statTitle}>{s.title}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>The Challenge</p>
          <h2 className={styles.sectionHeading}>
            A decade-old editor, holding the product back.
          </h2>
          <div className={styles.prose}>
            <p>
              LivePlan helps entrepreneurs write business plans — but our
              decade-old editor was showing its age. New users were churning
              before they could experience the product’s value, and seasoned
              users were building workarounds for basic functionality.
            </p>
            <p>
              I was tasked with reimagining the plan-writing experience from
              the ground up: making it faster to write, easier to customize,
              and smarter with AI — while maintaining the guided structure that
              made LivePlan trusted by lenders and investors.
            </p>
          </div>
        </div>
        <div className={styles.wideImage} aria-hidden="true" />
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>Discovery</p>
          <h2 className={styles.sectionHeading}>
            Understanding the problem space
          </h2>
          <p className={styles.lead}>
            I conducted three streams of research to build a complete picture:
            user interviews with new signups and power users, session replay
            analysis in Amplitude, and deep-dives with our customer advocacy
            team.
          </p>
        </div>
        <div className={styles.gradientBlock} aria-hidden="true" />
      </section>

      <section className={styles.insightsSection}>
        <div className={styles.insightsContainer}>
          <div className={styles.insightsHeader}>
            <p className={styles.eyebrow}>Key Insights</p>
            <blockquote className={styles.bigQuote}>
              “Users weren’t struggling because the features didn’t exist —
              they were struggling because they couldn’t find them, trust them,
              or make them their own.”
            </blockquote>
            <p className={styles.quoteFollow}>
              This reframing shifted our approach from building new capabilities
              to surfacing existing ones in context.
            </p>
          </div>
          <div className={styles.insightsGrid}>
            {insights.map((i) => (
              <article key={i.title} className={styles.insightCard}>
                <h3 className={styles.insightTitle}>{i.title}</h3>
                <p className={styles.insightBody}>{i.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <ObservationViewer items={observations} />
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>
            Design Approach
          </p>
          <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
            Three pillars of the redesign
          </h2>
          <div className={styles.pillarGrid}>
            {pillars.map((p) => (
              <article key={p.title} className={styles.pillarCard}>
                <div className={styles.pillarIcon} aria-hidden="true" />
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>The Changes</p>
          <h2 className={styles.sectionHeading}>Before → After</h2>
          <p className={styles.lead}>
            Each change was designed to eliminate friction and put users in
            control.
          </p>
          <div className={styles.comparisons}>
            {beforeAfter.map((b) => (
              <BeforeAfterToggle key={b.title} comparison={b} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>
            Design System
          </p>
          <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
            A theming system built for scale
          </h2>
          <p className={`${styles.lead} ${styles.onDarkMuted}`}>
            Instead of creating fixed templates, I designed a token-based
            theming system. This allowed us to ship a dozen professionally-
            designed themes at launch while giving users the power to customize
            colors, fonts, and layouts.
          </p>
          <div className={styles.themingVisual}>
            <Image
              src="/images/liveplan/themes-examples.png"
              alt="Four theme variations of the LivePlan plan editor — neutral, classic teal, bold orange/teal, and bold red/blue — each rendering the same Expectations chapter with different typography, color, and chart treatments"
              width={3070}
              height={2364}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.themingImg}
            />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionHeading}>How the token system works</h2>
          <div className={styles.tokenGrid}>
            <div className={styles.tokenCol}>
              <h3 className={styles.tokenTitle}>Typography tokens</h3>
              <p className={styles.tokenBody}>
                Font families, weights, and sizes for headlines through body
                text. 6 curated pairings per theme.
              </p>
              <p className={styles.tokenSubLabel}>Fonts</p>
              <div className={styles.typeList}>
                {typographyTokens.map((t) => (
                  <div key={t.name} className={styles.typeRow}>
                    <span className={styles.typeName}>{t.name}</span>
                    <span
                      className={styles.typeFamily}
                      style={{ fontFamily: t.family }}
                    >
                      {t.family}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.tokenCol}>
              <h3 className={styles.tokenTitle}>Color tokens</h3>
              <p className={styles.tokenBody}>
                Brand colors that cascade through charts, links, highlights,
                and call-to-action elements.
              </p>
              <Image
                src="/images/liveplan/color-variables.png"
                alt="Color token variables for the LivePlan theming system — base surface, surface-card, surface-sidebar, primary, body-text, accent 1–3, and border tokens shown alongside five theme palettes"
                width={3362}
                height={1590}
                sizes="(max-width: 1200px) 100vw, 600px"
                className={styles.tokenImg}
              />
            </div>
          </div>
        </div>
      </section>

      <nav className={styles.bottomNav}>
        <Link href={`/work/${prev.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>← {prev.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className={styles.navLink}>
          <span className={styles.navLabel}>{next.title} →</span>
        </Link>
      </nav>

      <Footer />
    </>
  );
}
