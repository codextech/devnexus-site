"use client";

import { SceneCanvas } from "@/components/three/scene-canvas";
import { NeuralScene } from "./neural-scene";

/**
 * Client-only R3F canvas for the hero neural network. Default export so it can
 * be lazy-loaded via next/dynamic({ ssr: false }).
 */
export default function NeuralCanvas({ count }: { count: number }) {
  return (
    <SceneCanvas>
      <NeuralScene count={count} />
    </SceneCanvas>
  );
}
