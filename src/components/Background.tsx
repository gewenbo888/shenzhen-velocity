"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Recursive perspective grid floor — the "highway"
function HighwayFloor() {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const W = 50, D = 80;
    const pts: number[] = [];
    const cols: number[] = [];
    // longitudinal lines (lanes)
    for (let i = -W; i <= W; i += 3) {
      pts.push(i, 0, -D, i, 0, D);
      // closer to center = brighter magenta; outer = cyan
      const v = 1 - Math.min(1, Math.abs(i) / W);
      cols.push(1 * v + 0 * (1 - v), 0.18 * v + 0.6 * (1 - v), 0.55 * v + 1 * (1 - v),
                1 * v + 0 * (1 - v), 0.18 * v + 0.6 * (1 - v), 0.55 * v + 1 * (1 - v));
    }
    // transverse lines (chevrons) — these animate via z-position
    for (let z = -D; z <= D; z += 5) {
      pts.push(-W, 0, z, W, 0, z);
      cols.push(0, 0.65, 1, 0, 0.65, 1);
    }
    return {
      positions: new Float32Array(pts),
      colors: new Float32Array(cols),
    };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // scroll the floor "toward camera" by translating z
    ref.current.position.z = (ref.current.position.z + delta * 14) % 5;
  });

  return (
    <lineSegments ref={ref} rotation={[-Math.PI / 2.3, 0, 0]} position={[0, -6, 4]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.55} depthWrite={false} />
    </lineSegments>
  );
}

// City skyline silhouette (low-poly box towers)
function Skyline() {
  const ref = useRef<THREE.Group>(null);
  const towers = useMemo(() => {
    const out: { x: number; y: number; z: number; w: number; h: number; color: string }[] = [];
    const palette = ["#ff2d8d", "#00f0ff", "#9b80ff", "#d8ff3a"];
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = -25 - Math.random() * 30;
      const w = 1 + Math.random() * 3;
      const h = 5 + Math.random() * 22;
      out.push({ x, y: h / 2 - 6, z, w, h, color: palette[i % palette.length] });
    }
    return out;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.02) * 0.06;
  });
  return (
    <group ref={ref}>
      {towers.map((t, i) => (
        <mesh key={i} position={[t.x, t.y, t.z]}>
          <boxGeometry args={[t.w, t.h, t.w]} />
          <meshBasicMaterial
            color={t.color}
            transparent
            opacity={0.18}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Streaking lights (headlights of distant cars)
function LightStreaks() {
  const ref = useRef<THREE.Points>(null);
  const { positions, velocities } = useMemo(() => {
    const N = 50;
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = -5.5 + Math.random() * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
      vel[i] = 8 + Math.random() * 14;
    }
    return { positions: pos, velocities: vel };
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const p = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      let z = p.getZ(i);
      z += delta * velocities[i];
      if (z > 35) z = -35;
      p.setZ(i, z);
    }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#ff79b3" size={0.35} transparent opacity={0.95} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, rgba(255,45,141,0.18) 0%, rgba(2,3,10,0) 55%), radial-gradient(ellipse at 22% 30%, rgba(0,240,255,0.12) 0%, rgba(2,3,10,0) 50%), linear-gradient(180deg, #02030a 0%, #060815 100%)",
        }}
      />
      <Canvas camera={{ position: [0, 2, 14], fov: 65 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.3} />
        <HighwayFloor />
        <Skyline />
        <LightStreaks />
      </Canvas>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 scanline opacity-80" />
      {/* rain layer — pure CSS */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rain-drop"
            style={{
              left:           `${(i * 37) % 100}%`,
              top:            `${-((i * 13) % 30)}%`,
              width:          1,
              height:         `${20 + (i * 7) % 60}px`,
              background:     "linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.55) 100%)",
              animationDuration: `${0.6 + ((i * 11) % 7) / 10}s`,
              animationDelay:    `${(i * 0.13) % 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
