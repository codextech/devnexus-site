"use client";

import { SceneCanvas } from "@/components/three/scene-canvas";
import { AgentCoreScene } from "./agent-core-scene";

/**
 * Client-only R3F canvas for the AI-layer agent core. Default export so it can
 * be lazy-loaded via next/dynamic({ ssr: false }). On mobile the camera pulls
 * back a touch so the labeled nodes have room to breathe.
 */
export default function AgentCoreCanvas({ mobile = false }: { mobile?: boolean }) {
  return (
    <SceneCanvas camera={{ position: [0, 0, mobile ? 7.4 : 6.5], fov: 45 }}>
      <AgentCoreScene compact={mobile} />
    </SceneCanvas>
  );
}
