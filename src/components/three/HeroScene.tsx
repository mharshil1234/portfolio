"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    Float,
    Lightformer,
    MeshDistortMaterial,
    RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#fb923c", "#22d3ee", "#f87171", "#fbbf24", "#34d399"];
const PALETTE_COLORS = PALETTE.map((c) => new THREE.Color(c));

// Scratch objects reused every frame (avoids per-frame allocation).
const tmpVec = new THREE.Vector3();

type DistortMat = THREE.MeshPhysicalMaterial & { distort: number };

type ShapeKind = "torus" | "ico" | "box" | "capsule" | "cone" | "knot" | "sphere";

type ShapeDef = {
    kind: ShapeKind;
    position: [number, number, number];
    scale: number;
    color: string;
    speed: number;
};

const SHAPES: ShapeDef[] = [
    { kind: "torus", position: [-3.4, 1.6, -1], scale: 0.7, color: PALETTE[1], speed: 1.4 },
    { kind: "ico", position: [3.3, 1.9, -1.5], scale: 0.75, color: PALETTE[2], speed: 1.1 },
    { kind: "box", position: [-2.9, -1.7, 0], scale: 0.8, color: PALETTE[3], speed: 1.7 },
    { kind: "capsule", position: [3.1, -1.5, 0.3], scale: 0.55, color: PALETTE[4], speed: 1.3 },
    { kind: "cone", position: [0.4, 2.7, -2.2], scale: 0.6, color: PALETTE[3], speed: 1.9 },
    { kind: "knot", position: [-0.6, -2.6, -1.4], scale: 0.45, color: PALETTE[0], speed: 1.2 },
    { kind: "sphere", position: [4.8, 0.2, -3], scale: 0.5, color: PALETTE[1], speed: 2.1 },
    { kind: "sphere", position: [-5, 0, -3], scale: 0.4, color: PALETTE[2], speed: 1.6 },
];

function Geometry({ kind }: { kind: ShapeKind }) {
    switch (kind) {
        case "torus":
            return <torusGeometry args={[0.7, 0.28, 32, 64]} />;
        case "ico":
            return <icosahedronGeometry args={[0.9, 0]} />;
        case "capsule":
            return <capsuleGeometry args={[0.45, 0.9, 12, 24]} />;
        case "cone":
            return <coneGeometry args={[0.7, 1.3, 32]} />;
        case "knot":
            return <torusKnotGeometry args={[0.8, 0.26, 128, 24]} />;
        case "sphere":
        default:
            return <sphereGeometry args={[0.8, 48, 48]} />;
    }
}

/** A floating shape that spins, reacts to hover, and drifts outward as the page scrolls. */
function Shape({ def, scrollRef }: { def: ShapeDef; scrollRef: React.RefObject<number> }) {
    const ref = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        const g = ref.current;
        if (!g) return;
        const s = scrollRef.current ?? 0;
        // Push shapes out from the centre and toward the camera as you scroll
        const [bx, by, bz] = def.position;
        const spread = 1 + s * 1.6;
        tmpVec.set(bx * spread, by * spread, bz * spread + s * 3);
        g.position.lerp(tmpVec, 0.08);
        g.rotation.x += delta * 0.25 * def.speed;
        g.rotation.y += delta * 0.35 * def.speed;
        const k = (hovered ? 1.35 : 1) * def.scale;
        g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, k, 8, delta));
    });

    const material = (
        <meshPhysicalMaterial
            color={def.color}
            roughness={0.15}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={0.6}
            iridescenceIOR={1.4}
            emissive={def.color}
            emissiveIntensity={hovered ? 0.35 : 0.05}
        />
    );

    return (
        <Float speed={def.speed} rotationIntensity={0.6} floatIntensity={1.4}>
            <group
                ref={ref}
                position={def.position}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = "";
                }}
            >
                {def.kind === "box" ? (
                    <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.22} smoothness={5}>
                        {material}
                    </RoundedBox>
                ) : (
                    <mesh>
                        <Geometry kind={def.kind} />
                        {material}
                    </mesh>
                )}
            </group>
        </Float>
    );
}

