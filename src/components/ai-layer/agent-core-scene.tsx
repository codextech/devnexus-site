"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLUE = new THREE.Color("#02A9F7");
const CYAN = new THREE.Color("#22d3ee");
const ORIGIN = new Float32Array([0, 0, 0]);

// Tool nodes wrap the central agent core on an even (Fibonacci) sphere; each is
// linked to the core, and a data-pulse travels along that link toward the core
// (data flowing into the agent). The group rotates rigidly, so links stay valid.
function buildCore(nodes: number) {
  const tools: THREE.Vector3[] = [];
  const radius = 2.2;
  const golden = Math.PI * (1 + Math.sqrt(5));
  for (let i = 0; i < nodes; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / nodes);
    const theta = golden * (i + 0.5);
    tools.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      ),
    );
  }
  const linePoints = new Float32Array(nodes * 2 * 3);
  const toolPoints = new Float32Array(nodes * 3);
  tools.forEach((t, i) => {
    linePoints.set([0, 0, 0, t.x, t.y, t.z], i * 6);
    toolPoints.set([t.x, t.y, t.z], i * 3);
  });
  return { tools, linePoints, toolPoints };
}

export function AgentCoreScene({ nodes = 6 }: { nodes?: number }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);

  const { tools, linePoints, toolPoints } = useMemo(
    () => buildCore(nodes),
    [nodes],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.12;
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.2, 0.04);
      g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.3, 0.04);
    }

    const c = core.current;
    if (c) {
      c.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06); // gentle breathing
      c.rotation.y += delta * 0.4;
      c.rotation.x += delta * 0.18;
    }

    // Pulses travel from each tool node toward the core (phase 0→1).
    for (let i = 0; i < tools.length; i++) {
      const m = pulses.current[i];
      if (!m) continue;
      const phase = (t * 0.6 + i / tools.length) % 1;
      m.position.set(
        tools[i].x * (1 - phase),
        tools[i].y * (1 - phase),
        tools[i].z * (1 - phase),
      );
    }
  });

  return (
    <group ref={group}>
      {/* Agent core — rotating wireframe + bright additive center */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.5} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ORIGIN, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.55}
          color={CYAN}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Links core → tools */}
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

      {/* Tool nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[toolPoints, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.24}
          color={BLUE}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Data pulses flowing toward the core (one small mesh per link) */}
      {tools.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            pulses.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.075, 8, 8]} />
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
