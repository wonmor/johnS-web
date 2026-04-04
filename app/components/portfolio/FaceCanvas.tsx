"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./r3f-models";

export default function FaceCanvas() {
  return (
    <Canvas style={{ height: 400 }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={3} />
      <Model modelPath="/face_model1.obj" />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
