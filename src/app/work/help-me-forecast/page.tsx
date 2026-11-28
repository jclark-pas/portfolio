import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import CaseStudyHero from "@/components/CaseStudyHero";
import CaseStudyNav from "@/components/CaseStudyNav";
import Footer from "@/components/Footer";
import ForecastWorkflow from "./ForecastWorkflow";
import CostCalculator from "./CostCalculator";
import RevenueWalkthrough from "./RevenueWalkthrough";
import ForecastApproval from "./ForecastApproval";
import layout from "../idea-canvas/page.module.css";
import beats from "../idea-canvas/beats.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Help Me Forecast",
  description: "Helping small-business owners turn napkin math into a working forecast through a guided conversation, visible assumptions, and owner approval.",
  robots: { index: false, follow: false },
};

const examples = [
  {
    step: "Ask", title: "Start with questions owners can answer",
    body: "I framed questions around familiar business decisions: what people sell, what they charge, and how often they expect to sell it. Focused prompts and calculation tools help owners work through an estimate, while the guide translates their answers into forecast inputs.",
    image: "ask", height: 426,
    alt: "Guided revenue question: 300 drinks per week at $5 each produces proposed weekly revenue of $1,500.",
    caption: "",
  },
  {
    step: "Correct", title: "Make assumptions easy to inspect and change",
    body: "I made the inputs behind each estimate editable. Owners can add missing items, remove irrelevant ones, and adjust values while seeing the effect on unit costs and margin. Every correction returns to the proposal for another review, so owners can judge the result before committing it.",
    image: "correct", height: 481,
    alt: "Direct costs review: adding cups and lids at $45 per week changes proposed costs from $300 to $345. The owner can approve or adjust.",
    caption: "Editable unit costs. Corrections stay in the draft until approval.",
  },
  {
    step: "Approve", title: "Keep approval in the owner’s hands",
    body: "I separated proposing an entry from applying it. Only the owner’s approval adds it to the regular forecast, where it stays editable with the existing tools. The guide then offers a next step, keeping the conversation and the financial model connected as owners build out the forecast.",
    image: "approve", height: 457,
    alt: "After approval, the editable forecast contains $1,500 per week in drinks revenue and $345 per week in direct costs. The guide suggests a next section.",
    caption: "",
  },
];

