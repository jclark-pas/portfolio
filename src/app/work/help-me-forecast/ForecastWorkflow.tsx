"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BookOpen, ChatCircleText, User, PencilSimple, ChartBar, ArrowRight } from "@phosphor-icons/react";
import styles from "./ForecastWorkflow.module.css";

const stages = [
  { key: "explain", title: "Explain concept", detail: "Define the concept.\nMake it relevant.", icon: BookOpen, x: 50, y: 64, mx: 66, my: 40, label: "Explain the concept", headline: "Make unfamiliar concepts understandable.", body: "Direct costs, assets, receivables, payables, and personnel can be new territory for entrepreneurs. Explain each concept in plain language, with examples that connect it to their business." },
  { key: "ask", title: "Ask", detail: "Gather input about\ntheir business.", icon: ChatCircleText, x: 182, y: 64, mx: 66, my: 158, label: "Ask for business context", headline: "What does this look like for you?", body: "Ask the owner about their business: what goes into each sale, what it costs, and where they need help estimating." },
  { key: "propose", title: "AI proposes", detail: "Draft entries and\nvisible assumptions", icon: null, x: 314, y: 64, mx: 66, my: 276, label: "A proposal, not a decision", headline: "Here’s a starting point.", body: "The AI turns the owner’s answers into draft entries, with the assumptions available to inspect." },
  { key: "review", title: "Owner reviews", detail: "Review assumptions.\nDecide what belongs.", icon: User, x: 446, y: 64, mx: 66, my: 412, label: "The owner stays in control", headline: "Does this look right?", body: "The owner can correct the proposal or approve it. Nothing enters the forecast until they approve." },
  { key: "apply", title: "Apply", detail: "Only approved entries\nenter the forecast.", icon: ChartBar, x: 578, y: 64, mx: 66, my: 560, label: "Approval is the handoff", headline: "Put these numbers to work.", body: "After approval, the entries become part of the regular forecast and stay editable with the existing tools." },
  { key: "next", title: "Continue", detail: "Choose a section\nor return to Forecast.", icon: ArrowRight, x: 710, y: 64, mx: 66, my: 678, label: "Keep the momentum", headline: "What should we work on next?", body: "The guide suggests another section. The owner can follow that lead or return to their forecast." },
  { key: "correct", title: "Correct", detail: "Revise or add\nan assumption.", icon: PencilSimple, x: 380, y: 258, mx: 234, my: 344, label: "Corrections stay in the draft", headline: "Let’s adjust that assumption.", body: "Changes go back to the AI proposal, then through owner review again. A correction never applies itself." },
];

export default function ForecastWorkflow() {
  const [active, setActive] = useState("explain");
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const loopActive = active === "review" || active === "correct" || active === "propose";
  const approved = active === "apply" || active === "next";

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <figure ref={ref} className={styles.wrap} data-live={live || undefined} aria-label="The guided forecasting loop">
    <div className={styles.bubble} aria-live="polite" aria-atomic="true">
      {stages.map(stage => <div key={stage.key} className={styles.voice} data-active={active === stage.key || undefined} aria-hidden={active !== stage.key}>
        <p className={styles.eyebrow}>{stage.label}</p>
        <p className={styles.headline}>{stage.headline}</p>
        <p className={styles.description}>{stage.body}</p>
      </div>)}
    </div>
    <div className={styles.canvas}>
      <svg className={styles.desktopWires} viewBox="0 0 760 350" aria-hidden="true">
        <defs><marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" /></marker></defs>
        <g className={styles.wire} markerEnd={`url(#${id}-arrow)`}>
          <path d="M80 64H150" /><path d="M212 64H282" /><path d="M344 64H414" />
          <path d="M476 64H546" className={approved ? styles.highlight : undefined} />
          <path d="M608 64H678" className={active === "next" ? styles.highlight : undefined} />
        </g>
        <g className={`${styles.wire} ${loopActive ? styles.loop : ""}`} markerEnd={`url(#${id}-arrow)`}>
          <path d="M446 160V242Q446 258 430 258H412" />
          <path d="M348 258H330Q314 258 314 242V160" />
        </g>
        <text x="512" y="39" className={styles.approvalLabel}>Approve</text>
        <text x="462" y="207" className={styles.loopLabel}>Needs changes</text>
        <text x="298" y="207" textAnchor="end" className={styles.loopLabel}>Revise proposal</text>
      </svg>
      <svg className={styles.mobileWires} viewBox="0 0 300 770" preserveAspectRatio="none" aria-hidden="true">
        <defs><marker id={`${id}-mobile-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" /></marker></defs>
        <g className={styles.wire} markerEnd={`url(#${id}-mobile-arrow)`}>
          <path d="M66 125V131" /><path d="M66 243V249" /><path d="M66 360V385" />
          <path d="M66 496V533" className={approved ? styles.highlight : undefined} />
          <path d="M66 644V651" className={active === "next" ? styles.highlight : undefined} />
        </g>
        <g className={`${styles.wire} ${loopActive ? styles.loop : ""}`} markerEnd={`url(#${id}-mobile-arrow)`}>
          <path d="M94 412H132Q148 412 148 396V360Q148 344 164 344H207" />
          <path d="M234 316V292Q234 276 218 276H94" />
        </g>
        <text x="83" y="516" className={styles.approvalLabel}>Approve</text>
      </svg>
      {stages.map(stage => {
        const Icon = stage.icon;
        return <button key={stage.key} type="button" className={styles.stage}
          style={{ "--x": `${stage.x / 760 * 100}%`, "--y": `${stage.y / 350 * 100}%`, "--mx": `${stage.mx / 300 * 100}%`, "--my": `${stage.my / 770 * 100}%` } as CSSProperties}
          data-active={active === stage.key || undefined} aria-pressed={active === stage.key}
          aria-label={`${stage.title}: ${stage.detail.replace(/\n/g, " ")}`}
          onClick={() => setActive(stage.key)} onFocus={() => setActive(stage.key)}>
          <span className={styles.tile}>
            {Icon ? <Icon size={27} weight="regular" aria-hidden="true" /> : <Image src="/images/help-me-forecast/ai-icon.svg" width={28} height={28} alt="" />}
          </span>
          <span className={styles.name}>{stage.title}</span>
          <span className={styles.detail}>{stage.detail}</span>
        </button>;
      })}
    </div>
    <p className="sr-only">First explain the financial concept with examples relevant to the business. Then ask the owner for input. The AI proposes assumptions. The owner reviews them. Corrections loop back to the proposal for another review. Only approval applies entries to the forecast. Then choose the next section or return to Forecast.</p>
  </figure>;
}
