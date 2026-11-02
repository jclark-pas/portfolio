"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { IconContext } from "@phosphor-icons/react";

// Default styling for every Phosphor icon in a Client Component: duotone weight
// and lucide's old 24px default size. Server Components don't read React context,
// so icons there import from "@phosphor-icons/react/dist/ssr" and set weight
// explicitly. Per-icon props still override these defaults.
const iconDefaults = { weight: "duotone" as const, size: 24 };

// Shares the PostHog instance (initialized in instrumentation-client.ts) with the
// React tree so components can use the `usePostHog()` hook to capture custom
// events, e.g. resume downloads or case-study CTA clicks.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <IconContext.Provider value={iconDefaults}>
        {children}
      </IconContext.Provider>
    </PostHogProvider>
  );
}
