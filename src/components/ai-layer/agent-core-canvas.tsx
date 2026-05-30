"use client";

import { SceneCanvas } from "@/components/three/scene-canvas";
import { AgentCoreScene } from "./agent-core-scene";

/**
 * Client-only R3F canvas for the AI-layer agent core. Default export so it can
 * be lazy-loaded via next/dynamic({ ssr: false }).
 */
export default function AgentCoreCanvas() {
  return (
    <SceneCanvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <AgentCoreScene />
    </SceneCanvas>
  );
}
