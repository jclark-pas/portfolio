import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import { featuredWork } from "@/data/featuredWork";
import WorkflowCompare from "./WorkflowCompare";
import JourneyTrack from "./JourneyTrack";
import styles from "./page.module.css";
import turn from "./turn.module.css";

// DRAFT case study, told in four beats: the bet, the build, the reckoning, the
// turn. The original, longer telling is kept at ./original for reference. Not
// registered in projects.ts (stays off the public /work grid) and marked noindex
// below. Numbers are rounded; customer quotes are anonymized and still need
// consent before this ships.
export const metadata: Metadata = {
  title: "When the forecast met reality (draft)",
  description:
    "Leading LivePlan's 2025 forecasting overhaul, and learning that the right tool, shipped at the wrong moment in the customer journey, can't move the metric that matters.",
  robots: { index: false, follow: false },
};

// the three moves, each headed by the change it made for the owner
const moves = [
  {
    name: "From a tab away to in the cell",
    body: "This period's and last year's actuals sit inline and recalculate the projection from real performance. The editor used to run blind to both.",
    image: "/images/forecast/forecast-inlineactuals.png",
    width: 916,
    height: 919,
    alt: "The forecast editor with this period's actuals and last year's figures shown inline beside the projection",
    gradient: "linear-gradient(135deg, #dcefe2 0%, #d8e8f3 50%, #e2e0f4 100%)",
  },
  {
    name: "From a QuickBooks report to one click",
    body: "Click any actuals figure and the QuickBooks transactions behind it open in place. No leaving, no roll-up report, no losing your place in the forecast.",
    image: "/images/forecast/forecast-panel.png",
    width: 1131,
    height: 1135,
    alt: "The transaction panel open beside the forecast, listing the QuickBooks transactions behind one actuals figure",
    gradient: "linear-gradient(135deg, #fce4d6 0%, #f6dde6 50%, #e7e3f4 100%)",
  },
  {
    name: "From a chart of accounts to how you think",
    body: "A two-level hierarchy independent of the books, so the forecast matches how an owner holds the business in their head. Shipped without drag-and-drop or multi-select.",
    image: "/images/forecast/forecast-groups.png",
    width: 916,
    height: 919,
    alt: "Forecast rows organized into named groups with roll-up totals",
    gradient: "linear-gradient(135deg, #fcebcf 0%, #f8e0d6 50%, #f2dde8 100%)",
  },
];

const stats = [
  { value: "30%", label: "fewer trips to the Dashboard" },
  { value: "10k+", label: "QuickBooks round-trips avoided a month" },
  { value: "8 in 10", label: "groups created were filled" },
];

