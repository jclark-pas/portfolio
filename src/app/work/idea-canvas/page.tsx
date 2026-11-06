import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import { getAdjacentProjects } from "@/data/projects";
import styles from "./page.module.css";
import beats from "./beats.module.css";

// The Idea Canvas in four beats: the problem, what the interviews showed,
// three moves (and the two that lost), the results. The original, longer
// telling is kept at ./original for reference.
export const metadata: Metadata = {
  title: "Idea Canvas",
  description:
    "Designing Idea Canvas, LivePlan's validation tool for people who don't have a plan yet: a guided Lean Canvas that researches each assumption as it's written and turns a weak rating into a pivot. 70% acted on a pivot suggestion.",
};

// the three moves, each headed by the change it made for the first-timer
const moves: {
  title: string;
  body: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}[] = [
  {
    title: "From a grid to a guided page",
    body: "Lean Canvas, one section at a time, in the order a first-timer would think about it: problem, then who has it, then the solution. Help and suggestions sit in every section. The framework is swappable underneath, so an education partner can bring its own.",
    src: "/images/canvas/canvas-enterAnAssumption.png",
    alt: "The Target Market section of the canvas with two assumptions listed, one rated strong evidence and one still researching, and a Help & Suggestions button",
    width: 1446,
    height: 1228,
  },
  {
    title: "From assumptions to evidence",
    body: "Each assumption is researched the moment it’s written and rated strong, moderate or weak, with the papers, market data and community threads behind the rating. People can click through and check, so they don’t have to wonder whether the AI made it up.",
    src: "/images/canvas/assumption-detail.png",
    alt: "An assumption rated strong evidence, with a summary and a Research Findings list that quotes and links its source",
    width: 1462,
    height: 1326,
  },
  {
    title: "From a weak rating to a pivot",
    body: "Once enough sections are filled in, the Idea Check reads the whole business: market size, revenue model, regulation, competition, fatal flaws. It gives a confidence level, the top concerns, and concrete pivots that solve the same problem, each one addable to the canvas in a click. A weak rating stops being a dead end.",
    src: "/images/canvas/pivot-detail.png",
    alt: "An Idea Check result listing top concerns for a dog food idea and recommending a pivot to a safe supplement, with an Add to Canvas button",
    width: 1866,
    height: 1438,
  },
];

// from the Idea Canvas Feature Eval dashboard in Amplitude, non-staff users
// since the March 27 2026 tracking fix: 3,363 of 4,529 starters added an item
// to problem, target market and solution; 605 of 858 Idea Check users in April
// replaced an item; 1,574 of 1,747 AI votes were "helpful"
const results = [
  { value: "74%", label: "completed the core sections of the canvas" },
  { value: "70%", label: "acted on a pivot suggestion" },
  { value: "90%", label: "rated the AI helpful" },
];

