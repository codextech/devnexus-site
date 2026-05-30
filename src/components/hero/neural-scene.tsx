"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLUE = new THREE.Color("#02A9F7");
const CYAN = new THREE.Color("#22d3ee");

// Build a static network: node positions/colors + line segments between near
// neighbours. The whole cloud rotates as a rigid group, so connection distances
// stay constant and the line buffer is computed once (cheap per-frame cost).
function buildNetwork(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const pts: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 4,
    );
    pts.push(v);
    positions.set([v.x, v.y, v.z], i * 3);
    const c = BLUE.clone().lerp(CYAN, Math.random() * 0.55);
    colors.set([c.r, c.g, c.b], i * 3);
  }

  const segs: number[] = [];
  const threshold = 1.55;
  for (let i = 0; i < count; i++) {
    let links = 0;
    for (let j = i + 1; j < count && links < 3; j++) {
      if (pts[i].distanceTo(pts[j]) < threshold) {
        segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        links++;
      }
    }
  }

  return { positions, colors, lines: new Float32Array(segs) };
}

export function NeuralScene({ count = 140 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const { positions, colors, lines } = useMemo(
    () => buildNetwork(count),
    [count],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // Constant gentle drift.
    g.rotation.y += delta * 0.055;
    // Subtle parallax lean toward the pointer (eased).
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.22, 0.04);
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.45, 0.04);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={BLUE}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
