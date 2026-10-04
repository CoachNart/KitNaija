# KitNaija

**KitNaija** is a browser-native Nigerian Web3 onboarding game. The game is designed around missions first: players learn Web3 concepts by moving through Nigerian cities, meeting characters, inspecting transactions and making choices.

## Current build

- 36 states + FCT represented as **37 mission chapters**
- Authored onboarding missions for Lagos, Oyo, Rivers, FCT Abuja, Osun and Ogun
- Procedural mission generation for the remaining states, using each state's city, zone and Web3 lesson
- Third-person Three.js city scene with roads, buildings, NPCs, vehicles and mission hubs
- Mission progression with XP and persistent in-session chapter progression
- National map showing all 37 chapters
- Web3 curriculum covering wallets, transactions, gas, NFTs, security, identity, payments, bridges, stablecoins, DAOs, DeFi, swaps and smart contracts
- Keyboard controls: WASD / arrows, Shift, E / Space and M
- Responsive landing screen and mobile-friendly game HUD
- No wallet required to begin the game

## Architecture

`src/gameData.js` is the content layer: states, missions, NPC archetypes and Nigerian bus-stop names.

`src/main.jsx` is the game runtime: Three.js scene, player controller, camera, mission progression, map and HUD.

`src/styles.css` is the presentation layer.

The project deliberately keeps the Web3 lesson content separate from rendering so the world can grow without turning the game into a single hard-coded scene.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Direction

The next production layers are authored state environments, richer NPC dialogue, enterable businesses, vehicle gameplay, mission-specific props, audio, multiplayer-ready state, and optional wallet/onchain verification. The Web3 lesson should always remain playable without a wallet.
