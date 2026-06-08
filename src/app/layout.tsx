import type { Metadata } from "next";
import { Poppins, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-bricolage",
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
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=s||(d?'dark':'light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
