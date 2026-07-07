export type TimelineRole = {
  company: string;
  role: string;
  dates: string;
  /** One-line outcome — the reason this role matters, not a bullet dump. */
  outcome: string;
  focusAreas: string[];
  cta?: { href: string; label: string }[];
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
    focusAreas: ["Financial UX", "AI Product Design", "Design Systems"],
    cta: [
      { href: "/work/liveplan", label: "Redesigning the Plan" },
      { href: "/work/idea-canvas", label: "Idea Canvas" },
    ],
    current: true,
  },
  {
    company: "Nulia",
    role: "Senior Product Designer",
    dates: "2020 — 2021",
    outcome:
      "Overhauled the UI/UX and drove WCAG 2.1 AA compliance — unlocking a global release and government/institutional sales.",
    focusAreas: ["Accessibility", "Design Systems", "Global UX"],
    cta: [{ href: "/work/nulia", label: "Nulia" }],
  },
  {
    company: "Twenty Ideas",
    role: "Design Director",
    dates: "2017 — 2019",
    outcome:
      "Built the design team from scratch and helped grow the company 8 → 24 while shipping a dozen web and mobile products.",
    focusAreas: ["Design Leadership", "Hiring & Mentorship", "Team Building"],
    cta: [
      { href: "/work/qlarity", label: "Qlarity" },
      { href: "/work/intrevent", label: "Intrevent" },
      { href: "/work/learningwrite", label: "LearningWrite" },
    ],
  },
  {
    company: "Concentric Sky",
    role: "Senior UI/UX Designer",
    dates: "2012 — 2017",
    outcome:
      "Principal expert on customer insight across education, healthcare, and public services — the agency’s highest profitability and account longevity.",
    focusAreas: ["User Research", "Product Discovery", "UX/UI Design"],
    cta: [{ href: "/work/ktek", label: "KinderTek" }],
  },
  {
    company: "Earlier",
    role: "Product & Marketing Design",
    dates: "2003 — 2012",
    outcome:
      "Product Designer at Concentric Sky, Lead Marketing Designer at Palo Alto Software, and owner of Origen Creatives — where the craft started.",
    focusAreas: ["Craft", "Client Work", "Foundations"],
  },
];
