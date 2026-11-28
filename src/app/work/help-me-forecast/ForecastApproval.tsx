"use client";

import { useId, useState } from "react";
import { ArrowCounterClockwise, ArrowRight, At, User, Money, CheckCircle } from "@phosphor-icons/react";
import { mulish } from "./livePlanFont";
import shared from "./CostCalculator.module.css";
import styles from "./ForecastApproval.module.css";

const initialStreams = [
  { name: "Espresso drinks and specialty coffee", price: 5, volume: 300 },
  { name: "House-made pastries and baked goods", price: 4, volume: 90 },
  { name: "Bundled coffee-and-pastry combos", price: 8, volume: 45 },
  { name: "Seasonal themed treats", price: 4.5, volume: 30 },
];
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function ForecastApproval() {
  const id = useId();
  const streams = initialStreams;
  const [message, setMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [state, setState] = useState<"review" | "adjust" | "approved">("review");
  const weekly = streams.reduce((sum, stream) => sum + stream.price * stream.volume, 0);
  const annual = Math.round(weekly * 52);
  const totals = [annual, Math.round(annual * 1.1), Math.round(annual * 1.1 * 1.08)];
  const ceiling = Math.max(50000, Math.ceil(totals[2] / 50000) * 50000);
  const colors = ["#b99aee", "#9365df", "#652fd0"];

  return <div className={`${shared.example} ${styles.example} ${mulish.className}`}>
    <p className={styles.summary}>Four revenue streams for your café, starting at <strong>{money(weekly)} in a typical week</strong>. That’s {money(annual)} over a full year. The proposal assumes 10% growth in the second year, then 8% as your regular customer base settles in.</p>
      <ul className={styles.streams} aria-label="Proposed revenue streams">{streams.map(stream => <li key={stream.name}><Money size={18} weight="regular" aria-hidden="true" /><span>{stream.name}</span></li>)}</ul>
      <div className={styles.chart}>
        <h3>2026–2028 Revenue</h3>
        <svg viewBox="0 0 400 245" role="img" aria-labelledby={`${id}-chart-title ${id}-chart-description`}>
          <title id={`${id}-chart-title`}>Proposed annual café revenue</title>
          <desc id={`${id}-chart-description`}>{totals.map((total, i) => `${2026 + i}: ${money(total)}`).join(". ")}</desc>
          {[0, 1, 2, 3].map(tick => {
            const y = 207 - tick * 56;
            return <g key={tick}><text x="49" y={y + 4} textAnchor="end" className={styles.axis}>{tick === 0 ? "0" : `${Math.round(ceiling * tick / 3 / 1000)}k`}</text><line x1="60" x2="387" y1={y} y2={y} stroke="#dfe3e7" strokeDasharray="2 3" /></g>;
          })}
          {totals.map((total, index) => {
            const height = total / ceiling * 168;
            const x = 81 + index * 105;
            return <g key={index}><rect x={x} y={207 - height} width="66" height={height} rx="2" fill={colors[index]} /><text x={x + 33} y={197 - height} textAnchor="middle" className={styles.value}>{money(total)}</text><text x={x + 33} y="231" textAnchor="middle" className={styles.axis}>{2026 + index}</text></g>;
          })}
        </svg>
      </div>
      {state === "adjust" ? <div className={styles.adjustment}>
        <p className={styles.userMessage}>No, let’s make some adjustments.</p>
        <p className={styles.prompt}><strong>No problem.</strong> What changes would you like to make to your revenue?</p>
        {sentMessage && <p className={styles.userMessage}>{sentMessage}</p>}
        <div className={styles.composerFooter}>
        <form className={styles.composer} onSubmit={event => { event.preventDefault(); if (!message.trim()) return; setSentMessage(message.trim()); setMessage(""); }}>
          <span className={styles.avatar} aria-hidden="true"><User size={18} weight="regular" /></span>
          <label className="sr-only" htmlFor={`${id}-change`}>What changes would you like to make to your revenue?</label>
          <textarea id={`${id}-change`} autoFocus rows={1} placeholder="Write a message…" value={message} onChange={event => setMessage(event.target.value)} />
          <At className={styles.mention} size={21} weight="regular" aria-hidden="true" />
          <button type="submit" aria-label="Send change request" disabled={!message.trim()}><ArrowRight size={21} weight="regular" aria-hidden="true" /></button>
        </form>
        </div>
        <span className="sr-only" role="status">{sentMessage ? "Change request added to the example conversation. The forecast has not been changed." : ""}</span>
      </div> : state === "review" ? <div className={styles.review}>
        <p>Does this look right?</p>
        <div className={styles.choices}>
          <button type="button" className={shared.done} onClick={() => setState("approved")}>Yes, looks right</button>
          <button type="button" className={styles.secondary} onClick={() => setState("adjust")}>No, make adjustments</button>
        </div>
      </div> : <div className={styles.confirmation} role="status">
        <p className={styles.reply}>Yes, looks right</p>
        <p><CheckCircle size={20} weight="regular" aria-hidden="true" /><strong>Revenue added to your forecast.</strong></p>
        <p>You can keep editing these entries in Forecast. Next, we’ll work through the costs of making what you sell.</p>
        <button type="button" className={styles.replay} onClick={() => { setMessage(""); setSentMessage(""); setState("review"); }}><ArrowCounterClockwise size={16} weight="regular" aria-hidden="true" />Replay</button>
      </div>}
  </div>;
}
