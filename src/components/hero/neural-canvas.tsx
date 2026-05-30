"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { NeuralScene } from "./neural-scene";

/**
 * Client-only R3F canvas for the hero neural network. Default export so it can
 * be lazy-loaded via next/dynamic({ ssr: false }). Rendering pauses when the
 * canvas scrolls offscreen or the tab is hidden, to avoid wasted GPU work.
 */
export default function NeuralCanvas({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const active = inView && tabVisible;

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <NeuralScene count={count} />
      </Canvas>
    </div>
  );
}
