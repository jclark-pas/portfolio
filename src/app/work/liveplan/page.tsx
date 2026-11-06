import { Fragment } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudyNav from "@/components/CaseStudyNav";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getAdjacentProjects } from "@/data/projects";
import { SpeakerX } from "@phosphor-icons/react/dist/ssr";
import BeforeAfterToggle, { type Comparison } from "./BeforeAfterToggle";
import TokenTabs from "./TokenTabs";
import styles from "./page.module.css";
import beats from "./beats.module.css";

// The plan redesign in five beats: the problem, what the replays showed, three
// moves, tested then shipped, the results. The original, longer telling is
// kept at ./original for reference.
export const metadata = { title: "LivePlan" };

// the three moves, each headed by the change it made for the writer
const moves: { title: string; body: string; comparison: Comparison }[] = [
  {
    title: "From read-then-edit to just writing",
    body: "Everything is editable inline. Write, reorder and restructure in the document, with no detail views and no lost context. Comments and collaborative editing live there too, so a team can work in the plan together.",
    comparison: {
      title: "Inline editing",
      before: {
        body: "A separate detail view for every section edit.",
        videoSrc: "/videos/plan-inlineediting-before.mp4",
      },
      after: {
        body: "Write, reorder and restructure in the document.",
        videoSrc: "/videos/plan-inlineediting.mp4",
      },
    },
  },
  {
    title: "From fixed templates to a token system",
    body: "Twelve themes at launch with independent color, type, image, and layout variables allow users hundreds of customizable plan output options, on screen, in print, and in the pitch deck.",
    comparison: {
      title: "Theme customization",
      before: {
        body: "A small set of fixed templates.",
        videoSrc: "/videos/plan-themes-old.mp4",
      },
      after: {
        body: "Themes editable down to the token.",
        videoSrc: "/videos/plan-themes.mp4",
      },
    },
  },
  {
    title: "AI help, where you need it",
    body: "AI writing tools at the point of need, with business-specific instructions and control over tone, length and scope. People didn’t distrust AI. They distrusted generic AI.",
    comparison: {
      title: "AI writing tools",
      before: {
        body: "AI writing in a sidebar, away from the work.",
        videoSrc: "/videos/plan-ai-old.mp4",
      },
      after: {
        body: "AI where the writing happens.",
        videoSrc: "/videos/plan-ai.mp4",
      },
    },
  },
];

const testing = [
  { value: "90%", label: "found the outline tools, from 15%" },
  { value: "70%", label: "found the AI tools, from 20%" },
  { value: "100%", label: "asked to join the beta, unprompted" },
];

const results = [
  { value: "25%", label: "less early churn" },
  { value: "42%", label: "more writing engagement" },
  { value: "38%", label: "more AI feature use" },
  { value: "63%", label: "more plan comments" },
];

