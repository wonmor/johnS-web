"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GLTFModel } from "./r3f-models";

/**
 * Local .gltf export of an ElectronVisual density surface, rendered in-page.
 * The section used to embed electronvisual.org's own renderer in an iframe;
 * these snapshots ship with the site instead, so the models draw immediately
 * and stay up even when that site is down or changes its viewer.
 */
export default function AtomModelCanvas({
  modelPath,
  size,
}: {
  modelPath: string;
  size?: number;
}) {
  return (
    <Canvas
      style={{ height: "100%" }}
      camera={{ position: [0, 0, 5] }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={2} />
      <GLTFModel modelPath={modelPath} size={size} />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}
