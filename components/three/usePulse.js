import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function usePulse(min = 0.9, max = 1.15, speed = 2) {
  const [scale, setScale] = useState(1);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = min + (Math.sin(t * speed) * 0.5 + 0.5) * (max - min);
    setScale(s);
  });
  return scale;
}
