"use client";

import Image from "next/image";
import Typewriter from 'typewriter-effect';
import localFont from 'next/font/local'

const lightFont = localFont({ src: '../../public/GmarketSansLight.otf' })
const mediumFont = localFont({ src: '../../public/GmarketSansMedium.otf' })

import React, { Suspense } from "react";

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
    <div className="flex flex-col gap-4">
         <h1 className="text-3xl text-center font-thin px-6">
       <Typewriter
            options={{
              strings: ["현대 미술과 하이-테크의 감각적인 만남.", "성원모의 누리집에 오신 것을 환영합니다."],
              autoStart: true,
              loop: true,
            }}
          />
          </h1>

    <div style={{ position: "relative" }}>
      <Suspense fallback={<div className="flex justify-center align-center items-center text-center py-20"><h1 className="text-4xl font-thin">불러오는 중...</h1></div>}>
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
      <PortfolioContent />
    </div>
    </div>
  );
}

function PortfolioContent() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-6 bg-black text-white">
      {/* Inspirational Quote */}
      <section className="text-center p-6">
        <h2 className="text-3xl text-white">
          LiDAR 얼굴 스캔, 그것도 오직 아이폰을 이용해서.
        </h2>
        <p className="text-xl mt-2 text-gray-400">
          그리고 치과, 성형외과 등지에서 사용 가능한 가히 혁신적인 소프트웨어.<br />C++로 점철된 복잡한 코드 속에서, Vision Pro 수준 공간 3D 매핑을<br />오직 아이폰의 전방 TrueDepth 카메라로 구현하였습니다.
        </p>
      </section>

      <section className="bg-gray-800 shadow-md rounded-lg p-6 my-6 max-w-4xl mx-auto">
        <h3 className="text-5xl font-thin mb-4">내 프로젝트</h3>
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
              양자 역학를 3D로 시각화하세요.
              <br />
              단백질, 원자 및 분자 오비탈.
              <br />
              DFT, Hatree-Fock, 그리고 구면 조화 함수들.
              <br />
              <br />
              제가 개발한 응용 프로그램의 시각 자료는 이론 물리학자 Walter Kohn의 전기에서 명예롭게 언급되었습니다. 이 전기는 <a href="https://en.wikipedia.org/wiki/David_Clary"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline">David Clary FRS 교수</a>에 의해 작성되었으며, 옥스퍼드 대학교에서 제공됩니다. <i>World Scientific Publishing</i>에서 이용 가능합니다. Amazon 링크는 곧 게시될 예정입니다.
            </p>
            <a
              href="https://apps.apple.com/us/app/atomizer-ar-quantum-visuals/id6449015706" // App Store URL
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              App Store에서 다운로드
            </a>
            <br />
            <a
              href="https://electronvisual.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              웹 버전 탐색
            </a>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h2 className="text-3xl font-thin mt-3">ORCHESTR<br />SIMULATIONS</h2>
            <p className="text-md text-gray-400 my-2">
              실제 조종사와 비행 시뮬레이터 조종사를 위한 EFB(전자 비행 가방) 앱 및 도구 제작.
              <br /><br />
              정상 및 비상 상황 모두에서 Airbus A320의 작동 단계를 보여주는 3D 워크어라운드 앱을 개발 중입니다. 모든 스위치와 패널은 실제 작동 매뉴얼과 1:1로 대응하는 자세한 라벨이 붙어 있습니다.
              <br /><br />
              또한, 음성과 이미지를 지원하는 GPT-4o 모델을 기반으로 하는 종합적인 VATSIM 파일럿 교육 모듈을 개발할 계획입니다. 이는 BeyondATC 또는 SayIntentions와 같은 기존 솔루션을 대체하지 않지만 모바일 장치에서 편리하게 사용할 수 있습니다. iPad 및 Vision Pro에서 새로운 VATSIM 컨트롤러 클라이언트도 개발 중입니다!
            </p>
            <a
              href="https://orchestrsim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              웹사이트 방문
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
            <h2 className="text-4xl my-3 text-black">캐주얼 스트리트웨어에 공학을 접목하다.</h2>
           
            <a
              href="https://shreddedapart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-500"
            >
              스토어 방문하기
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
        <h3 className="text-5xl font-thin mb-4">내가 한 일</h3>

        {/* Event Photographer */}
        <div className="mb-6">
          <Image
            className="rounded-full border-2 border-gray-700"
            src="/university-logo.jpg" // Replace with the path to The Paul Merage School of Business logo
            alt="University of California, Irvine - The Paul Merage School of Business"
            width={100}
            height={100}
          />
          <h4 className="text-xl font-semibold mt-2">행사 사진작가 | 드론 조종사</h4>
          <p className="text-gray-400">
            University of California, Irvine - The Paul Merage School of
            Business · 파트타임 · 2023년 12월 시작
          </p>
          <p className="text-gray-400">
            스킬: 상업 사진 촬영, 영화 촬영, Adobe Lightroom,
            Adobe Premiere Pro
          </p>
          <a
              href="https://www.flickr.com/people/johnseongemini8/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-5 inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-blue-700"
            >
              내 사진 샘플 보기
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
          <h4 className="text-xl font-semibold mt-2">계산화학 및 바이오정보학 연구생</h4>
          <p className="text-gray-400">
            서울대학교 · 인턴십 · 2023년 7월 - 2023년 8월
          </p>
          <p className="text-gray-400">
            스킬: 연구, 컴퓨터 과학, 계산화학, AutoDock Vina, Python, React
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
          <h4 className="text-xl font-semibold mt-2">컴퓨터 비전 소프트웨어 엔지니어</h4>
          <p className="text-gray-400">
            Reach · 계약직 · 2023년 6월 시작
          </p>
          <p className="text-gray-400">
            스킬: C++, Objective-C, SwiftUI, Metal Shader Language, OpenCV, Open3D, Python,
            TensorFlow
          </p>
        </div>

        <div className="flex flex-col p-5 rounded-xl bg-black">
          {/* Other Experiences */}
          <h4 className="text-5xl font-thin mb-4">다른 활동들</h4>

          {/* Content Writer */}
          <p className="mb-2">
            <span className="font-semibold">웹 콘텐츠 작가, </span>
            법무법인 대륜 · 파트타임 · 2023년 1월 - 2023년 8월
          </p>

          {/* Line Cook */}
          <p className="mb-2">
            <span className="font-semibold">라인 요리사, </span>
            The Famous Owl of Minerva · 파트타임 · 2023년 2월 - 2023년 5월
          </p>

          {/* Shad Canada */}
          <p className="mb-2">
            <span className="font-semibold">
              웨스턴 대학교 연구원,{" "}
            </span>
            Shad Canada · 시즌제 · 2022년 7월
          </p>

          {/* Business & Media Strategist */}
          <p className="mb-2">
            <span className="font-semibold">공공 홍보, </span>
            Garth Webb Robotics · 시즌제 · 2021년 10월 - 2022년 4월
          </p>

          <p className="text-md text-gray-400 mt-1">
              저는 또한 할리우드 산업에 진입하려고 하는 인디 영화 제작자이기도 합니다! 저는 상업 사진 촬영과 초상화 촬영을 도와주며 영화 촬영에 대한 경험이 있으며, Blender를 사용한 CGI/VFX 작업도 경험이 있습니다.
              제 영화 포트폴리오를 <a href="https://drive.google.com/file/d/1pMhuKsz90JDSwXpynwpho4C5jbflLNeI/view?usp=sharing"  target="_blank"
              rel="noopener noreferrer" className="text-white hover:underline">여기서</a> 확인하세요.
            </p>
        </div>
      </section>
    </div>
  );
}
