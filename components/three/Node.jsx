import React from "react";
import { Html } from "@react-three/drei";
import usePulse from "./usePulse";

export default function Node({ position, label, priority }) {
  const pulse = usePulse(
    priority ? 1.0 : 0.9,
    priority ? 1.35 : 1.2,
    priority ? 2.4 : 1.8
  );

  return (
    <group position={position}>
      {priority && (
        <mesh>
          <ringGeometry args={[0.5, 0.9, 48]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
        </mesh>
      )}
      <mesh>
        <sphereGeometry args={[0.22 * pulse, 24, 24]} />
        <meshStandardMaterial
          color={priority ? "#67e8f9" : "#22d3ee"}
          emissive="#0ea5b7"
          emissiveIntensity={priority ? 1.1 : 0.7}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
      <Html position={[0.02, 0.6, 0]} center>
        <div
          className={`rounded-md px-1.5 py-0.5 text-[10px] shadow ${
            priority
              ? "bg-cyan-700/80 text-cyan-100"
              : "bg-slate-900/80 text-cyan-200"
          }`}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}
