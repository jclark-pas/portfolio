"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ArrowCounterClockwise, Pause, Play, PlusCircle } from "@phosphor-icons/react";
import { mulish } from "./livePlanFont";
import shared from "./CostCalculator.module.css";
import styles from "./RevenueWalkthrough.module.css";

type Stream = { id: string; name: string; description: string; selected: boolean; price: string; volume: string };
const initialStreams: Stream[] = [
  { id: "coffee", name: "Espresso drinks and specialty coffee", description: "Premium coffee, espresso drinks, and seasonal lattes sold by the drink.", selected: true, price: "5.00", volume: "300" },
  { id: "pastries", name: "House-made pastries and baked goods", description: "Fresh pastries and baked goods sold individually to visitors.", selected: true, price: "4.00", volume: "90" },
  { id: "combos", name: "Bundled coffee-and-pastry combos", description: "Coffee and pastry pairings sold as a single bundle.", selected: true, price: "8.00", volume: "45" },
  { id: "seasonal", name: "Seasonal themed treats", description: "Limited-time holiday treats and impulse purchases.", selected: true, price: "4.50", volume: "30" },
  { id: "gifts", name: "Giftable or branded treats", description: "Packaged treats to take home or give as gifts.", selected: false, price: "12.00", volume: "15" },
];
const growthOptions = [
  ["Serve more customers", "Build a regular crowd at the café."],
  ["Raise prices over time", "Adjust prices as the business grows."],
  ["Expand hours or services", "Open earlier or add an afternoon service."],
  ["Add new revenue streams", "Introduce catering, subscriptions, or coffee classes."],
];
const paceOptions = [
  ["Steady — a few percent a year", "Consistent, modest growth year over year."],
  ["Faster at first, then level off", "Build a loyal customer base, then settle into a rhythm."],
  ["Ambitious — strong year over year", "Grow quickly as the café becomes a local destination."],
];
const seasonOptions = [
  ["Fairly even all year", "A steady flow of regular customers."],
  ["Busier in summer", "More visitors and iced drinks in warmer months."],
  ["Busier in winter", "Peak demand for warm drinks and holiday treats."],
  ["University calendar pattern", "Busier during the academic year, quieter during breaks."],
];
const steps = [
  { label: "Streams", title: "Which of these revenue streams does your business have?", intro: "Pick all that apply. You can add another stream if needed." },
  { label: "Growth", title: "How do you picture growing over the next few years?", intro: "Choose the ways you expect your café to grow." },
  { label: "Pace", title: "How fast do you expect to grow each year?", intro: "Choose the pace that feels right for your business." },
  { label: "Seasons", title: "How does demand vary throughout the year?", intro: "Think about the busy and quiet times at your café." },
  { label: "Prices", title: "How much will you charge for each?", intro: "Enter a typical price for each sale. Use an average if it varies." },
  { label: "Volume", title: "How many of each do you expect to sell per week?", intro: "Start with a typical week. You can refine these estimates as you go." },
];
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function RevenueWalkthrough() {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const transcript = useRef<HTMLDivElement>(null);
  const latest = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [streams, setStreams] = useState(initialStreams);
  const [growth, setGrowth] = useState([0]);
  const [pace, setPace] = useState(1);
  const [season, setSeason] = useState(2);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => { setReducedMotion(motion.matches); setPlaying(!motion.matches); };
    updateMotion();
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.intersectionRatio >= 0.25);
    }, { threshold: [0, 0.25] });
    observer.observe(element);
    motion.addEventListener("change", updateMotion);
    return () => { observer.disconnect(); motion.removeEventListener("change", updateMotion); };
  }, []);

  const running = playing && visible && !focused && step < steps.length;
  const advance = useCallback(() => {
    const chosen = streams.filter(stream => stream.selected);
    if (step >= steps.length || (step === 0 && !chosen.length)) return;
    const answers = [
      chosen.map(stream => stream.name).join("; ") + ".",
      growth.length ? growth.map(index => growthOptions[index][0]).join("; ") + "." : "Keep the café at its current size.",
      paceOptions[pace][0] + ".",
      seasonOptions[season][0] + ".",
      chosen.map(stream => `${stream.name}: ${Number(stream.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}`).join("; ") + ".",
      chosen.map(stream => `${stream.name}: ${stream.volume} per week`).join("; ") + ".",
    ];
    if (step >= 0) setHistory(items => [...items, { question: steps[step].title, answer: answers[step] }]);
    setStep(value => value + 1);
    setAdding(false);
  }, [step, streams, growth, pace, season]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(advance, step === -1 ? 5000 : 8000);
    return () => window.clearTimeout(timer);
  }, [running, step, advance]);

  useEffect(() => {
    const panel = transcript.current;
    const message = latest.current;
    if (!panel || !message) return;
    // Scroll only the conversation, leaving the portfolio page in place.
    panel.scrollTo({ top: message.offsetTop - 64, behavior: reducedMotion ? "instant" : "smooth" });
  }, [step, reducedMotion]);

  const takeControl = () => setPlaying(false);
  const replay = () => {
    setHistory([]); setStep(-1); setStreams(initialStreams); setGrowth([0]);
    setPace(1); setSeason(2); setAdding(false); setNewName(""); setPlaying(!reducedMotion);
    transcript.current?.scrollTo({ top: 0, behavior: "instant" });
  };
  const selected = streams.filter(stream => stream.selected);
  const updateStream = (streamId: string, key: "price" | "volume", value: string) => {
    takeControl(); setStreams(items => items.map(item => item.id === streamId ? { ...item, [key]: value } : item));
  };
  const addStream = () => {
    if (!newName.trim()) return;
    takeControl();
    setStreams(items => [...items, { id: `custom-${nextId.current++}`, name: newName.trim(), description: "", selected: true, price: "0.00", volume: "0" }]);
    setNewName(""); setAdding(false);
  };
  const options = step === 1 ? growthOptions : step === 2 ? paceOptions : seasonOptions;

  return <div ref={container} className={`${shared.example} ${styles.example} ${mulish.className}`}
    onFocusCapture={event => setFocused(event.target.matches("input, :focus-visible"))}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className={styles.chatHeader}>
      <span className={styles.brand}><img src="/images/help-me-forecast/ai-icon.svg" alt="" width="22" height="22" />Help me forecast</span>
      <div className={styles.controls}>
        <button type="button" className={styles.playback} aria-label="Replay revenue conversation" onClick={replay}><ArrowCounterClockwise weight="regular" size={17} aria-hidden="true" /></button>
        {step < steps.length && <button type="button" className={styles.playback} aria-label={playing ? "Pause revenue conversation" : "Play revenue conversation"} onClick={() => setPlaying(value => !value)}>
          {playing ? <Pause weight="regular" size={17} aria-hidden="true" /> : <Play weight="regular" size={17} aria-hidden="true" />}
        </button>}
      </div>
    </div>
    <div ref={transcript} className={styles.transcript} role="region" aria-label="Revenue conversation" tabIndex={0}
      onWheel={takeControl} onTouchStart={takeControl} onKeyDown={event => { if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) takeControl(); }}>
      <div className={styles.explanation}>
        <span className={styles.speaker}>Help me forecast</span>
        <h3>Let’s build your revenue.</h3>
        <p>Revenue is the money you bring in from sales, before expenses. For your café, that could include coffee, pastries, and other treats.</p>
        <p>We’ll work through what you sell, how you’ll grow, and what a typical week looks like.</p>
        {step === -1 && <button type="button" className={`${shared.done} ${styles.next}`} onClick={() => { takeControl(); advance(); }}>Start revenue<ArrowRight size={18} aria-hidden="true" /></button>}
      </div>
      {history.map((message, index) => <div key={index} className={styles.exchange}>
        <p className={styles.question}>{message.question}</p>
        <div className={styles.reply}><span className={styles.speaker}>You</span><p>{message.answer}</p></div>
      </div>)}
      <div ref={latest} className={styles.latest}>
      {step >= 0 && step < steps.length && <section className={styles.questionCard} aria-labelledby={`${id}-question`}>
      <div key={step} className={`${styles.screen} ${styles.enter}`}>
        <h3 id={`${id}-question`}>{steps[step].title}</h3>
        <p className={styles.intro}>{steps[step].intro}</p>
        {step === 0 ? <div className={styles.options}>
          {streams.map(stream => <label key={stream.id} className={styles.option} data-selected={stream.selected}>
            <input type="checkbox" checked={stream.selected} onChange={() => { takeControl(); setStreams(items => items.map(item => item.id === stream.id ? { ...item, selected: !item.selected } : item)); }} />
            <span><strong>{stream.name}</strong>{stream.description && <small>{stream.description}</small>}</span>
          </label>)}
          {adding ? <form className={styles.addForm} onSubmit={event => { event.preventDefault(); addStream(); }}>
            <input aria-label="Revenue stream name" placeholder="Revenue stream name" autoFocus value={newName} onChange={event => setNewName(event.target.value)} />
            <button type="submit" disabled={!newName.trim()}>Add</button>
          </form> : <button type="button" className={styles.add} onClick={() => { takeControl(); setAdding(true); }}><PlusCircle weight="regular" size={18} aria-hidden="true" />Add another</button>}
        </div> : step < 4 ? <fieldset className={styles.options} aria-label={steps[step].title}>
          {options.map(([title, description], index) => {
            const checked = step === 1 ? growth.includes(index) : step === 2 ? pace === index : season === index;
            return <label key={title} className={styles.option} data-selected={checked}>
              <input type={step === 1 ? "checkbox" : "radio"} name={`${id}-${step}`} checked={checked} onChange={() => {
                takeControl();
                if (step === 1) setGrowth(values => checked ? values.filter(value => value !== index) : [...values, index]);
                else if (step === 2) setPace(index);
                else setSeason(index);
              }} />
              <span><strong>{title}</strong><small>{description}</small></span>
            </label>;
          })}
        </fieldset> : <div className={styles.options}>
          {selected.map(stream => <label className={styles.valueRow} key={stream.id}>
            <span>{stream.name}</span>
            <span className={shared.currencyInput}>
              {step === 4 && <span aria-hidden="true">$</span>}
              <input type="number" inputMode={step === 4 ? "decimal" : "numeric"} min="0" step={step === 4 ? "0.01" : "1"}
                aria-label={`${stream.name} ${step === 4 ? "price" : "sales per week"}`}
                value={step === 4 ? stream.price : stream.volume}
                onChange={event => updateStream(stream.id, step === 4 ? "price" : "volume", event.target.value)}
                onBlur={event => updateStream(stream.id, step === 4 ? "price" : "volume", step === 4 ? Math.max(0, Number(event.target.value) || 0).toFixed(2) : String(Math.max(0, Math.round(Number(event.target.value) || 0))))} />
            </span>
          </label>)}
          {selected.length === 0 && <p className={styles.empty}>Choose a revenue stream to estimate its sales.</p>}
        </div>}
        {step === 5 && selected.length > 0 && <div className={styles.estimate}><span>Estimated weekly revenue</span><strong>{money(selected.reduce((sum, stream) => sum + Math.max(0, Number(stream.price) || 0) * Math.max(0, Number(stream.volume) || 0), 0))}</strong></div>}
      </div>
      <div className={`${shared.actions} ${styles.actions}`}>
        <button type="button" className={`${shared.done} ${styles.next}`} disabled={step === 0 && selected.length === 0} onClick={() => { takeControl(); advance(); }}>
          {step === steps.length - 1 ? "Review estimates" : "Done"}<ArrowRight size={18} weight="regular" aria-hidden="true" />
        </button>
      </div>
    </section>}
      {step === steps.length && <div className={`${styles.explanation} ${styles.enter}`}>
        <span className={styles.speaker}>Help me forecast · Draft</span>
        <h3>Here’s the revenue we worked out.</h3>
        <div className={styles.summary}>{selected.map(stream => <div key={stream.id}><span>{stream.name}</span><strong>{money(Number(stream.price) * Number(stream.volume))}</strong></div>)}</div>
        <div className={styles.estimate}><span>Estimated weekly revenue</span><strong>{money(selected.reduce((sum, stream) => sum + Number(stream.price) * Number(stream.volume), 0))}</strong></div>
        <p>These are the starting estimates for a typical week, before growth and seasonality. Review the assumptions before adding them to your forecast.</p>
        <button type="button" className={styles.restart} onClick={replay}><ArrowCounterClockwise size={16} aria-hidden="true" />Start again</button>
      </div>}
      </div>
    </div>
    <p className="sr-only" role="status">{!running ? step === steps.length ? "Revenue estimates are ready for review. Nothing has been applied to the forecast." : step >= 0 ? steps[step].title : "Let’s build your revenue." : ""}</p>
  </div>;
}
