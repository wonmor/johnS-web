export type Locale = "en" | "fr";

export const messages = {
  en: {
    "meta.title": "John Seong",
    "topBar.copyright": "© {year} john wonmo seong",
    "langToggle.en": "en",
    "langToggle.fr": "fr",
    "langToggle.label": "language",

    "localeOffer.titleEn": "display in english?",
    "localeOffer.titleFr": "display in french?",
    "localeOffer.bodyEn": "your browser prefers English. switch?",
    "localeOffer.bodyFr": "your browser prefers French. switch?",
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
      "international map, ADS-B (GPS) and vision-based traffic, ATC transcript, verbal checklist, charts, flight planning.",
    "orchestr.jebos.cta": "orchaerospace.com",
    "orchestr.floatingBanner": "orchestr aerospace",

    "jebos.platforms": "ipad · android · web",
    "jebos.earlyAccess": "early access",
    "jebos.tagDesktop": "desktop",
    "jebos.tagMobile": "mobile",
    "jebos.tagWeb": "web",
    "jebos.pitch":
      "a single software on Flight Computer 1 and in every aircraft you fly.",
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
    "section.face": "computer vision (3d reconstruction work)",
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
    "electron.li3Book": "Sir David Clary FRS’s book",
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
    "langToggle.label": "langue",

    "localeOffer.titleEn": "afficher en anglais ?",
    "localeOffer.titleFr": "afficher en français ?",
    "localeOffer.bodyEn": "votre navigateur préfère l’anglais. changer ?",
    "localeOffer.bodyFr": "votre navigateur préfère le français. changer ?",
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
      "carte internationale, trafic ADS-B (GPS) et par vision, transcription ATC, checklist verbale, cartes, planification de vol.",
    "orchestr.jebos.cta": "orchaerospace.com",
    "orchestr.floatingBanner": "orchestr aerospace",

    "jebos.platforms": "ipad · android · web",
    "jebos.earlyAccess": "accès anticipé",
    "jebos.tagDesktop": "bureau",
    "jebos.tagMobile": "mobile",
    "jebos.tagWeb": "web",
    "jebos.pitch":
      "un même logiciel sur le Flight Computer 1 et dans tous les avions que vous pilotez.",
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
    "section.face": "vision par ordinateur (travaux de reconstruction 3d)",
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
    "electron.li3Book": "livre de Sir David Clary FRS",
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
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)["en"];
