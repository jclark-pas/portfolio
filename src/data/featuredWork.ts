import type { FeaturedWork } from "@/components/FeaturedWorkCard";

export const featuredWork: FeaturedWork[] = [
  {
    number: "01",
    eyebrow: "LivePlan · Plan Editor",
    title: "Redesigning the Plan",
    description:
      "Reimagining a decade-old business plan editor — making it faster to write, easier to customize, and smarter with AI while maintaining the structure investors trust.",
    href: "/work/liveplan",
    imageBackground:
      "linear-gradient(135deg, #214E41 0%, #009660 35%, #6EAD59 65%, #FFCC50 100%)",
  },
  {
    number: "02",
    eyebrow: "LivePlan · Idea Canvas",
    title: "From Idea to Plan",
    description:
      "An AI-assisted canvas that helps entrepreneurs shape a fuzzy idea into a fundable plan — moving users from blank page to first draft in minutes.",
    href: "/work/idea-canvas",
    imageBackground:
      "linear-gradient(135deg, #6F4AC7 0%, #3B82C9 50%, #F26A5D 100%)",
  },
];

export const featuredSlugs = new Set(["liveplan", "idea-canvas"]);
