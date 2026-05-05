import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getAdjacentProjects } from "@/data/projects";
import ObservationViewer from "./ObservationViewer";
import BeforeAfterToggle from "./BeforeAfterToggle";
import styles from "./page.module.css";

type Stat = {
  value: string;
  title: string;
  label?: string;
  description?: string;
};

const stats: Stat[] = [
  { value: "40%", title: "Decrease in early churn", label: "for new users" },
  { value: "42%", title: "Writing engagement", label: "more sections started" },
  { value: "38%", title: "AI feature adoption", label: "increase in usage" },
  { value: "63%", title: "Collaboration increase", label: "in plan comments" },
];

const validationStats: Stat[] = [
  { value: "90%", title: "Found outline tools", label: "Up from ~15%" },
  { value: "70%", title: "Located AI tools", label: "Up from 20%" },
];

const outcomes: Stat[] = [
  {
    value: "40%",
    title: "Decrease in early churn",
    description:
      "New users completed their first plan section at dramatically higher rates.",
  },
  {
    value: "42%",
    title: "Increase in writing engagement",
    description:
      "Users started — and finished — more sections of their plans.",
  },
  {
    value: "38%",
    title: "Increase in AI feature usage",
    description:
      "Contextual placement and surgical controls drove adoption.",
  },
  {
    value: "63%",
    title: "Increase in plan comments",
    description:
      "Real-time collaboration drove team-level engagement on the plan.",
  },
];

