export type Locale = "en" | "fr" | "ko";

export const messages = {
  en: {
    "meta.title": "John Seong",
    "meta.description":
      "Hi, I'm John. I love aerospace, software, and design. Welcome to my personal website.",
    "topBar.copyright": "NO COOKIES © {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "Language",

    "privacy.title": "Privacy Policy",
    "privacy.body":
      "We do not collect any usage of cookie data. Your rights under UK GDPR apply.",
    "privacy.close": "Close",

    "eula.title": "EULA",
    "eula.body":
      "Any software made by this company is licensed (UK law): no reverse engineering or redistribution.",
    "eula.close": "Close",

    "footer.photo1Caption": "with iJustine, at Apple Park during WWDC23",
    "footer.photo2Caption":
      "with my flight instructor at John Wayne Airport",
    "footer.video1Caption":
      "Microsoft Flight Simulator with brain-computer interface (BCI) control",
    "footer.video2Caption":
      "3D head scan using only an iPhone — for pilot helmet design",

    "orchestr.title": "ORCHESTR",
    "orchestr.subtitle": "AEROSPACE",
    "orchestr.badge": "MY STARTUP",
    "orchestr.intro":
      "Introducing Orch Avionic 1 EFB.",
    "orchestr.new": "NEW",
    "orchestr.tagline":
      "Your Predictive* Copilot in GA Flying.",
    "orchestr.taglineFrNote":
      "Votre copilote prédictif* en aviation générale.",
    "orchestr.features":
      "ADS-B, GPS, handheld radio, fuel calculation and Jeppesen* charts. All in one form factor.",
    "orchestr.cta": "Check it out",

    "hero.line1": "CREATIVE WORK",
    "hero.line2": "AEROSPACE",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 Swift Challenge Winner",
    "awards.wwdcVenue": "AT APPLE PARK, CUPERTINO",
    "awards.ukVisa": "UK Global Talent Visa Holder",
    "awards.usVisa": "US O-1A Extraordinary Ability",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "Featured in these Media",

    "gltf.tabGd": "Atom (Gd)",
    "gltf.tabBenzene": "Molecule (C₆H₆)",
    "gltf.loadingBenzene": "Loading benzene model…",
    "gltf.loadingGd": "Loading gadolinium atom…",
    "gltf.benzeneTitle": "Benzene molecule — C₆H₆",
    "gltf.benzeneBody":
      "Electron density calculated using DFT, with molecular orbital visualisation. You can clearly see the p-orbitals overlapping to form the π bonding orbitals. Generated using a tool I developed:",
    "gltf.benzeneCta": "Try it on",
    "gltf.gdTitle": "Gadolinium atom — 4f⁷ electron shell",
    "gltf.gdBody":
      "A 3D electron density plot of Gadolinium’s outermost electron configuration (f-orbital), modeled using spherical harmonics. Generated using my iOS app Atomizer AR.",
    "gltf.github": "Source on GitHub",

    "electron.title":
      "ElectronVisualized, Atomizer AR (Sept 2022 – Apr 2025)",
    "electron.li1":
      "Quantum mechanics visualiser that uses DFT, across Web (Three.js), iOS, macOS, and visionOS via Atomizer AR (10K downloads). The project that earned me the 2023 Apple WWDC Swift Student Challenge award.",
    "electron.li2":
      "Tech stack: Three.js, React, Redux, WebXR; back end: RDKit, SciPy, ASE, GPAW, Celery, Redis, Docker, AWS",
    "electron.li3Before": "Featured on the front cover of",
    "electron.li3Book":
      "University of Oxford Professor Sir David Clary’s book",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "Watch the demo walkthrough:",
    "electron.visit": "Visit",
    "electron.appStoreAtomizer": "Atomizer AR on the App Store",
    "electron.appStoreBadgeAlt": "Download Atomizer AR on the App Store",

    "face.loading": "Loading 3D model…",
    "face.title": "3D facial scan (iPhone TrueDepth)",
    "face.body":
      "3D meshing and registration method I developed for human–computer interfaces (computing IPD and head dimensions) and custom-fitted BCI headsets. Available on iOS.",
    "face.cta": "Watch the demo on YouTube",

    "orch.title": "Orch 3D head & face scan for iPhone",
    "orch.li1": "iOS app using Swift and Objective-C++ with a C++ back end",
    "orch.li2":
      "TrueDepth face scan with full point-cloud processing: ICP, feature-based pose estimation, meshing, and registration",
    "orch.li3":
      "U.S. provisional patent pending (No. 63/727,879) for aligning rough point clouds using only yaw, pitch, and roll from head pose estimation",
    "orch.appStoreAlt": "Orch 3D Scan on the App Store",

    "exp.title": "Experience",
    "exp.orchestr": "Startup co-founder for Orchestr Inc (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach":
      "Reach Media Group — computer vision software engineer (2025)",
    "exp.reachBody":
      "Developing computer vision pipelines in C++ and Python (OpenCV, linear algebra), full-stack iOS, Objective-C, Swift, and Vue-based systems.",
    "exp.snu": "Seoul National University — research intern (Jul 2023)",
    "exp.snuBody":
      "Improved a molecular visualiser using Python (SciPy, RDKit); GUI for AutoDock Vina; experience with Docker and server orchestration under Prof. Juyong Lee.",

    "edu.title": "Education",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail":
      "Private pilot licence (PPL); steam gauge (six-pack); 1979 Cessna 152.",
    "edu.ocfc.title": "Orange County Flight Center (2025.10 – 12)",
    "edu.ocfc.detail": "Training on Cessna 172 with Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024.10 – 2024.12)",
    "edu.sunrise.detail":
      "Training on Evektor SportStar light-sport aircraft.",
    "edu.uci":
      "University of California, Irvine — dropout, undeclared major",
  },
  fr: {
    "meta.title": "John Seong",
    "meta.description":
      "Bonjour, je suis John. J’aime l’aérospatiale, le logiciel et le design. Bienvenue sur mon site personnel.",
    "topBar.copyright": "PAS DE COOKIES © {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "Langue",

    "privacy.title": "Politique de confidentialité",
    "privacy.body":
      "Nous ne collectons aucune donnée via des cookies. Vos droits au titre du RGPD britannique s’appliquent.",
    "privacy.close": "Fermer",

    "eula.title": "CLUF",
    "eula.body":
      "Les logiciels publiés par cette entité sont concédés sous licence (droit britannique) : pas de rétro-ingénierie ni de redistribution.",
    "eula.close": "Fermer",

    "footer.photo1Caption": "avec iJustine, à l’Apple Park pendant la WWDC23",
    "footer.photo2Caption":
      "avec mon instructeur de vol à l’aéroport John Wayne",
    "footer.video1Caption":
      "Microsoft Flight Simulator avec pilotage par interface cerveau–ordinateur (ICO)",
    "footer.video2Caption":
      "Numérisation 3D du visage avec un iPhone uniquement — pour la conception de casques de pilote",

    "orchestr.title": "ORCHESTR",
    "orchestr.subtitle": "AÉROSPATIALE",
    "orchestr.badge": "MA START-UP",
    "orchestr.intro": "Présentation d’Orch Avionic 1 EFB.",
    "orchestr.new": "NOUVEAU",
    "orchestr.tagline": "Votre copilote prédictif* en aviation générale.",
    "orchestr.taglineFrNote": "",
    "orchestr.features":
      "ADS-B, GPS, radio portable, calcul de carburant et cartes Jeppesen*. Tout dans un seul format.",
    "orchestr.cta": "Découvrir",

    "hero.line1": "TRAVAUX CRÉATIFS",
    "hero.line2": "AÉROSPATIALE",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Lauréat du Swift Challenge Apple WWDC23",
    "awards.wwdcVenue": "À L’APPLE PARK, CUPERTINO",
    "awards.ukVisa": "Titulaire du visa « Global Talent » (R.-U.)",
    "awards.usVisa": "O-1A États-Unis — capacités d’exception",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "Vu dans ces médias",

    "gltf.tabGd": "Atome (Gd)",
    "gltf.tabBenzene": "Molécule (C₆H₆)",
    "gltf.loadingBenzene": "Chargement du modèle de benzène…",
    "gltf.loadingGd": "Chargement de l’atome de gadolinium…",
    "gltf.benzeneTitle": "Molécule de benzène — C₆H₆",
    "gltf.benzeneBody":
      "Densité électronique calculée par DFT, avec visualisation des orbitales moléculaires. On voit clairement le recouvrement des orbitales p formant les orbitales π. Généré avec un outil que j’ai développé :",
    "gltf.benzeneCta": "Essayer sur",
    "gltf.gdTitle": "Atome de gadolinium — couche 4f⁷",
    "gltf.gdBody":
      "Tracé 3D de la densité électronique de la configuration la plus externe du gadolinium (orbitale f), modélisée par harmoniques sphériques. Généré avec mon app iOS Atomizer AR.",
    "gltf.github": "Code sur GitHub",

    "electron.title":
      "ElectronVisualized, Atomizer AR (sept. 2022 – avr. 2025)",
    "electron.li1":
      "Visualiseur de mécanique quantique basé sur la DFT — Web (Three.js), iOS, macOS et visionOS avec Atomizer AR (10 k téléchargements). Le projet qui m’a valu le prix Swift Student Challenge Apple WWDC 2023.",
    "electron.li2":
      "Stack : Three.js, React, Redux, WebXR ; back end : RDKit, SciPy, ASE, GPAW, Celery, Redis, Docker, AWS",
    "electron.li3Before": "À la une de",
    "electron.li3Book": "l’ouvrage du professeur Sir David Clary (Université d’Oxford)",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "Voir la démo :",
    "electron.visit": "Visiter",
    "electron.appStoreAtomizer": "Atomizer AR sur l’App Store",
    "electron.appStoreBadgeAlt": "Télécharger Atomizer AR sur l’App Store",

    "face.loading": "Chargement du modèle 3D…",
    "face.title": "Scan facial 3D (TrueDepth iPhone)",
    "face.body":
      "Algorithme de maillage 3D et de recalage que j’ai développé pour les interfaces homme–machine (écart pupillaire et dimensions de la tête) et les casques ICO sur mesure. Disponible sur iOS.",
    "face.cta": "Voir la démo sur YouTube",

    "orch.title": "Orch — scan 3D tête et visage pour iPhone",
    "orch.li1": "App iOS en Swift et Objective-C++ avec back end C++",
    "orch.li2":
      "Scan TrueDepth avec traitement complet des nuages de points : ICP, estimation de pose, maillage et recalage",
    "orch.li3":
      "Brevet provisoire américain en cours (no 63/727,879) pour l’alignement grossier d’un nuage de points à partir du lacet, du tangage et du roulis seulement",
    "orch.appStoreAlt": "Orch 3D Scan sur l’App Store",

    "exp.title": "Expérience",
    "exp.orchestr": "Cofondateur de start-up — Orchestr Inc (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach":
      "Reach Media Group — ingénieur logiciel vision par ordinateur (2025)",
    "exp.reachBody":
      "Développement de pipelines de vision par ordinateur en C++ et Python (OpenCV, algèbre linéaire), pile complète iOS, Objective-C, Swift et systèmes fondés sur Vue.",
    "exp.snu": "Université nationale de Séoul — stagiaire recherche (juil. 2023)",
    "exp.snuBody":
      "Amélioration d’un visualiseur moléculaire en Python (SciPy, RDKit) ; interface pour AutoDock Vina ; expérience Docker et orchestration de serveurs avec le prof. Juyong Lee.",

    "edu.title": "Formation",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail":
      "Licence de pilote privé (PPL) ; instrumentation « six pack » (volets à aiguilles) ; Cessna 152 de 1979.",
    "edu.ocfc.title": "Orange County Flight Center (2025.10 – 12)",
    "edu.ocfc.detail":
      "Formation sur Cessna 172 équipé du Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024.10 – 2024.12)",
    "edu.sunrise.detail":
      "Formation sur Evektor SportStar, avion ultra-léger motorisé (LSA).",
    "edu.uci":
      "University of California, Irvine — dropout, majeure non déclarée",
  },
  ko: {
    "meta.title": "John Seong",
    "meta.description":
      "안녕하세요, 존입니다. 항공·우주, 소프트웨어, 디자인을 사랑합니다. 제 개인 웹사이트에 오신 것을 환영합니다.",
    "topBar.copyright": "쿠키 미사용 © {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "언어",

    "privacy.title": "개인정보 처리방침",
    "privacy.body":
      "당사는 쿠키를 통해 이용 데이터를 수집하지 않습니다. 영국 GDPR에 따른 사용자 권리가 적용됩니다.",
    "privacy.close": "닫기",

    "eula.title": "최종 사용자 라이선스 계약(EULA)",
    "eula.body":
      "본 주체가 배포하는 소프트웨어는(영국법에 따라) 라이선스됩니다. 역설계 및 재배포는 할 수 없습니다.",
    "eula.close": "닫기",

    "footer.photo1Caption": "WWDC23 애플 파크에서 iJustine과 함께",
    "footer.photo2Caption": "존 웨인 공항에서 비행 교관님과 함께",
    "footer.video1Caption":
      "뇌-컴퓨터 인터페이스(BCI)로 조종하는 Microsoft Flight Simulator",
    "footer.video2Caption":
      "아이폰만으로 한 3D 머리 스캔 — 파일럿 헬멧 설계용",

    "orchestr.title": "ORCHESTR",
    "orchestr.subtitle": "항공우주",
    "orchestr.badge": "제 스타트업",
    "orchestr.intro": "Orch Avionic 1 EFB를 소개합니다.",
    "orchestr.new": "NEW",
    "orchestr.tagline":
      "일반항공(GA) 비행을 위한 예측형* 보조 조종사.",
    "orchestr.taglineFrNote": "",
    "orchestr.features":
      "ADS-B, GPS, 휴대용 무전기, 연료 계산, Jeppesen* 항공 도면까지. 하나의 폼 팩터에 담았습니다.",
    "orchestr.cta": "둘러보기",

    "hero.line1": "창작 활동",
    "hero.line2": "항공우주",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 Swift Student Challenge 수상",
    "awards.wwdcVenue": "캘리포니아 쿠퍼티노 애플 파크에서",
    "awards.ukVisa": "영국 글로벌 탈런트 비자 보유",
    "awards.usVisa": "미국 O-1A 비자(특별능력)",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "다음 매체에 소개되었습니다",

    "gltf.tabGd": "원자 (Gd)",
    "gltf.tabBenzene": "분자 (C₆H₆)",
    "gltf.loadingBenzene": "벤젠 모델 불러오는 중…",
    "gltf.loadingGd": "가돌리늄 원자 불러오는 중…",
    "gltf.benzeneTitle": "벤젠 분자 — C₆H₆",
    "gltf.benzeneBody":
      "DFT로 계산한 전자 밀도와 분자 오비탈 시각화입니다. p 오비탈이 겹쳐 π 결합 오비탈을 이루는 모습이 분명히 보입니다. 제가 만든 도구로 생성했습니다:",
    "gltf.benzeneCta": "체험하기",
    "gltf.gdTitle": "가돌리늄 원자 — 4f⁷ 전자 껍질",
    "gltf.gdBody":
      "가돌리늄 최외각 전자 배치(f 오비탈)의 3D 전자 밀도 플롯으로, 구면 조화함수로 모델링했습니다. iOS 앱 Atomizer AR로 만들었습니다.",
    "gltf.github": "GitHub에서 소스 보기",

    "electron.title":
      "ElectronVisualized, Atomizer AR (2022년 9월 – 2025년 4월)",
    "electron.li1":
      "DFT를 쓰는 양자역학 시각화 도구로, 웹(Three.js)·iOS·macOS·visionOS의 Atomizer AR로 서비스합니다(다운로드 약 1만 회). 2023년 Apple WWDC Swift Student Challenge 수상으로 이어진 프로젝트입니다.",
    "electron.li2":
      "기술 스택: Three.js, React, Redux, WebXR · 백엔드: RDKit, SciPy, ASE, GPAW, Celery, Redis, Docker, AWS",
    "electron.li3Before": "표지에 실린 책:",
    "electron.li3Book":
      "옥스퍼드대학교 데이비드 클래리 경 교수 저서",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "데모 영상:",
    "electron.visit": "방문하기",
    "electron.appStoreAtomizer": "App Store의 Atomizer AR",
    "electron.appStoreBadgeAlt": "App Store에서 Atomizer AR 받기",

    "face.loading": "3D 모델 불러오는 중…",
    "face.title": "아이폰 TrueDepth로 찍은 3D 얼굴 스캔",
    "face.body":
      "인간–컴퓨터 인터페이스용으로 개발한 3D 메싱·정합 알고리즘입니다(동공 간 거리·머리 치수 계산, 맞춤 BCI 헤드셋 등). iOS에서 이용할 수 있습니다.",
    "face.cta": "유튜브에서 데모 보기",

    "orch.title": "아이폰용 Orch 3D 머리·얼굴 스캔",
    "orch.li1":
      "Swift와 Objective-C++ 프런트, C++ 백엔드로 만든 iOS 앱",
    "orch.li2":
      "TrueDepth 얼굴 스캔과 전체 포인트 클라우드 처리 — ICP, 특징 기반 자세 추정, 메싱, 정합",
    "orch.li3":
      "머리 자세 추정에서 요·피치·롤만으로 거친 포인트 클라우드를 맞추는 방법에 대한 미국 가특허 출원 중(63/727,879호)",
    "orch.appStoreAlt": "App Store의 Orch 3D 스캔",

    "exp.title": "경력",
    "exp.orchestr": "스타트업 공동창업자 — Orchestr Inc (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach":
      "Reach Media Group — 컴퓨터 비전 소프트웨어 엔지니어 (2025)",
    "exp.reachBody":
      "C++·Python(OpenCV, 선형대수) 컴퓨터 비전 파이프라인, 풀스택 iOS, Objective-C, Swift, Vue 기반 시스템을 개발합니다.",
    "exp.snu": "서울대학교 — 연구 인턴 (2023년 7월)",
    "exp.snuBody":
      "Python(SciPy, RDKit)으로 분자 시각화 도구를 개선하고, AutoDock Vina용 GUI를 만들었습니다. 이주용 교수 연구실에서 Docker와 서버 오케스트레이션 경험을 쌓았습니다.",

    "edu.title": "교육",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail":
      "사설조종사면허(PPL); 아날로그 계기(six-pack); 1979년식 Cessna 152.",
    "edu.ocfc.title": "Orange County Flight Center (2025.10 – 12)",
    "edu.ocfc.detail": "Garmin G1000 장비 Cessna 172 훈련.",
    "edu.sunrise.title": "Sunrise Aviation (2024.10 – 2024.12)",
    "edu.sunrise.detail":
      "경량스포츠기(Evektor SportStar) 훈련.",
    "edu.uci":
      "University of California, Irvine — dropout, 전공 미선택",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["en"];
