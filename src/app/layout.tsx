import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import "./globals.css";

// General Sans (Fontshare) — self-hosted variable font, primary typeface for
// headings and body. Matches GitBook's marketing type.
const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-general-sans",
});

// Geist Mono (Vercel) — self-hosted variable font, monospace for code and
// label accents.
const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-geist-mono",
});

const BRAND =
  "Josh Clark - Experienced Product Designer & Leader in Eugene, Oregon";

export const metadata: Metadata = {
  title: {
    default: BRAND,
    template: `%s | ${BRAND}`,
  },
  description: "Portfolio showcasing UX design work by Josh Clark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${generalSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=s||(d?'dark':'light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={generalSans.className}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
