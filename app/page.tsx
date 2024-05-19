"use client";

import Image from "next/image";
import React from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "@react-three/drei";
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
    <div style={{ position: "relative" }}>
      <Canvas
        style={{ height: "500px", background: "transparent" }}
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={3.0} />
        <Model modelPath="face_model1.obj" />
      </Canvas>
      <PortfolioContent />
    </div>
  );
}

function PortfolioContent() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-6 bg-black text-white">
      {/* Inspirational Quote */}
      <section className="text-center p-6">
        <h2 className="text-3xl text-white">
          Scanned only using an iPhone
        </h2>
        <p className="text-xl mt-2 text-gray-400">
          Rendered real-time, in fact this is one of the many projects that I developed
        </p>
      </section>

      <section className="bg-gray-800 shadow-md rounded-lg p-6 my-6 max-w-4xl mx-auto">
        <h3 className="text-5xl font-thin mb-4">Projects</h3>
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
              rel="noopener noreferrer" className="text-white hover:underline">Professor Sir David Clary FRS</a> at University of Oxford. Available under <i>World Scientific Publishing</i>. Amazon links will be posted soon.
            </p>
            <a
              href="https://apps.apple.com/us/app/atomizer-ar-quantum-visuals/id6449015706" // App Store URL
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              Download on the App Store
            </a>
            <br />
            <a
              href="https://electronvisual.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              Explore the Web Version
            </a>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-5xl font-thin mt-3">ORCHESTR<br />SIMULATIONS</h2>
            <p className="text-md text-gray-400 my-2">
              Building EFB (Electronic Flight Bag) apps and tools for both real-life and Flight Simulator pilots.
              <br /><br />
              Developing a 3D walkaround app that shows you the steps of operating an Airbus A320 in both normal and emergency circumstances. All the switches and panels are labelled in a detailed manner that are 1:1 correspondant to the real operational manual.
              <br /><br />
              Additionally, there are plans set to develop an all-emcompassing VATSIM pilot training module powered by the GPT-4o model, which supports voice and image. This won't replace existing solutions like BeyondATC or SayIntentions, but will be conveniently available on mobile devices. An all-new VATSIM controller client on iPad and Vision Pro is also in the works!
            </p>
            <a
              href="https://orchestrsim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              Visit the Website
            </a>
            <Image
              src="/orchestr-sim.png"
              alt="Orchestr Simulations"
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="bg-white bg-opacity-90 p-4 rounded-lg mt-4">
           <Image
              src="/shredded-apart.png"
              alt="shredded-apart"
              width={150}
              height={150}
              className="rounded-md"
            />
            <h2 className="text-4xl my-3 text-black">Bringing Engineering to Casual Streetwear.</h2>
           
            <a
              href="https://shreddedapart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-500"
            >
              Visit the Store
            </a>
            <Image
              src="/tripleseven-sweatshirt.png"
              alt="TripleSeven Shirt"
              width={300}
              height={200}
              className="rounded-md"
            />
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
          <h4 className="text-xl font-semibold mt-2">Event Photographer | Drone Pilot</h4>
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
              I also happen to be an avid filmmaker who is trying to enter the Hollywood industry! I have experience with both cinematography (assisting the business school to take candid shots and portraits) as well as CGI/VFX using Blender.
              Check out my filmography/portfolio <a href="https://drive.google.com/file/d/1pMhuKsz90JDSwXpynwpho4C5jbflLNeI/view?usp=sharing"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline">here</a>.
            </p>
        </div>
      </section>
    </div>
  );
}
