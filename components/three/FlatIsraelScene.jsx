"use client";
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import Node from "./Node";
import FiberLink from "./FiberLink";

// --- Helper to auto-fit the camera distance based on radius ---
function AutoFit({ radius }) {
  const { camera } = useThree();
  useEffect(() => {
    const dist = Math.max(14, radius * 3); // keep a comfortable margin
    camera.position.set(0, 0, dist);
    camera.near = 0.1;
    camera.far = dist * 10;
    camera.updateProjectionMatrix();
  }, [camera, radius]);
  return null;
}

export default function FlatIsraelScene() {
  // Use city names for labels (no geographic projection — just radial layout)
  const CITIES = [
    "راس العامود",
    "سلوان",
    "العيسوية",
    "الطور",
    "الثوري",
    "جبل المكبر",
    "شعفاط",
    "بيت حنينا",
    "وادي الجوز",
    "صور باهر",
    "جبل الزيتون",
    "الشياح",
  ];

  // Smaller radius so all nodes fit nicely; you can tweak if needed
  const RADIUS = 5.5;

  // Arrange cities in a circle; mark every 3rd as priority to keep your Node glow behavior
  const nodes = useMemo(() => {
    const n = CITIES.length;
    return CITIES.map((name, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * RADIUS;
      const y = Math.sin(a) * RADIUS;
      return {
        id: i,
        label: name,
        pos: [x, y, 0],
        priority: i % 3 === 0,
      };
    });
  }, [CITIES]);

  // Simple ring connections + a couple of chords
  const links = useMemo(() => {
    const ring = nodes.map((n, i) => ({
      a: n.id,
      b: nodes[(i + 1) % nodes.length].id,
      health: 0.65 + Math.random() * 0.3, // 0.65–0.95
    }));
    const chords = [
      [0, 4],
      [2, 7],
      [5, 10],
    ].map(([a, b]) => ({
      a,
      b,
      health: 0.55 + Math.random() * 0.4,
    }));
    return [...ring, ...chords];
  }, [nodes]);

  // Keep a handle on controls so users can pan/zoom smoothly
  const controlsRef = useRef(null);

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      {/* Transparent background to blend with your UI */}
      <color attach="background" args={["transparent"]} />

      {/* Lights */}
      <ambientLight intensity={0.75} />
      <pointLight position={[10, 12, 10]} intensity={0.6} />

      {/* Auto-fit camera based on radius so all nodes are visible */}
      <AutoFit radius={RADIUS} />

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        enablePan
        minDistance={8}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Subtle grid behind nodes (slightly behind z=0 to avoid z-fighting) */}
      <gridHelper
        args={[80, 40, "#e6e6e6", "#c7c7c7"]}
        position={[0, 0, -0.1]}
      />

      <Suspense fallback={<Html center>Loading…</Html>}>
        {/* Links */}
        {links.map((l, i) => (
          <FiberLink
            key={i}
            start={nodes[l.a].pos}
            end={nodes[l.b].pos}
            health={l.health}
          />
        ))}

        {/* Nodes with city labels */}
        {nodes.map((n) => (
          <Node
            key={n.id}
            position={n.pos}
            label={n.label}
            priority={n.priority}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
