// Client-side instrumentation: runs once in the browser before the app hydrates.
// Next.js automatically loads this file (see https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client).
import posthog from "posthog-js";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Only initialize when a key is configured. Local dev (and previews without the
// env var set) stay analytics-free instead of throwing or sending orphan events.
if (key) {
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    // Modern defaults: automatic pageview + pageleave capture via the History
    // API (works with App Router client-side navigation) and sane privacy.
    defaults: "2025-05-24",
  });
}
