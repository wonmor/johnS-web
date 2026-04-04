"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFModel } from "./r3f-models";

export default function GadoliniumCanvas() {
  return (
    <Canvas style={{ height: 400 }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <GLTFModel modelPath="/model-4.gltf" />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
