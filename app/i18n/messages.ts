export type Locale = "en" | "fr" | "ko";

export const messages = {
  en: {
    "meta.title": "John Seong",
    "meta.description":
      "Hi, I'm John. I love aerospace, software, and design. Welcome to my personal website.",
    "topBar.copyright": "© {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "Language",

    "localeOffer.titleEn": "DISPLAY IN ENGLISH?",
    "localeOffer.titleFr": "DISPLAY IN FRENCH?",
    "localeOffer.titleKo": "DISPLAY IN KOREAN?",
    "localeOffer.bodyEn":
      "Your browser language does not match the language shown. View the site in English?",
    "localeOffer.bodyFr":
      "Your browser language does not match the language shown. View the site in French?",
    "localeOffer.bodyKo":
      "Your browser language does not match the language shown. View the site in Korean?",
    "localeOffer.accept": "Yes, switch",
    "localeOffer.decline": "No, keep the current language",
    "localeOffer.closeOverlay": "Dismiss and keep the current language",

    "cookieConsent.barLabel": "Cookies",
    "cookieConsent.title": "ESSENTIAL COOKIES",
    "cookieConsent.bodyBefore":
      "This site uses only strictly necessary storage (language cookie and local storage) as described in the ",
    "cookieConsent.bodyAfter":
      ". No tracking or advertising.",
    "cookieConsent.accept": "OK (Recommended)",
    "cookieConsent.noToAll": "No to all",
    "cookieConsent.closeOverlay": "Dismiss cookie notice",

    "privacy.title": "Privacy Policy",
    "privacy.backHome": "← Back to site",
    "privacy.allVersions":
      "The complete policy text in each language we offer:",
    "privacy.body":
      "We apply the same transparency and data-protection standards as under the EU GDPR and ePrivacy rules for every visitor, wherever you are. We do not use analytics, advertising, or non-essential cookies. We only use strictly necessary storage—a small first-party cookie and your browser’s local storage—to remember your language choice and related display preferences. We do not profile you or track you across other sites. You can delete this data in your browser at any time. You have GDPR-style rights (e.g. access, erasure, portability, objection, restriction), including the right to lodge a complaint with an EU data protection authority.",
    "privacy.github": "Website source code",
    "privacy.githubAria":
      "Open this website’s source code on GitHub (opens in a new tab)",
    "privacy.close": "Close",

    "eula.title": "EULA",
    "eula.body":
      "Any software published by this entity is licensed (UK law): no reverse engineering or redistribution.",
    "eula.close": "Close",

    "footer.photo1Caption": "with iJustine, at Apple Park during WWDC23",
    "footer.photo2Caption":
      "with my flight instructor at John Wayne Airport",
    "footer.video1Caption":
      "Microsoft Flight Simulator with brain-computer interface (BCI) control",
    "footer.video2Caption":
      "3D head scan using only an iPhone — for pilot helmet design",

    "orchestr.title": "ORCH",
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
      "ADS-B, GPS, handheld radio, fuel calculation and flight charts. All in one form factor.",
    "orchestr.cta": "Have a look",
    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "EMBEDDED OS",
    "orchestr.jebos.desc":
      "A custom real-time, Debian-based embedded operating system for NVIDIA Jetson Orin Nano with capacitive touchscreen. Coming soon with certified hardware.",
    "orchestr.jebos.features":
      "Moving map, ADS-B traffic, VHF ATC transcript, checklists, airport & navaid database, flight planning — all on bare metal.",
    "orchestr.jebos.cta": "Learn more",
    "orchestr.floatingBanner": "Check out Orchestr Aerospace",

    "hero.line1": "CREATIVE WORK",
    "hero.line2": "AEROSPACE",
    "hero.landmark": "PILOT · ENTREPRENEUR · ENGINEER",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 Scholar",
    "awards.wwdcVenue": "INVITED TO APPLE PARK · DISTINGUISHED WINNER AT 19",
    "awards.ukVisa": "UK Global Talent Visa Holder",
    "awards.usVisa": "US O-1A Extraordinary Ability",
    "awards.madeInQuebec": "DESIGNED IN QUEBEC",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "As featured in the following outlets",

    "navTab.label": "Page sections",
    "navTab.hero": "Intro",
    "navTab.atoms": "Atoms",
    "navTab.electron": "Electron",
    "navTab.face": "Face scan",
    "navTab.orch": "Orch",
    "navTab.exp": "Experience",
    "navTab.edu": "Education",

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
      "A 3D electron density plot of Gadolinium’s outermost electron configuration (f-orbital), modelled using spherical harmonics. Generated using my iOS app Atomizer AR.",
    "gltf.github": "Source on GitHub",

    "electron.title":
      "ElectronVisualized, Atomizer AR (September 2022 – April 2025)",
    "electron.li1":
      "Quantum mechanics visualiser that uses DFT, across Web (Three.js), iOS, macOS, and visionOS via Atomizer AR (10K downloads). The project that won me the 2023 Apple WWDC Swift Student Challenge award.",
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

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1": "iOS app using Swift and Objective-C++ with a C++ back end",
    "orch.li2":
      "TrueDepth face scan with full point-cloud processing: ICP, feature-based pose estimation, meshing, and registration",
    "orch.li3":
      "US provisional patent pending (No. 63/727,879) for aligning rough point clouds using only yaw, pitch, and roll from head pose estimation",
    "orch.appStoreAlt": "OpticALLY 3D Scan on the App Store",

    "exp.title": "Experience",
    "exp.orchestr": "Start-up founder at Orchestr Aerospace Inc (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach":
      "Reach Media Group — computer vision software engineer (2025)",
    "exp.reachBody":
      "Developing computer vision pipelines in C++ and Python (OpenCV, linear algebra), full-stack iOS, Objective-C, Swift, and Vue-based systems.",
    "exp.snu": "Seoul National University — research intern (July 2023)",
    "exp.snuBody":
      "Improved a molecular visualiser using Python (SciPy, RDKit); GUI for AutoDock Vina; experience with Docker and server orchestration under Prof. Juyong Lee.",

    "edu.title": "Education",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail":
      "Private pilot licence (PPL); steam gauge (six-pack); 1979 Cessna 152.",
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail": "Training on Cessna 172 with Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail":
      "Training on Evektor SportStar light-sport aircraft.",
    "edu.uci":
      "University of California, Irvine — withdrew before completing a degree; major undeclared (2023)",
  },
  fr: {
    "meta.title": "John Seong",
    "meta.description":
      "Bonjour, je suis John. J’aime l’aérospatiale, le logiciel et le design. Bienvenue sur mon site personnel.",
    "topBar.copyright": "© {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "Langue",

    "localeOffer.titleEn": "DISPLAY IN ENGLISH?",
    "localeOffer.titleFr": "AFFICHER EN FRANÇAIS ?",
    "localeOffer.titleKo": "DISPLAY IN KOREAN?",
    "localeOffer.bodyEn":
      "La langue de votre navigateur ne correspond pas à celle affichée. Afficher en anglais ?",
    "localeOffer.bodyFr":
      "La langue de votre navigateur ne correspond pas à celle affichée. Afficher en français ?",
    "localeOffer.bodyKo":
      "La langue de votre navigateur ne correspond pas à celle affichée. Afficher en coréen ?",
    "localeOffer.accept": "Oui, changer",
    "localeOffer.decline": "Non, garder la langue actuelle",
    "localeOffer.closeOverlay": "Fermer et garder la langue actuelle",

    "cookieConsent.barLabel": "Cookies",
    "cookieConsent.title": "COOKIES INDISPENSABLES",
    "cookieConsent.bodyBefore":
      "Ce site utilise uniquement un stockage strictement nécessaire (cookie de langue et stockage local), comme indiqué dans la ",
    "cookieConsent.bodyAfter": ". Pas de suivi publicitaire.",
    "cookieConsent.accept": "Compris (recommandé)",
    "cookieConsent.noToAll": "Tout refuser",
    "cookieConsent.closeOverlay": "Fermer l’avis cookies",

    "privacy.title": "Politique de confidentialité",
    "privacy.backHome": "← Retour au site",
    "privacy.allVersions":
      "Texte intégral dans chaque langue proposée :",
    "privacy.body":
      "Nous appliquons les mêmes exigences de transparence et de protection des données que sous le RGPD et le cadre ePrivacy de l’UE à chaque visiteur, partout dans le monde. Nous n’utilisons pas de cookies d’analyse, de publicité ou non indispensables. Nous n’employons que des moyens strictement nécessaires — un petit cookie propriétaire et le stockage local du navigateur — pour mémoriser votre langue et des préférences d’affichage connexes. Nous ne vous profilons pas et ne vous suivons pas sur d’autres sites. Vous pouvez supprimer ces données dans les réglages du navigateur à tout moment. Vous disposez des droits prévus par le RGPD (accès, effacement, portabilité, opposition, limitation, etc.), y compris le droit d’introduire une réclamation auprès d’une autorité de protection des données de l’UE.",
    "privacy.github": "Code source du site",
    "privacy.githubAria":
      "Ouvrir le code source de ce site sur GitHub (nouvel onglet)",
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

    "orchestr.title": "ORCH",
    "orchestr.subtitle": "AÉROSPATIALE",
    "orchestr.badge": "MA START-UP",
    "orchestr.intro": "Présentation d’Orch Avionic 1 EFB.",
    "orchestr.new": "NOUVEAU",
    "orchestr.tagline": "Votre copilote prédictif* en aviation générale.",
    "orchestr.taglineFrNote": "",
    "orchestr.features":
      "ADS-B, GPS, radio portable, calcul de carburant et cartes de vol. Tout dans un seul format.",
    "orchestr.cta": "Découvrir",
    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "OS EMBARQUÉ",
    "orchestr.jebos.desc":
      "Un système d'exploitation embarqué temps réel basé sur Debian pour NVIDIA Jetson Orin Nano avec écran tactile capacitif. Bientôt disponible avec matériel certifié.",
    "orchestr.jebos.features":
      "Carte dynamique, trafic ADS-B, transcription VHF ATC, checklists, base de données aéroports et navaids, planification de vol — le tout en bare metal.",
    "orchestr.jebos.cta": "En savoir plus",
    "orchestr.floatingBanner": "Découvrir Orchestr Aerospace",

    "hero.line1": "TRAVAUX CRÉATIFS",
    "hero.line2": "AÉROSPATIALE",
    "hero.landmark": "PILOT · ENTREPRENEUR · ENGINEER",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 Scholar",
    "awards.wwdcVenue": "INVITÉ À L’APPLE PARK · LAURÉAT DISTINGUÉ À 19 ANS",
    "awards.ukVisa": "Titulaire du visa « Global Talent » (R.-U.)",
    "awards.usVisa": "O-1A États-Unis — capacités d’exception",
    "awards.madeInQuebec": "CONÇU AU QUÉBEC",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "Vu dans ces médias",

    "navTab.label": "Sections de la page",
    "navTab.hero": "Intro",
    "navTab.atoms": "Atomes",
    "navTab.electron": "Électron",
    "navTab.face": "Scan visage",
    "navTab.orch": "Orch",
    "navTab.exp": "Expérience",
    "navTab.edu": "Formation",

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

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1": "App iOS en Swift et Objective-C++ avec back end C++",
    "orch.li2":
      "Scan TrueDepth avec traitement complet des nuages de points : ICP, estimation de pose, maillage et recalage",
    "orch.li3":
      "Brevet provisoire américain en cours (no 63/727,879) pour l’alignement grossier d’un nuage de points à partir du lacet, du tangage et du roulis seulement",
    "orch.appStoreAlt": "OpticALLY 3D Scan sur l’App Store",

    "exp.title": "Expérience",
    "exp.orchestr": "Fondateur de start-up — Orchestre Avionique Inc (2026)",
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
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail":
      "Formation sur Cessna 172 équipé du Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail":
      "Formation sur Evektor SportStar, avion ultra-léger motorisé (LSA).",
    "edu.uci":
      "University of California, Irvine — dropout, majeure non déclarée (2023)",
  },
  ko: {
    "meta.title": "John Seong",
    "meta.description":
      "안녕하세요, 존입니다. 항공·우주, 소프트웨어, 디자인을 사랑합니다. 제 개인 웹사이트에 오신 것을 환영합니다.",
    "topBar.copyright": "© {year} JOHN WONMO SEONG",
    "langToggle.en": "EN",
    "langToggle.fr": "FR",
    "langToggle.ko": "KO",
    "langToggle.label": "언어",

    "localeOffer.titleEn": "DISPLAY IN ENGLISH?",
    "localeOffer.titleFr": "DISPLAY IN FRENCH?",
    "localeOffer.titleKo": "한국어로 표시할까요?",
    "localeOffer.bodyEn":
      "브라우저 언어와 현재 표시 언어가 다릅니다. 영어로 볼까요?",
    "localeOffer.bodyFr":
      "브라우저 언어와 현재 표시 언어가 다릅니다. 프랑스어로 볼까요?",
    "localeOffer.bodyKo":
      "브라우저 언어와 현재 표시 언어가 다릅니다. 한국어로 볼까요?",
    "localeOffer.accept": "네, 바꿀게요",
    "localeOffer.decline": "아니요, 지금 언어 유지",
    "localeOffer.closeOverlay": "닫고 지금 언어 유지",

    "cookieConsent.barLabel": "쿠키",
    "cookieConsent.title": "필수 쿠키 안내",
    "cookieConsent.bodyBefore": "이 사이트는 ",
    "cookieConsent.bodyAfter":
      "에 설명된 대로 언어 쿠키와 로컬 저장소 등 필수 저장만 사용합니다. 추적·광고 쿠키는 없습니다.",
    "cookieConsent.accept": "확인 (권장)",
    "cookieConsent.noToAll": "모두 거부",
    "cookieConsent.closeOverlay": "쿠키 안내 닫기",

    "privacy.title": "개인정보 처리방침",
    "privacy.backHome": "← 사이트로 돌아가기",
    "privacy.allVersions": "제공하는 각 언어의 전체 처리방침:",
    "privacy.body":
      "EU GDPR 및 ePrivacy 수준의 투명성·데이터 보호 기준을 방문 지역과 관계없이 모든 방문자에게 동일하게 적용합니다. 분석·광고 또는 필수가 아닌 쿠키는 사용하지 않습니다. 언어 선택 및 관련 표시 설정을 위해 반드시 필요한 저장소(자사 쿠키 1종, 브라우저 로컬 스토리지)만 사용합니다. 광고 프로필을 만들거나 다른 사이트에서의 교차 추적은 하지 않습니다. 언제든지 브라우저 설정에서 해당 데이터를 삭제할 수 있습니다. 접근·삭제·이동·이의·처리 제한 등 GDPR상 권리가 있으며, EU 데이터 보호 감독 기관에 이의를 제기할 수 있습니다.",
    "privacy.github": "웹사이트 소스 코드",
    "privacy.githubAria":
      "이 웹사이트 소스 코드를 GitHub에서 열기(새 탭)",
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

    "orchestr.title": "ORCH",
    "orchestr.subtitle": "항공우주",
    "orchestr.badge": "제 스타트업",
    "orchestr.intro": "Orch Avionic 1 EFB를 소개합니다.",
    "orchestr.new": "NEW",
    "orchestr.tagline":
      "민간항공(GA) 비행을 위한 예측형* 보조 조종사.",
    "orchestr.taglineFrNote": "",
    "orchestr.features":
      "ADS-B, GPS, 휴대용 무전기, 연료 계산, 비행 차트까지. 하나의 폼 팩터에 담았습니다.",
    "orchestr.cta": "둘러보기",
    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "임베디드 OS",
    "orchestr.jebos.desc":
      "NVIDIA Jetson Orin Nano용 정전식 터치스크린을 갖춘 커스텀 실시간 Debian 기반 임베디드 운영체제. 인증된 하드웨어와 함께 곧 출시 예정.",
    "orchestr.jebos.features":
      "무빙맵, ADS-B 트래픽, VHF ATC 트랜스크립트, 체크리스트, 공항 및 항행 데이터베이스, 비행 계획 — 모두 베어메탈.",
    "orchestr.jebos.cta": "자세히 보기",
    "orchestr.floatingBanner": "Orchestr Aerospace 둘러보기",

    "hero.line1": "창작 활동",
    "hero.line2": "항공우주",
    "hero.landmark": "PILOT · ENTREPRENEUR · ENGINEER",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 Scholar",
    "awards.wwdcVenue": "애플 파크 초청 · 만 19세 DISTINGUISHED WINNER",
    "awards.ukVisa": "영국 글로벌 탤런트 비자 보유",
    "awards.usVisa": "미국 O-1A 비자(특별능력)",
    "awards.madeInQuebec": "퀘벡에서 디자인",
    "awards.reachAlt": "Reach Media Group",

    "media.featured": "다음 매체에 소개되었습니다",

    "navTab.label": "페이지 섹션",
    "navTab.hero": "소개",
    "navTab.atoms": "원자·분자",
    "navTab.electron": "일렉트론",
    "navTab.face": "얼굴 스캔",
    "navTab.orch": "Orch",
    "navTab.exp": "경력",
    "navTab.edu": "교육",

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
      "DFT를 쓰는 양자역학 시각화 도구로, 웹(Three.js)·iOS·macOS·visionOS의 Atomizer AR로 서비스합니다(다운로드 약 1만 회). Apple WWDC23 Scholar Award 수상으로 이어진 프로젝트입니다.",
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

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1":
      "Swift와 Objective-C++ 프런트, C++ 백엔드로 만든 iOS 앱",
    "orch.li2":
      "TrueDepth 얼굴 스캔과 전체 포인트 클라우드 처리 — ICP, 특징 기반 자세 추정, 메싱, 정합",
    "orch.li3":
      "머리 자세 추정에서 요·피치·롤만으로 거친 포인트 클라우드를 맞추는 방법에 대한 미국 가특허 출원 중(63/727,879호)",
    "orch.appStoreAlt": "App Store의 OpticALLY 3D Scan",

    "exp.title": "경력",
    "exp.orchestr": "스타트업 창업자 — Orchestr Aerospace Inc (2026)",
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
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail": "Garmin G1000 장비 Cessna 172 훈련.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail":
      "경량스포츠기(Evektor SportStar) 훈련.",
    "edu.uci":
      "University of California, Irvine — dropout, 전공 미선택 (2023)",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["en"];
