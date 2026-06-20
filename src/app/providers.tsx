"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Shares the PostHog instance (initialized in instrumentation-client.ts) with the
// React tree so components can use the `usePostHog()` hook to capture custom
// events, e.g. resume downloads or case-study CTA clicks.
export function Providers({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
