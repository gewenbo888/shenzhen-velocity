"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import HUD from "./HUD";

const LANES = [-3, 0, 3];
const ROAD_LEN = 200;
const OBSTACLE_POOL = 16;
const PLAYER_Z = 4;       // car position along z (closer to camera)

type GameState = {
  status: "idle" | "running" | "over";
  laneTarget: number;      // -1, 0, 1
  laneX: number;           // current interpolated x
  speed: number;           // units/s
  baseSpeed: number;
  distance: number;        // meters traveled
  score: number;
  boost: number;           // 0..100 charge
  boostActive: boolean;
  boostCooldown: number;   // s remaining before usable
  lastSpawn: number;       // s timestamp
  best: number;            // best distance this session
};

function newGame(prevBest = 0): GameState {
  return {
    status: "idle",
    laneTarget: 0,
    laneX: 0,
    speed: 0,
    baseSpeed: 30,
    distance: 0,
    score: 0,
    boost: 100,
    boostActive: false,
    boostCooldown: 0,
    lastSpawn: 0,
    best: prevBest,
  };
}

// Pooled obstacle: { x lane index, z position, color, alive }
type Obs = { lane: number; z: number; color: THREE.Color; alive: boolean; mesh?: THREE.Mesh };

export default function Game() {
  const stateRef = useRef<GameState>(newGame());
  const obstaclesRef = useRef<Obs[]>(
    Array.from({ length: OBSTACLE_POOL }, () => ({
      lane: 0, z: -ROAD_LEN, color: new THREE.Color("#ff2d8d"), alive: false,
    }))
  );
  const keys = useRef({ left: false, right: false, boost: false });

  // 10Hz mirror of state into React for the HUD
  const [hud, setHud] = useState<GameState>(stateRef.current);
  useEffect(() => {
    const id = setInterval(() => setHud({ ...stateRef.current }), 100);
    return () => clearInterval(id);
  }, []);

  // Keyboard
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") {
        keys.current.left = true;
        if (stateRef.current.status === "running") {
          stateRef.current.laneTarget = Math.max(-1, stateRef.current.laneTarget - 1);
        }
      } else if (k === "arrowright" || k === "d") {
        keys.current.right = true;
        if (stateRef.current.status === "running") {
          stateRef.current.laneTarget = Math.min(1, stateRef.current.laneTarget + 1);
        }
      } else if (k === " " || k === "spacebar") {
        e.preventDefault();
        keys.current.boost = true;
        const s = stateRef.current;
        if (s.status === "idle" || s.status === "over") {
          // start / restart
          const best = s.best;
          stateRef.current = newGame(best);
          stateRef.current.status = "running";
          // clear obstacles
          obstaclesRef.current.forEach((o) => { o.alive = false; o.z = -ROAD_LEN; });
        } else if (s.status === "running" && s.boost > 25 && s.boostCooldown <= 0) {
          s.boostActive = true;
        }
      } else if (k === "r") {
        // hard restart
        const best = stateRef.current.best;
        stateRef.current = newGame(best);
        stateRef.current.status = "running";
        obstaclesRef.current.forEach((o) => { o.alive = false; o.z = -ROAD_LEN; });
      }
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") keys.current.left = false;
      else if (k === "arrowright" || k === "d") keys.current.right = false;
      else if (k === " " || k === "spacebar") {
        keys.current.boost = false;
        if (stateRef.current.boostActive) {
          stateRef.current.boostActive = false;
          stateRef.current.boostCooldown = 1.5;
        }
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // touch controls — tap left/right halves of screen to steer, double-tap to boost
  useEffect(() => {
    let lastTap = 0;
    const onTouch = (e: TouchEvent) => {
      if (stateRef.current.status === "idle" || stateRef.current.status === "over") {
        const best = stateRef.current.best;
        stateRef.current = newGame(best);
        stateRef.current.status = "running";
        obstaclesRef.current.forEach((o) => { o.alive = false; o.z = -ROAD_LEN; });
        return;
      }
      const x = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
      const W = window.innerWidth;
      if (x < W / 2) {
        stateRef.current.laneTarget = Math.max(-1, stateRef.current.laneTarget - 1);
      } else {
        stateRef.current.laneTarget = Math.min(1, stateRef.current.laneTarget + 1);
      }
      const now = performance.now();
      if (now - lastTap < 280) {
        if (stateRef.current.boost > 25 && stateRef.current.boostCooldown <= 0) {
          stateRef.current.boostActive = true;
          setTimeout(() => {
            if (stateRef.current.boostActive) {
              stateRef.current.boostActive = false;
              stateRef.current.boostCooldown = 1.5;
            }
          }, 700);
        }
      }
      lastTap = now;
    };
    window.addEventListener("touchstart", onTouch);
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);

  return (
    <>
      <Canvas
        camera={{ position: [0, 4, 11], fov: 70 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <color attach="background" args={["#02030a"]} />
        <fog attach="fog" args={["#02030a", 30, 90]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 6, 6]} intensity={1.2} color="#ff2d8d" />
        <pointLight position={[0, 6, -10]} intensity={0.7} color="#00f0ff" />

        <Scene stateRef={stateRef} obstaclesRef={obstaclesRef} />
      </Canvas>

      <HUD state={hud} />
    </>
  );
}

// ───────────────────────────────────────────────────────────
//  SCENE
// ───────────────────────────────────────────────────────────
function Scene({
  stateRef,
  obstaclesRef,
}: {
  stateRef: React.MutableRefObject<GameState>;
  obstaclesRef: React.MutableRefObject<Obs[]>;
}) {
  const playerRef = useRef<THREE.Group>(null);
  const underglowRef = useRef<THREE.Mesh>(null);
  const roadRef = useRef<THREE.LineSegments>(null);
  const obstaclesGroup = useRef<THREE.Group>(null);
  const skylineRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // road lines (lanes + chevrons)
  const roadGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pts: number[] = [];
    const cols: number[] = [];
    // lane edges
    [-4.5, -1.5, 1.5, 4.5].forEach((x, i) => {
      pts.push(x, 0, -ROAD_LEN, x, 0, 12);
      const c = i === 0 || i === 3 ? [1.0, 0.18, 0.55] : [0.0, 0.94, 1.0];
      cols.push(...c, ...c);
    });
    // dashed chevrons every 4 units (we'll animate them via the LineSegments z)
    for (let z = -ROAD_LEN; z <= 12; z += 4) {
      pts.push(-1.5, 0, z, -1.5, 0, z + 1.5);
      pts.push( 1.5, 0, z,  1.5, 0, z + 1.5);
      cols.push(0.85, 1, 0.23,  0.85, 1, 0.23,  0.85, 1, 0.23,  0.85, 1, 0.23);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    return g;
  }, []);

  // skyline silhouette towers
  const towers = useMemo(() => {
    const out: { x: number; z: number; h: number; w: number; color: string }[] = [];
    const palette = ["#ff2d8d", "#00f0ff", "#9b80ff", "#d8ff3a"];
    for (let i = 0; i < 70; i++) {
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (8 + Math.random() * 24);
      const z = -10 - Math.random() * 100;
      const h = 6 + Math.random() * 26;
      const w = 1.4 + Math.random() * 2.4;
      out.push({ x, z, h, w, color: palette[i % palette.length] });
    }
    return out;
  }, []);

  useFrame((_, delta) => {
    const s = stateRef.current;

    // ─── skyline drift (always)
    if (skylineRef.current) {
      skylineRef.current.position.z += delta * (s.status === "running" ? Math.max(s.speed * 0.4, 4) : 4);
      if (skylineRef.current.position.z > 30) skylineRef.current.position.z = -30;
    }

    // ─── road scroll
    if (roadRef.current) {
      const v = s.status === "running" ? s.speed : 8;
      const m = roadRef.current.material as THREE.LineBasicMaterial;
      // animate via texture-like offset by rotating the underlying chevron z positions
      const z = (roadRef.current.position.z + delta * v) % 4;
      roadRef.current.position.z = z;
      m.opacity = 0.75 + Math.sin(performance.now() * 0.002) * 0.05;
    }

    // ─── camera subtle shake on boost / collision warning
    const shake = s.boostActive ? 0.04 : 0;
    camera.position.x = (s.laneX * 0.18) + (Math.sin(performance.now() * 0.02) * shake);
    camera.lookAt(s.laneX * 0.4, 1.2, -6);

    if (s.status !== "running") {
      // even when idle, animate player slightly
      if (playerRef.current) {
        playerRef.current.position.x = s.laneX;
        playerRef.current.rotation.z = 0;
      }
      return;
    }

    // ─── time-based progression
    s.distance += s.speed * delta;
    s.score = Math.floor(s.distance);
    s.baseSpeed = Math.min(85, 30 + s.distance / 200);
    const targetSpeed = s.boostActive ? s.baseSpeed * 1.7 : s.baseSpeed;
    s.speed = THREE.MathUtils.damp(s.speed, targetSpeed, 4, delta);

    // boost meter
    if (s.boostActive) {
      s.boost = Math.max(0, s.boost - delta * 35);
      if (s.boost <= 0) {
        s.boostActive = false;
        s.boostCooldown = 1.5;
      }
    } else {
      s.boost = Math.min(100, s.boost + delta * 12);
    }
    if (s.boostCooldown > 0) s.boostCooldown = Math.max(0, s.boostCooldown - delta);

    // best
    if (s.distance > s.best) s.best = s.distance;

    // ─── player lateral movement
    const targetX = LANES[s.laneTarget + 1];
    s.laneX = THREE.MathUtils.damp(s.laneX, targetX, 7, delta);
    if (playerRef.current) {
      playerRef.current.position.x = s.laneX;
      const tilt = (targetX - s.laneX) * 0.18;
      playerRef.current.rotation.z = tilt;
    }
    if (underglowRef.current) {
      const m = underglowRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = s.boostActive ? 0.95 : 0.55 + Math.sin(performance.now() * 0.008) * 0.15;
    }

    // ─── spawn obstacles
    const spawnInterval = Math.max(0.45, 1.6 - s.distance / 600);
    if ((performance.now() / 1000) - s.lastSpawn > spawnInterval) {
      const free = obstaclesRef.current.find((o) => !o.alive);
      if (free) {
        free.alive = true;
        free.lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        free.z = -ROAD_LEN + 30;
        // color: 70% magenta, 30% cyan
        free.color.set(Math.random() < 0.7 ? "#ff2d8d" : "#00f0ff");
        s.lastSpawn = performance.now() / 1000;
      }
    }

    // ─── move obstacles + collisions
    for (const o of obstaclesRef.current) {
      if (!o.alive) continue;
      o.z += s.speed * delta;
      if (o.mesh) {
        o.mesh.position.set(LANES[o.lane + 1], 0.6, o.z);
        (o.mesh.material as THREE.MeshBasicMaterial).color = o.color;
      }
      // off-screen behind camera
      if (o.z > PLAYER_Z + 8) {
        o.alive = false;
      }
      // collision: lane match + near player z
      if (Math.abs(o.z - PLAYER_Z) < 1.4 && o.lane === s.laneTarget) {
        // and player is close to that lane (not mid-shift)
        if (Math.abs(s.laneX - LANES[o.lane + 1]) < 1.2) {
          s.status = "over";
          s.boostActive = false;
        }
      }
    }
  });

  return (
    <>
      {/* road */}
      <lineSegments ref={roadRef} geometry={roadGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.8} depthWrite={false} />
      </lineSegments>

      {/* road surface (subtle dark plane to ground the scene) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -ROAD_LEN / 2 + 6]}>
        <planeGeometry args={[12, ROAD_LEN + 12]} />
        <meshBasicMaterial color="#06081a" transparent opacity={0.6} />
      </mesh>

      {/* skyline */}
      <group ref={skylineRef}>
        {towers.map((t, i) => (
          <mesh key={i} position={[t.x, t.h / 2 - 0.5, t.z]}>
            <boxGeometry args={[t.w, t.h, t.w]} />
            <meshBasicMaterial color={t.color} transparent opacity={0.18} wireframe />
          </mesh>
        ))}
      </group>

      {/* player car */}
      <group ref={playerRef} position={[0, 0, PLAYER_Z]}>
        {/* body */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.6, 0.5, 3.0]} />
          <meshStandardMaterial color="#ff79b3" emissive="#ff2d8d" emissiveIntensity={0.6} metalness={0.6} roughness={0.2} />
        </mesh>
        {/* canopy */}
        <mesh position={[0, 0.95, -0.2]}>
          <boxGeometry args={[1.1, 0.35, 1.6]} />
          <meshStandardMaterial color="#02030a" emissive="#3a0c20" metalness={0.7} roughness={0.1} />
        </mesh>
        {/* underglow plane */}
        <mesh ref={underglowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[2.2, 3.6]} />
          <meshBasicMaterial color="#ff2d8d" transparent opacity={0.6} depthWrite={false} />
        </mesh>
        {/* headlights */}
        <mesh position={[-0.55, 0.55, -1.5]}>
          <boxGeometry args={[0.25, 0.15, 0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.55, 0.55, -1.5]}>
          <boxGeometry args={[0.25, 0.15, 0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* obstacles */}
      <group ref={obstaclesGroup}>
        {obstaclesRef.current.map((o, i) => (
          <mesh
            key={i}
            position={[LANES[o.lane + 1], 0.6, o.z]}
            visible={o.alive}
            ref={(m) => { if (m) o.mesh = m as THREE.Mesh; }}
          >
            <boxGeometry args={[1.6, 1.2, 1.6]} />
            <meshBasicMaterial color={o.color} transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
    </>
  );
}
