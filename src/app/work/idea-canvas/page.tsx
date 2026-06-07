import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getAdjacentProjects } from "@/data/projects";
import { LayoutGrid, Compass, Sparkles, Gauge } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Idea Canvas — AI-Powered Business Validation",
  description:
    "I designed an AI-powered idea validation tool that helps early-stage entrepreneurs test and refine their business assumptions before committing to a full business plan.",
};

const stats = [
  { value: "93.4%", title: "Finished the canvas", label: "Users who start complete the core sections" },
  { value: "70%", title: "Acted on a pivot suggestion", label: "Users took the AI up on its suggestions" },
  { value: "90.7%", title: "Rated the AI helpful", label: "Users found the feedback genuinely useful" },
  { value: "3 weeks", title: "Time to MVP", label: "From first concept to shipped product" },
];

const insights = [
  {
    title: "Breaking the Canvas Paradigm",
    icon: LayoutGrid,
    body: "The traditional single-page canvas is hard to read on screen and its information density is intimidating to people without MBAs. We used the space afforded by a web app — not a piece of paper — to make the task more approachable.",
  },
  {
    title: "Choosing the Right Framework",
    icon: Compass,
    body: "Educators had strong (almost cult-level) opinions about Lean Canvas vs. BMC. The BMC assumes you've already validated your problem and solution — exactly what our users hadn't done. We went with Lean Canvas, but engineered the tool to be framework-agnostic for education partners.",
  },
  {
    title: "AI-First Validation",
    icon: Sparkles,
    body: "Traditional canvases are great collection tools, but they don't validate anything. We leveraged our existing Market Research deep-research capabilities to provide instant evidence analysis on each assumption — rating them strong, moderate, or weak.",
  },
  {
    title: "From Evidence to Confidence",
    icon: Gauge,
    body: "Individual assumptions get evidence ratings, but the Idea Check evaluates the entire business holistically — examining market size, revenue model, regulatory risks, competition, and fatal flaws — producing a confidence score with specific pivot suggestions.",
  },
];

const observations = [
  {
    title: "Weak evidence ratings create engagement, not abandonment",
    body: "Users engage most deeply with assumptions that receive \u201cWeak Evidence\u201d ratings — the friction drives refinement rather than drop-off.",
  },
  {
    title: "Pivot suggestions compress research from days to minutes",
    body: "The AI's concrete alternatives reduced time-to-refinement dramatically, replacing hours of manual research with actionable suggestions.",
  },
  {
    title: "Evidence sources build trust in the AI's recommendations",
    body: "Surfacing research papers, market data, and Reddit threads behind each rating gave users confidence in what the AI was telling them.",
  },
  {
    title: "Educators adopted it as a teaching tool",
    body: "Entrepreneurship educators began using the canvas to show students how their assumptions hold up against real market data.",
  },
];

const pillars = [
  {
    title: "Immediate Feedback",
    body: "Every assumption gets instant AI analysis. No batch processing, no submit-and-wait. The design prioritizes the feeling of having a knowledgeable co-founder looking over your shoulder.",
  },
  {
    title: "Progressive Complexity",
    body: "Start with a simple problem statement, layer on solution, market, channels, and revenue. The Idea Check only appears after sufficient sections are complete, preventing premature judgment.",
  },
  {
    title: "Seamless Transition",
    body: "Because the canvas framework maps to LivePlan's business plan template, validated assumptions flow directly into a full business plan — users who've done the hard thinking don't have to start over.",
  },
];

const outcomes = [
  {
    stat: "93.4%",
    title: "Finished the canvas",
    body: "Nearly everyone who started completed the core sections — the simplified design kept people from dropping off.",
  },
  {
    stat: "70%",
    title: "Acted on a pivot suggestion",
    body: "Most users took the AI up on its suggestions, so the guidance felt like help, not orders.",
  },
  {
    stat: "90.7%",
    title: "Rated the AI helpful",
    body: "Users found the AI's evidence and feedback genuinely useful — not generic filler.",
  },
  {
    stat: "3 weeks",
    title: "Time to MVP",
    body: "From first concept to a shipped MVP in three weeks — fast enough to prove the bet before over-investing.",
  },
];

