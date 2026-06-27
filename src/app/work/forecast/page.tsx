import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CohortFunnel from "./CohortFunnel";
import JourneyFunnel from "./JourneyFunnel";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import { featuredWork } from "@/data/featuredWork";
import ObservationAccordion, {
  type Observation,
} from "@/components/ObservationAccordion";
import { LineChart, ReceiptText, Layers, TrendingUp } from "lucide-react";
import styles from "./page.module.css";

// DRAFT case study — not registered in projects.ts (stays off the public /work grid)
// and marked noindex below. All numbers are rounded/relative; all customer quotes are
// anonymized and still need consent before this ships. Image slots are placeholders.
export const metadata: Metadata = {
  title: "Actuals + Forecast (draft)",
  description:
    "Leading LivePlan's 2025 forecasting overhaul — and learning that the right tool, aimed at the wrong moment in the customer journey, still can't move the metric that matters.",
  robots: { index: false, follow: false },
};

/* ---- Placeholder for an image/video asset we haven't dropped in yet ---- */
function AssetPlaceholder({
  label,
  ratio = "16 / 9",
}: {
  label: string;
  ratio?: string;
}) {
  const style: CSSProperties = {
    aspectRatio: ratio,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "var(--space-xl)",
    border: "1.5px dashed var(--color-border)",
    borderRadius: "var(--radius-lg)",
    background: "var(--color-bg-card)",
    color: "var(--color-text-secondary)",
    fontSize: "14px",
    lineHeight: 1.5,
    fontStyle: "italic",
  };
  return (
    <div style={style}>
      <span>🖼 {label}</span>
    </div>
  );
}

const flowStats = [
  {
    value: "30%",
    title: "Fewer trips to the Dashboard",
    label:
      "Once actuals lived inside the forecast, people stopped jumping out to the standalone Dashboard to see how they were tracking.",
  },
  {
    value: "6x Faster",
    title: "to investigate an actual",
    label:
      "Reviewing a number used to mean tab-hopping to QuickBooks and building a report. Now it's a single click on the figure itself.",
  },
  {
    value: "3 in 4",
    title: "Adjusted their forecast in place",
    label:
      "Most accounts that turned on Actuals + Forecast went on to edit their forecast right there — see reality, change the plan, without switching context.",
  },
];

const designDecisions = [
  {
    icon: LineChart,
    title: "Actuals, in line with the forecast",
    body: "Before, the forecast editor was blind — no current actuals, no prior years. You'd read your real numbers on a separate dashboard, switch back, and hold them in your head while editing. Now actuals sit right beside your projections, and you edit in place against real performance.",
  },
  {
    icon: ReceiptText,
    title: "A panel, not a tab-switch",
    body: "See an actuals figure and wonder what's behind it? You used to leave for QuickBooks, work out which accounts mapped to that line, and run a roll-up report. Now one click opens a transaction panel in place — spot a miscode instantly, then go fix it at the source.",
  },
  {
    icon: Layers,
    title: "Structure that matches how you think",
    body: "A chart of accounts rarely matches a mental model — sometimes too granular, sometimes not enough. Forecast Groups let users build a two-level hierarchy independent of their books. One olive-oil seller put it best: same bottle, sold direct and retail — why force separate costs for the same product?",
  },
  {
    icon: TrendingUp,
    title: "Context at the point of decision",
    body: "Prior-year actuals came into the editor, and the dated bar graphs gave way to modern, interactive line charts — so the history you're forecasting against is visible exactly where you're making the call.",
  },
];

