"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    Lightformer,
    MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

const PALETTE = ["#fb923c", "#22d3ee", "#f87171", "#fbbf24", "#34d399"];
const PALETTE_COLORS = PALETTE.map((c) => new THREE.Color(c));

type DistortMat = THREE.MeshPhysicalMaterial & { distort: number };

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