export default function ForecastTurnPage() {
  const prev = { slug: "idea-canvas", title: "Idea Canvas" };
  const next = { slug: "liveplan", title: "LivePlan", navTitle: "Redesigning the Plan" };

  return (
    <>
      <Navigation />
      <main id="main">
        {/* ===== Hero: the promise of a turn ===== */}
        <section className={turn.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroIntro}>
              <p className={styles.kicker}>LivePlan · Financial Forecasting · 2025</p>
              <h1 className={styles.heroHeadline}>When the forecast met reality</h1>
            </div>
            <div className={styles.heroMedia}>
              <div className={styles.heroVisual}>
                <Image
                  src="/images/forecast/forecast-hero.png"
                  alt="LivePlan Actuals + Forecast overview: projected revenue, expenses, operating income and cash shown beside real bookkeeping actuals"
                  width={3096}
                  height={2016}
                  priority
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className={styles.heroImg}
                />
              </div>
            </div>
            <p className={turn.heroLine}>A story about shipping the right thing at the wrong time.</p>
            <dl className={styles.metaRow}>
              <div className={styles.metaCell}>
                <dt>Role</dt>
                <dd>Design Lead</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Shipped</dt>
                <dd>Aug–Oct 2025</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Outcome</dt>
                <dd>
                  Loved by the owners it served.
                  <br />
                  Churn unchanged.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ===== The bet ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The bet</p>
            <h2 className={styles.sectionHeading}>
              Could we keep customers by making the monthly loop effortless?
            </h2>
            <div className={styles.prose}>
              <p>
                LivePlan helps small-business owners build a financial forecast. Their real
                numbers lived somewhere else: a dashboard that compared plan to actuals after
                the fact. Inside the editor, where you change the numbers, you could see
                neither this period&rsquo;s actuals nor last year&rsquo;s. Comparing and
                adjusting meant a loop across three tools.
              </p>
            </div>
          </div>
          <div className={styles.narrow}>
            <WorkflowCompare />
          </div>
          <div className={styles.narrow} style={{ marginTop: "var(--space-xxl)" }}>
            <div className={styles.prose}>
              <p>
                Our longest-tenured customers don&rsquo;t write a plan and leave. They manage
                against it, every month. The bet: make that loop dramatically easier and
                we&rsquo;d keep more of them.
              </p>
              <p>
                The data I had said something else: most users churn long before they have
                actuals to forecast against. I said so, early. Then the call was made, and I
                committed to building the best version of it.
              </p>
            </div>
          </div>
        </section>

        {/* ===== The build ===== */}
        <section className={`${styles.section} ${styles.cardBand}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The build</p>
            <h2 className={styles.sectionHeading}>Put reality where the planning happens</h2>
            <div className={styles.prose}>
              <p>
                The owners who do this every month didn&rsquo;t need prompting. Why can&rsquo;t
                I see my actuals where I&rsquo;m planning? What is that number? Let me organize
                this the way I think.
              </p>
            </div>
            <p className={turn.pull}>
              A forecast you can&rsquo;t compare to reality is just a guess.
            </p>
            <div className={styles.prose}>
              <p>
                So the job wasn&rsquo;t a comparison feature. It was to collapse the distance
                between seeing your performance and planning your future.
              </p>
            </div>
          </div>
          <div className={styles.inner}>
            <div className={turn.moves}>
              {moves.map((m) => (
                <div key={m.name} className={turn.move}>
                  <div className={turn.shot} style={{ background: m.gradient }}>
                    <Image
                      src={m.image}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      sizes="(max-width: 960px) 100vw, 640px"
                      className={turn.shotImg}
                    />
                  </div>
                  <div>
                    <h3 className={turn.moveTitle}>{m.name}</h3>
                    <p className={turn.moveBody}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>          </div>
        </section>

        {/* ===== The reckoning ===== */}
        <section className={`${styles.section} ${styles.tightBottom}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The reckoning</p>
            <h2 className={styles.sectionHeading}>It worked. And churn didn&rsquo;t move.</h2>
            <div className={styles.prose}>
              <p>
                For the owners with connected accounting, the work landed. They stopped leaving
                the forecast to check reality, investigated numbers in a click, and adjusted
                plans in place.
              </p>
            </div>
            <div className={turn.stats}>
              {stats.map((s) => (
                <div key={s.label} className={turn.stat}>
                  <p className={turn.statValue}>{s.value}</p>
                  <p className={turn.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={styles.prose}>
              <p>
                Then the churn numbers came back flat. We had built the right tool for the
                wrong people, at the wrong time in their journey. Most of our users were still
                writing their first plan, months if not years from the moment we&rsquo;d built
                for.
              </p>
            </div>
          </div>
          {/* the argument of the whole page, so it gets the full width */}
          <div className={styles.inner}>
            <JourneyTrack />
          </div>
        </section>

        {/* ===== The turn ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The turn</p>
            <h2 className={styles.sectionHeading}>Moving up the funnel</h2>
            <div className={styles.prose}>
              <p>
                The same evidence that predicted the result pointed the way out. We moved up
                the journey, to the 30-to-90-day window where most users decide whether to
                stay. The brief got simpler and harder: reduce burden, fix experience rot, meet
                basic expectations.
              </p>
              <p>
                That redirect is where the metric finally moved. The{" "}
                <Link href="/work/liveplan" className={styles.proseLink}>
                  business-plan redesign
                </Link>{" "}
                cut early churn by 25%, and{" "}
                <Link href="/work/idea-canvas" className={styles.proseLink}>
                  Idea Canvas
                </Link>{" "}
                now meets people before they even have a plan. The forecasting work
                didn&rsquo;t grow the pie. It taught us where the pie was.
              </p>
              <p className={turn.lesson}>
                Output is not outcome. Whether the work is good and whether it moved the business
                are different questions, and I keep asking the second even when the first is
                going well.
              </p>
            </div>
            <div className={styles.relatedGrid}>
              {featuredWork
                .filter((w) => w.href !== "/work/forecast")
                .slice(0, 2)
                .map((w) => (
                  <FeaturedWorkCard key={w.href} work={w} />
                ))}
            </div>
          </div>
        </section>

        <CaseStudyNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
