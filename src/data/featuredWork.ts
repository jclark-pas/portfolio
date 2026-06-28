import type { FeaturedWork } from "@/components/FeaturedWorkCard";

export const featuredWork: FeaturedWork[] = [
  {
    number: "01",
    eyebrow: "LivePlan · Forecast",
    title: "When the forecast met reality",
    description:
      "Bringing real accounting actuals into the forecast so owners could plan against reality — and the strategic story of why great craft didn't move churn, and where the real leverage was.",
    href: "/work/forecast",
    imageBackground:
      "linear-gradient(135deg, #1B3A5C 0%, #2C7DA0 45%, #E8743B 100%)",
    image: "/images/forecast/forecast-hero.png",
    imageWidth: 3096,
    imageHeight: 2016,
  },
  {
    number: "02",
    eyebrow: "LivePlan · Plan Editor",
    title: "Redesigning the Plan",
    description:
      "Reimagining a decade-old business plan editor — making it faster to write, easier to customize, and smarter with AI while maintaining the structure investors trust.",
    href: "/work/liveplan",
    imageBackground:
      "linear-gradient(135deg, #214E41 0%, #009660 35%, #6EAD59 65%, #FFCC50 100%)",
    image: "/images/liveplan/featured-plan-editor.png",
    imageWidth: 1749,
    imageHeight: 1366,
  },
  {
    number: "03",
    eyebrow: "LivePlan · Idea Canvas",
    title: "From Idea to Plan",
    description:
      "An AI-assisted canvas that helps entrepreneurs shape a fuzzy idea into a fundable plan — moving users from blank page to first draft in minutes.",
    href: "/work/idea-canvas",
    imageBackground:
      "linear-gradient(135deg, #6F4AC7 0%, #3B82C9 50%, #F26A5D 100%)",
    image: "/images/canvas/canvas-hero.png",
    imageWidth: 1399,
    imageHeight: 964,
    imageElevated: true,
  },
];

export const featuredSlugs = new Set(["forecast", "liveplan", "idea-canvas"]);
