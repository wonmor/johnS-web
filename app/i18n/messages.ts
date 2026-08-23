export type Locale = "en" | "fr" | "ko";

export const messages = {
  en: {
    "meta.title": "John Seong",
    "topBar.copyright": "© {year} john wonmo seong",
    "langToggle.en": "en",
    "langToggle.fr": "fr",
    "langToggle.ko": "ko",
    "langToggle.label": "language",

    "localeOffer.titleEn": "display in english?",
    "localeOffer.titleFr": "display in french?",
    "localeOffer.titleKo": "display in korean?",
    "localeOffer.bodyEn": "your browser prefers English. switch?",
    "localeOffer.bodyFr": "your browser prefers French. switch?",
    "localeOffer.bodyKo": "your browser prefers Korean. switch?",
    "localeOffer.accept": "yes, switch",
    "localeOffer.decline": "keep this one",
    "localeOffer.closeOverlay": "dismiss and keep the current language",

    "cookieConsent.barLabel": "cookies",
    "cookieConsent.title": "essential cookies",
    "cookieConsent.bodyBefore":
      "only a language cookie and local storage, as set out in the ",
    "cookieConsent.bodyAfter": ". no tracking, no ads.",
    "cookieConsent.accept": "ok",
    "cookieConsent.noToAll": "no to all",
    "cookieConsent.closeOverlay": "dismiss cookie notice",

    "privacy.title": "privacy",
    "privacy.backHome": "← back",
    "privacy.allVersions": "the full text, in each language:",
    "privacy.body":
      "We apply the same transparency and data-protection standards as under the EU GDPR and ePrivacy rules for every visitor, wherever you are. We do not use analytics, advertising, or non-essential cookies. We only use strictly necessary storage—a small first-party cookie and your browser’s local storage—to remember your language choice and related display preferences. We do not profile you or track you across other sites. You can delete this data in your browser at any time. You have GDPR-style rights (e.g. access, erasure, portability, objection, restriction), including the right to lodge a complaint with an EU data protection authority.",
    "privacy.github": "source code",
    "privacy.githubAria":
      "Open this website’s source code on GitHub (opens in a new tab)",
    "privacy.close": "close",

    "eula.title": "eula",
    "eula.body":
      "Software published by this entity is licensed (UK law): no reverse engineering or redistribution.",
    "eula.close": "close",

    "footer.photo1Caption": "with iJustine at Apple Park",
    "footer.photo2Caption": "with my flight instructor, John Wayne Airport",
    "footer.video1Caption":
      "flight sim flown with a brain–computer interface",
    "footer.video2Caption": "3D head scan from an iPhone",

    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "embedded os",
    "orchestr.jebos.desc":
      "a real-time Debian build for the Jetson Orin Nano. certified hardware soon.",
    "orchestr.jebos.features":
      "moving map, ADS-B traffic, ATC transcript, checklists, charts, flight planning.",
    "orchestr.jebos.cta": "orchaerospace.com",
    "orchestr.floatingBanner": "orchestr aerospace",

    "jebos.platforms": "ipad · android · web",
    "jebos.earlyAccess": "early access",
    "jebos.tagDesktop": "desktop",
    "jebos.tagMobile": "mobile",
    "jebos.tagWeb": "web",
    "jebos.pitch":
      "one chart software on Flight Computer 1 and in every aircraft you fly.",
    "jebos.sound": "sound",
    "jebos.mute": "mute",
    "jebos.tryAs": "try it as a",
    "jebos.webApp": "web app",
    "jebos.appStoreAlt": "Jeb's Flight Bag on the App Store",
    "jebos.playAlt": "Jeb's Flight Bag on Google Play",
    "jebos.webAlt": "Jeb's Flight Bag on the web",
    "jebos.screenshots": "Screenshots",
    "jebos.g.vfrPfd": "VFR sectional beside the synthetic PFD",
    "jebos.g.satelliteWx": "Satellite terrain with weather overlay",
    "jebos.g.vfrLa": "VFR sectional — Los Angeles",
    "jebos.g.ifrSocal": "IFR high enroute — SoCal Class B",
    "jebos.g.planner": "Flight plan builder",
    "jebos.g.traffic": "Live ADS-B traffic",
    "jebos.g.checklist": "Preflight checklist",
    "jebos.g.poh": "POH — Cessna 152 V-speeds",
    "jebos.g.briefing": "METAR, TAF and PIREP briefing",
    "jebos.g.e6b": "Built-in E6B computer",
    "jebos.g.vfrSynthetic": "VFR sectional with synthetic vision",
    "jebos.g.ifrMontreal": "IFR enroute — Montreal",
    "jebos.g.airportDiagram": "Airport diagram — KOWD",
    "jebos.g.atc": "Live ATC transcription",
    "jebos.g.airac": "AIRAC and navdata settings",
    "jebos.g.pohSplit": "POH sidebar beside the VFR map",
    "jebos.g.satelliteTraffic": "Satellite overlay with ADS-B contacts",

    "section.showcase": "showcase",
    "section.atoms": "atoms",
    "section.face": "computer vision (3d reconstruction)",
    "section.moments": "moments",
    "section.elsewhere": "Elsewhere",
    "atoms.viewerLabel": "Molecule viewer",
    "atoms.interact": "Interact with the {title} 3D viewer",
    "atoms.rotateTouch": "tap to rotate",
    "atoms.rotatePointer": "click to rotate",

    "hero.line1": "creative work",
    "hero.line2": "aerospace",
    "hero.landmark": "pilot · founder · engineer",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 scholar",
    "awards.wwdcVenue": "distinguished winner, at 19",
    "awards.ukVisa": "UK global talent visa",
    "awards.usVisa": "US O-1A visa",
    "awards.madeInQuebec": "built in Quebec",

    "media.featured": "as seen in",

    "navTab.label": "sections",
    "navTab.hero": "intro",
    "navTab.atoms": "atoms",
    "navTab.electron": "electron",
    "navTab.face": "face",
    "navTab.orch": "orch",
    "navTab.exp": "work",
    "navTab.edu": "school",

    "gltf.tabGd": "gadolinium",
    "gltf.tabBenzene": "benzene",
    "gltf.loadingBenzene": "loading benzene…",
    "gltf.loadingGd": "loading gadolinium…",
    "gltf.benzeneTitle": "benzene — C₆H₆",
    "gltf.benzeneBody":
      "electron density from DFT. the p-orbitals overlap into the π system. made with",
    "gltf.gdTitle": "gadolinium — 4f⁷",
    "gltf.gdBody":
      "the outer f-orbital, modelled with spherical harmonics. made with my iOS app, Atomizer AR.",

    "electron.title": "ElectronVisualized, Atomizer AR (2022 – 2025)",
    "electron.li1":
      "quantum mechanics visualiser built on DFT — web, iOS, macOS, visionOS. 10k downloads. won the 2023 Apple Swift Student Challenge.",
    "electron.li2":
      "Three.js, React, WebXR · RDKit, SciPy, GPAW, Celery, AWS",
    "electron.li3Before": "on the cover of",
    "electron.li3Book": "Sir David Clary’s book",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "demo:",
    "electron.visit": "visit",
    "electron.appStoreAtomizer": "Atomizer AR on the App Store",

    "face.loading": "loading…",
    "face.title": "face scan — iPhone TrueDepth",
    "face.body":
      "3D meshing and registration for head measurements and custom-fit headsets. on iOS.",
    "face.cta": "watch on YouTube",

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1": "iOS app — Swift, Objective-C++, C++ back end",
    "orch.li2":
      "TrueDepth scan with full point-cloud processing: ICP, pose estimation, meshing, registration",
    "orch.li3":
      "US patent pending (63/727,879) — aligning rough point clouds from head pose alone",
    "orch.appStoreAlt": "OpticALLY 3D Scan on the App Store",

    "exp.title": "work",
    "exp.orchestr": "founder, Orchestr Aerospace (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach": "Reach Media Group — computer vision engineer (2025)",
    "exp.reachBody":
      "vision pipelines in C++ and Python; iOS and Vue systems.",
    "exp.snu": "Seoul National University — research intern (2023)",
    "exp.snuBody":
      "molecular visualiser in Python; a GUI for AutoDock Vina.",

    "edu.title": "school",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail": "private pilot licence. Cessna 152, six-pack.",
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail": "Cessna 172, Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail": "Evektor SportStar.",
    "edu.uci":
      "University of California, Irvine — aerospace engineering, dropout (2023)",
  },
  fr: {
    "meta.title": "John Seong",
    "topBar.copyright": "© {year} john wonmo seong",
    "langToggle.en": "en",
    "langToggle.fr": "fr",
    "langToggle.ko": "ko",
    "langToggle.label": "langue",

    "localeOffer.titleEn": "afficher en anglais ?",
    "localeOffer.titleFr": "afficher en français ?",
    "localeOffer.titleKo": "afficher en coréen ?",
    "localeOffer.bodyEn": "votre navigateur préfère l’anglais. changer ?",
    "localeOffer.bodyFr": "votre navigateur préfère le français. changer ?",
    "localeOffer.bodyKo": "votre navigateur préfère le coréen. changer ?",
    "localeOffer.accept": "oui, changer",
    "localeOffer.decline": "garder celle-ci",
    "localeOffer.closeOverlay": "fermer et garder la langue actuelle",

    "cookieConsent.barLabel": "cookies",
    "cookieConsent.title": "cookies indispensables",
    "cookieConsent.bodyBefore":
      "uniquement un cookie de langue et le stockage local, comme indiqué dans la ",
    "cookieConsent.bodyAfter": ". pas de suivi, pas de pub.",
    "cookieConsent.accept": "ok",
    "cookieConsent.noToAll": "tout refuser",
    "cookieConsent.closeOverlay": "fermer l’avis cookies",

    "privacy.title": "confidentialité",
    "privacy.backHome": "← retour",
    "privacy.allVersions": "le texte intégral, dans chaque langue :",
    "privacy.body":
      "Nous appliquons les mêmes exigences de transparence et de protection des données que sous le RGPD et le cadre ePrivacy de l’UE à chaque visiteur, partout dans le monde. Nous n’utilisons pas de cookies d’analyse, de publicité ou non indispensables. Nous n’employons que des moyens strictement nécessaires — un petit cookie propriétaire et le stockage local du navigateur — pour mémoriser votre langue et des préférences d’affichage connexes. Nous ne vous profilons pas et ne vous suivons pas sur d’autres sites. Vous pouvez supprimer ces données dans les réglages du navigateur à tout moment. Vous disposez des droits prévus par le RGPD (accès, effacement, portabilité, opposition, limitation, etc.), y compris le droit d’introduire une réclamation auprès d’une autorité de protection des données de l’UE.",
    "privacy.github": "code source",
    "privacy.githubAria":
      "Ouvrir le code source de ce site sur GitHub (nouvel onglet)",
    "privacy.close": "fermer",

    "eula.title": "cluf",
    "eula.body":
      "Les logiciels publiés par cette entité sont concédés sous licence (droit britannique) : pas de rétro-ingénierie ni de redistribution.",
    "eula.close": "fermer",

    "footer.photo1Caption": "avec iJustine à l’Apple Park",
    "footer.photo2Caption":
      "avec mon instructeur de vol, aéroport John Wayne",
    "footer.video1Caption":
      "simulateur de vol piloté par interface cerveau–ordinateur",
    "footer.video2Caption": "scan 3D de la tête avec un iPhone",

    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "os embarqué",
    "orchestr.jebos.desc":
      "un Debian temps réel pour le Jetson Orin Nano. matériel certifié bientôt.",
    "orchestr.jebos.features":
      "carte dynamique, trafic ADS-B, transcription ATC, checklists, cartes, planification de vol.",
    "orchestr.jebos.cta": "orchaerospace.com",
    "orchestr.floatingBanner": "orchestr aerospace",

    "jebos.platforms": "ipad · android · web",
    "jebos.earlyAccess": "accès anticipé",
    "jebos.tagDesktop": "bureau",
    "jebos.tagMobile": "mobile",
    "jebos.tagWeb": "web",
    "jebos.pitch":
      "un même logiciel de cartes sur le Flight Computer 1 et dans tous les avions que vous pilotez.",
    "jebos.sound": "son",
    "jebos.mute": "muet",
    "jebos.tryAs": "essayez-le en",
    "jebos.webApp": "app web",
    "jebos.appStoreAlt": "Jeb's Flight Bag sur l’App Store",
    "jebos.playAlt": "Jeb's Flight Bag sur Google Play",
    "jebos.webAlt": "Jeb's Flight Bag sur le web",
    "jebos.screenshots": "Captures d’écran",
    "jebos.g.vfrPfd": "Carte VFR à côté du PFD synthétique",
    "jebos.g.satelliteWx": "Relief satellite avec couche météo",
    "jebos.g.vfrLa": "Carte VFR — Los Angeles",
    "jebos.g.ifrSocal": "Carte IFR haute altitude — classe B de SoCal",
    "jebos.g.planner": "Préparation du plan de vol",
    "jebos.g.traffic": "Trafic ADS-B en direct",
    "jebos.g.checklist": "Checklist prévol",
    "jebos.g.poh": "Manuel de vol — vitesses du Cessna 152",
    "jebos.g.briefing": "Briefing METAR, TAF et PIREP",
    "jebos.g.e6b": "Calculateur E6B intégré",
    "jebos.g.vfrSynthetic": "Carte VFR avec vision synthétique",
    "jebos.g.ifrMontreal": "Carte IFR en route — Montréal",
    "jebos.g.airportDiagram": "Plan d’aérodrome — KOWD",
    "jebos.g.atc": "Transcription ATC en direct",
    "jebos.g.airac": "Réglages AIRAC et données de navigation",
    "jebos.g.pohSplit": "Manuel de vol à côté de la carte VFR",
    "jebos.g.satelliteTraffic": "Couche satellite avec contacts ADS-B",

    "section.showcase": "réalisations",
    "section.atoms": "atomes",
    "section.face": "vision par ordinateur (reconstruction 3d)",
    "section.moments": "moments",
    "section.elsewhere": "Ailleurs",
    "atoms.viewerLabel": "Visualiseur de molécules",
    "atoms.interact": "Interagir avec le visualiseur 3D {title}",
    "atoms.rotateTouch": "touchez pour pivoter",
    "atoms.rotatePointer": "cliquez pour pivoter",

    "hero.line1": "travaux créatifs",
    "hero.line2": "aérospatiale",
    "hero.landmark": "pilote · fondateur · ingénieur",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 scholar",
    "awards.wwdcVenue": "lauréat distingué, à 19 ans",
    "awards.ukVisa": "visa « global talent » (R.-U.)",
    "awards.usVisa": "visa O-1A (É.-U.)",
    "awards.madeInQuebec": "fait au Québec",

    "media.featured": "vu dans",

    "navTab.label": "sections",
    "navTab.hero": "intro",
    "navTab.atoms": "atomes",
    "navTab.electron": "électron",
    "navTab.face": "visage",
    "navTab.orch": "orch",
    "navTab.exp": "travail",
    "navTab.edu": "études",

    "gltf.tabGd": "gadolinium",
    "gltf.tabBenzene": "benzène",
    "gltf.loadingBenzene": "chargement du benzène…",
    "gltf.loadingGd": "chargement du gadolinium…",
    "gltf.benzeneTitle": "benzène — C₆H₆",
    "gltf.benzeneBody":
      "densité électronique par DFT. les orbitales p se recouvrent en système π. fait avec",
    "gltf.gdTitle": "gadolinium — 4f⁷",
    "gltf.gdBody":
      "l’orbitale f externe, modélisée par harmoniques sphériques. faite avec mon app iOS, Atomizer AR.",

    "electron.title": "ElectronVisualized, Atomizer AR (2022 – 2025)",
    "electron.li1":
      "visualiseur de mécanique quantique fondé sur la DFT — web, iOS, macOS, visionOS. 10 k téléchargements. lauréat du Apple Swift Student Challenge 2023.",
    "electron.li2":
      "Three.js, React, WebXR · RDKit, SciPy, GPAW, Celery, AWS",
    "electron.li3Before": "en couverture du",
    "electron.li3Book": "livre de Sir David Clary",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "démo :",
    "electron.visit": "visiter",
    "electron.appStoreAtomizer": "Atomizer AR sur l’App Store",

    "face.loading": "chargement…",
    "face.title": "scan du visage — TrueDepth iPhone",
    "face.body":
      "maillage et recalage 3D pour mesurer la tête et ajuster des casques sur mesure. sur iOS.",
    "face.cta": "voir sur YouTube",

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1": "app iOS — Swift, Objective-C++, back end C++",
    "orch.li2":
      "scan TrueDepth avec traitement complet du nuage de points : ICP, estimation de pose, maillage, recalage",
    "orch.li3":
      "brevet américain en cours (63/727,879) — aligner un nuage de points grossier à partir de la seule pose de la tête",
    "orch.appStoreAlt": "OpticALLY 3D Scan sur l’App Store",

    "exp.title": "travail",
    "exp.orchestr": "fondateur, Orchestre Avionique (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach":
      "Reach Media Group — ingénieur vision par ordinateur (2025)",
    "exp.reachBody":
      "pipelines de vision en C++ et Python ; systèmes iOS et Vue.",
    "exp.snu": "Université nationale de Séoul — stagiaire recherche (2023)",
    "exp.snuBody":
      "visualiseur moléculaire en Python ; interface pour AutoDock Vina.",

    "edu.title": "études",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail": "licence de pilote privé. Cessna 152, « six pack ».",
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail": "Cessna 172, Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail": "Evektor SportStar.",
    "edu.uci":
      "University of California, Irvine — génie aérospatial, abandon (2023)",
  },
  ko: {
    "meta.title": "John Seong",
    "topBar.copyright": "© {year} john wonmo seong",
    "langToggle.en": "en",
    "langToggle.fr": "fr",
    "langToggle.ko": "ko",
    "langToggle.label": "언어",

    "localeOffer.titleEn": "영어로 볼까요?",
    "localeOffer.titleFr": "프랑스어로 볼까요?",
    "localeOffer.titleKo": "한국어로 볼까요?",
    "localeOffer.bodyEn": "브라우저 언어는 영어입니다. 바꿀까요?",
    "localeOffer.bodyFr": "브라우저 언어는 프랑스어입니다. 바꿀까요?",
    "localeOffer.bodyKo": "브라우저 언어는 한국어입니다. 바꿀까요?",
    "localeOffer.accept": "네, 바꿀게요",
    "localeOffer.decline": "지금 언어 유지",
    "localeOffer.closeOverlay": "닫고 지금 언어 유지",

    "cookieConsent.barLabel": "쿠키",
    "cookieConsent.title": "필수 쿠키",
    "cookieConsent.bodyBefore": "언어 쿠키와 로컬 저장소만 사용합니다. 자세한 내용은 ",
    "cookieConsent.bodyAfter": " 참고. 추적·광고는 없습니다.",
    "cookieConsent.accept": "확인",
    "cookieConsent.noToAll": "모두 거부",
    "cookieConsent.closeOverlay": "쿠키 안내 닫기",

    "privacy.title": "개인정보",
    "privacy.backHome": "← 돌아가기",
    "privacy.allVersions": "각 언어의 전체 문서:",
    "privacy.body":
      "EU GDPR 및 ePrivacy 수준의 투명성·데이터 보호 기준을 방문 지역과 관계없이 모든 방문자에게 동일하게 적용합니다. 분석·광고 또는 필수가 아닌 쿠키는 사용하지 않습니다. 언어 선택 및 관련 표시 설정을 위해 반드시 필요한 저장소(자사 쿠키 1종, 브라우저 로컬 스토리지)만 사용합니다. 광고 프로필을 만들거나 다른 사이트에서의 교차 추적은 하지 않습니다. 언제든지 브라우저 설정에서 해당 데이터를 삭제할 수 있습니다. 접근·삭제·이동·이의·처리 제한 등 GDPR상 권리가 있으며, EU 데이터 보호 감독 기관에 이의를 제기할 수 있습니다.",
    "privacy.github": "소스 코드",
    "privacy.githubAria": "이 웹사이트 소스 코드를 GitHub에서 열기(새 탭)",
    "privacy.close": "닫기",

    "eula.title": "eula",
    "eula.body":
      "본 주체가 배포하는 소프트웨어는(영국법에 따라) 라이선스됩니다. 역설계 및 재배포는 할 수 없습니다.",
    "eula.close": "닫기",

    "footer.photo1Caption": "애플 파크에서 iJustine과 함께",
    "footer.photo2Caption": "존 웨인 공항에서 비행 교관님과 함께",
    "footer.video1Caption": "뇌-컴퓨터 인터페이스로 조종한 비행 시뮬레이터",
    "footer.video2Caption": "아이폰으로 찍은 3D 머리 스캔",

    "orchestr.jebos.title": "Jeb's",
    "orchestr.jebos.tag": "임베디드 os",
    "orchestr.jebos.desc":
      "Jetson Orin Nano용 실시간 Debian 빌드. 인증 하드웨어 곧 출시.",
    "orchestr.jebos.features":
      "무빙맵, ADS-B 트래픽, ATC 트랜스크립트, 체크리스트, 차트, 비행 계획.",
    "orchestr.jebos.cta": "orchaerospace.com",
    "orchestr.floatingBanner": "orchestr aerospace",

    "jebos.platforms": "ipad · android · web",
    "jebos.earlyAccess": "얼리 액세스",
    "jebos.tagDesktop": "데스크톱",
    "jebos.tagMobile": "모바일",
    "jebos.tagWeb": "웹",
    "jebos.pitch":
      "Flight Computer 1과 조종하는 모든 항공기에서 같은 차트 소프트웨어를 씁니다.",
    "jebos.sound": "소리",
    "jebos.mute": "음소거",
    "jebos.tryAs": "이렇게도 쓸 수 있어요",
    "jebos.webApp": "웹 앱",
    "jebos.appStoreAlt": "App Store의 Jeb's Flight Bag",
    "jebos.playAlt": "Google Play의 Jeb's Flight Bag",
    "jebos.webAlt": "웹에서 쓰는 Jeb's Flight Bag",
    "jebos.screenshots": "스크린샷",
    "jebos.g.vfrPfd": "VFR 섹셔널과 합성 PFD",
    "jebos.g.satelliteWx": "위성 지형과 기상 오버레이",
    "jebos.g.vfrLa": "VFR 섹셔널 — 로스앤젤레스",
    "jebos.g.ifrSocal": "IFR 고고도 엔루트 — 남캘리포니아 B등급 공역",
    "jebos.g.planner": "비행 계획 작성",
    "jebos.g.traffic": "실시간 ADS-B 트래픽",
    "jebos.g.checklist": "비행 전 체크리스트",
    "jebos.g.poh": "POH — Cessna 152 속도표",
    "jebos.g.briefing": "METAR·TAF·PIREP 브리핑",
    "jebos.g.e6b": "내장 E6B 계산기",
    "jebos.g.vfrSynthetic": "합성 시계를 겹친 VFR 섹셔널",
    "jebos.g.ifrMontreal": "IFR 엔루트 — 몬트리올",
    "jebos.g.airportDiagram": "공항 다이어그램 — KOWD",
    "jebos.g.atc": "실시간 ATC 전사",
    "jebos.g.airac": "AIRAC·항법 데이터 설정",
    "jebos.g.pohSplit": "VFR 지도 옆의 POH 사이드바",
    "jebos.g.satelliteTraffic": "위성 오버레이와 ADS-B 접촉",

    "section.showcase": "작업",
    "section.atoms": "원자",
    "section.face": "컴퓨터 비전 (3D 재구성)",
    "section.moments": "순간",
    "section.elsewhere": "다른 곳",
    "atoms.viewerLabel": "분자 뷰어",
    "atoms.interact": "{title} 3D 뷰어 조작하기",
    "atoms.rotateTouch": "탭하면 회전",
    "atoms.rotatePointer": "클릭하면 회전",

    "hero.line1": "창작 활동",
    "hero.line2": "항공우주",
    "hero.landmark": "파일럿 · 창업자 · 엔지니어",
    "hero.email": "john@orchestrsim.com",
    "awards.wwdc": "Apple WWDC23 scholar",
    "awards.wwdcVenue": "만 19세, 최우수 수상",
    "awards.ukVisa": "영국 글로벌 탤런트 비자",
    "awards.usVisa": "미국 O-1A 비자",
    "awards.madeInQuebec": "퀘벡에서 제작",

    "media.featured": "소개된 매체",

    "navTab.label": "섹션",
    "navTab.hero": "소개",
    "navTab.atoms": "원자",
    "navTab.electron": "일렉트론",
    "navTab.face": "얼굴",
    "navTab.orch": "orch",
    "navTab.exp": "경력",
    "navTab.edu": "교육",

    "gltf.tabGd": "가돌리늄",
    "gltf.tabBenzene": "벤젠",
    "gltf.loadingBenzene": "벤젠 불러오는 중…",
    "gltf.loadingGd": "가돌리늄 불러오는 중…",
    "gltf.benzeneTitle": "벤젠 — C₆H₆",
    "gltf.benzeneBody":
      "DFT로 계산한 전자 밀도. p 오비탈이 겹쳐 π 계를 이룹니다. 만든 도구:",
    "gltf.gdTitle": "가돌리늄 — 4f⁷",
    "gltf.gdBody":
      "최외각 f 오비탈을 구면 조화함수로 모델링했습니다. iOS 앱 Atomizer AR로 만들었습니다.",

    "electron.title": "ElectronVisualized, Atomizer AR (2022 – 2025)",
    "electron.li1":
      "DFT 기반 양자역학 시각화 도구 — 웹, iOS, macOS, visionOS. 1만 다운로드. 2023 Apple Swift Student Challenge 수상작.",
    "electron.li2":
      "Three.js, React, WebXR · RDKit, SciPy, GPAW, Celery, AWS",
    "electron.li3Before": "표지에 실린 책:",
    "electron.li3Book": "데이비드 클래리 경의 저서",
    "electron.li3After": ",",
    "electron.li3Title": "Walter Kohn",
    "electron.li4": "데모:",
    "electron.visit": "방문",
    "electron.appStoreAtomizer": "App Store의 Atomizer AR",

    "face.loading": "불러오는 중…",
    "face.title": "얼굴 스캔 — 아이폰 TrueDepth",
    "face.body":
      "머리 치수 측정과 맞춤 헤드셋을 위한 3D 메싱·정합. iOS에서 사용 가능.",
    "face.cta": "YouTube에서 보기",

    "orch.title": "OpticALLY 3D Scan",
    "orch.li1": "iOS 앱 — Swift, Objective-C++, C++ 백엔드",
    "orch.li2":
      "TrueDepth 스캔과 전체 포인트 클라우드 처리: ICP, 자세 추정, 메싱, 정합",
    "orch.li3":
      "미국 가특허 출원 중(63/727,879) — 머리 자세만으로 거친 포인트 클라우드 정렬",
    "orch.appStoreAlt": "App Store의 OpticALLY 3D Scan",

    "exp.title": "경력",
    "exp.orchestr": "창업자, Orchestr Aerospace (2026)",
    "exp.orchestrSite": "https://orchestrsim.com",
    "exp.reach": "Reach Media Group — 컴퓨터 비전 엔지니어 (2025)",
    "exp.reachBody": "C++·Python 비전 파이프라인, iOS·Vue 시스템 개발.",
    "exp.snu": "서울대학교 — 연구 인턴 (2023)",
    "exp.snuBody": "Python 분자 시각화 도구 개선, AutoDock Vina용 GUI 제작.",

    "edu.title": "교육",
    "edu.hub.title": "École de pilotage Saint-Hubert (2026)",
    "edu.hub.detail": "사설조종사면허. Cessna 152, 아날로그 계기.",
    "edu.ocfc.title": "Orange County Flight Center (2025)",
    "edu.ocfc.detail": "Cessna 172, Garmin G1000.",
    "edu.sunrise.title": "Sunrise Aviation (2024)",
    "edu.sunrise.detail": "Evektor SportStar.",
    "edu.uci":
      "University of California, Irvine — 항공우주공학, 중퇴 (2023)",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["en"];
