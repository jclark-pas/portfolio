import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow a parallel dev server (e.g. a second Claude chat on the same working
  // tree) to use an isolated build cache so two `next dev` processes don't
  // fight over `.next/`. Defaults to `.next`, so normal runs are unaffected.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Prefer AVIF (≈20–30% smaller than WebP), fall back to WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
