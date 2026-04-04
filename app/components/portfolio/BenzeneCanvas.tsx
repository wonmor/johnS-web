"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFModel } from "./r3f-models";

export default function BenzeneCanvas() {
  return (
    <Canvas style={{ height: 300 }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <GLTFModel modelPath="/model-6.gltf" size={0.3} />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