const flowObservations: Observation[] = [
  {
    icon: "speed",
    title: "The real product was the round-trips it removed",
    summary: "We had an actuals dashboard — just not where you forecast.",
    detail:
      "It compared actuals to forecast and prior years, but none of it was actionable where it mattered, because the forecast itself never showed actuals. We pulled them — and the transaction detail behind them — inline. Now people check reality without leaving the forecast, tens of thousands of times a month.",
  },
  {
    icon: "click",
    title: "Designing inside a hard engineering constraint",
    summary: "No drag-and-drop, no multi-select — and it still had to feel obvious.",
    detail:
      "Table virtualization (rows off-screen aren't loaded) ruled out the two most obvious ways to organize Forecast Groups: drag-and-drop and multi-select. I had to invent a create/add/remove interaction without either, then user-test it hard. The behavior backed it up: about 8 in 10 people who created a group populated it, most built a true two-level hierarchy, and they added items to groups roughly fifty times for every one they removed — the model landed on the first try.",
  },
  {
    icon: "trust",
    title: "Forecast the future from what actually happened",
    detail:
      "Our domain experts agreed: the most useful input to next year's forecast is last year's actuals. So once actuals were in the forecast, we prioritized real past-period numbers — letting users build forward from them, basing year-over-year growth on what really happened instead of old predictions that never panned out.",
  },
];

// Percentage widths (true proportions) of a responsive bar track, so the bars
// scale with the container while each label still sits flush to its bar.
const cohortFunnel = [
  { label: "Active accounts", note: "the whole base", width: "100%" },
  { label: "Connected their accounting", note: "~1 in 10", width: "10%" },
  { label: "Turned on Actuals + Forecast", note: "", width: "6%" },
  { label: "Built Forecast Groups", note: "", width: "5.5%" },
  { label: "Used transaction drill-down", note: "", width: "4.5%" },
  { label: "Opened the AI monthly review", note: "<1%", width: "1%" },
];

const reflections = [
  {
    title: "Output is not outcome",
    body: "We discovered, tested, and shipped genuinely good tools — and the established customers they were built for loved them. None of it moved long-term churn, because the work was aimed at a moment most users never reach. The lesson that reshaped my judgment: craft quality and business impact are different questions, and you have to keep asking the second one even when the first is going well.",
  },
  {
    title: "Disagree, then commit — and bring evidence",
    body: "Leadership made a reasonable bet that better forecasting would retain users for the long haul. I disagreed, and I made the case with what I was hearing from customers and the data I had: most users churn long before they have actuals to forecast against. I was overruled, so I committed and helped build the best version of the bet we could. When the churn result came in flat, the same evidence is what let us course-correct fast.",
  },
  {
    title: "Whose needs you optimize for is a design decision",
    body: "Our loudest, highest-value users were a tiny, unrepresentative slice. Listening to them was right; treating their needs as the whole story was the trap. The fix wasn't to listen less — it was to map the needs against the journey, and notice that the leverage on retention sat at the top of the funnel, not the bottom.",
  },
];