const reflections = [
  {
    title: "Session replays revealed what interviews couldn’t",
    body:
      "Watching users struggle in real-time — rage-clicking, creating workarounds, abandoning flows — gave me conviction that interviews alone miss. The combination of qualitative insights and behavioral data made the case for change undeniable.",
  },
  {
    title: "Design systems thinking paid dividends",
    body:
      "Building a token-based theming system took longer upfront, but it let us ship a dozen themes at launch and respond to user requests for brand customization without redesigning components. The same system now powers the pitch deck feature.",
  },
  {
    title: "AI trust is earned through context",
    body:
      "Users didn’t distrust AI — they distrusted generic AI. By building business-specific instructions and giving users surgical control over what AI touched, we turned skeptics into power users.",
  },
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

const designApproach = [
  {
    title: "Inline Everything",
    body: "Eliminate modal detail views. Let users write, edit, and refine directly in the document flow without losing context and to limit the amount of round-tripping users are required to do for editorial tasks.",
    comparisons: [
      {
        title: "Inline Editing",
        before: {
          body: "Users entered a separate detail view to edit each section, losing context of their overall plan.",
          videoSrc: "/videos/plan-inlineediting-before.mp4",
        },
        after: {
          body: "Write directly in the document flow. No modals, no round-tripping. Reorder, rename, and restructure the outline directly alongside the plan as you write.",
          videoSrc: "/videos/plan-inlineediting.mp4",
        },
      },
    ],
  },
  {
    title: "Design Token Theming",
    body: "Build an extensible system where themes cascade from print PDFs to on-screen editing to pitch decks — with brand customization.",
    comparisons: [
      {
        title: "Theme Customization",
        before: {
          body: "Users were locked into a small set of fixed templates with no way to adjust colors, typography, or layout to match their brand.",
          videoSrc: "/videos/plan-themes-old.mp4",
        },
        after: {
          body: "A dozen professionally-designed themes ship at launch, each editable down to the token — colors, fonts, and chart styling cascade through the entire plan.",
          videoSrc: "/videos/plan-themes.mp4",
        },
      },
    ],
  },
  {
    title: "Contextual AI",
    body: "Surface AI writing tools at the point of need, with business-specific instructions and surgical precision over output.",
    comparisons: [
      {
        title: "AI Writing Tools",
        before: {
          body: "AI writing lived in a sidebar disconnected from what users were actually working on.",
          videoSrc: "/videos/plan-ai-old.mp4",
        },
        after: {
          body: "AI suggestions appear in context, with surgical controls over tone, length, and scope.",
          videoSrc: "/videos/plan-ai.mp4",
        },
      },
    ],
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

function StatCard({
  stat,
  variant = "default",
  compact = false,
}: {
  stat: Stat;
  variant?: "default" | "onDark";
  compact?: boolean;
}) {
  const classes = [
    styles.statCard,
    compact ? styles.statCardCompact : "",
    variant === "onDark" ? styles.statCardOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <p className={styles.statValue}>{stat.value}</p>
      <p className={styles.statTitle}>{stat.title}</p>
      {stat.label ? <p className={styles.statLabel}>{stat.label}</p> : null}
      {stat.description ? (
        <p className={styles.statDescription}>{stat.description}</p>
      ) : null}
    </div>
  );
}

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
              <StatCard key={s.title} stat={s} />
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
        <div className={styles.wideImageSlider}>
          <BeforeAfterSlider
            aspectRatio="16 / 9"
            beforeLabel="Before"
            afterLabel="After"
            before={
              <Image
                src="/images/liveplan/editor-before.png"
                alt="The legacy LivePlan editor — modal-heavy, fixed templates, sidebar-only AI"
                width={2400}
                height={1350}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            }
            after={
              <Image
                src="/images/liveplan/editor-after.png"
                alt="The redesigned LivePlan editor — inline writing, themed output, contextual AI"
                width={2400}
                height={1350}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            }
          />
        </div>
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
          <p className={`${styles.lead} ${styles.onDarkMuted}`}>
            Each pillar shaped a focused set of changes — eliminating friction
            and putting users back in control.
          </p>
          <div className={styles.pillarStack}>
            {designApproach.map((p) => (
              <article key={p.title} className={styles.pillarCard}>
                <div className={styles.pillarHeader}>
                  <div className={styles.pillarIcon} aria-hidden="true" />
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
                {p.comparisons.length > 0 && (
                  <div className={styles.pillarComparisons}>
                    {p.comparisons.map((c) => (
                      <BeforeAfterToggle key={c.title} comparison={c} />
                    ))}
                  </div>
                )}
              </article>
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

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Validation</p>
          <h2 className={styles.sectionHeading}>Testing with real users</h2>
          <p className={styles.lead}>
            We ran multiple rounds of usability testing to validate the designs
            before engineering investment. The results gave us confidence — and
            surfaced one more requirement.
          </p>
          <div className={styles.validationGrid}>
            <div>
              <div className={styles.validationStats}>
                {validationStats.map((s) => (
                  <StatCard key={s.title} stat={s} compact />
                ))}
              </div>
              <div className={styles.calloutHighlight}>
                <div>
                  <p className={styles.calloutTitle}>
                    Testing surfaced a new requirement
                  </p>
                  <p className={styles.calloutBody}>
                    Users loved the themes but wanted brand customization —
                    custom colors and fonts. Added to the backlog and shipped
                    in a fast-follow.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.imageStack}>
              <ImagePlaceholder
                aspectRatio="16 / 10"
                label="Usability Test Session"
                guidance="Photo from a usability test — anonymized Zoom screenshot, hands-on-laptop shot, or testing setup. Makes the research feel real and human."
              />
            </div>
          </div>
          <div className={styles.bigStatPillWrap}>
            <div className={styles.bigStatPill}>
              <span className={styles.bigStatValue}>100%</span>
              <span className={styles.bigStatLabel}>
                of usability participants asked to join the beta
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>The Solution</p>
          <h2 className={styles.sectionHeading}>The redesigned experience</h2>
          <p className={styles.lead}>
            The shipped editor brought all three pillars together — inline
            writing, themed output, and contextual AI — in a single surface.
          </p>
          <div className={styles.solutionHero}>
            <ImagePlaceholder
              aspectRatio="16 / 9"
              label="Hero Editor View"
              guidance="The full plan editor showing inline editing in action — sidebar visible, AI tools accessible, real business plan with rich formatting. The 'wow' moment."
            />
          </div>
          <div className={styles.solutionDetails}>
            <ImagePlaceholder
              aspectRatio="4 / 3"
              label="AI Writing Detail"
              guidance="Close-up of paragraph selection, contextual menu, and business-specific instructions panel."
            />
            <ImagePlaceholder
              aspectRatio="4 / 3"
              label="Theme Customization Detail"
              guidance="Theme settings panel with color pickers, font selectors, and live preview."
            />
            <ImagePlaceholder
              aspectRatio="4 / 3"
              label="Collaboration Features"
              guidance="Inline comments, presence indicators, or commenting interface — supports the 63% collaboration uplift."
            />
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>Outcomes</p>
          <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
            The impact after launch
          </h2>
          <p className={`${styles.lead} ${styles.onDarkMuted}`}>
            The redesigned experience rolled out to all users in Q3 2024.
            Within the first 60 days, every metric we tracked moved in the
            right direction.
          </p>
          <div className={styles.outcomeGrid}>
            {outcomes.map((o) => (
              <StatCard key={o.title} stat={o} variant="onDark" />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <h2 className={styles.sectionHeading}>Reflections</h2>
          <div className={styles.reflectionList}>
            {reflections.map((r) => (
              <div key={r.title} className={styles.reflectionItem}>
                <h3 className={styles.reflectionTitle}>{r.title}</h3>
                <p className={styles.reflectionBody}>{r.body}</p>
              </div>
            ))}
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
