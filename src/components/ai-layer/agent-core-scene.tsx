"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const BLUE = new THREE.Color("#02A9F7");
const CYAN = new THREE.Color("#22d3ee");
const ORIGIN = new Float32Array([0, 0, 0]);

// The integrations an agent orchestrates — grounded in DevNexus's actual stack.
const INTEGRATIONS = [
  { label: "CRM", desc: "Reads & updates customer records" },
  { label: "Database", desc: "Queries your production data" },
  { label: "Voice AI", desc: "Handles calls — books & qualifies" },
  { label: "Docs · RAG", desc: "Retrieves context from your knowledge base" },
  { label: "Tools · APIs", desc: "Calls internal & third-party APIs" },
  { label: "Approvals", desc: "Escalates risky actions to a human" },
] as const;

const RADIUS = 1.9;

export function AgentCoreScene({ compact = false }: { compact?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  // Hub-and-spoke layout: nodes ring the core in the view plane (readable for
  // labels) with subtle z-depth so it still reads as 3D under parallax.
  const layout = useMemo(() => {
    const n = INTEGRATIONS.length;
    return INTEGRATIONS.map((it, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2; // start at top
      const z = Math.sin(i * 1.7) * 0.5;
      const pos = new THREE.Vector3(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, z);
      return { ...it, pos, labelPos: pos.clone().multiplyScalar(1.1) };
    });
  }, []);

  const linePoints = useMemo(() => {
    const arr = new Float32Array(layout.length * 2 * 3);
    layout.forEach((node, i) => {
      arr.set([0, 0, 0, node.pos.x, node.pos.y, node.pos.z], i * 6);
    });
    return arr;
  }, [layout]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    const g = group.current;
    if (g) {
      // Gentle parallax tilt toward the pointer — no full spin, so labels stay
      // readable. Eases back to rest when the pointer leaves.
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.18, 0.05);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.25, 0.05);
    }

    const c = core.current;
    if (c) {
      c.scale.setScalar(1 + Math.sin(t * 1.6) * 0.05); // breathing
      c.rotation.y += delta * 0.35;
      c.rotation.x += delta * 0.15;
    }

    // Data pulses travel from each node toward the core (data flowing in).
    for (let i = 0; i < layout.length; i++) {
      const m = pulses.current[i];
      if (!m) continue;
      const phase = (t * 0.55 + i / layout.length) % 1;
      const p = layout[i].pos;
      m.position.set(p.x * (1 - phase), p.y * (1 - phase), p.z * (1 - phase));
    }
  });

  return (
    <group ref={group}>
      {/* Agent core — wireframe brain + bright additive center + label badge */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.5} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ORIGIN, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color={CYAN}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <Html position={[0, 0, 0]} center zIndexRange={[20, 0]}>
        <div className="pointer-events-none select-none whitespace-nowrap rounded-full border border-blue/50 bg-bg/80 px-3 py-1.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-blue backdrop-blur">
          AI Agent
          <span className="mt-0.5 block text-[9px] tracking-[0.1em] text-fg-faint">
            reasons · decides · acts
          </span>
        </div>
      </Html>

      {/* Links core → integrations */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePoints, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={BLUE}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Integration nodes — each labeled + hover-to-reveal */}
      {layout.map((node, i) => {
        const isHot = hovered === i;
        return (
          <group key={node.label}>
            <mesh
              position={node.pos}
              scale={isHot ? 1.5 : 1}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(i);
              }}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial
                color={isHot ? CYAN : BLUE}
                transparent
                opacity={isHot ? 1 : 0.85}
                toneMapped={false}
              />
            </mesh>
            <Html position={node.labelPos} center zIndexRange={[15, 0]}>
              {/* Decorative: the accessible narrative lives in the diagram
                  fallback. Hover (mouse only) reveals the description. */}
              <div
                aria-hidden="true"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`flex flex-col items-center gap-0.5 rounded-[10px] border text-center backdrop-blur transition-colors ${
                  compact ? "px-2 py-0.5" : "px-2.5 py-1"
                } ${isHot ? "max-w-[176px]" : "max-w-[150px]"} ${
                  isHot
                    ? "border-blue/60 bg-bg/90 text-blue"
                    : "border-blue/20 bg-bg/70 text-fg"
                }`}
              >
                <span
                  className={`whitespace-nowrap font-mono uppercase tracking-[0.12em] ${
                    compact ? "text-[9px]" : "text-[10px]"
                  }`}
                >
                  {node.label}
                </span>
                {isHot ? (
                  <span className="text-[10px] leading-snug text-fg-muted">
                    {node.desc}
                  </span>
                ) : null}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Data pulses */}
      {layout.map((node, i) => (
        <mesh
          key={`pulse-${node.label}`}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial
            color={CYAN}
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
