import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";
import w5 from "@/assets/w5.jpg";
import w6 from "@/assets/w6.jpg";
import w7 from "@/assets/w7.jpg";

const SCREENS = [w1, w2, w3, w4, w5, w6, w7];

const BLUE = "#2563EB";
const GOLD = "#F4B400";
const CYAN = "#38BDF8";

/** Shared scroll progress (0..1) written by a passive listener, read in useFrame. */
function useScrollProgress() {
  const target = useRef(0);
  const smooth = useRef(0);
  const bind = useMemo(
    () => () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    },
    [],
  );
  return { target, smooth, bind };
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);

type SceneProps = { progress: React.RefObject<number>; low: boolean; still: boolean };

function ProjectScreen({
  index,
  count,
  texture,
  progress,
  still,
}: {
  index: number;
  count: number;
  texture: THREE.Texture;
  progress: React.RefObject<number>;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const side = index % 2 === 0 ? 1 : -1;
  const base = useMemo(
    () =>
      new THREE.Vector3(
        side * (3.6 + (index % 3) * 0.7),
        ((index % 3) - 1) * 1.9,
        -4 - index * 7.5,
      ),
    [index, side],
  );
  // where this screen "lives" along the scroll timeline
  const t0 = index / (count + 2);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    const local = clamp01((p - t0) * 3.2);
    const enter = ease(clamp01(local * 1.6));
    const spread = ease(clamp01(local - 0.45));

    g.position.set(
      base.x + spread * side * 4.5,
      base.y + spread * 1.6,
      base.z + enter * 1.5,
    );
    g.rotation.y = -side * (0.55 - enter * 0.3) + spread * side * 0.5;
    g.rotation.z = spread * side * 0.12;
    const s = 0.4 + enter * 0.7;
    g.scale.setScalar(s);
    const mat = (g.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
    mat.opacity = 0.15 + enter * 0.85 - spread * 0.55;
    if (!still) {
      g.position.y += Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.16;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[5.2, 3.2]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[5.5, 3.5]} />
        <meshBasicMaterial color={index % 2 ? GOLD : BLUE} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function Screens({ progress, still }: { progress: React.RefObject<number>; still: boolean }) {
  const textures = useTexture(SCREENS);
  return (
    <>
      {textures.map((t, i) => (
        <ProjectScreen
          key={i}
          index={i}
          count={textures.length}
          texture={t}
          progress={progress}
          still={still}
        />
      ))}
    </>
  );
}

/** Thin glowing wires that thread the whole tunnel together. */
function WireNetwork({ low }: { low: boolean }) {
  const lines = useMemo(() => {
    const out: { points: [number, number, number][]; color: string }[] = [];
    const count = low ? 10 : 22;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 5 + (i % 4) * 1.3;
      const pts: [number, number, number][] = [];
      for (let s = 0; s <= 10; s++) {
        const z = 4 - s * 6.4;
        const wob = Math.sin(s * 0.7 + i) * 1.2;
        pts.push([Math.cos(a) * r + wob, Math.sin(a) * r * 0.55 + wob * 0.4, z]);
      }
      out.push({ points: pts, color: i % 3 === 0 ? GOLD : i % 3 === 1 ? BLUE : CYAN });
    }
    return out;
  }, [low]);

  return (
    <group>
      {lines.map((l, i) => (
        <Line
          key={i}
          points={l.points}
          color={l.color}
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </group>
  );
}

function Nodes({ low, still }: { low: boolean; still: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = low ? 90 : 260;
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 26,
        y: (Math.random() - 0.5) * 16,
        z: 4 - Math.random() * 72,
        s: 0.03 + Math.random() * 0.07,
        o: Math.random() * Math.PI * 2,
      })),
    [count],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = still ? 0 : state.clock.elapsedTime;
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(t * 0.4 + p.o) * 0.5, p.z);
      dummy.scale.setScalar(p.s * (1 + Math.sin(t + p.o) * 0.25));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={CYAN} transparent opacity={0.7} toneMapped={false} />
    </instancedMesh>
  );
}

/** Growth bars that rise as the marketing → growth stretch scrolls past. */
function GrowthGraph({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const bars = 9;
  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    g.children.forEach((child, i) => {
      const local = clamp01((p - 0.42 - i * 0.012) * 6);
      const h = 0.4 + ease(local) * (1 + i * 0.55);
      child.scale.y = h;
      child.position.y = -3 + h / 2;
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + ease(local) * 0.6;
    });
  });
  return (
    <group ref={group} position={[0, 0, -46]}>
      {Array.from({ length: bars }).map((_, i) => (
        <mesh key={i} position={[(i - (bars - 1) / 2) * 1.5, -3, 0]}>
          <boxGeometry args={[0.7, 1, 0.7]} />
          <meshBasicMaterial color={i > 5 ? GOLD : BLUE} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** The SoRa digital core everything converges into at the end. */
function Core({ progress, still }: { progress: React.RefObject<number>; still: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    const grp = g.current;
    if (!grp) return;
    const p = progress.current ?? 0;
    const local = ease(clamp01((p - 0.72) * 3.4));
    grp.scale.setScalar(0.2 + local * 2.4);
    grp.visible = local > 0.01;
    if (!still) grp.rotation.y = state.clock.elapsedTime * 0.25;
    grp.rotation.x = local * 0.6;
  });
  return (
    <group ref={g} position={[0, 0, -66]}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.85} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.7} />
      </mesh>
      <pointLight color={GOLD} intensity={30} distance={40} />
    </group>
  );
}

function Rig({ progress, still }: { progress: React.RefObject<number>; still: boolean }) {
  const { camera } = useThree();
  useFrame((state) => {
    const p = progress.current ?? 0;
    const drift = still ? 0 : Math.sin(state.clock.elapsedTime * 0.25);
    camera.position.z = 10 - p * 74;
    camera.position.x = Math.sin(p * Math.PI * 2.2) * 2.4 + drift * 0.3;
    camera.position.y = Math.cos(p * Math.PI * 1.6) * 1.4;
    camera.lookAt(0, 0, camera.position.z - 12);
  });
  return null;
}

function Scene({ progress, low, still }: SceneProps) {
  return (
    <>
      <fogExp2 attach="fog" args={["#050816", 0.018]} />
      <ambientLight intensity={0.6} />
      <Rig progress={progress} still={still} />
      <WireNetwork low={low} />
      <Nodes low={low} still={still} />
      <GrowthGraph progress={progress} />
      <Core progress={progress} still={still} />
      <Suspense fallback={null}>
        <Screens progress={progress} still={still} />
      </Suspense>
    </>
  );
}

export default function CinematicScene() {
  const { target, smooth, bind } = useScrollProgress();
  const low =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4);
  const still =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // keep the smoothed ref in sync outside of R3F so children can read it
  const value = useRef(0);

  return (
    <Canvas
      className="!pointer-events-none"
      dpr={[1, low ? 1.2 : 1.8]}
      gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], fov: 62, far: 220 }}
      onCreated={() => {
        bind();
        window.addEventListener("scroll", bind, { passive: true });
        window.addEventListener("resize", bind);
      }}
    >
      <Smoother target={target} smooth={smooth} out={value} still={still} />
      <Scene progress={value} low={low} still={still} />
    </Canvas>
  );
}

function Smoother({
  target,
  smooth,
  out,
  still,
}: {
  target: React.RefObject<number>;
  smooth: React.RefObject<number>;
  out: React.RefObject<number>;
  still: boolean;
}) {
  useFrame((_, delta) => {
    const k = still ? 1 : 1 - Math.exp(-6 * Math.min(delta, 0.05));
    smooth.current += ((target.current ?? 0) - smooth.current) * (still ? 1 : k);
    out.current = smooth.current;
  });
  return null;
}
