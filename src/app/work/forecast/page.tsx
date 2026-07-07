import type { Metadata } from "next";
import { Target, Scale, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import WorkflowCompare from "./WorkflowCompare";
import JourneyFunnel from "./JourneyFunnel";
import DesignShowcase from "./DesignShowcase";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import { featuredWork } from "@/data/featuredWork";
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

const reflections = [
  {
    icon: Target,
    title: "Output is not outcome",
    body: "We shipped genuinely good tools, and the customers they were built for loved them — but none of it moved churn, because we were too far down the journey funnel to matter. The lesson that reshaped my judgment: craft quality and business impact are different questions, and you have to keep asking the second even when the first is going well.",
  },
  {
    icon: Scale,
    title: "Disagree, then commit — and bring evidence",
    body: "It was a reasonable bet — that better forecasting would retain users long-term — but the customers and data I had pointed the other way: most users churn long before they have actuals to forecast against. I made that case early, committed fully, and helped build the best version of the bet we could. The lesson: disagree early with evidence, commit completely once the call is made, and keep that evidence close so the team can course-correct together when results come in.",
  },
  {
    icon: Users,
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
            I led design for LivePlan&rsquo;s 2025 forecasting overhaul, bringing real
            accounting actuals into the forecast so owners could plan against reality. The
            craft landed for the customers it was built for — but it didn&rsquo;t move the
            metric we were chasing, and why is the more useful story.
          </p>
          <dl className={styles.metaRow}>
            <div className={styles.metaCell}>
              <dt>Role</dt>
              <dd>Design Lead</dd>
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

      {/* ===== The Challenge ===== */}
      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>The Challenge</p>
          <h2 className={styles.sectionHeading}>
            A forecast that couldn&rsquo;t see reality.
          </h2>
          <div className={styles.prose}>
            <p>
              LivePlan helps small businesses build a financial forecast — but the forecast
              and their actual financials lived apart. A separate dashboard compared
              projections to bookkeeping, yet inside the forecast editor, where you actually
              change numbers, you could see neither this period&rsquo;s actuals nor last
              year&rsquo;s. You were planning blind, and the everyday loop of comparing and
              adjusting was a multi-step, multi-app process:
            </p>
          </div>
        </div>
        <div className={styles.narrow}>
          <WorkflowCompare />
        </div>
        <div className={styles.narrow} style={{ marginTop: "var(--space-xxl)" }}>
          <div className={styles.prose}>
            <p>
              The bet behind the work was a strategic one. Our most valuable, longest-tenured
              customers don&rsquo;t write a plan and leave — they manage against it, comparing
              forecast to reality every month. The thinking went that if we made that
              iterative work dramatically easier, we&rsquo;d retain more users over the long haul.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Discovery → Key insight ===== */}
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
        </div>
      </section>

      {/* ===== Design decisions / what we built ===== */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <DesignShowcase
            header={
              <>
                <p className={styles.eyebrow}>What We Built</p>
                <h2 className={styles.sectionHeading}>
                  Four moves to close the gap
                </h2>
              </>
            }
          />
        </div>
      </section>

      {/* ===== Product gallery (placeholders) ===== */}
      <section className={styles.gallerySection}>
        <div className={styles.inner}>
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
          <div style={{ maxWidth: "820px" }}>
            <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>And yet&hellip;</p>
            <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
              Churn remained the same
            </h2>
            <p
              className={styles.lead}
              style={{ color: "rgba(253,251,247,0.8)", marginBottom: 0 }}
            >
              We built the right tool. We just built it for a moment most of our{" "}
              <strong>core users were months if not years away from</strong>. Engagement
              shrank at every step down the funnel — and the deeper the feature, the
              smaller the audience.
            </p>
          </div>

          <div style={{ marginTop: "var(--space-xxxl)", maxWidth: "820px" }}>
            <h3
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "var(--font-h2)",
                lineHeight: "var(--line-h2)",
                fontWeight: 600,
                color: "#EFE9DB",
                marginBottom: "var(--space-md)",
              }}
            >
              Meeting our actual users where they are
            </h3>
            <div
              className={styles.prose}
              style={{ color: "rgba(253,251,247,0.8)", marginBottom: "var(--space-xl)" }}
            >
              <p>
                Most users simply weren&rsquo;t there yet. They came to LivePlan to write a
                business plan — iterative forecasting sat steps, sometimes years, further down
                their journey, with plenty that could stall them along the way.
              </p>
              <p>
                So I mapped that journey as a funnel, to show leadership just how far most
                users were from the moment we&rsquo;d been building for — and why it was time
                to pivot:
              </p>
            </div>
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
              That redirect is what produced the work I&rsquo;m proudest of at LivePlan — the{" "}
              <Link href="/work/liveplan" className={styles.proseLink}>
                business-plan redesign
              </Link>{" "}
              that cut early churn, and{" "}
              <Link href="/work/idea-canvas" className={styles.proseLink}>
                Idea Canvas
              </Link>
              , which meets people before they even have a plan. The forecasting work didn&rsquo;t
              grow the pie. It taught us where the pie actually was.
            </p>
          </div>
        </div>

        <div className={styles.narrow} style={{ marginTop: "var(--space-xxxl)" }}>
          <h2 className={styles.sectionHeading}>Reflections</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", marginTop: "var(--space-lg)" }}>
            {reflections.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className={styles.reflection}>
                  <span className={styles.reflectionIcon} aria-hidden="true">
                    <Icon size={24} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className={styles.insightTitle}>{r.title}</h3>
                    <p className={styles.prose}>{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.inner} style={{ marginTop: "var(--space-xxxl)" }}>
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

      {/* ===== Next steps / future ===== */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div style={{ maxWidth: "760px" }}>
            <p className={styles.eyebrow}>A Vision for the Future</p>
            <h2 className={styles.sectionHeading}>AI that helps you forecast</h2>
            <div className={styles.prose}>
              <p>
                The loudest signal in our research wasn&rsquo;t for another table — it was for
                help building the forecast in the first place. We&rsquo;re now exploring an AI
                assistant that helps owners draft and refine a forecast without losing control
                of the numbers — the same craft thread, make the numbers approachable, applied
                earlier where more people can feel it.
              </p>
            </div>
          </div>
          <div className={styles.aiShot}>
            <Image
              src="/images/forecast/ai-forecasting.png"
              alt="Concept frames for the AI forecasting assistant"
              width={1420}
              height={816}
              sizes="(max-width: 1280px) 94vw, 1200px"
              className={styles.aiShotImg}
            />
          </div>
        </div>
      </section>

      <CaseStudyNav prev={prev} next={next} />

      </main>
      <Footer />
    </>
  );
}
