"use client";

import dynamic from "next/dynamic";
import { AgentDiagram } from "@/components/blocks/agent-diagram";
import { use3DCapabilities } from "@/components/three/use-3d-capabilities";

// Lazy, client-only. The labeled flow diagram is the SSR / loading render too,
// so first paint is never blocked by WebGL.
const AgentCoreCanvas = dynamic(() => import("./agent-core-canvas"), {
  ssr: false,
  loading: () => <AgentDiagram className="w-full" />,
});

/**
 * AI-layer centerpiece. With WebGL + motion allowed → a live, labeled 3D "agent
 * core" orchestrating your stack (hover reveals details on desktop; labels are
 * always visible, so it's self-explanatory on touch too). On reduced-motion /
 * no-WebGL / SSR → the labeled flow diagram. A lighter layout is used on mobile.
 */
export function AgentCore() {
  const { enabled, isMobile } = use3DCapabilities();

  if (!enabled) return <AgentDiagram className="w-full" />;

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[10px] sm:aspect-[5/4]">
      <AgentCoreCanvas mobile={isMobile} />
    </div>
  );
}
