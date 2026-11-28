"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowCounterClockwise, Pause, PencilSimple, PlusCircle, X } from "@phosphor-icons/react";
import { mulish } from "./livePlanFont";
import styles from "./CostCalculator.module.css";

type Cost = { id: string; name: string; value: string };
const startingCosts: Cost[] = [
  { id: "coffee", name: "Coffee beans", value: "0.60" },
  { id: "milk", name: "Milk", value: "0.40" },
];
const packaging: Cost = { id: "packaging", name: "Cups, lids, and packaging", value: "0.15" };
const completedCosts = [...startingCosts, packaging];
const dollars = (cents: number) => `${cents < 0 ? "-" : ""}$${(Math.abs(cents) / 100).toFixed(2)}`;
const cents = (value: string) => Math.max(0, Math.round((Number(value) || 0) * 100));

export default function CostCalculator() {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const nextId = useRef(0);
  const [costs, setCosts] = useState<Cost[]>(completedCosts);
  const [price, setPrice] = useState("5.00");
  const [editingPrice, setEditingPrice] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState<"ready" | "missing" | "added" | "review">("ready");
  const [newCostId, setNewCostId] = useState<string | null>(null);

  // Play once on arrival; manual edits always take ownership of the example.
  useEffect(() => {
    const element = container.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (interacted.current || reducedMotion.matches) return;
      setCosts(startingCosts);
      setPhase("missing");
      setPlaying(true);
    }, { threshold: 0.55 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopForMotionPreference = () => {
      if (reducedMotion.matches) setPlaying(false);
    };
    reducedMotion.addEventListener("change", stopForMotionPreference);
    const timer = window.setTimeout(() => {
      if (phase === "missing") {
        setCosts(completedCosts);
        setPhase("added");
      } else {
        setPlaying(false);
        setPhase("ready");
      }
    }, phase === "missing" ? 1800 : 2200);
    return () => {
      window.clearTimeout(timer);
      reducedMotion.removeEventListener("change", stopForMotionPreference);
    };
  }, [playing, phase]);

  const takeControl = () => {
    interacted.current = true;
    setPlaying(false);
    setPhase("ready");
  };
  const replay = () => {
    interacted.current = true;
    setNewCostId(null);
    setEditingPrice(false);
    setPrice("5.00");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCosts(completedCosts);
      setPhase("added");
      setPlaying(false);
    } else {
      setCosts(startingCosts);
      setPhase("missing");
      setPlaying(true);
    }
  };
  const total = costs.reduce((sum, cost) => sum + cents(cost.value), 0);
  const revenue = cents(price);
  const margin = revenue - total;
  const percent = (value: number) => revenue > 0 ? `${Math.round(value / revenue * 100)}%` : "—";
  const message = phase === "missing"
    ? "The draft is missing cups and lids."
    : phase === "added"
      ? "Packaging added: unit cost rises to $1.15; margin is now 77%."
      : phase === "review"
        ? "Changes are ready for review. Nothing has been added to the forecast."
        : "";

  return <div ref={container} className={`${styles.example} ${mulish.className}`}>
    <div className={styles.toolbar}>
      <span>Unit cost calculator</span>
      <button type="button" onClick={playing ? takeControl : replay}>
        {playing ? <Pause weight="regular" size={16} aria-hidden="true" /> : <ArrowCounterClockwise weight="regular" size={16} aria-hidden="true" />}
        {playing ? "Pause" : "Replay"}
      </button>
    </div>
    <div className={styles.calculator} aria-labelledby={`${id}-title`}>
      <div className={styles.content}>
        <div>
          <h3 id={`${id}-title`}>Add up what each one costs you</h3>
          <p className={styles.intro}>Enter rough, typical costs per drink. Use an average if it varies, and leave out anything that doesn’t apply.</p>
        </div>
        <fieldset className={styles.costs} aria-label="Direct costs">
          <div className={styles.rows}>
            {costs.map(cost => <div key={cost.id} className={`${styles.costRow} ${phase === "added" && cost.id === "packaging" ? styles.justAdded : ""}`}>
              {cost.id.startsWith("custom-") ? <input
                className={styles.nameInput} aria-label="Cost item name" value={cost.name}
                placeholder="Cost name" autoFocus={newCostId === cost.id}
                onChange={event => { takeControl(); setCosts(items => items.map(item => item.id === cost.id ? { ...item, name: event.target.value } : item)); }}
              /> : <label htmlFor={`${id}-${cost.id}`}>{cost.name}</label>}
              <div className={styles.currencyInput}><span aria-hidden="true">$</span><input
                id={`${id}-${cost.id}`} aria-label={`${cost.name || "New item"} cost per unit`}
                type="number" inputMode="decimal" min="0" step="0.01" value={cost.value}
                onFocus={takeControl}
                onChange={event => { takeControl(); setCosts(items => items.map(item => item.id === cost.id ? { ...item, value: event.target.value } : item)); }}
                onBlur={() => setCosts(items => items.map(item => item.id === cost.id ? { ...item, value: (cents(item.value) / 100).toFixed(2) } : item))}
              /></div>
              <button className={styles.remove} type="button" aria-label={`Remove ${cost.name || "new cost"}`} onClick={() => {
                takeControl(); setCosts(items => items.filter(item => item.id !== cost.id));
              }}><X weight="regular" size={18} aria-hidden="true" /></button>
            </div>)}
          </div>
          <button className={styles.add} type="button" onClick={() => {
            takeControl(); const costId = `custom-${nextId.current++}`; setNewCostId(costId);
            setCosts(items => [...items, { id: costId, name: "", value: "0.00" }]);
          }}><PlusCircle weight="regular" size={19} aria-hidden="true" />Add a cost</button>
        </fieldset>
        <div className={styles.metrics}>
          <div className={`${styles.total} ${phase === "added" ? styles.updated : ""}`}>
            <span>Total cost per unit</span><div><strong>{dollars(total)}</strong><small>{percent(total)} of revenue</small></div>
          </div>
          <div className={styles.revenue}>
            <span className={styles.revenueLabel}>Revenue per unit</span>
            {editingPrice ? <div className={styles.currencyInput}><span aria-hidden="true">$</span><input
              id={`${id}-revenue`} aria-label="Revenue per unit" type="number" inputMode="decimal" min="0" step="0.01" value={price} autoFocus
              onChange={event => { takeControl(); setPrice(event.target.value); }}
              onBlur={() => setPrice((cents(price) / 100).toFixed(2))}
            /></div> : <><strong>{dollars(revenue)}</strong><button type="button" aria-label="Edit revenue per unit" onClick={() => { takeControl(); setEditingPrice(true); }}><PencilSimple weight="regular" size={20} aria-hidden="true" /></button></>}
          </div>
          <div className={styles.margin}><div><strong>Gross margin</strong><small>Money earned per unit sold</small></div><div><strong>{dollars(margin)}<span>/unit</span></strong><small>{percent(margin)}</small></div></div>
        </div>
      </div>
      <div className={styles.actions}><button type="button" className={styles.done} onClick={() => { interacted.current = true; setPlaying(false); setPhase("review"); }}>Done</button></div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{message}</p>
  </div>;
}
