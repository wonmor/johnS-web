"use client";

import Image from "next/image";
import localFont from "next/font/local";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Box3, Vector3, MathUtils } from "three";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";

const tubeFont = localFont({
  src: "../public/Outfit.ttf",
  display: "swap",
});

const tubeRed = "#f77f6b"; // washed-out, Overground-inspired red
const tubeBlue = "#003688";
const tubeGreyBg = "#f5f5f5";
const tubeText = tubeBlue;
function TubeRoundel() {
  return (
    <div
      style={{
        position: "relative",
        width: 140,
        height: 140,
        borderRadius: "50%",
        backgroundColor: tubeRed,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Golden Gate Bridge minimal SVG */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "120%",
          height: "120%",
          transform: "translate(-50%, -50%)",
          fill: "none",
          stroke: "#003688",
          strokeWidth: 2,
          zIndex: 0,
        }}
      >
        {/* Bridge towers */}
        <line x1="30" y1="30" x2="30" y2="70" />
        <line x1="70" y1="30" x2="70" y2="70" />
        {/* Suspension cables */}
        <line x1="30" y1="30" x2="50" y2="50" />
        <line x1="70" y1="30" x2="50" y2="50" />
        <line x1="30" y1="70" x2="50" y2="50" />
        <line x1="70" y1="70" x2="50" y2="50" />
      </svg>

      {/* Hollow center */}
      <div
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "white",
          zIndex: 1,
        }}
      />

      {/* Name bar */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-15%",
          width: "130%",
          height: 30,
          backgroundColor: tubeBlue,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: "white",
            fontFamily: tubeFont.style.fontFamily,
            letterSpacing: "0.05em",
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          JOHN SEONG
        </span>
      </div>
    </div>
  );
}

function Model({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath);
  const objRef = useRef<THREE.Object3D>();
  const [rotDir, setRotDir] = useState(1);
  const [rotY, setRotY] = useState(0);
  const speed = 0.001;
  const limit = MathUtils.degToRad(50);

  useFrame(() => {
    if (objRef.current) {
      const newY = rotY + speed * rotDir;
      if (Math.abs(newY) > limit) setRotDir(-rotDir);
      else setRotY(newY);
      objRef.current.rotation.y = newY;
    }
  });

  useEffect(() => {
    if (!objRef.current) return;
    objRef.current.traverse((c) => {
      if (c instanceof THREE.Mesh) c.material.side = THREE.DoubleSide;
    });
    objRef.current.rotation.set(
      MathUtils.degToRad(180),
      MathUtils.degToRad(40),
      MathUtils.degToRad(90)
    );
    objRef.current.scale.setScalar(20);
    const bbox = new Box3().setFromObject(objRef.current);
    const center = new Vector3();
    bbox.getCenter(center);
    objRef.current.position.copy(center.negate());
  }, [obj]);

  return <primitive object={obj} ref={objRef} />;
}

