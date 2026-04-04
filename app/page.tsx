"use client";

import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Box3, Vector3, MathUtils } from "three";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";
import { ibmPlexSansKRFontStack, tubeFont } from "./fonts";
import { useI18n } from "./i18n/context";

const tubeRed = "#f77f6b"; // legacy accent red (kept for logos)
const tubeBlue = "#003688";
const tubeGreyBg = "#020824"; // dark navy background to match layout
const tubeText = "#f9fafb"; // light text on dark

function TubeRoundel() {
  const { locale } = useI18n();
  const nameFontFamily =
    locale === "ko" ? ibmPlexSansKRFontStack : tubeFont.style.fontFamily;

  const [waves, setWaves] = useState(
    Array.from({ length: 30 }).map(() => ({
      x: 10 + Math.random() * 80,
      y: 72 + Math.random() * 18,
      length: 2 + Math.random() * 5,
    }))
  );

  useEffect(() => {
    const speed = 0.3; // how fast the waves move per frame
    const interval = setInterval(() => {
      setWaves((prev) =>
        prev
          .map((wave) => ({ ...wave, x: wave.x + speed })) // move right
          .filter((wave) => wave.x <= 100) // remove if out of view
          .concat(
            Array.from({ length: 1 }).map(() => ({
              // generate new wave on left
              x: -5 + Math.random() * 5,
              y: 72 + Math.random() * 18,
              length: 2 + Math.random() * 5,
            }))
          )
      );
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

    const vw = 300;   // logical width of the SVG viewBox
  const vh = 160;   // logical height
  const cx = 150;   // center x
  const cy = 80;    // center y
  const outerR = 70; // outer radius of red circle
  const innerR = 35; // inner (white) hole radius
  const barH = 30;   // blue name bar height

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
        <line x1="30" y1="30" x2="30" y2="50" />
        <line x1="70" y1="30" x2="70" y2="50" />
        <line x1="30" y1="30" x2="50" y2="50" opacity={0.3} />
        <line x1="70" y1="30" x2="50" y2="50" opacity={0.3} />
        <line x1="30" y1="30" x2="0" y2="50" opacity={0.3} />
        <line x1="70" y1="30" x2="100" y2="50" opacity={0.3} />

        {/* Base */}
        <line x1="0" y1="70" x2="100" y2="70" opacity={0.2} />
        {/* Waves */}
        {waves.map((wave, i) => (
          <line
            key={i}
            x1={wave.x}
            y1={wave.y}
            x2={wave.x + wave.length}
            y2={wave.y}
            stroke="#003688"
            strokeOpacity={0.2}
            strokeWidth={1.2}
          />
        ))}
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
            fontFamily: nameFontFamily,
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

function TubeRoundelWith787({
  size = 140,
  wingColor = tubeBlue,
}: {
  size?: number;
  wingColor?: string;
}) {
  // scale relative to your TubeRoundel's base 140×140
  const base = 140;
  const s = size / base;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      {/* Long, thin 787-style wings behind the roundel */}
      <svg
        viewBox="0 0 140 140"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${s})`,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden
      >
        {/* Wings: thin stroked Bézier curves with raked tips */}
              {/* Wings: faint, thin, semi-transparent */}
        <g fill="none" stroke={wingColor} strokeOpacity="0.25" strokeLinecap="round">
          {/* Leading edge (left) */}
          <path
            d={`
              M 38 78
              C  10 70  -30 58  -85 45
            `}
            strokeWidth="2"
          />
          {/* Trailing edge (left) */}
          <path
            d={`
              M 40 82
              C  12 74  -28 63  -80 52
            `}
            strokeWidth="1.5"
          />
          {/* Raked tip (left) */}
          <path d={`M -85 45 L -92 42`} strokeWidth="1.5" />

          {/* Leading edge (right) */}
          <path
            d={`
              M 102 78
              C 130 70  170 58  225 45
            `}
            strokeWidth="2"
          />
          {/* Trailing edge (right) */}
          <path
            d={`
              M 100 82
              C 128 74  168 63  220 52
            `}
            strokeWidth="1.5"
          />
          {/* Raked tip (right) */}
          <path d={`M 225 45 L 232 42`} strokeWidth="1.5" />
        </g>

        {/* Very faint fill between edges */}
        <g fill={wingColor} opacity="0.05">
          <path d={`M 38 78 Q -5 66 -85 45 Q -30 58 10 70 Z`} />
          <path d={`M 102 78 Q 145 66 225 45 Q 170 58 130 70 Z`} />
        </g>


        {/* Subtle wing fill (kept ultra-thin) */}
        <g fill={wingColor} opacity="0.06">
          <path d={`M 38 78 Q -5 66 -85 45 Q -30 58 10 70 Z`} />
          <path d={`M 102 78 Q 145 66 225 45 Q 170 58 130 70 Z`} />
        </g>

           {/* Engines — full circles, faint to match wings */}
        <g stroke={wingColor} strokeWidth="2" fill="none" opacity="0.25">
          {/* Left engine */}
          <circle cx="-5" cy="96" r="14" />
          {/* Right engine */}
          <circle cx="145" cy="96" r="14" />
        </g>

      </svg>

      {/* Your original roundel, unchanged, on top */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <TubeRoundel />
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
  const { t } = useI18n();
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
      <div className="text-center py-8 bg-gradient-to-b from-[#f5f0e6] via-[#f5f0e6] to-[#020824] text-black">
        <Link href="/" className="block w-fit mx-auto">
          <TubeRoundelWith787 />
        </Link>
      <p className="mt-4 text-2xl tracking-[0.25em] uppercase">
        {t("hero.line1")}
        <br />
        {t("hero.line2")}
      </p>

        <span className="text-black">{t("hero.email")}</span>
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
              alt={t("awards.reachAlt")}
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

          <div className="text-left text-white">
            <p>{t("awards.wwdc")}</p>
            <p className="mb-2 text-xs uppercase tracking-wider text-gray-200">
              {t("awards.wwdcVenue")}
            </p>
            <p className="mt-2 flex items-center gap-1">
              <Image src="/uk-flag.png" alt="UK Flag" width={24} height={16} />
              <span className="text-white">{t("awards.ukVisa")}</span>
            </p>
            <p className="mt-2 flex items-center gap-1">
              <Image
                src="/american-flag.png"
                alt="American Flag"
                width={24}
                height={16}
              />
              <span className="text-white">{t("awards.usVisa")}</span>
            </p>
            <div className="flex items-center gap-1 mt-2">
            <Image src="/south-korea-flag.svg" alt="South Korean Flag" width={24} height={16} />
            <Image src="/canada-flag.svg" alt="Canadian Flag" width={24} height={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Media */}
      <div className="mt-4 text-center">
        <p className="mb-2 text-xs uppercase tracking-wider text-gray-400">
          {t("media.featured")}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-900 border border-white/10 rounded-md p-2 hover:bg-black transition-all"
          >
            <Image
              src="/mobilesyrup.png"
              alt="MobileSyrup"
              width={100}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </a>
          <a
            href="https://web.archive.org/web/20240530133558/https://hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-900 border border-white/10 rounded-md p-2 hover:bg-black transition-all"
          >
            <Image
              src="/hdsb.svg"
              alt="HDSB"
              width={100}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </a>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="w-fit m-auto flex flex-wrap justify-center gap-6 text-md font-medium text-gray-300">
        {/* <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://medium.com/@wonmor"
        >
          Articles
        </a> */}
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://github.com/wonmor"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://www.linkedin.com/in/john-seong-9194321a9/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://flickr.com/photos/johnseongemini8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flickr
        </a>
      </nav>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6">
      {/* Gadolinium / Benzene Tabs */}
      <div className="w-full bg-black/60 border border-white/10 rounded-md p-4 shadow-md">
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "gadolinium"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white/60"
            }`}
            onClick={() => setActiveTab("gadolinium")}
          >
            {t("gltf.tabGd")}
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "benzene"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white/60"
            }`}
            onClick={() => setActiveTab("benzene")}
          >
            {t("gltf.tabBenzene")}
          </button>
        </div>

        <div ref={benzeneRef}>
          {activeTab === "benzene" && (
            <div className="bg-black rounded-md p-6 shadow-lg">
              <Suspense
                fallback={
                  <div className="p-20 text-center text-3xl font-thin text-white">
                    {t("gltf.loadingBenzene")}
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
              <div className="bg-gray-900 p-6 text-center text-white">
                <h4 className="text-2xl tracking-wide">
                  {t("gltf.benzeneTitle")}
                </h4>
                <p className="mt-2 text-gray-300">
                  {t("gltf.benzeneBody")}{" "}
                  <a
                    href="https://electronvisual.org"
                    className="hover:underline"
                  >
                    <code>ElectronVisual.org</code>
                  </a>
                  .
                </p>
                <a
                  href="https://electronvisual.org"
                  className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#003688]"
                >
                  {t("gltf.benzeneCta")} <code>ElectronVisual.org</code>
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
                  <div className="p-20 text-center text-3xl font-thin text-white">
                    {t("gltf.loadingGd")}
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
              <div className="bg-gray-900 p-6 text-center text-white">
                <h4 className="text-2xl tracking-wide">{t("gltf.gdTitle")}</h4>
                <p className="mt-2 text-gray-300">{t("gltf.gdBody")}</p>
                <a
                  href="https://github.com/wonmor/ElectronVisualized"
                  className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#003688]"
                >
                  {t("gltf.github")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ElectronVisual Section */}
      <section className="w-full bg-black/60 border border-white/10 rounded-md shadow-lg p-6">
        <h3 className="mb-4 text-3xl uppercase">
          {t("electron.title")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("electron.li1")}</li>
          <li>{t("electron.li2")}</li>
          <li>
            {t("electron.li3Before")}{" "}
            <a
              href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline"
            >
              {t("electron.li3Book")}
            </a>
            {t("electron.li3After")}{" "}
            <i className="text-sm">
              {t("electron.li3Title")} (
              <a
                href="https://doi.org/10.1142/13806"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                https://doi.org/10.1142/13806
              </a>
              )
            </i>
          </li>
          <li>
            {t("electron.li4")}{" "}
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
            aria-label={t("electron.appStoreAtomizer")}
          >
            <img
              src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png?raw=true"
              alt={t("electron.appStoreBadgeAlt")}
              height={50}
              style={{ height: 50, cursor: "pointer" }}
            />
          </a>
        </div>
        <a
          href="https://www.electronvisual.org"
            className="mr-2 mt-4 inline-block rounded bg-white px-4 py-2 text-black hover:bg-gray-200"
        >
          {t("electron.visit")} <code>ElectronVisual.org</code>
        </a>
        <a
          href="https://github.com/wonmor/ElectronVisualized"
          className="mt-2 inline-block rounded border border-white/70 px-4 py-2 text-white hover:bg-white hover:text-black"
        >
          {t("gltf.github")}
        </a>
      </section>

      {/* 3D Face Model */}
      <div className="w-full bg-black/60 border border-white/10 rounded-md p-6 shadow-lg">
        <Suspense
          fallback={
            <div className="p-20 text-center text-3xl font-thin text-white">
              {t("face.loading")}
            </div>
          }
        >
          <Canvas style={{ height: 400 }} camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={3} />
            <Model modelPath="face_model1.obj" />
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        </Suspense>
        <div className="bg-gray-900 p-6 text-center text-white">
          <h4 className="text-2xl tracking-wide">{t("face.title")}</h4>
          <p className="mt-2 text-gray-300">{t("face.body")}</p>
          <a
            href="https://www.youtube.com/watch?v=LqiZKoXhtDA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-black"
          >
            {t("face.cta")}
          </a>
        </div>
      </div>

      {/* OpticALLY Section */}
      <section className="w-full bg-black/60 border border-white/10 rounded-md shadow-md p-6">
        <h3 className="mb-4 text-3xl uppercase">{t("orch.title")}</h3>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("orch.li1")}</li>
          <li>{t("orch.li2")}</li>
          <li>{t("orch.li3")}</li>
        <div className="mt-6 flex justify-left">
          <a
            href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/bj/app/orch-3d-head-face-scan/id6468313142&ved=2ahUKEwj6r4XErruPAxWlDjQIHZQ5OhgQFnoECBsQAQ&usg=AOvVaw3DnwsFFuRSjo5L9x6z3-PF"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("orch.appStoreAlt")}
          >
            <img
              src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png?raw=true"
              alt={t("orch.appStoreAlt")}
              height={50}
              style={{ height: 50, cursor: "pointer" }}
            />
          </a>
        </div>
        </ul>
      </section>

      {/* Experience Section */}
      <section className="w-full bg-black/60 border border-white/10 rounded-md shadow-md p-6">
        <h3 className="mb-4 text-3xl uppercase">{t("exp.title")}</h3>
        <div className="space-y-6 text-lg">
          <div>
            <h4 className="text-2xl">{t("exp.orchestr")}</h4>
            <p>
              <a
                href={t("exp.orchestrSite")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                {t("exp.orchestrSite")}
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-2xl">{t("exp.reach")}</h4>
            <p>{t("exp.reachBody")}</p>
          </div>
          <div>
            <h4 className="text-2xl">{t("exp.snu")}</h4>
            <p>{t("exp.snuBody")}</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="w-full rounded-md border border-white/10 bg-black/60 p-6 shadow-md">
        <h3 className="mb-4 text-3xl uppercase">{t("edu.title")}</h3>
        <ol className="list-decimal space-y-6 pl-6 text-lg marker:text-gray-400">
          <li>
            <h4 className="text-2xl">{t("edu.hub.title")}</h4>
            <p className="text-gray-300">{t("edu.hub.detail")}</p>
          </li>
          <li>
            <h4 className="text-2xl">{t("edu.ocfc.title")}</h4>
            <p className="text-gray-300">{t("edu.ocfc.detail")}</p>
          </li>
          <li>
            <h4 className="text-2xl">{t("edu.sunrise.title")}</h4>
            <p className="text-gray-300">{t("edu.sunrise.detail")}</p>
          </li>
          <li>
            <p className="text-2xl">{t("edu.uci")}</p>
          </li>
        </ol>
      </section>
      </div>
    </div>
  );
}