export default function ForecastPage() {
  const prev = { slug: "idea-canvas", title: "Idea Canvas" };
  const next = {
    slug: "liveplan",
    title: "LivePlan",
    navTitle: "Redesigning the Plan",
  };

  return (
    <>
      <Navigation />
      <main id="main">

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIntro}>
            <p className={styles.kicker}>LivePlan · Financial Forecasting · 2025</p>
            <h1 className={styles.heroHeadline}>When the forecast met reality</h1>
          </div>
          <div className={styles.heroMedia}>
            <div className={styles.heroVisual}>
              <Image
                src="/images/forecast/forecast-hero.png"
                alt="LivePlan Actuals + Forecast overview — projected revenue, expenses, operating income, and cash shown side by side with real bookkeeping actuals"
                width={3096}
                height={2016}
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.heroImg}
              />
            </div>
          </div>
          <p className={styles.heroDescription}>
            I led design for LivePlan&rsquo;s 2025 forecasting overhaul — bringing real
            accounting actuals into the forecast so owners could plan against reality, not
            just possibility. The craft landed for the customers it was built for. It still
            didn&rsquo;t move the metric we were chasing — and why is the more useful story.
          </p>
          <dl className={styles.metaRow}>
            <div className={styles.metaCell}>
              <dt>Role</dt>
              <dd>Staff Product Designer (lead)</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Team</dt>
              <dd>Discovery Trio — Designer, PM, Engineer</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Timeline</dt>
              <dd>Shipped Aug–Oct 2025</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ===== Flow wins (stats band) ===== */}
      <section className={styles.statsBand}>
        <div className={styles.inner}>
          <div className={styles.statsGrid}>
            {flowStats.map((s) => (
              <div key={s.title} className={styles.statCard}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statTitle}>{s.title}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== The Challenge ===== */}
      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>The Challenge</p>
          <h2 className={styles.sectionHeading}>
            A forecast that couldn&rsquo;t see reality.
          </h2>
          <div className={styles.prose}>
            <p>
              LivePlan helps small businesses build a financial forecast. But the forecast
              and the real world lived apart. A separate dashboard could show your projections
              against your actual bookkeeping — yet inside the forecast editor, where you
              actually change numbers and plan ahead, you could see nothing: not this period&rsquo;s
              actuals, not last year&rsquo;s. You were planning blind.
            </p>
            <p>
              The bet behind the work was a strategic one. Our most valuable, longest-tenured
              customers don&rsquo;t write a plan and leave — they manage against it, comparing
              forecast to reality every month. Leadership believed that if we made that
              iterative work dramatically easier, we&rsquo;d retain more users over the long haul.
            </p>
          </div>
        </div>
        <div className={styles.wideImageSlider}>
          <BeforeAfterSlider
            beforeLabel="Forecast only"
            afterLabel="Actuals + Forecast"
            before={
              <Image
                src="/images/forecast/forecast-only.png"
                alt="The forecast before — projections only, with no view of real performance"
                width={3096}
                height={2016}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            }
            after={
              <Image
                src="/images/forecast/forecast-w-actuals.png"
                alt="The forecast after — real bookkeeping actuals shown inline beside the projections"
                width={3096}
                height={2016}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            }
          />
        </div>
      </section>

      {/* ===== Discovery ===== */}
      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>Discovery</p>
          <h2 className={styles.sectionHeading}>
            Listening to the people who live in their forecast
          </h2>
          <p className={styles.lead}>
            We talked to the customers who do this work every month — established owners
            reconciling plan against actuals. We didn&rsquo;t have to dig for the friction. The
            same questions came up, unprompted, again and again:
          </p>
        </div>
        <div className={styles.narrow}>
          <div className={styles.discoveryDetails}>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>
                &ldquo;Why can&rsquo;t I see my actuals where I&rsquo;m planning?&rdquo;
              </h3>
              <p className={styles.discoveryItemBody}>
                Real performance lived on a separate dashboard. The moment they sat down to
                change the forecast, the numbers they needed were a tab away — so they memorized,
                switched back, and hoped they had it right.
              </p>
            </div>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>
                &ldquo;Wait — what is that number?&rdquo;
              </h3>
              <p className={styles.discoveryItemBody}>
                An actuals figure would look off, and there was no way to interrogate it without
                leaving for QuickBooks, working out which accounts fed that line, and running a
                report just to see what actually&nbsp;happened.
              </p>
            </div>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>
                &ldquo;Let me organize this the way I think.&rdquo;
              </h3>
              <p className={styles.discoveryItemBody}>
                A long, flat list didn&rsquo;t match how owners hold their business in their
                heads. They&rsquo;d been asking for grouping and roll-ups for years — structure
                that mirrored their mental model, not their chart of&nbsp;accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Key insight quote ===== */}
      <section className={styles.quoteSection}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>Key Insight</p>
          {/* TODO: anonymized; confirm framing — no real names ship */}
          <blockquote className={styles.bigQuote}>
            A forecast you can&rsquo;t compare to reality is just a guess.
          </blockquote>
          <p className={styles.quoteFollow}>
            The job wasn&rsquo;t to add a comparison feature — it was to collapse the distance
            between where you see your performance and where you plan your future, so reviewing
            reality stops being a chore and becomes part of the flow.
          </p>
          <p className={styles.quoteFollow}>
            That framing drove every decision that followed: bring actuals to the forecast,
            bring the bookkeeping detail inside the tool, and keep the table calm even as it
            got more powerful.
          </p>
        </div>
      </section>

      {/* ===== Design decisions / what we built ===== */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>What We Built</p>
          <h2 className={styles.sectionHeading}>Four moves to close the gap</h2>
          <div className={styles.insightsGrid}>
            {designDecisions.map((d) => {
              const Icon = d.icon;
              return (
                <article key={d.title} className={styles.insightCard}>
                  <div className={styles.insightIcon} aria-hidden="true">
                    <Icon size={22} color="#EFE9DB" strokeWidth={2} />
                  </div>
                  <h3 className={styles.insightTitle}>{d.title}</h3>
                  <p className={styles.insightBody}>{d.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Product gallery (placeholders) ===== */}
      <section className={styles.gallerySection}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>The Product</p>
          <h2 className={styles.sectionHeading}>Actuals + Forecast for a true LivePlan</h2>
          <div className={styles.galleryGrid}>
            <figure className={styles.galleryItem}>
              <video
                src="/videos/forecast-transactions.mp4"
                className={styles.galleryImg}
                width={1636}
                height={1080}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Clicking an actuals figure opens the underlying QuickBooks transactions in a panel, in place inside the forecast"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ===== Keeping people in flow (accordion) ===== */}
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.pivotLayout}`}>
          <div className={styles.pivotIntro}>
            <p className={styles.eyebrow}>The Craft</p>
            <h2 className={styles.sectionHeading}>Keeping people in flow</h2>
            <div className={styles.prose}>
              <p>
                Every decision here was a fight against context-switching. The measure of
                success wasn&rsquo;t a new screen — it was the round-trips, the tab-switches, and
                the memorized numbers we could make disappear.
              </p>
            </div>
          </div>
          <ObservationAccordion observations={flowObservations} />
        </div>
      </section>

      {/* ===== Outcomes for the people it was for ===== */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>What It Proved</p>
          <h2 className={styles.sectionHeading}>
            It worked — for the people it was built for
          </h2>
          <p className={styles.lead}>
            Among the customers who&rsquo;d connected their accounting, the work landed. They
            stopped leaving the forecast to check reality, investigated their numbers in a
            click, and adjusted their plans in place.
          </p>
          <div className={styles.outcomesGrid}>
            <div className={styles.outcomeCard}>
              <p className={styles.outcomeStat}>30%</p>
              <h3 className={styles.outcomeTitle}>Fewer trips to the Dashboard</h3>
              <p className={styles.outcomeBody}>
                Once actuals lived inside the forecast, people stopped jumping out to the
                standalone Dashboard to see how they were tracking.
              </p>
            </div>
            <div className={styles.outcomeCard}>
              <p className={styles.outcomeStat}>8 in 10</p>
              <h3 className={styles.outcomeTitle}>Groups created, then populated</h3>
              <p className={styles.outcomeBody}>
                Despite a design with no drag-and-drop or multi-select, most users who started a
                group filled it — added items ~50&times; for every one removed. The model clicked.
              </p>
            </div>
            <div className={styles.outcomeCard}>
              <p className={styles.outcomeStat}>10k+</p>
              <h3 className={styles.outcomeTitle}>QuickBooks round-trips avoided / month</h3>
              <p className={styles.outcomeBody}>
                Every transaction-panel open is a time a user inspected their bookkeeping detail
                without ever leaving LivePlan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== The reckoning (dark) ===== */}
      <section className={styles.darkSection}>
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>The Turn</p>
          <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
            And it still didn&rsquo;t impact churn
          </h2>
          <p className={styles.lead} style={{ color: "rgba(253,251,247,0.8)" }}>
            We built the right tool. We just built it for a moment most users never reach.
            Engagement shrank at every step down the funnel — and the deeper the feature, the
            smaller the audience.
          </p>

          {/* Cohort-shrink funnel — bars start full-width, then collapse to
              true proportion on scroll-in (see CohortFunnel). Relative figures
              only; no exact internal counts. */}
          <CohortFunnel rows={cohortFunnel} />

          <div className={styles.prose} style={{ marginTop: "var(--space-xxl)", color: "rgba(253,251,247,0.8)", maxWidth: "780px" }}>
            <p>
              Leadership thought that if we made better use of actuals data in LivePlan,
              we&rsquo;d convince more people to connect their accounting data.
            </p>
            <p>
              <strong style={{ color: "#EFE9DB", fontWeight: 600 }}>
                But most LivePlan users don&rsquo;t have actuals yet — they&rsquo;re a year or
                more from needing them, and many churn before they finish a business plan, let
                alone a forecast.
              </strong>
            </p>
            <p>
              The cohort we&rsquo;d optimized for was real, and vocal, and tiny. Our own
              cancellation and reactivation data said the same thing: people left saying
              &ldquo;I&rsquo;ll come back when I&rsquo;m ready&rdquo; — and a wave of them did, a year
              and a half later.
            </p>
          </div>

          <JourneyFunnel />
        </div>
      </section>

      {/* ===== The pivot ===== */}
      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>The Pivot</p>
          <h2 className={styles.sectionHeading}>Moving up the funnel</h2>
          <div className={styles.prose}>
            <p>
              When the churn numbers came back flat, the same evidence that predicted it pointed
              the way out. Instead of building deeper for the few who&rsquo;d arrived, we moved
              <em> up</em> the journey — toward the 30-to-90-day window where most users actually
              decide whether to stay. The brief became simpler and harder: reduce burden,
              eliminate experience rot, meet basic expectations.
            </p>
            <p>
              That redirect is what produced the work I&rsquo;m proudest of at LivePlan — the
              business-plan redesign that cut early churn, and Idea Canvas, which meets people
              before they even have a plan. The forecasting work didn&rsquo;t grow the pie. It
              taught us where the pie actually was.
            </p>
          </div>
        </div>
        <div className={styles.inner}>
          <div className={styles.relatedGrid}>
            <FeaturedWorkCard work={featuredWork[0]} stacked />
            <FeaturedWorkCard work={featuredWork[1]} stacked />
          </div>
        </div>
      </section>

      {/* ===== Reflections ===== */}
      <section className={styles.section}>
        <div className={styles.narrow}>
          <h2 className={styles.sectionHeading}>Reflections</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", marginTop: "var(--space-lg)" }}>
            {reflections.map((r) => (
              <div key={r.title}>
                <h3 className={styles.insightTitle}>{r.title}</h3>
                <p className={styles.prose}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Next steps / future ===== */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.twoCol}>
            <div>
              <p className={styles.eyebrow}>What&rsquo;s Next</p>
              <h2 className={styles.sectionHeading}>AI that helps you forecast</h2>
              <div className={styles.prose}>
                <p>
                  The loudest signal in our research wasn&rsquo;t for another table — it was for
                  help building the forecast in the first place. We&rsquo;re now exploring an AI
                  assistant that can help owners draft and refine a forecast without losing
                  control of the numbers: escalation patterns, feedback loops, and confidence
                  cues that keep the human in charge.
                </p>
                <p>
                  It&rsquo;s the same craft thread — make the numbers approachable — applied earlier,
                  where more people can feel it.
                </p>
              </div>
            </div>
            <div>
              <AssetPlaceholder label="Concept — AI forecasting assistant (prototype frames)" ratio="4 / 3" />
            </div>
          </div>
        </div>
      </section>

      <CaseStudyNav prev={prev} next={next} />

      </main>
      <Footer />
    </>
  );
}
