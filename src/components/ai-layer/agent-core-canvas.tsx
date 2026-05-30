"use client";

import { SceneCanvas } from "@/components/three/scene-canvas";
import { AgentCoreScene } from "./agent-core-scene";

/**
 * Client-only R3F canvas for the AI-layer agent core. Default export so it can
 * be lazy-loaded via next/dynamic({ ssr: false }).
 */
export default function AgentCoreCanvas({ nodes }: { nodes: number }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, 6.2], fov: 45 }}>
      <AgentCoreScene nodes={nodes} />
    </SceneCanvas>
  );
}
