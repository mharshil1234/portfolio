"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { profile } from "@/data/content";

const ORANGE = new THREE.Color("#fb923c");

type PortraitData = {
    positions: Float32Array; // assembled (target) positions
    starts: Float32Array; // scattered start positions
    colors: Float32Array;
    sizes: Float32Array;
    rands: Float32Array;
};

/**
 * Sample the portrait photo on a grid and turn bright-enough pixels into particles.
 * Positions are normalised to a unit square centred on the origin (-0.5..0.5).
 */
async function samplePortrait(src: string, grid: number): Promise<PortraitData> {
    const img = new Image();
    img.src = src;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = grid;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, grid, grid);
    const { data } = ctx.getImageData(0, 0, grid, grid);

    const pos: number[] = [];
    const start: number[] = [];
    const col: number[] = [];
    const size: number[] = [];
    const rand: number[] = [];
    const tmp = new THREE.Color();
    const tint = new THREE.Color();

    for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
            const i = (y * grid + x) * 4;
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Soft circular vignette so the portrait fades out at the edges
            const nx = x / grid - 0.5;
            const ny = y / grid - 0.46;
            const edge = Math.hypot(nx, ny * 0.92);
            const keep = 1 - THREE.MathUtils.smoothstep(edge, 0.36, 0.5);
            if (lum < 0.1 || Math.random() > keep) continue;

            const jitter = 0.35 / grid;
            const px = nx + (Math.random() - 0.5) * jitter;
            const py = -(y / grid - 0.5) + (Math.random() - 0.5) * jitter;
            // Brighter pixels sit slightly closer to the camera → subtle relief
            const pz = (lum - 0.4) * 0.12;
            pos.push(px, py, pz);

            // Scatter start: random point in a wide shell around the portrait
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const rad = 0.9 + Math.random() * 1.6;
            start.push(rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi) * 0.6);

            // Warm monochrome: greyscale tinted toward the orange accent
            tint.copy(ORANGE).multiplyScalar(lum * 1.5);
            tmp.setRGB(lum, lum, lum).lerp(tint, 0.45);
            col.push(tmp.r, tmp.g, tmp.b);
            size.push(0.45 + lum * 1.1);
            rand.push(Math.random());
        }
    }

    return {
        positions: new Float32Array(pos),
        starts: new Float32Array(start),
        colors: new Float32Array(col),
        sizes: new Float32Array(size),
        rands: new Float32Array(rand),
    };
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uScroll;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uRadius;

attribute vec3 aStart;
attribute vec3 aColor;
attribute float aSize;
attribute float aRand;

varying vec3 vColor;
varying float vAlpha;

void main() {
    // Staggered assembly from the scattered cloud into the portrait
    float t = clamp(uProgress * 1.6 - aRand * 0.6, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = mix(aStart, position, t);

    // Gentle idle shimmer
    p.x += sin(uTime * 0.9 + aRand * 40.0) * 0.0025;
    p.y += cos(uTime * 0.8 + aRand * 30.0) * 0.0025;

    // Cursor force field: push particles away and toward the camera
    vec2 d = p.xy - uMouse;
    float len = length(d);
    float f = (1.0 - smoothstep(0.0, uRadius, len)) * uMouseStrength;
    p.xy += normalize(d + 1e-5) * f * 0.12;
    p.z += f * 0.25;

    // Scroll: dissolve outward and drift upward like dust
    float s = uScroll;
    vec3 dir = normalize(aStart + vec3(1e-4));
    p += dir * s * (0.6 + aRand * 1.4);
    p.y += s * aRand * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * uPixelRatio * (1.0 / -mv.z);

    vColor = aColor + f * vec3(0.35, 0.18, 0.05);
    vAlpha = t * (1.0 - smoothstep(0.2, 1.0, s));
}
`;

const fragmentShader = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

function Portrait({ scrollRef, compact }: { scrollRef: React.RefObject<number>; compact: boolean }) {
    const [data, setData] = useState<PortraitData | null>(null);
    const group = useRef<THREE.Group>(null);
    const mat = useRef<THREE.ShaderMaterial>(null);
    const { viewport, pointer, gl } = useThree();
    const lastPointer = useRef(new THREE.Vector2(9, 9));
    const local = useRef(new THREE.Vector3());
    const reduced = useRef(false);

    useEffect(() => {
        reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let alive = true;
        samplePortrait(profile.photo, compact ? 120 : 165).then((d) => {
            if (alive) setData(d);
        });
        return () => {
            alive = false;
        };
    }, [compact]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uScroll: { value: 0 },
            uSize: { value: 0 },
            uPixelRatio: { value: 1 },
            uMouse: { value: new THREE.Vector2(9, 9) },
            uMouseStrength: { value: 0 },
            uRadius: { value: 0.16 },
        }),
        [],
    );

    // Portrait size and placement in world units, derived from the visible viewport
    const scale = compact
        ? Math.min(viewport.width * 0.95, viewport.height * 0.6)
        : Math.min(viewport.height * 0.9, viewport.width * 0.42);
    const offsetX = compact ? 0 : viewport.width * 0.2;
    const offsetY = compact ? viewport.height * 0.12 : viewport.height * 0.02;

    useFrame((state, delta) => {
        const m = mat.current;
        const g = group.current;
        if (!m || !g) return;
        const u = m.uniforms;

        u.uTime.value = state.clock.elapsedTime;
        u.uPixelRatio.value = gl.getPixelRatio();
        // Point size scales with portrait size so density looks the same at any viewport
        u.uSize.value = scale * (compact ? 9 : 6.5);
        u.uProgress.value = reduced.current ? 1 : Math.min(u.uProgress.value + delta / 2.6, 1);
        u.uScroll.value = THREE.MathUtils.damp(u.uScroll.value, Math.min(scrollRef.current ?? 0, 1), 6, delta);

        // Cursor → portrait-local coordinates (unit square)
        local.current.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
        g.worldToLocal(local.current);
        const moved = lastPointer.current.distanceTo(pointer) > 0.0005;
        lastPointer.current.copy(pointer);
        const mouse = u.uMouse.value as THREE.Vector2;
        mouse.x += (local.current.x - mouse.x) * 0.2;
        mouse.y += (local.current.y - mouse.y) * 0.2;
        // Force is strong while moving and eases off when the cursor rests, so particles settle back
        u.uMouseStrength.value = THREE.MathUtils.damp(
            u.uMouseStrength.value,
            moved && !reduced.current ? 1 : 0,
            moved ? 10 : 1.5,
            delta,
        );

        // Subtle 3D tilt toward the cursor
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.25, 3, delta);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.15, 3, delta);
    });

    if (!data) return null;

    return (
        <group ref={group} position={[offsetX, offsetY, 0]} scale={scale}>
            <points frustumCulled={false}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
                    <bufferAttribute attach="attributes-aStart" args={[data.starts, 3]} />
                    <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
                    <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
                    <bufferAttribute attach="attributes-aRand" args={[data.rands, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    ref={mat}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
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
                camera={{ position: [0, 0, 7.5], fov: 45 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            >
                <Portrait scrollRef={scrollRef} compact={compact} />
            </Canvas>
        </div>
    );
}
