"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";
import { Box3, MathUtils, Vector3 } from "three";
import * as THREE from "three";

export function Model({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath.startsWith("/") ? modelPath : `/${modelPath}`);
  const rootRef = useRef<THREE.Object3D | null>(null);
  const rotDir = useRef(1);
  const rotY = useRef(0);
  const speed = 0.001;
  const limit = MathUtils.degToRad(50);

  useFrame(() => {
    const root = rootRef.current;
    if (!root) return;
    const newY = rotY.current + speed * rotDir.current;
    if (Math.abs(newY) > limit) rotDir.current = -rotDir.current;
    else {
      rotY.current = newY;
      root.rotation.y = newY;
    }
  });

  useEffect(() => {
    const root = obj;
    rootRef.current = root;
    root.traverse((c) => {
      if (c instanceof THREE.Mesh) c.material.side = THREE.DoubleSide;
    });
    root.rotation.set(
      MathUtils.degToRad(180),
      MathUtils.degToRad(40),
      MathUtils.degToRad(90)
    );
    root.scale.setScalar(20);
    const bbox = new Box3().setFromObject(root);
    const center = new Vector3();
    bbox.getCenter(center);
    root.position.copy(center.negate());
    rotY.current = root.rotation.y;
  }, [obj]);

  return <primitive object={obj} />;
}

export function GLTFModel({ modelPath, size }: { modelPath: string; size?: number }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const objRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (!objRef.current) return;
    objRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => (mat.side = THREE.DoubleSide));
        } else {
          mesh.material.side = THREE.DoubleSide;
        }
      }
    });
    const scale = size || 1;
    objRef.current.scale.setScalar(scale);
    const bbox = new Box3().setFromObject(objRef.current);
    const center = new Vector3();
    bbox.getCenter(center);
    objRef.current.position.copy(center.negate());
  }, [gltf, size]);

  useFrame(() => {
    if (objRef.current) objRef.current.rotation.y += 0.002;
  });

  return <primitive object={gltf.scene} ref={objRef} />;
}
