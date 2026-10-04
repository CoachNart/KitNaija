# KitNaija

**KitNaija** is a browser-native Nigerian Web3 onboarding game. It uses a mission-first GTA-style open-world structure without turning the product into a GTA clone: the player explores Nigerian cities, meets local characters, drives between objectives, makes safe choices and learns practical Web3 concepts.

## Current build

- **36 states + FCT = 37 chapters**
- City/district identity for every chapter, with Nigerian transport references and bus-stop naming
- Authored missions for Lagos, Oyo, Ogun, Osun, Rivers and FCT Abuja
- Procedural mission content for every remaining state
- Third-person Three.js world with roads, buildings, signs, NPCs, cars and mission markers
- **Functional vehicle loop:** approach car -> E/SPACE to enter -> WASD drive -> Shift boost -> Space brake -> E/SPACE exit
- **Functional mission loop:** travel -> talk -> inspect -> collect/deliver -> make a Web3 safety choice -> receive XP -> unlock next chapter
- NPC dialogue with role-specific Web3 teaching lines
- Interactive quiz/choice checks covering wallets, transactions, gas, NFTs, security, identity, payments, bridges, stablecoins, DAOs, DeFi, swaps and smart contracts
- National map for all 37 chapters
- Pause/resume, XP, mission progression and responsive mobile HUD
- Controlled Web Audio confirmation/error/completion feedback; no fake AI voice or noisy sound spam
- No wallet required to start or learn
- GitHub Actions build verification on the main branch

## Controls

| Action | Keyboard |
|---|---|
| Move / drive | WASD / Arrow keys |
| Run / vehicle boost | Shift |
| Interact / talk / enter / exit | E or Space |
| Brake | Space while driving |
| National map | M |
| Pause | Esc |

## Web3 curriculum

The game teaches practical concepts through missions rather than static articles:

**Wallets · Transactions · Gas · Security · NFTs · Identity · Payments · Bridges · Stablecoins · DAOs · DeFi · Swaps · Smart Contracts**

The player is repeatedly asked to verify the recipient, network, token, contract or recovery-secret risk. The game never requires a real transaction to teach the concept.

## Architecture

- src/gameData.js — state/city data, mission content, NPCs, transport references, city styles and objective templates.
- src/main.jsx — React shell and Three.js runtime, movement, camera, vehicles, mission state, dialogue, choices, map and audio feedback.
- src/styles.css — landing page, game HUD, mission panels, map, dialogue and responsive presentation.
- .github/workflows/build.yml — clean production build check.

## Run locally

    npm install
    npm run dev

Production build:

    npm run build

## Product direction

KitNaija is intentionally built as **Web3 onboarding through play**. The next asset-quality pass can replace procedural characters/buildings with authored 3D assets, add properly licensed Nigerian environmental audio/music, and deepen each state's unique mission chain without changing the mission engine.

The game should remain playable without a wallet; optional onchain verification can be layered on later.
