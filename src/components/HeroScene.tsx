"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

function AICore() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.25 + mouse.x * 0.4;
            groupRef.current.rotation.x = t * 0.2 + mouse.y * 0.3;
        }
        if (meshRef.current) {
            meshRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.06);
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.9, 90, 90]} />
                <meshStandardMaterial
                    metalness={1}
                    roughness={0.15}
                    color="#e2e8f0"
                    emissive="#38bdf8"
                    emissiveIntensity={1.3}
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[1.35, 70, 70]} />
                <meshBasicMaterial
                    color="#38bdf8"
                    transparent
                    opacity={0.18}
                    wireframe
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[1.1, 70, 70]} />
                <meshBasicMaterial
                    color="#a855f7"
                    transparent
                    opacity={0.12}
                    wireframe
                />
            </mesh>
        </group>
    );
}

function StarField() {
    const ref = useRef<THREE.Points>(null!);

    const positions = useMemo(() => {
        const count = 1600;
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 14;
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        ref.current.rotation.y = t * 0.04;
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#38bdf8"
                size={0.034}
                sizeAttenuation
                depthWrite={false}
            />
        </Points>
    );
}

export default function HeroScene() {
    return (
        <div className="relative h-[380px] md:h-[460px] w-full">
            <div className="absolute inset-10 rounded-[999px] bg-gradient-to-br from-sky-500/30 via-cyan-400/20 to-transparent blur-3xl" />

            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_0_80px_rgba(56,189,248,0.25)]">
                <Canvas camera={{ position: [0, 0.3, 4.3], fov: 32 }}>
                    <color attach="background" args={["#020617"]} />
                    <ambientLight intensity={0.7} />
                    <spotLight
                        position={[6, 7, 6]}
                        angle={0.5}
                        penumbra={0.9}
                        intensity={1.6}
                        color={"#38bdf8"}
                    />
                    <spotLight
                        position={[-4, -5, -4]}
                        angle={0.6}
                        penumbra={0.8}
                        intensity={1.2}
                        color={"#a855f7"}
                    />
                    <StarField />
                    <AICore />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
                </Canvas>
            </div>
        </div>
    );
}
