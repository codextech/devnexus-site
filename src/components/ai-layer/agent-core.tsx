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
 * AI-layer centerpiece. With WebGL + motion allowed → a live 3D "agent core"
 * orchestrating orbiting tool nodes. Under reduced-motion / no-WebGL / SSR →
 * the existing labeled flow diagram (Your stack → Agent → Outcome), so the
 * narrative is never lost for accessibility.
 */
export function AgentCore() {
  const { enabled, isMobile } = use3DCapabilities();

  if (!enabled) return <AgentDiagram className="w-full" />;

  return (
    <div className="relative aspect-[5/4] w-full">
      <AgentCoreCanvas nodes={isMobile ? 4 : 6} />
    </div>
  );
}
