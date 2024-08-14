"use client";

import Image from "next/image";
import Typewriter from 'typewriter-effect';
import React, { Suspense } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Box3, Vector3, MathUtils } from "three";

function Model({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath);
  const objRef = useRef<THREE.Object3D>();

  const [rotationDirection, setRotationDirection] = useState(1);
  const [rotationY, setRotationY] = useState(0);
  const rotationSpeed = 0.001; // Slower rotation speed
  const rotationLimit = MathUtils.degToRad(50); // Small range limit

  useFrame(() => {
    if (objRef.current) {
      const newYRotation = rotationY + rotationSpeed * rotationDirection;
      if (Math.abs(newYRotation) > rotationLimit) {
        setRotationDirection(rotationDirection * -1);
      } else {
        setRotationY(newYRotation);
      }
      objRef.current.rotation.y = newYRotation;
    }
  });

  useEffect(() => {
    if (objRef.current) {
      objRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide;
        }
      });

      objRef.current.rotation.x = MathUtils.degToRad(180);
      objRef.current.rotation.y = MathUtils.degToRad(40);
      objRef.current.rotation.z = MathUtils.degToRad(90);

      objRef.current.scale.x = 20.0;
      objRef.current.scale.y = 20.0;
      objRef.current.scale.z = 20.0;

      const boundingBox = new Box3().setFromObject(objRef.current);
      const center = new Vector3();
      boundingBox.getCenter(center);
      objRef.current.position.x = -center.x;
      objRef.current.position.y = -center.y;
      objRef.current.position.z = -center.z;
    }
  }, [obj]);

  return <primitive object={obj} ref={objRef} />;
}

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl text-center font-thin px-6">
       <Typewriter
            options={{
              strings: ["Hi, I’m John Seong.", " I Love Film & Computers."],
              autoStart: true,
              loop: true,
            }}
          />
          </h1>
            <div className="flex flex-col items-center justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/muQHUdCSyBc?si=HBTOSGeI7cZ_ZK4Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/y4GvrWos3Bo?si=0o3tW9Q95Zq10TTA" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/eVRG_xXRwas?si=nyl7IKnf7foQ8UNQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/7CgN6cBOriI?si=m5jfo_GbIE5YBC7X" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
    <div style={{ position: "relative" }}>
      <PortfolioContent />
    </div>
    </div>
  );
}