export default function HelpMeForecastPage() {
  return <>
    <Navigation />
    <main id="main" className={styles.page}>
      <CaseStudyHero
        company="LivePlan · Help Me Forecast · 2026"
        title="From napkin math to a working forecast"
        description="Financial forecasts are the most important part of a business plan, yet most business planners struggled to even start one. I led design on a solution that got more people started than ever."
        heroImage="/images/help-me-forecast/hero.svg"
        mobileHeroImage="/images/help-me-forecast/hero-mobile.svg"
        imageAlt="LivePlan’s Expenses & Costs table alongside Help Me Forecast, explaining personnel and asking a café owner for annual pay and staffing levels."
        imageWidth={1600} imageHeight={1060} palette="forecast" floatingImage
        facts={[
          { label: "Role", value: "Product design lead" },
          { label: "Shipped", value: "August 2026" },
          { label: "Outcome", value: "More forecast starts and more sections completed" },
        ]}
      />
      <section className={layout.section} aria-labelledby="problem">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>The problem</p>
          <h2 id="problem" className={`${layout.sectionHeading} ${styles.quotedHeading}`}><span className={styles.openingQuote}>&ldquo;</span>I’m not a numbers person.&rdquo;</h2>
          <p className={`${layout.prose} ${styles.copy}`}>Small-business owners could tell us what they sold, what they might charge, and what it took to make it. But for most of our business planners, the common refrain of &ldquo;I’m not a numbers person&rdquo; meant that the most important piece of their plan—the forecast—was left undone.</p>
          <p className={`${layout.prose} ${styles.copy}`}>In user research, I watched people work it out on paper first. The work wasn’t the arithmetic. It was translating what they knew about their business into what the forecast needed, and then providing guidance to fill in the gaps for what they didn’t know.</p>
        </div>
      </section>
      <section className={`${layout.section} ${beats.cardBand}`} aria-labelledby="solution">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>The solution</p>
          <h2 id="solution" className={layout.sectionHeading}>Build a forecast they can explain</h2>
          <div className={`${layout.prose} ${styles.copy}`}>
            <p>The solution had two parts: a conversational agent alongside the financial tables, and structured guardrails grounded in sound business-planning and forecasting methods. The conversation helped owners work through what they knew and where they needed guidance. The guardrails gave the agent a reliable process for turning those answers into a forecast.</p>
            <p>Along the way, owners could learn the different components of their business financials and take an active role in the assumptions behind them. The goal was to help them understand their forecast well enough to explain their numbers and speak with authority to loan officers and investors.</p>
          </div>
        </div>
      </section>
      <section className={layout.section} aria-labelledby="pattern">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>Designing the conversation</p>
          <h2 id="pattern" className={layout.sectionHeading}>Guide the AI. Involve the owner.</h2>
          <div className={`${layout.prose} ${styles.copy}`}>
            <p>Our first prototype was a free-form chat with a basic instruction: use the context from the business plan to help create a suitable financial forecast. The results missed important details around growth, costs, and debt-to-income ratios. Owners also came away without enough understanding of their financials or business model to explain them confidently to investors.</p>
            <p>We kept the idea of &ldquo;walking the forecast&rdquo; from our step-by-step experience, with an agentic workflow supporting each step. The agent explained the financial concepts, proposed assumptions, and asked the owner for input and feedback. Owners could review and correct the proposal before approving it. Only then were their decisions applied to the forecast model.</p>
            <p>Keeping the owner involved was essential: they would be responsible for executing the plan. The experience needed to help them learn as they went, understand the assumptions behind their numbers, and speak with authority about their business to loan officers and investors.</p>
          </div>
          <ForecastWorkflow />
        </div>
      </section>
      <section className={`${layout.section} ${beats.cardBand}`} aria-labelledby="examples">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>The build</p>
          <h2 id="examples" className={layout.sectionHeading}>A guided path into the forecast</h2>
          <p className={`${layout.prose} ${styles.copy}`}>I designed the guide to turn everyday business knowledge into forecast entries. Three interaction decisions help owners get started, understand the assumptions, and stay in control of what goes into their forecast.</p>
        </div>
        <div className={layout.inner}>
          <div className={beats.moves}>
            {examples.map((example) => <article key={example.step} id={example.image} className={beats.move}>
              <figure className={beats.media}>
                <div className={`${styles.art} ${styles[example.image]}`}>
                  {example.image === "ask" ? <RevenueWalkthrough /> : example.image === "correct" ? <CostCalculator /> : <ForecastApproval />}
                </div>
                {example.caption && <figcaption className={styles.caption}>{example.caption}</figcaption>}
              </figure>
              <div><p className={layout.eyebrow}>{example.step}</p><h3 className={beats.moveTitle}>{example.title}</h3><p className={`${beats.moveBody} ${styles.exampleCopy}`}>{example.body}</p></div>
            </article>)}
          </div>
        </div>
      </section>
      <section className={layout.section} aria-labelledby="outcomes">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>The Results</p>
          <h2 id="outcomes" className={layout.sectionHeading}>More people started. They got further.</h2>
          <p className={`${layout.prose} ${styles.copy}`}>Help Me Forecast has become the main way people forecast in LivePlan. More owners are getting started and making progress across their forecast.</p>
          <div className={styles.entryGrid}>
            <div className={styles.card}><h3><span className={styles.metric}>50%</span>more forecast starts</h3><p>More owners began putting together a forecast.</p></div>
            <div className={styles.card}><h3><span className={styles.metric}>65%</span>more sections completed</h3><p>Owners made progress across more of the forecast.</p></div>
          </div>
        </div>
      </section>
      <section className={`${layout.section} ${beats.cardBand}`} aria-labelledby="shipped">
        <div className={layout.narrow}>
          <p className={layout.eyebrow}>What shipped</p>
          <h2 id="shipped" className={layout.sectionHeading}>A starting point people can own</h2>
          <p className={`${layout.prose} ${styles.copy}`}>LivePlan released the guided experience in August 2026. Owners can launch it from a new forecast or an individual financial table, correct suggestions before adding them, and fine-tune the resulting entries in the regular forecast.</p>
          <figure className={styles.productVideo}>
            <iframe
              src="https://fast.wistia.net/embed/iframe/f93gp1f4ca?autoPlay=false&videoFoam=true"
              title="Help Me Forecast — LivePlan product walkthrough"
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </figure>
        </div>
      </section>
      <CaseStudyNav prev={{slug:"idea-canvas",title:"Idea Canvas"}} next={{slug:"forecast",title:"Actuals in the Forecast"}} />
    </main>
    <Footer />
  </>;
}
