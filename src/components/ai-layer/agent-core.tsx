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
 * AI-layer centerpiece. On a desktop pointer with WebGL + motion allowed → a
 * live, labeled, hover-interactive 3D "agent core" orchestrating your stack.
 * On touch / reduced-motion / no-WebGL / SSR → the labeled flow diagram
 * (Your stack → Agent → Outcome), which is clearer without hover and on small
 * screens. Either way the narrative is explicit and accessible.
 */
export function AgentCore() {
  const { enabled, isMobile } = use3DCapabilities();

  if (!enabled || isMobile) return <AgentDiagram className="w-full" />;

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[10px]">
      <AgentCoreCanvas />
    </div>
  );
}