function PortfolioContent() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-6 bg-black text-white">
      <section className="bg-gray-800 shadow-md rounded-lg p-6 my-6 max-w-4xl mx-auto">
        <h3 className="text-5xl font-thin mb-4">Passion Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <Image
              src="/molecular-orbital.png"
              alt="Project 2"
              width={300}
              height={200}
              className="rounded-md"
            />
            <h4 className="text-xl font-semibold mt-3">
              Atomizer AR <span className="font-light">(iOS, iPadOS, visionOS)</span><br />ElectronVisualized <span className="font-light">(Web)</span>
            </h4>
            <p className="text-md text-gray-400 mt-1">
              3D Visualization of Quantum Mechanics.
              <br />
              Proteins, Atomic and Molecular Orbitals.
              <br />
              DFT, Hatree-Fock, and Spherical Harmonics.
              <br />
              <br />
              Visuals on the application I developed were honorably mentioned in the biography of theoretical physicist Walter Kohn, written by <a href="https://en.wikipedia.org/wiki/David_Clary"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline">Professor Sir David Clary FRS</a> at University of Oxford. Available under <a href="https://www.worldscientific.com/worldscibooks/10.1142/13806?srsltid=AfmBOopgxDKEITjI21_yS4EtRKo6Zd1X6-b1o-b7_wGaLUa8TpXs5t8k#t=aboutBook"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline italic">World Scientific Publishing</a>.
            </p>
            <a
              href="https://electronvisual.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              Explore the Web Version
            </a>
            <br />
            <a
              href="https://apps.apple.com/us/app/atomizer-ar-quantum-visuals/id6449015706" // App Store URL
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              Download on the App Store
            </a>
          </div>
          <div className="bg-black p-4 rounded-lg">
          <Suspense fallback={<div className="flex justify-center align-center items-center text-center py-20"><h1 className="text-4xl font-thin">Loading...</h1></div>}>
        <Canvas
        className="grayscale"
          style={{ height: "500px", background: "transparent" }}
          camera={{ position: [0, 0, 5] }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={3.0} />
          <Model modelPath="face_model1.obj" />
        </Canvas>
      </Suspense>
      <section className="text-center p-6">
        <h2 className="text-3xl text-white">
          Scanned only using<br/>an iPhone
        </h2>
        <p className="text-xl mt-2 text-gray-400">
          Rendered real-time, Vision Pro-level 3D mapping in the palm of your hand.
          <br />
          One of the many softwares that I developed!
        </p>
      </section>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="fill-width-available p-6 max-w-4xl mb-12 flex flex-col items-center justify-center bg-gray-800 rounded-lg">
        <h3 className="text-5xl font-thin mb-4">Things I've Done</h3>

        {/* Event Photographer */}
        <div className="mb-6">
          <Image
            className="rounded-full border-2 border-gray-700"
            src="/university-logo.jpg" // Replace with the path to The Paul Merage School of Business logo
            alt="University of California, Irvine - The Paul Merage School of Business"
            width={100}
            height={100}
          />
          <h4 className="text-xl font-semibold mt-2">Event Photographer, Drone Pilot</h4>
          <p className="text-gray-400">
            University of California, Irvine - The Paul Merage School of
            Business · Part-time · Started in Dec 2023
          </p>
          <p className="text-gray-400">
            Skills: Commercial Photography, Cinematography, Adobe Lightroom,
            Adobe Premiere Pro
          </p>
          <a
              href="https://www.flickr.com/people/johnseongemini8/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              View Samples of my Photos
            </a>
        </div>

        {/* Undergraduate Researcher */}
        <div className="mb-6">
          <Image
            className="rounded-full border-2 border-gray-700"
            src="/snu-logo.jpg" // Replace with the path to Seoul National University logo
            alt="Seoul National University"
            width={100}
            height={100}
          />
          <h4 className="text-xl font-semibold mt-2">Research Assistant in Bioinformatics</h4>
          <p className="text-gray-400">
            Seoul National University · Internship · Jul 2023 - Aug 2023
          </p>
          <p className="text-gray-400">
            Skills: Research, Computer Science, Computational Chemistry, AutoDock Vina, Python, React
          </p>
        </div>

        {/* Software Engineer */}
        <div className="mb-6">
          <Image
            className="rounded-full border-2 border-gray-700"
            src="/reach-logo.jpg" // Placeholder for Reach company logo
            alt="Reach"
            width={100}
            height={100}
          />
          <h4 className="text-xl font-semibold mt-2">Computer Vision Software Engineer</h4>
          <p className="text-gray-400">
            Reach · Contract · Started in Jun 2023
          </p>
          <p className="text-gray-400">
            Skills: C++, Objective-C, SwiftUI, Metal Shader Language, OpenCV, Open3D, Python,
            TensorFlow
          </p>
        </div>

        <div className="flex flex-col p-5 rounded-xl bg-black">
          {/* Other Experiences */}
          <h4 className="text-5xl font-thin mb-4">Other Stuff</h4>

          {/* Content Writer */}
          <p className="mb-2">
            <span className="font-semibold">Web Content Writer, </span>
            Daeryun Law Firm LLC. · Part-time · Jan 2023 - Aug 2023
          </p>

          {/* Line Cook */}
          <p className="mb-2">
            <span className="font-semibold">Line Cook, </span>
            The Famous Owl of Minerva · Part-time · Feb 2023 - May 2023
          </p>

          {/* Shad Canada */}
          <p className="mb-2">
            <span className="font-semibold">
              Fellow at Western University,{" "}
            </span>
            Shad Canada · Seasonal · Jul 2022
          </p>

          {/* Business & Media Strategist */}
          <p className="mb-2">
            <span className="font-semibold">Public Outreach, </span>
            Garth Webb Robotics · Seasonal · Oct 2021 - Apr 2022
          </p>

          <p className="text-md text-gray-400 mt-1">
              I also happen to be an aspiring actor/filmmaker who is trying to enter the Hollywood industry! I have experience with both cinematography (assisting the business school to take candid shots and portraits) as well as CGI/VFX using Blender.
              Check out my filmography/portfolio <a href="https://drive.google.com/file/d/1pMhuKsz90JDSwXpynwpho4C5jbflLNeI/view?usp=sharing"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline">here</a>.
            </p>
        </div>
      </section>
    </div>
  );
}
