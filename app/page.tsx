"use client";

import Image from "next/image";
import React from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Box3, Vector3, MathUtils } from 'three';

function Model({ modelPath }: { modelPath: string }) {
  const obj = useLoader(OBJLoader, modelPath);
  const objRef = useRef<THREE.Object3D>();

  useEffect(() => {
    if (objRef.current) {
      objRef.current.rotation.x = MathUtils.degToRad(180);
      objRef.current.rotation.y = MathUtils.degToRad(40);
      objRef.current.rotation.z = MathUtils.degToRad(90);

      objRef.current.scale.x = 15.0;
      objRef.current.scale.y = 15.0;
      objRef.current.scale.z = 15.0;

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
    <div style={{ position: 'relative' }}>
      <Canvas
        style={{ height: '500px', background: 'transparent' }}
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={3.0} />
        <Model modelPath="face_model1.obj" />
        <OrbitControls />
      </Canvas>
      <PortfolioContent />
    </div>
  );
}

function PortfolioContent() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-6 bg-gray-900 text-white">
      {/* Inspirational Quote */}
      <section className="text-center p-6">
        <h2 className="text-3xl text-white">"I skate to where the puck is going to be, not where it has been."</h2>
        <p className="text-xl mt-2 text-gray-400">– Wayne Gretzky, Former NHL Player</p>
      </section>

      {/* Projects */}
      <section className="bg-gray-800 shadow-md rounded-lg p-6 my-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placeholder for Project 1 */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <Image src="/placeholder-image.png" alt="Project 1" width={300} height={200} className="rounded-md" />
            <h4 className="text-xl font-semibold mt-3">Stealth Project 1</h4>
            <p className="text-md text-gray-400 mt-1">A brief description of the project, its goals, and technologies used.</p>
          </div>
          {/* Placeholder for Project 2 */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <Image src="/placeholder-image.png" alt="Project 2" width={300} height={200} className="rounded-md" />
            <h4 className="text-xl font-semibold mt-3">Stealth Project 2</h4>
            <p className="text-md text-gray-400 mt-1">A brief description of the project, its goals, and technologies used.</p>
          </div>
        </div>
      </section>

       {/* Experience Section */}
       <section className="fill-width-available p-6 max-w-4xl mb-12 flex flex-col items-center justify-center bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Experience & Skills</h3>
        
        {/* Event Photographer */}
        <div className="mb-6">
          <Image
            className="rounded-full border-2 border-gray-700"
            src="/university-logo.jpg" // Replace with the path to The Paul Merage School of Business logo
            alt="University of California, Irvine - The Paul Merage School of Business"
            width={100}
            height={100}
          />
          <h4 className="text-xl font-semibold mt-2">Event Photographer</h4>
          <p className="text-gray-400">University of California, Irvine - The Paul Merage School of Business · Part-time · Dec 2023 - Present</p>
          <p className="text-gray-400">Skills: Commercial Photography, Cinematography, Adobe Lightroom, Adobe Premiere Pro</p>
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
          <h4 className="text-xl font-semibold mt-2">Undergraduate Researcher</h4>
          <p className="text-gray-400">Seoul National University · Internship · Jul 2023 - Aug 2023</p>
          <p className="text-gray-400">Skills: Research, Computer Science, Computational Chemistry, Python, Communication, JavaScript</p>
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
          <p className="text-gray-400">Reach · Contract · Jun 2023 - Aug 2023</p>
          <p className="text-gray-400">Developed a 3D face scan software for eyewear products using iPhone's TrueDepth sensor.</p>
        </div>

        {/* Other Experiences */}
        <h4 className="text-xl font-semibold mb-4 mt-6">Other Experiences</h4>

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
          <span className="font-semibold">Fellow, </span>
          Shad Canada · Seasonal · Jul 2022
        </p>

        {/* Business & Media Strategist */}
        <p className="mb-2">
          <span className="font-semibold">Public Outreach, </span>
          Garth Webb Robotics · Seasonal · Oct 2021 - Apr 2022
        </p>
      </section>
    </div>
  );
}