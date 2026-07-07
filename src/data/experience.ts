export type TimelineRole = {
  company: string;
  role: string;
  dates: string;
  /** One-line outcome — the reason this role matters, not a bullet dump. */
  outcome: string;
  /** Marks the current role so the timeline can badge it "Now". */
  current?: boolean;
};

/**
 * Newest-first: the leftmost (current) role is visible without scrolling on a
 * portfolio, and scrolling right walks back through the arc. Sourced here once
 * so the timeline, the résumé PDF, and any future views stay in sync.
 */
export const timelineRoles: TimelineRole[] = [
  {
    company: "Palo Alto Software",
    role: "Staff Product Designer, LivePlan",
    dates: "2021 — Now",
    outcome:
      "Led a ground-up redesign of LivePlan’s decade-old plan editor — early churn down 25%, collaborative comments up 63%.",
    current: true,
  },
  {
    company: "Nulia",
    role: "Senior Product Designer",
    dates: "2020 — 2021",
    outcome:
      "Overhauled the UI/UX and drove WCAG 2.1 AA compliance — unlocking a global release and government/institutional sales.",
  },
  {
    company: "Twenty Ideas",
    role: "Design Director",
    dates: "2017 — 2019",
    outcome:
      "Built the design team from scratch and helped grow the company 8 → 24 while shipping a dozen web and mobile products.",
  },
  {
    company: "Concentric Sky",
    role: "Senior UI/UX Designer",
    dates: "2012 — 2017",
    outcome:
      "Principal expert on customer insight across education, healthcare, and public services — the agency’s highest profitability and account longevity.",
  },
  {
    company: "Earlier",
    role: "Product & Marketing Design",
    dates: "2003 — 2012",
    outcome:
      "Product Designer at Concentric Sky, Lead Marketing Designer at Palo Alto Software, and owner of Origen Creatives — where the craft started.",
  },
];