function GLTFModel({ modelPath, size }: { modelPath: string; size?: number }) {
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

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"benzene" | "gadolinium">(
    "benzene"
  );
  const benzeneRef = useRef<HTMLDivElement>(null);
  const gadoliniumRef = useRef<HTMLDivElement>(null);

  // Scroll-based tab switching
  useEffect(() => {
    const onScroll = () => {
      const benzeneTop = benzeneRef.current?.offsetTop || 0;
      const gadTop = gadoliniumRef.current?.offsetTop || 0;
      const scrollY = window.scrollY + window.innerHeight / 2;
      if (scrollY < gadTop) setActiveTab("benzene");
      else if (scrollY >= gadTop) setActiveTab("gadolinium");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="flex flex-col gap-6"
      style={{ background: tubeGreyBg, color: tubeText }}
    >
      {/* Header banner */}
      <div
        className="text-center py-8 bg-white border-b-8"
        style={{ borderColor: tubeBlue }}
      >
        <Link href="/" className="block w-fit mx-auto">
          <TubeRoundel />
        </Link>
        <p className="text-xl mt-2">SOFTWARE ARCHITECT. FILMMAKER. PILOT.</p>
        <span className="text-gray-500">wonmor@gmail.com</span>
        {/* Awards & Visa */}
        <div className="flex justify-center items-center gap-6 mt-4">
          <div
            className="rounded-full border-4 overflow-hidden"
            style={{
              borderColor: tubeRed,
              width: 100,
              height: 100,
              boxSizing: "border-box",
            }}
          >
            <Image
              src="/reach-logo.jpg"
              alt="WWDC23 Scholar"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="text-left">
            <p>Apple WWDC23 Swift Student Challenge Winner</p>
            <p className="text-xs text-gray-500 tracking-wider uppercase mb-2">
              INVITED TO APPLE PARK, CUPERTINO
            </p>
            <p className="flex items-center gap-1 mt-2">
              <Image
                src="/american-flag.png"
                alt="American Flag"
                width={24}
                height={16}
              />
              <span>US O-1A Extraordinary Ability</span>
            </p>
            <p className="flex items-center gap-1 mt-2">
              <Image src="/uk-flag.png" alt="UK Flag" width={24} height={16} />
              <span>UK Global Talent Visa Holder</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="w-fit m-auto flex flex-wrap justify-center gap-6 text-md font-medium text-[#003688]">
        <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://medium.com/@wonmor"
        >
          My Articles
        </a>
        <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://github.com/wonmor"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://www.linkedin.com/in/john-seong-9194321a9/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </nav>
      {/* Featured Media */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 tracking-wider uppercase mb-2">
          Featured in these Media
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 hover:shadow-lg transition-all"
          >
            <Image
              src="/mobilesyrup.png"
              alt="MobileSyrup"
              width={100}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </a>
          <a
            href="https://web.archive.org/web/20240530133558/https://hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2 hover:shadow-lg transition-all"
          >
            <Image
              src="/hdsb.svg"
              alt="HDSB"
              width={100}
              height={40}
              style={{
                objectFit: "contain",
                filter: "invert(1)", // inverts colors
              }}
            />
          </a>
        </div>
      </div>

      {/* Gadolinium / Benzene Tabs */}
      <div className="max-w-4xl mx-auto bg-white rounded-md p-4 shadow-md">
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "gadolinium"
                ? "bg-[#003688] text-white"
                : "bg-white text-[#003688] border border-[#003688]"
            }`}
            onClick={() => setActiveTab("gadolinium")}
          >
            Atom (Gd)
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "benzene"
                ? "bg-[#003688] text-white"
                : "bg-white text-[#003688] border border-[#003688]"
            }`}
            onClick={() => setActiveTab("benzene")}
          >
            Molecule (C₆H₆)
          </button>
        </div>

        <div ref={benzeneRef}>
          {activeTab === "benzene" && (
            <div className="bg-black rounded-md p-6 shadow-lg">
              <Suspense
                fallback={
                  <div className="p-20 text-center text-white font-thin text-3xl">
                    Loading Benzene Model...
                  </div>
                }
              >
                <Canvas
                  style={{ height: 300 }}
                  camera={{ position: [0, 0, 5] }}
                >
                  <ambientLight intensity={2} />
                  <GLTFModel modelPath="/model-6.gltf" size={0.3} />
                  <OrbitControls enablePan enableZoom enableRotate />
                </Canvas>
              </Suspense>
              <div className="text-center p-6 bg-gray-900 text-white">
                <h4 className="text-2xl tracking-wide">
                  Benzene Molecule – C₆H₆
                </h4>
                <p className="mt-2 text-gray-300">
                  Electron density calculated using DFT, with molecular orbital
                  visualisation. You can clearly see the p-orbitals overlapping
                  to form the π bonding orbitals. Generated using a tool I
                  developed: <code>ElectronVisual.org</code>.
                </p>
                <a
                  href="https://www.patreon.com/johnseong"
                  className="inline-block mt-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-[#003688] transition"
                >
                  Support me on Patreon
                </a>
              </div>
            </div>
          )}
        </div>

        <div ref={gadoliniumRef}>
          {activeTab === "gadolinium" && (
            <div className="bg-black rounded-md p-6 shadow-lg">
              <Suspense
                fallback={
                  <div className="p-20 text-center text-white font-thin text-3xl">
                    Loading Gadolinium Atom...
                  </div>
                }
              >
                <Canvas
                  style={{ height: 400 }}
                  camera={{ position: [0, 0, 5] }}
                >
                  <ambientLight intensity={2} />
                  <GLTFModel modelPath="/model-4.gltf" />
                  <OrbitControls enablePan enableZoom enableRotate />
                </Canvas>
              </Suspense>
              <div className="text-center p-6 bg-gray-900 text-white">
                <h4 className="text-2xl tracking-wide">
                  Gadolinium Atom – 4f⁷ Electron Shell
                </h4>
                <p className="mt-2 text-gray-300">
                  A 3D electron density plot of Gadolinium’s outermost electron
                  configuration (f-orbital), modeled using spherical harmonics.
                  Generated using my iOS app Atomizer AR.
                </p>
                <a
                  href="https://github.com/wonmor/ElectronVisualized"
                  className="inline-block mt-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-[#003688] transition"
                >
                  Source on GitHub
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ElectronVisual Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-md shadow-lg p-6">
        <h3
          className="text-3xl uppercase border-b-4 mb-4"
          style={{ borderColor: tubeBlue }}
        >
          ElectronVisual / Atomizer AR (Sept 2022 – Apr 2025)
        </h3>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>
            Quantum Mechanics Visualizer that uses DFT, across Web (Three.js),
            iOS, macOS, visionOS via Atomizer AR (10 K downloads). The very
            project that handed me the 2023 Apple WWDC Swift Student Challenge
            Award.
          </li>
          <li>
            Tech stack: Three.js, React, Redux, WebXR; Back-end: RDKit, SciPy,
            ASE, GPAW, Celery, Redis, Docker, AWS
          </li>
          <li>
            Featured on{" "}
            <a
              href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Professor Sir David Clary’s Book
            </a>
            ,{" "}
            <i className="text-sm">
              Walter Kohn (https://doi.org/10.1142/13806)
            </i>
          </li>
          <li>
            Watch demo walkthrough:{" "}
            <a
              href="https://www.youtube.com/watch?v=kHcdvyaqslU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              YouTube
            </a>
          </li>
        </ul>
        {/* App Store badge */}
        <div className="mt-6 flex justify-left">
          <a
            href="https://apps.apple.com/us/app/atomizer-ar/id6449015706"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atomizer AR on the App Store"
          >
            <img
              src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png?raw=true"
              alt="Download Atomizer AR on the App Store"
              height={50}
              style={{ height: 50, cursor: "pointer" }}
            />
          </a>
        </div>
        <a
          href="https://www.electronvisual.org"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
        >
          Visit <code>ElectronVisual.org</code>
        </a>
        <a
          href="https://github.com/wonmor/ElectronVisualized"
          className="inline-block mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          Source on GitHub
        </a>
      </section>

      {/* 3D Face Model */}
      <div className="max-w-4xl mx-auto bg-black rounded-md p-6 shadow-lg">
        <Suspense
          fallback={
            <div className="p-20 text-center text-white font-thin text-3xl">
              Loading 3D Model...
            </div>
          }
        >
          <Canvas style={{ height: 400 }} camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={3} />
            <Model modelPath="face_model1.obj" />
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        </Suspense>
        <div className="text-center p-6 bg-gray-900 text-white">
          <h4 className="text-2xl tracking-wide">
            3D Face Scan of Me, using an iPhone
          </h4>
          <p className="mt-2 text-gray-300">
            Portable, real‑time 3D face scanning app I developed for medical
            (vision and dental) applications and custom-fitted BCI headsets.
          </p>
          <a
            href="https://github.com/wonmor/OpticALLY-iOS"
            className="inline-block mt-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-[#003688] transition"
          >
            Source on GitHub
          </a>
        </div>
      </div>

      {/* OpticALLY Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <h3
          className="text-3xl uppercase border-b-4 mb-4"
          style={{ borderColor: tubeBlue }}
        >
          OpticALLY – Portable 3D Head Scanner
        </h3>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>
            Product demo:{" "}
            <a
              href="https://www.youtube.com/watch?v=LqiZKoXhtDA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              YouTube
            </a>
          </li>
          <li>iOS app using Swift & Objective‑C++ with C++ back‑end</li>
          <li>
            TrueDepth face scan with full point cloud processing using ICP,
            feature-based pose estimation, meshing, and point-cloud registration
          </li>
          <li>
            U.S. Provisional Patent pending (No. 63/727,879) for the method of
            rough point cloud alignment only using yaw, pitch, and roll values
            from the head pose estimation
          </li>
        </ul>
      </section>

      {/* Experience Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <h3
          className="text-3xl uppercase border-b-4 mb-4"
          style={{ borderColor: tubeBlue }}
        >
          Experience
        </h3>
        <div className="space-y-6 text-lg">
          <div>
            <h4 className="text-2xl">
              Reach Media Group – Senior Software Engineer (2025–)
            </h4>
            <p>
              Developing computer vision pipelines in C++ & Python (OpenCV,
              linear algebra), full-stack iOS, Objective-C, Swift, Vue based
              systems.
            </p>
          </div>
          <div>
            <h4 className="text-2xl">
              Seoul National University – Research Intern (Jul 2023)
            </h4>
            <p>
              Improved molecular visualizer using Python (SciPy, RDKit); GUI for
              AutoDock Vina; gained experience in Docker and server
              orchestration under Prof. Juyong Lee.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
