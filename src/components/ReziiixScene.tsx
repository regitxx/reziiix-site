"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function BackgroundOrb() {
    const ringRef = useRef<THREE.Mesh>(null!);

    // very subtle motion on the ring only
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.05;
        }
    });

    return (
        <group position={[0, 0, -4]}>
            {/* big soft sphere */}
            <mesh>
                <sphereGeometry args={[5, 64, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
            </mesh>

            {/* thin rotating ring */}
            <mesh ref={ringRef} rotation-x={Math.PI / 2}>
                <ringGeometry args={[3.5, 3.9, 80]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </mesh>
        </group>
    );
}

function StaticReziiix() {
    return (
        <group position={[0, 0, -2]}>
            <Text
                fontSize={1.6}
                letterSpacing={0.16}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#ffffff"
                outlineBlur={0.5}
            >
                REZIIIX
                <meshStandardMaterial metalness={0.95} roughness={0.25} />
            </Text>
        </group>
    );
}

function StarsField() {
    const ref = useRef<THREE.Points>(null!);
    const count = 400;

    const positions = React.useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 10 + Math.random() * 8;
            const theta = Math.random() * 2 * Math.PI;
            const phi = (Math.random() - 0.5) * Math.PI * 0.5;
            arr[i * 3 + 0] = r * Math.cos(theta) * Math.cos(phi);
            arr[i * 3 + 1] = r * Math.sin(phi);
            arr[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.01; // very slow drift
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                {/* TS-friendly: use args instead of array/count/itemSize */}
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#ffffff"
                opacity={0.4}
                transparent
                depthWrite={false}
            />
        </points>
    );
}

export default function ReziiixScene() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1.2, 2]}>
                <color attach="background" args={["#000000"]} />
                <fog attach="fog" args={["#000000", 6, 18]} />

                <ambientLight intensity={0.25} />
                <directionalLight position={[4, 6, 6]} intensity={1.1} color="#ffffff" />
                <directionalLight
                    position={[-4, -3, -6]}
                    intensity={0.4}
                    color="#888888"
                />

                <StarsField />
                <BackgroundOrb />
                <StaticReziiix />
            </Canvas>
        </div>
    );
}
