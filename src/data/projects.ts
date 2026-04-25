import type { ThumbnailData } from "@/components/ProjectThumbnail";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  color: string;
  thumbnail: string;
  thumbnailData?: ThumbnailData;
  heroImage: string;
  roles: string[];
  whatIDid: string;
  highlights: {
    title: string;
    description: string;
    image?: string;
  }[];
  testimonial?: {
    quote: string;
    name: string;
    title: string;
  };
  sections: {
    title: string;
    description: string;
    image?: string;
  }[];
  prevSlug: string;
  nextSlug: string;
  prevTitle: string;
  nextTitle: string;
}

export const projects: Project[] = [
  {
    slug: "liveplan",
    title: "LivePlan",
    tagline: "Helping small businesses forecast a better future",
    description:
      "The world\u2019s most-used business planning and financial forecasting tool for small businesses",
    color: "#0364D3",
    thumbnail: "/images/thumb-liveplan.png",
    thumbnailData: {
      background:
        "linear-gradient(180deg, rgba(33,78,65,1) 0%, rgba(0,150,96,1) 30.5%, rgba(110,173,89,1) 62.5%, rgba(255,204,80,1) 100%)",
      logo: {
        src: "/projects/liveplan/logo.svg",
        left: "33.45%",
        top: "10.10%",
        width: "33.10%",
        height: "11.62%",
        hoverTransform: "scale(1.064)",
      },
      overlays: [
        {
          src: "/projects/liveplan/overlay-left.png",
          left: "7.57%",
          top: "81.31%",
          width: "26.76%",
          height: "61.36%",
          hoverTransform: "translate(-14.47%, -14.61%) scale(1.066)",
        },
        {
          src: "/projects/liveplan/overlay-center.png",
          left: "26.06%",
          top: "65.66%",
          width: "57.22%",
          height: "82.07%",
          radius: "2px",
          shadow: true,
          hoverTransform: "translate(-3.08%, -11.08%) scale(1.0615)",
        },
        {
          src: "/projects/liveplan/overlay-right.png",
          left: "56.51%",
          top: "91.41%",
          width: "35.74%",
          height: "51.77%",
          shadow: true,
          hoverTransform: "translate(-1.23%, -16.59%) scale(1.064)",
        },
      ],
    },
    heroImage: "/images/liveplan/hero.png",
    roles: [
      "Product Design",
      "Branding",
      "Front-End Development",
      "Product Strategy",
      "Research",
    ],
    whatIDid:
      "LivePlan is the most popular business-planning and financial forecasting software for small businesses.\n\nI\u2019ve helped bring LivePlan into its next decade of growth, including a full redesign, rebranding, and feature design focused on helping planners become better business managers.",
    highlights: [
      {
        title: "LivePlan Assistant",
        description:
          "When GPT4 was announced we made a full pivot to its integration into our planning tools. The result was a highly successful Help me write, and rewrite tool that helps business planners get to a working plan faster.",
        image: "/images/liveplan/assistant.png",
      },
      {
        title: "Brand refresh",
        description:
          'The 10 year old brand needed a refresh. I led a brand refresh, culminating with a new logo, and supporting \u201CEvergreen\u201D Design System that has been implemented across sales, marketing, and engagement channels, and the product.',
      },
    ],
    testimonial: {
      quote:
        "\u201CJosh is one of those designers who really \u2018gets\u2019 the development process. He\u2019s not just focused on making things look pretty; he collaborates with devs early on to balance the ideal user experience with real technical constraints.\u201D",
      name: "Haley Whitman",
      title: "Senior Software Engineer for LivePlan",
    },
    sections: [
      {
        title: "Forecast Builder",
        description:
          "Users with accounting data often have all the pieces they need to build a quick and easy forecast for their business. We worked out a way for users to get their accounting data from Quickbooks or Xero into LivePlan as a starting forecast, thus reducing the time it takes to get a working forecast.",
        image: "/images/liveplan/forecast-detail.png",
      },
      {
        title: "Forecast Overview",
        description:
          "A business forecast has many component parts \u2014 revenue, expenses, direct costs, assets, financing, cash assumptions, etc. While financial statements like Profit & Loss, Balance Sheets, and Cash Flow have the information needed by businesses to operate, they can often be overwhelming and difficult to digest.",
        image: "/images/liveplan/forecast-overview.png",
      },
      {
        title: "Monthly Review",
        description:
          "We\u2019re working on making it easier for small business owners to do a quick monthly financial review. Focusing on revenue, expenses, profit, and cash, we\u2019ve implemented an AI analysis of their month and year to date financials \u2014 including suggestions for next steps.",
        image: "/images/liveplan/monthly-review.png",
      },
      {
        title: "A guided path for business planning",
        description:
          "Writing a business plan and creating a forecast is a complicated, non-circuitous process. Users needed a way to track their progress and break their work into smaller meaningful steps. We designed the guide to help users understand the journeys they would go on while working on their business plan.",
      },
    ],
    prevSlug: "qlarity",
    nextSlug: "idea-canvas",
    prevTitle: "Qlarity",
    nextTitle: "Idea Canvas",
  },
  {
    slug: "idea-canvas",
    title: "Idea Canvas",
    tagline: "AI-powered idea validation for early-stage entrepreneurs",
    description:
      "An AI-powered idea validation tool that helps early-stage entrepreneurs test and refine their business assumptions before committing to a full business plan.",
    color: "#1B7A7A",
    thumbnail: "/images/thumb-idea-canvas.png",
    heroImage: "/images/idea-canvas/hero.png",
    roles: ["Product Design", "User Research", "Product Strategy"],
    whatIDid:
      "I designed Idea Canvas \u2014 an AI-powered idea validation tool for LivePlan that helps early-stage entrepreneurs test and refine their business assumptions before committing to a full business plan.\n\nTransforming LivePlan from an execution tool into a discovery platform, the canvas uses AI-powered evidence analysis to help founders determine whether their assumptions have legs \u2014 and suggests concrete pivots when they don\u2019t.",
    highlights: [
      {
        title: "AI-Powered Evidence Analysis",
        description:
          "Each assumption gets instant AI analysis, rating the strength of supporting evidence from strong to weak \u2014 backed by research papers, market data, and community sentiment.",
        image: "/images/idea-canvas/evidence.png",
      },
      {
        title: "The Pivot Engine",
        description:
          "When evidence is weak, the AI suggests concrete alternatives. 70% of users replace their original assumptions with AI suggestions \u2014 validating AI as a collaborative partner, not just a critic.",
        image: "/images/idea-canvas/pivot.png",
      },
    ],
    sections: [
      {
        title: "Idea Check",
        description:
          "A holistic confidence score evaluates the entire business \u2014 examining market size, revenue model, regulatory risks, competition, and fatal flaws \u2014 producing a score with specific pivot suggestions to adjacent opportunities.",
        image: "/images/idea-canvas/idea-check.png",
      },
      {
        title: "A framework for every founder",
        description:
          "Built on the Lean Canvas framework to map cleanly to LivePlan\u2019s business plan template, with framework-agnostic architecture for education partners who prefer BMC or other outlines.",
      },
    ],
    prevSlug: "liveplan",
    nextSlug: "ktek",
    prevTitle: "LivePlan",
    nextTitle: "KinderTek",
  },
  {
    slug: "ktek",
    title: "KinderTek",
    tagline: "An assessment system for Kindergartners learning math",
    description:
      "An evidence-based learning and assessment system to help Kindergartners master common core math skills independently.",
    color: "#2D6A4F",
    thumbnail: "/images/thumb-ktek.png",
    heroImage: "/images/ktek/hero.png",
    roles: [
      "Product Design",
      "Art Direction",
      "Game design",
      "Research",
      "Go-to market strategy",
    ],
    whatIDid:
      "Helping bring educational research to market.\n\nWhile at Concentric Sky (now part of Instructure) I led design and strategy for an innovative math platform for kindergartners called KTEK. This was a project with the Center for Teaching & Learning (CTL) at the University of Oregon, funded by an Education Department grant.",
    highlights: [
      {
        title: "Design for engagement and remediation",
        description:
          "Since we were designing for young children, KTEK had to feel more like a game. We employed game design practices including a beautiful safari-based theme, intermittent rewards, audio instruction, and a head-up display for users to track their reward progress.",
        image: "/images/ktek/engagement.png",
      },
      {
        title: "Model, Lead, Test",
        description:
          "We integrated the research from CTL to build a sequenced and recursive workflow that adapted to a students\u2019 exhibited mastery of common core standards so they learned at a pace just right for them.",
        image: "/images/ktek/model-lead-test.png",
      },
    ],
    sections: [
      {
        title: "A rewards system to keep students motivated",
        description:
          "I designed a rewards system algorithm and UI/UX based on time to answer, learning stage, accuracy, and a built-in attempt handicap that progressively diminished as users engaged more and more with the app. The result was an intermittent reward experience for students that makes KTEK enjoyable and challenging.",
      },
      {
        title: "A fully functioning Teacher app",
        description:
          "I designed a native iPad OS app for teachers (and a web-based portal for schools and districts). One interesting problem to solve working with young students was how to handle passwords. We tried a lot of things, but ended up auto-generating passcodes for users based on the fun characters inside KTEK.",
        image: "/images/ktek/teacher-app.png",
      },
    ],
    prevSlug: "idea-canvas",
    nextSlug: "learningwrite",
    prevTitle: "Idea Canvas",
    nextTitle: "LearningWrite",
  },
  {
    slug: "learningwrite",
    title: "LearningWrite",
    tagline: "Automatic writing assessment evaluation for language learning",
    description:
      "A learning and assessment platform to make it easier for teachers to assign writing exercises to language learners.",
    color: "#7B2D8E",
    thumbnail: "/images/thumb-learningwrite.png",
    heroImage: "/images/learningwrite/hero.png",
    roles: ["Product Design", "User research", "Branding"],
    whatIDid:
      "While at Twenty Ideas, I worked on LearningWrite \u2014 an online assessment and practice tool for language learning. Free-form written assessments are some of the hardest types of assignments to assess in an automated system (especially before LLMs). This puts a burden on instructors to manually grade every assignment.",
    highlights: [
      {
        title: "Delightful design to keep students writing",
        description:
          "One challenge with free-writing responses for students is to get a large enough response to adequately assess mastery. I created simple animations that helped to encourage users to keep writing.",
        image: "/images/learningwrite/writing.png",
      },
      {
        title: "Assignment management",
        description:
          "We created an assignment management system so instructors can easily find and preview available prompts, create assignment details and review student completion rates and results.",
        image: "/images/learningwrite/assignment.png",
      },
    ],
    sections: [
      {
        title: "In-classroom research",
        description:
          "As a part of my work on LearningWrite I did in-class pilot programs with teachers and students to iterate on designs, understand user needs and pain points, and to evaluate requirements for product market fit.",
        image: "/images/learningwrite/research.png",
      },
      {
        title: "Role management ecosystem",
        description:
          "Ed tech tools need to work for all of a school\u2019s users. The LearningWrite platform offers specialized portals for students, teachers, administrators, and content managers, designed to meet the unique and overlapping needs of each role.",
        image: "/images/learningwrite/roles.png",
      },
    ],
    prevSlug: "ktek",
    nextSlug: "nulia",
    prevTitle: "KinderTek",
    nextTitle: "Nulia",
  },
  {
    slug: "nulia",
    title: "Nulia",
    tagline: "Learning in action.",
    description:
      "I helped Nulia perfect a platform that provides Office 365 users with personalized guidance for enhancing workplace productivity and success.",
    color: "#1A285F",
    thumbnail: "/images/thumb-nulia.png",
    heroImage: "/images/nulia/hero.png",
    roles: ["Product Design", "Art Direction", "Product Strategy", "Research"],
    whatIDid:
      "Nulia\u2019s innovative competency management platform helps companies unlock the full value of Microsoft 365.\n\nI worked as Product Designer at Nulia designing the end-user platform and partner portals.",
    highlights: [
      {
        title: "Full accessibility audit",
        description:
          "While with Nulia, I did a full accessibility audit of the platform, working with partners to ensure WCAG 2.1 AA compliance enabling us to close deals with EU and US institutions.",
        image: "/images/nulia/accessibility.png",
      },
      {
        title: "Microsoft Teams App",
        description:
          "Nulia was one of the first apps in the Microsoft Teams app directory and was featured as a highlighted app by Microsoft when released.",
      },
    ],
    sections: [
      {
        title: "User Portal",
        description:
          "We built a user portal for end-users to track their progress towards learning outcomes in Microsoft 365 products. Focused on rewards, multi-modal learning opportunities, and visual systems that showed multiple levels of mastery.",
        image: "/images/nulia/user-portal.png",
      },
      {
        title: "Partner Portal",
        description:
          "We designed a full admin interface for partners and re-sellers to manage their client licenses, and see opportunities for increased sales.",
        image: "/images/nulia/partner-portal.png",
      },
      {
        title: "Manager Insights",
        description:
          "Managers & supervisors needed a way to understand utilization of the Nulia licenses and progress toward mastery of Microsoft 365 learning outcomes.",
        image: "/images/nulia/manager-insights.png",
      },
    ],
    prevSlug: "learningwrite",
    nextSlug: "intrevent",
    prevTitle: "LearningWrite",
    nextTitle: "Intrevent",
  },
  {
    slug: "intrevent",
    title: "Intrevent",
    tagline: "Planning, for any event.",
    description:
      "Event management startup Intrevent, Inc. was on a mission to create a platform to unify all scheduling, communication, payment, and other organizing functions into a single, time-saving tool.",
    color: "#C44536",
    thumbnail: "/images/thumb-intrevent.png",
    heroImage: "/images/intrevent/hero.png",
    roles: ["Product Design", "Art Direction", "Product Strategy", "Research"],
    whatIDid:
      "Intrevent makes managing events easier by organizing teams, tasks, logistics, vendors, venues and more \u2014 all in one place.\n\nWhile at Twenty Ideas, I helped the start-up, Intrevent, successfully launch a product to make it easier to manage the logistics of event planning. I provided Art Direction, UX design, and product strategy.",
    highlights: [
      {
        title: "Branding from the ground up",
        description:
          'We developed a brand for Intrevent that focused on clean modern design, an emphasis on the embedded word \u201Cevent\u201D, and an invitation to the table. The result was a modern, clean mark with fun supportive elements.',
        image: "/images/intrevent/branding-3.png",
      },
    ],
    sections: [],
    prevSlug: "nulia",
    nextSlug: "qlarity",
    prevTitle: "Nulia",
    nextTitle: "Qlarity",
  },
  {
    slug: "qlarity",
    title: "Qlarity",
    tagline: "Mindfulness to reduce adolescent substance use",
    description:
      "I helped researchers at Oregon Research Institute design an app that helps adolescents with substance abuse through evidence-based mindfulness practices.",
    color: "#4A6741",
    thumbnail: "/images/thumb-qlarity.png",
    heroImage: "/images/qlarity/hero.png",
    roles: ["Product Design", "Art Direction", "Product Strategy", "Research"],
    whatIDid:
      "Remaking guided meditation to fight teen addiction.\n\nEarly intervention can have life-changing consequences for young drug and alcohol users, but few available resources address the unique challenges young people face in their recovery efforts.",
    highlights: [
      {
        title: "On-the-go retreat",
        description:
          "Qlarity is designed to be a calming and private sanctuary users can access any time they encounter triggering situations in the real world.",
        image: "/images/qlarity/on-the-go.png",
      },
      {
        title: "Designing real-life help for a virtual medium",
        description:
          "We worked with the Influents research team to pinpoint the ways in which most substance abuse programs don\u2019t align with the needs of young people. Then, we translated the core components of these interventions into a format, look, and feel tailored to fit naturally into the lives of recovering adolescents.",
        image: "/images/qlarity/real-life-help.png",
      },
    ],
    sections: [
      {
        title: "Designed for peace of mind",
        description:
          "We built mindfulness into the structure and function of Qlarity to create a centering experience from first tap. Stress-relieving aesthetic uses color, imagery, and layout to create a quiet, distraction-free, and intimate environment to encourage disclosure, reflection, and meditation.",
        image: "/images/qlarity/peace-of-mind.png",
      },
      {
        title: "Screening for stress",
        description:
          "Value and mood surveys incorporate emotional imagery to help young users sort through complicated feelings and identify how avoiding substance abuse will benefit the aspects of their life they care about most.",
        image: "/images/qlarity/screening.png",
      },
      {
        title: "Therapeutic UX",
        description:
          "Guided meditation exercises offer relatable support from the perspective of a trusted confidant who genuinely understands the user\u2019s experiences and feelings.",
        image: "/images/qlarity/therapeutic.png",
      },
    ],
    prevSlug: "intrevent",
    nextSlug: "liveplan",
    prevTitle: "Intrevent",
    nextTitle: "LivePlan",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
