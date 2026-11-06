import type { ThumbnailData } from "@/components/ProjectThumbnail";

// Side projects with a live site of their own. Each card links out instead
// of to a case study. Thumbnails are composed the same way as the work cards:
// a background, a logo, and screenshots placed as percentages of the box.
// Their alts are empty on purpose: the whole card is one link, and its text
// already names the site.
export interface PersonalProject {
  title: string;
  description: string;
  /** the live site */
  href: string;
  platforms: string;
  thumbnail: ThumbnailData;
}

export const personalProjects: PersonalProject[] = [
  {
    title: "Plannery",
    description:
      "A group trip planner for the person who always ends up planning it. Real city guides, a day-by-day itinerary with travel times that add up, voting for the group, and AI that proposes changes for you to approve.",
    href: "https://www.getplannery.com",
    platforms: "Web and iOS",
    thumbnail: {
      background: "linear-gradient(160deg, #F3F3E9 0%, #ECEFE2 60%, #DDE7D6 100%)",
      logo: {
        src: "/projects/personal/plannery-lockup.png",
        alt: "",
        left: "33%",
        top: "9%",
        width: "34%",
        height: "10.9%",
        hoverTransform: "scale(1.04)",
      },
      // the web app in the back, the phone in front: it runs in both
      overlays: [
        {
          src: "/projects/personal/plannery-web.jpg",
          alt: "",
          left: "7%",
          top: "29%",
          width: "74%",
          height: "79.6%",
          radius: "6px",
          shadow: true,
          hoverTransform: "translateY(-4%) scale(1.02)",
        },
        {
          src: "/projects/personal/plannery-01.png",
          alt: "",
          left: "68%",
          top: "40%",
          width: "25%",
          height: "63.2%",
          shadow: true,
          hoverTransform: "translateY(-8%) scale(1.03)",
        },
      ],
    },
  },
  {
    title: "PurplePain",
    description:
      "A private pain journal for iPhone and Apple Watch. Four check-ins a day on a cool-to-hot scale, logged beside sleep, mood, activity and weather, with a calendar and trends that show what moves together. Everything stays on the phone.",
    href: "https://purplepain.app",
    platforms: "iOS and watchOS",
    thumbnail: {
      background: "linear-gradient(160deg, #1B0A33 0%, #3B1680 55%, #120A1F 100%)",
      logo: {
        src: "/projects/personal/purplepain-logo.png",
        alt: "",
        left: "28%",
        top: "7%",
        width: "44%",
        height: "31%",
        hoverTransform: "scale(1.04)",
      },
      overlays: [
        {
          src: "/projects/personal/purplepain-trends.jpg",
          alt: "",
          left: "17%",
          top: "46%",
          width: "28%",
          height: "87%",
          radius: "14px",
          shadow: true,
          hoverTransform: "translateY(-5%) scale(1.03)",
        },
        {
          src: "/projects/personal/purplepain-today.jpg",
          alt: "",
          left: "55%",
          top: "40%",
          width: "28%",
          height: "87%",
          radius: "14px",
          shadow: true,
          hoverTransform: "translateY(-7%) scale(1.03)",
        },
      ],
    },
  },
];
