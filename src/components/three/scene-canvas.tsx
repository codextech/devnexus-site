"use client";

import { Canvas } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  camera?: ComponentProps<typeof Canvas>["camera"];
  className?: string;
};

/**
 * Shared R3F canvas wrapper. Rendering pauses when the canvas scrolls offscreen
 * or the tab is hidden, so idle scenes cost no GPU. Transparent (alpha) so the
 * surface behind it shows through.
 */
export function SceneCanvas({ children, camera, className }: Props) {
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
    <div ref={ref} className={className ?? "absolute inset-0"}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 2]}
        camera={camera ?? { position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        {children}
      </Canvas>
    </div>
  );
}