export default function LivePlanPage() {
  const { prev, next } = getAdjacentProjects("liveplan");

  return (
    <>
      <Navigation />
      <main id="main">
        {/* ===== Hero ===== */}
        <section className={beats.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroIntro}>
              <p className={styles.kicker}>LivePlan · Product Design · 2024</p>
              <h1 className={styles.heroHeadline}>Redesigning the business plan</h1>
            </div>
            <div className={`${styles.heroVisual} ${beats.heroFrame}`}>
              <Image
                src="/images/liveplan/businessplan-hero.png"
                alt="LivePlan business plan editor with executive summary, formatting toolbar, and inline AI guidance"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                className={styles.heroImg}
              />
            </div>
            <p className={beats.heroLine}>
              A ten-year-old editor, rebuilt around where people actually write.
            </p>
            <dl className={styles.metaRow}>
              <div className={styles.metaCell}>
                <dt>Role</dt>
                <dd>Lead Product Designer</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Team</dt>
                <dd>9 engineers, 1 PM</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Shipped</dt>
                <dd>Q3 2024, after 3 months</dd>
              </div>
              <div className={styles.metaCell}>
                <dt>Outcome</dt>
                <dd>Early churn down 25%</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ===== The problem ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The problem</p>
            <h2 className={styles.sectionHeading}>
              New users were leaving before the product could prove itself
            </h2>
            <div className={styles.prose}>
              <p>
                LivePlan helps entrepreneurs write business plans. The editor hadn&rsquo;t changed
                in a decade. New users churned before they&rsquo;d finished a first section, and
                seasoned users built workarounds for basics. The brief: make it faster to
                write, easier to customize and smarter with AI, without losing the guided
                structure lenders and investors trusted.
              </p>
            </div>
          </div>
          {/* only the old editor here; the redesign waits for the moves, and the
              before/after pair closes the page */}
          <div className={styles.wideImageSlider}>
            <Image
              src="/images/liveplan/editor-before.png"
              alt="The legacy LivePlan editor: modal-heavy, fixed templates, sidebar-only AI"
              width={2400}
              height={1350}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={beats.still}
              priority
            />
          </div>
        </section>

        {/* ===== Research ===== */}
        <section className={`${styles.section} ${beats.cardBand}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>Research</p>
            <h2 className={styles.sectionHeading}>Watching people work around the product</h2>
            <div className={styles.prose}>
              <p>
                I ran three streams of research: interviews with new signups and power users,
                session replays in Amplitude, and sessions with our customer advocacy team.
                The replays did the most work.
              </p>
            </div>
          </div>
          <div className={styles.discoveryImages}>
            <Image
              src="/images/liveplan/research-screens.png"
              alt="Two research inputs side by side: an Amplitude session replay of a user in the legacy editor, and a recording from a one-on-one customer interview"
              width={1317}
              height={470}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.discoveryImg}
            />
          </div>
          <div className={styles.narrow} style={{ marginTop: "var(--space-xl)" }}>
            <div className={styles.prose}>
              <p>Four things kept happening in the replays:</p>
            </div>
            <ul className={beats.findings}>
              <li>
                The list/detail app structure created two extra clicks for every edit,
                bouncing between a read-only view and a separate edit mode.
              </li>
              <li>
                Users were building charts in Excel and pasting them in their plan as images.
                LivePlan&rsquo;s native charting couldn&rsquo;t be found.
              </li>
              <li>Whole lines bolded to fake headings, because there were no heading styles.</li>
              <li>
                The outline treated as fixed. Customizing it lived in another part of the app.
              </li>
            </ul>
            <div className={styles.prose}>
              <p>
                Interviews added two more. People had tried generic AI and didn&rsquo;t trust it
                with their plan. And they wanted the plan to look like their business, not a
                template.
              </p>
            </div>
            <p className={beats.pull}>
              They weren&rsquo;t struggling because the features didn&rsquo;t exist. They
              couldn&rsquo;t find them, make them their own, or trust them.
            </p>
            <div className={styles.prose}>
              <p>
                That reframing changed the brief: surface what existed, in context, instead
                of building new capability.
              </p>
            </div>
          </div>
        </section>

        {/* ===== The solution ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The solution</p>
            <h2 className={styles.sectionHeading}>Put everything where the writing happens</h2>
          </div>
          <div className={styles.inner}>
            <div className={beats.moves}>
              {moves.map((m, i) => (
                <Fragment key={m.title}>
                  <div className={beats.move}>
                    <div className={beats.media}>
                      <BeforeAfterToggle comparison={m.comparison} />
                    </div>
                    <div>
                      <h3 className={beats.moveTitle}>{m.title}</h3>
                      <p className={beats.moveBody}>{m.body}</p>
                    </div>
                  </div>
                  {/* the two token diagrams sit full width under the token move */}
                  {i === 1 ? <TokenTabs /> : null}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testing ===== */}
        <section className={`${styles.section} ${beats.cardBand}`}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>Testing</p>
            <h2 className={styles.sectionHeading}>Usability rounds before a line of code</h2>
            <div className={styles.prose}>
              <p>
                Before engineering started, the designs went in front of users in several
                rounds.
              </p>
            </div>
            <div className={beats.stats}>
              {testing.map((s) => (
                <div key={s.label} className={beats.stat}>
                  <p className={beats.statValue}>{s.value}</p>
                  <p className={beats.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={styles.prose}>
              <p>
                Testing surfaced one more requirement: people loved the themes and wanted to
                make them their own. Custom colors and fonts shipped as a fast-follow.
              </p>
            </div>
            <div className={beats.testing}>
              <div>
                <video
                  src="/videos/plan-usability-test.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className={beats.clip}
                  aria-label="Usability test session recording"
                />
                <span className={beats.clipNote}>
                  <SpeakerX size={14} weight="duotone" aria-hidden="true" />
                  No sound, for privacy
                </span>
              </div>
              <div>
                <p className={beats.moveBody}>
                  The fast-follow: custom brand colors, picked right in the theme.
                </p>
                <Image
                  src="/images/liveplan/custom-color-picker.png"
                  alt="Custom color picker: Primary and Accent color swatches with hex values for a plan theme"
                  width={798}
                  height={208}
                  sizes="400px"
                  className={beats.picker}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== The results ===== */}
        <section className={styles.section}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>The results</p>
            <h2 className={styles.sectionHeading}>Within 60 days, every metric moved</h2>
            <div className={beats.stats}>
              {results.map((s) => (
                <div key={s.label} className={beats.stat}>
                  <p className={beats.statValue}>{s.value}</p>
                  <p className={beats.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={styles.prose}>
              <p className={beats.lesson}>
                The replays gave me a conviction interviews couldn&rsquo;t. The token system
                paid for itself the day the pitch deck shipped on it. And AI trust came from
                context, not capability.
              </p>
            </div>
          </div>
          {/* the bookend: where the editor started, and where it ended up */}
          <div className={styles.wideImageSlider}>
            <BeforeAfterSlider
              beforeLabel="Before"
              afterLabel="After"
              before={
                <Image
                  src="/images/liveplan/editor-before.png"
                  alt="The legacy LivePlan editor: modal-heavy, fixed templates, sidebar-only AI"
                  width={2400}
                  height={1350}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              }
              after={
                <Image
                  src="/images/liveplan/editor-after.png"
                  alt="The redesigned LivePlan editor: inline writing, themed output, contextual AI"
                  width={2400}
                  height={1350}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              }
            />
          </div>
        </section>

        <CaseStudyNav prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