/** The centre blob: wobbles with the pointer and "pops" + changes colour on click. */
function Blob({ scrollRef }: { scrollRef: React.RefObject<number> }) {
    const mesh = useRef<THREE.Mesh>(null);
    // drei doesn't export the impl type; cast at the JSX boundary below.
    const mat = useRef<DistortMat>(null);
    const [hovered, setHovered] = useState(false);
    const [colorIdx, setColorIdx] = useState(0);
    const pop = useRef(0);

    useFrame((state, delta) => {
        if (!mesh.current || !mat.current) return;
        const s = scrollRef.current ?? 0;
        pop.current = THREE.MathUtils.damp(pop.current, 0, 4, delta);
        const scale = 1.55 + (hovered ? 0.12 : 0) + pop.current * 0.5 - s * 0.6;
        mesh.current.scale.setScalar(THREE.MathUtils.damp(mesh.current.scale.x, Math.max(scale, 0.2), 6, delta));
        mesh.current.rotation.y += delta * 0.2;
        mat.current.distort = THREE.MathUtils.damp(
            mat.current.distort,
            (hovered ? 0.55 : 0.35) + pop.current * 0.6,
            4,
            delta,
        );
        mat.current.color.lerp(PALETTE_COLORS[colorIdx], 0.05);
        mat.current.emissive.copy(mat.current.color);
    });

    return (
        <mesh
            ref={mesh}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = "";
            }}
            onClick={(e) => {
                e.stopPropagation();
                pop.current = 1;
                setColorIdx((i) => (i + 1) % PALETTE.length);
            }}
        >
            <sphereGeometry args={[1, 128, 128]} />
            <MeshDistortMaterial
                ref={mat as React.Ref<never>}
                color={PALETTE[0]}
                emissive={PALETTE[0]}
                emissiveIntensity={0.15}
                roughness={0.1}
                metalness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.05}
                iridescence={1}
                iridescenceIOR={1.3}
                distort={0.35}
                speed={2.2}
            />
        </mesh>
    );
}

/** Tilts the whole scene toward the pointer for a parallax feel. */
function PointerRig({ children }: { children: React.ReactNode }) {
    const group = useRef<THREE.Group>(null);
    const { pointer } = useThree();
    useFrame((_, delta) => {
        if (!group.current) return;
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.35, 3, delta);
        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.2, 3, delta);
        group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointer.x * 0.3, 3, delta);
    });
    return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
    const wrapper = useRef<HTMLDivElement>(null);
    const scrollRef = useRef(0);
    const [visible, setVisible] = useState(true);
    const [compact, setCompact] = useState(false);

    useEffect(() => {
        const el = wrapper.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
        io.observe(el);

        const onScroll = () => {
            scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1.2);
        };
        const onResize = () => setCompact(window.innerWidth < 768);
        onScroll();
        onResize();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div ref={wrapper} className="absolute inset-0">
            <Canvas
                frameloop={visible ? "always" : "never"}
                dpr={[1, 1.75]}
                camera={{ position: [0, 0, compact ? 10 : 7.5], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <PointerRig>
                    <Blob scrollRef={scrollRef} />
                    {SHAPES.map((def, i) => (
                        <Shape key={i} def={def} scrollRef={scrollRef} />
                    ))}
                </PointerRig>
                <ContactShadows position={[0, -3.4, 0]} opacity={0.45} scale={16} blur={2.8} far={5} color="#000000" />
                {/* Local studio lighting (no HDR download) */}
                <Environment resolution={256}>
                    <Lightformer form="rect" intensity={3} position={[0, 4, -4]} scale={[10, 2, 1]} color="#ffffff" />
                    <Lightformer form="circle" intensity={4} position={[-5, 1, 2]} scale={3} color="#fb923c" />
                    <Lightformer form="circle" intensity={4} position={[5, -1, 2]} scale={3} color="#22d3ee" />
                    <Lightformer form="ring" intensity={2} position={[0, -4, 3]} scale={4} color="#f87171" />
                </Environment>
            </Canvas>
        </div>
    );
}