export default function IdeaCanvasPage() {
  const { prev, next } = getAdjacentProjects("idea-canvas");

  return (
    <>
      <Navigation />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIntro}>
            <p className={styles.kicker}>LivePlan · AI-Powered Business Validation</p>
            <h1 className={styles.heroHeadline}>Idea Canvas</h1>
          </div>
          <div className={styles.heroMedia}>
            <div className={styles.heroVisual}>
              <Image
                src="/images/canvas-hero.png"
                alt="Idea Canvas interface — Mike's Hot Dog Stand validation session with confidence indicator and evidence ratings on each assumption"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.heroImg}
              />
            </div>
            <p className={styles.imageCaption}>Full Idea Canvas interface — an active validation session with AI evidence ratings visible on each assumption</p>
          </div>
          <p className={styles.heroDescription}>
            I designed an AI-powered idea validation tool that helps early-stage entrepreneurs
            test and refine their business assumptions before committing to a full business
            plan — transforming LivePlan from an execution tool into a discovery platform.
          </p>
          <dl className={styles.metaRow}>
            <div className={styles.metaCell}>
              <dt>Role</dt>
              <dd>Product Designer &amp; Researcher</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Team</dt>
              <dd>Discovery Pod (Designer, Engineer, PM)</dd>
            </div>
            <div className={styles.metaCell}>
              <dt>Timeline</dt>
              <dd>3 weeks to MVP</dd>
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
            The right tool for the wrong stage.
          </h2>
          <div className={styles.prose}>
            <p>
              LivePlan&rsquo;s existing users were already past the idea stage — they had a
              business concept and needed help with funding and execution. But marketing research
              revealed massive untapped demand higher in the funnel. Keyword search volume and
              Reddit sentiment analysis showed thousands of early-stage entrepreneurs asking
              variations of the same question: &ldquo;Is this a good idea for a business?&rdquo;
            </p>
            <p>
              The existing Business Plan tool could technically be used for idea validation, but
              it was like using a sledgehammer to hang a picture. LivePlan&rsquo;s legacy Pitch
              feature was trying to do double duty as both a canvas-style idea validator and a
              pitch deck builder — doing neither job well.
            </p>
            <p>
              The opportunity was clear: build a dedicated tool for idea validation that could
              capture users earlier in their journey and naturally funnel them into LivePlan&rsquo;s
              core business planning experience.
            </p>
          </div>
        </div>
        <div className={styles.wideImageSlider}>
          <BeforeAfterSlider
            beforeLabel="Legacy Pitch"
            afterLabel="Idea Canvas"
            before={
              <ImagePlaceholder
                aspectRatio="16 / 9"
                label="Legacy Pitch Editor"
                guidance="Screenshot of LivePlan's legacy Pitch feature — the old dual-purpose canvas + pitch deck tool that did neither job well."
              />
            }
            after={
              <Image
                src="/images/canvas/canvas-overview.png"
                alt="The new Idea Canvas — a focused, dedicated validation experience"
                width={3030}
                height={2659}
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            }
          />
        </div>
        <p className={styles.imageCaption}>The legacy Pitch editor alongside the new Idea Canvas — contrasting the scope mismatch of a dual-purpose tool with a focused, dedicated validation experience</p>
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>Discovery</p>
          <h2 className={styles.sectionHeading}>
            Understanding the market and the user
          </h2>
          <p className={styles.lead}>
            The discovery team — myself as designer and researcher, an engineer, and a PM —
            worked closely with marketing to define the market need and funnel fit. We approached
            validation from three angles simultaneously.
          </p>
          <div className={styles.discoveryDetails}>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>Market signals</h3>
              <p className={styles.discoveryItemBody}>
                Marketing identified the opportunity through keyword search volume for business
                validation tools and social sentiment analysis of early-stage entrepreneur
                communities, particularly Reddit.
              </p>
            </div>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>User research</h3>
              <p className={styles.discoveryItemBody}>
                I conducted interviews with existing early-stage customers using the Business
                Plan as a makeshift validation tool, and with entrepreneurship educators who
                teach business validation to first-time founders.
              </p>
            </div>
            <div className={styles.discoveryItem}>
              <h3 className={styles.discoveryItemTitle}>Competitive analysis</h3>
              <p className={styles.discoveryItemBody}>
                We reviewed tools like VenturePlanner and Leanstack to understand the landscape
                and identify gaps that a LivePlan-native validation tool could uniquely fill.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.gradientBlock} aria-hidden="true" />
        <p className={styles.imageCaption}>Discovery artifacts: keyword search volume data, Reddit community screenshots showing early-stage founder questions, and competitive analysis of VenturePlanner and Leanstack</p>
      </section>

      <section className={styles.quoteSection}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>Key Insight</p>
          <blockquote className={styles.bigQuote}>
            Business planning feels like work. It should feel like discovery.
          </blockquote>
          <p className={styles.quoteFollow}>
            Most idea validation tools require you to identify the assumptions, and then
            go out and figure out if they&rsquo;re true — which is a lot of work. After
            hearing from users that this process is overwhelming and difficult, we wanted
            this new experience to feel like users were checking something off their
            to-do list, rather than adding items to it.
          </p>
          <p className={styles.quoteFollow}>
            This framing shaped every design decision that followed — from the section-by-section
            AI feedback to the confidence score that tells you whether your idea has legs.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Design Decisions</p>
          <h2 className={styles.sectionHeading}>
            Four ideas that shaped the product
          </h2>
          <div className={styles.insightsGrid}>
            {insights.map((i) => {
              const Icon = i.icon;
              return (
              <article key={i.title} className={styles.insightCard}>
                <div className={styles.insightIcon} aria-hidden="true">
                  <Icon size={22} color="#EFE9DB" strokeWidth={2} />
                </div>
                <h3 className={styles.insightTitle}>{i.title}</h3>
                <p className={styles.insightBody}>{i.body}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>The Product</p>
          <h2 className={styles.sectionHeading}>What we built</h2>
          <div className={styles.galleryGrid}>
            <figure className={styles.galleryItem}>
              <Image
                src="/images/canvas/canvas-overview.png"
                alt="Full Idea Canvas view — a complete business idea being validated section by section, with AI evidence ratings visible on each assumption"
                width={3030}
                height={2659}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.galleryImg}
              />
              <figcaption className={styles.galleryCap}>
                Full canvas view — a complete business idea being validated section by section, with AI evidence ratings visible on each assumption
              </figcaption>
            </figure>

            <figure className={styles.galleryItem}>
              <Image
                src="/images/canvas/canvas-enterAnAssumption.png"
                alt="Entering an assumption — problem statement field with inline AI research triggered on save"
                width={1446}
                height={1228}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.galleryImg}
              />
              <figcaption className={styles.galleryCap}>
                Entering an assumption — problem statement with inline AI research triggered on save
              </figcaption>
            </figure>

            <figure className={styles.galleryItem}>
              <Image
                src="/images/canvas/assumption-detail.png"
                alt="Evidence detail panel — strong / moderate / weak rating with sourced research papers, market data, and community sentiment"
                width={1462}
                height={1326}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.galleryImg}
              />
              <figcaption className={styles.galleryCap}>
                Evidence detail panel — strong / moderate / weak rating with sourced research papers, market data, and community sentiment
              </figcaption>
            </figure>

            <figure className={styles.galleryItem}>
              <Image
                src="/images/canvas/pivot-detail.png"
                alt="Pivot suggestions — AI-generated alternatives surfaced when an assumption's evidence is weak"
                width={1866}
                height={1438}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.galleryImg}
              />
              <figcaption className={styles.galleryCap}>
                Pivot suggestions — AI-generated alternatives surfaced when evidence is weak
              </figcaption>
            </figure>

            <figure className={styles.galleryItem}>
              <Image
                src="/images/canvas/ideacheck-canvas.png"
                alt="Idea Check result — overall confidence score with market size, revenue model, competition, and fatal flaw analysis"
                width={2970}
                height={1456}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.galleryImg}
              />
              <figcaption className={styles.galleryCap}>
                Idea Check result — confidence score with market size, revenue model, competition, and fatal flaw analysis
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <p className={styles.eyebrow}>The star of the product</p>
          <h2 className={styles.sectionHeading}>
            The Pivot Engine
          </h2>
          <div className={styles.prose}>
            <p>
              When an assumption has weak evidence, the AI doesn&rsquo;t just flag it — it
              analyzes adjacent possibilities and suggests concrete alternatives. If your
              solution is &ldquo;Dog food made of dog poop&rdquo; (illegal and unsafe), the
              system suggests pivoting to &ldquo;Nutritional supplements that help dogs stop
              eating poop.&rdquo;
            </p>
            <p>
              70% of users replace their original assumption with the suggested alternative —
              proof that AI works best as a collaborative partner, not just a critic.
            </p>
          </div>
          <ul className={styles.observationList}>
            {observations.map((o) => (
              <li key={o.title}>
                <p className={styles.observationTitle}>{o.title}</p>
                <p className={styles.observationBody}>{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.inner}>
          <p className={`${styles.eyebrow} ${styles.eyebrowOnDark}`}>
            Design Approach
          </p>
          <h2 className={`${styles.sectionHeading} ${styles.onDark}`}>
            Three principles behind the experience
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
          <p className={styles.eyebrow}>Outcomes</p>
          <h2 className={styles.sectionHeading}>What we shipped, and what it proved</h2>
          <p className={styles.lead}>
            The numbers confirmed the bet: the tool was approachable, the AI guidance
            landed, and we proved it fast. Idea Canvas also gave LivePlan a way to help
            people while they&rsquo;re still exploring an idea — before they&rsquo;re
            ready for a full business plan.
          </p>
          <div className={styles.outcomesGrid}>
            {outcomes.map((o) => (
              <div key={o.title} className={styles.outcomeCard}>
                <p className={styles.outcomeStat}>{o.stat}</p>
                <h3 className={styles.outcomeTitle}>{o.title}</h3>
                <p className={styles.outcomeBody}>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.twoCol}>
            <div>
              <p className={styles.eyebrow}>Future Vision</p>
              <h2 className={styles.sectionHeading}>
                Traditional validation, meet AI
              </h2>
              <div className={styles.prose}>
                <p>
                  I designed a comprehensive traditional validation toolkit staged for future
                  release — customer discovery interview guides, landing page smoke tests,
                  pricing and revenue model surveys, and online community sentiment analysis
                  panels.
                </p>
                <p>
                  Each instrument generates ready-to-use research tools with share links, turning
                  LivePlan into the user&rsquo;s repository for both AI and human-gathered
                  validation data. Staged design ensures the feature can grow without requiring
                  a redesign.
                </p>
              </div>
              <a
                href="https://discovery-assumption-test-panels.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.futureLink}
              >
                Explore the prototype →
              </a>
            </div>
            <div>
              <div className={styles.sideImage} aria-hidden="true" />
              <p className={styles.imageCaption}>Prototype screens from the traditional validation toolkit — customer discovery interview guide with auto-generated shareable link and sentiment analysis panel</p>
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