export default function IdeaCanvasPage() {
  const { prev, next } = getAdjacentProjects("idea-canvas");

  return (
    <>
      <Navigation />
      <main id="main">
        {/* ===== Hero ===== */}
        <section className={beats.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroIntro}>
              <p className={styles.kicker}>LivePlan · Idea Validation · 2026</p>
              <h1 className={styles.heroHeadline}>Idea Canvas</h1>
            </div>
            <div className={styles.heroMedia}>
              <div className={`${styles.heroVisual} ${beats.heroFrame}`}>
                <Image
                  src="/images/canvas/canvas-hero.png"
                  alt="The Idea Canvas with the Idea Check panel open beside it, showing a confidence rating and top concerns for a business idea"
                  width={1503}
                  height={1052}
                  priority
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className={styles.heroImg}
                />
              </div>
            </div>
            <p className={beats.heroLine}>
              A validation tool for people who don&rsquo;t have a plan yet.
            </p>
            <dl className={styles.metaRow}>
              <div className={styles.metaCell}>
                <dt>Role</dt>
                <dd>Product Designer &amp; Researcher</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Shipped</dt>
                <dd>MVP in 3 weeks</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Outcome</dt>
                <dd>70% acted on a pivot suggestion</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ===== The problem ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The problem</p>
            <h2 className={styles.sectionHeading}>The right tool for the wrong stage</h2>
            <div className={styles.prose}>
              <p>
                LivePlan&rsquo;s customers already had an idea; they needed help funding and
                running it. Marketing found a bigger crowd one step earlier: nearly 100,000
                searches a month for idea-stage terms and a steady stream of Reddit threads
                asking the same thing. &ldquo;Is this a good idea for a business?&rdquo;
              </p>
              <p>
                The tools built for that question, the Business Model Canvas and Lean Canvas,
                were a wall of boxes designed for a whiteboard and an MBA. Our users had
                neither. And a canvas only collects assumptions. It doesn&rsquo;t tell you
                whether any of them are true.
              </p>
            </div>
          </div>
          <Image
            src="/images/canvas/canvas-research.png"
            alt="Three research inputs side by side: Reddit threads asking whether an idea is worth pursuing, the keyword cluster sheet, and a customer interview"
            width={1717}
            height={980}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={styles.researchImg}
          />
        </section>

        {/* ===== Research ===== */}
        <section className={`${styles.section} ${beats.cardBand}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>Research</p>
            <h2 className={styles.sectionHeading}>Validation felt like homework</h2>
            <div className={styles.prose}>
              <p>
                Three streams: marketing&rsquo;s search and sentiment data, about a dozen
                interviews with early-stage customers who were using the Business Plan as a
                makeshift validation tool and with educators who teach validation to
                first-time founders, and a review of VenturePlanner and Leanstack. The
                interviews did the most work. Three things kept coming up:
              </p>
            </div>
            <ul className={beats.findings}>
              <li>
                Every tool asked people to list their assumptions, then go find out if they
                were true. Nobody did the second part.
              </li>
              <li>
                The one-page canvas intimidated anyone who hadn&rsquo;t seen one in a
                classroom.
              </li>
              <li>
                Educators had strong, almost tribal opinions about Lean Canvas versus the
                Business Model Canvas, and no tool served both.
              </li>
            </ul>
            <p className={beats.pull}>
              Business planning feels like work. It should feel like discovery.
            </p>
            <div className={styles.prose}>
              <p>
                That set the brief: a canvas that checks your work as you go, so validation
                feels like crossing things off a list instead of adding to it.
              </p>
            </div>
          </div>
        </section>

        {/* ===== The solution ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The solution</p>
            <h2 className={styles.sectionHeading}>A canvas that checks your work</h2>
          </div>
          <div className={styles.inner}>
            <div className={beats.moves}>
              {moves.map((m) => (
                <div key={m.title} className={beats.move}>
                  <div className={beats.media}>
                    <Image
                      src={m.src}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      sizes="(max-width: 960px) 100vw, 650px"
                      className={beats.shot}
                    />
                  </div>
                  <div>
                    <h3 className={beats.moveTitle}>{m.title}</h3>
                    <p className={beats.moveBody}>{m.body}</p>
                  </div>
                </div>
              ))}
              {/* the two directions that lost in quick tests, after the three that won */}
              <div className={beats.move}>
                <div className={beats.media}>
                  <Image
                    src="/images/canvas/canvas-quick-test.png"
                    alt="The single-page canvas as first tested: nine empty Lean Canvas boxes on one screen, from Problems to Revenue Streams"
                    width={1024}
                    height={812}
                    sizes="(max-width: 960px) 100vw, 650px"
                    className={beats.shot}
                  />
                </div>
                <div>
                  <h3 className={beats.moveTitle}>What didn&rsquo;t work first</h3>
                  <p className={beats.moveBody}>
                    Two earlier directions lost in quick tests: a single-page canvas, which
                    looked like the wall of boxes we were trying to escape, and a chat
                    interface, which felt endless and buried the pivot opportunities. The
                    guided page kept the structure of a canvas and the pace of a conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.narrow} ${beats.after}`}>
            <div className={styles.prose}>
              <p>
                Validated assumptions map straight onto LivePlan&rsquo;s plan template, so
                someone who has done the hard thinking doesn&rsquo;t start over.
              </p>
            </div>
          </div>
        </section>

        {/* ===== The results ===== */}
        <section className={`${styles.section} ${beats.cardBand}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The results</p>
            <h2 className={styles.sectionHeading}>
              Three weeks from concept to a shipped MVP
            </h2>
            <div className={beats.stats}>
              {results.map((s) => (
                <div key={s.label} className={beats.stat}>
                  <p className={beats.statValue}>{s.value}</p>
                  <p className={beats.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={styles.prose}>
              <p>
                Entrepreneurship educators picked it up as a classroom tool, pressure-testing
                student ideas against real evidence. And LivePlan gained a front door: a way
                to meet people while they are still deciding whether to start.
              </p>
              <p className={beats.lesson}>
                The lesson I took: AI landed here because it did the work people were
                skipping, and showed its sources. It was a research assistant, not a judge.
              </p>
            </div>
          </div>
          {/* the bookend: a complete, rated canvas */}
          <div className={styles.wideImageSlider}>
            <Image
              src="/images/canvas/idea-canvas-full.png"
              alt="A complete Idea Canvas: every section filled in and each assumption carrying an evidence rating"
              width={3597}
              height={3279}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={beats.still}
            />
          </div>
        </section>

        <CaseStudyNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
