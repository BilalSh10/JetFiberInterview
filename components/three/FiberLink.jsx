import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line as DreiLine } from "@react-three/drei";

export default function FiberLink({ start, end, health }) {
  const points = useMemo(
    () => [start, midPoint(start, end), end],
    [start, end]
  );
  const good = health > 0.75;
  const warn = health <= 0.75 && health > 0.6;
  const color = good ? "#22d3ee" : warn ? "#f59e0b" : "#ef4444";
  const dash = !good;

  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current && dash) {
      ref.current.material.dashOffset = (clock.getElapsedTime() * -0.2) % 1;
    }
  });

  return (
    <DreiLine
      ref={ref}
      points={points}
      color={color}
      lineWidth={2}
      dashed={dash}
      dashSize={0.1}
      gapSize={0.05}
    />
  );
}

function midPoint(a, b) {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 0.6, (a[2] + b[2]) / 2];
}
