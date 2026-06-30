# 🎮 RetroPlay

A web-based Game Boy ROM player — open source, personal-use emulation platform built with WebAssembly and Vue.js.

> Inspired by [afterplay.io](https://afterplay.io). Play your Game Boy ROM collection directly in your browser — no installation required.

---

## Features

- 🕹️ **Game Boy, GBC & GBA** emulation via mGBA (WebAssembly)
- 📚 **ROM Library** with box art and metadata
- 💾 **Auto-save** every 30 seconds using browser OPFS storage
- 🎮 **Keyboard, Gamepad & Touch** controls
- 📷 **Screenshot** capture
- ⚡ **Fast Forward** up to 8×
- 🎨 **Video Shaders** — CRT, LCD, DMG Green
- 🌙 **Dark mode** UI

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Install & Run

```bash
git clone https://github.com/titanlyy/retroplay
cd retroplay
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## WASM Core Setup (mGBA)

The mGBA WebAssembly core must be compiled separately and placed in `/public/core/`.

```bash
# 1. Install Emscripten
git clone https://github.com/emscripten-core/emsdk
cd emsdk && ./emsdk install latest && ./emsdk activate latest
source ./emsdk_env.sh

# 2. Clone and build mGBA
git clone https://github.com/mgba-emu/mgba
cd mgba
mkdir build-wasm && cd build-wasm
emcmake cmake .. -DBUILD_SDL=OFF -DBUILD_LIBRETRO=OFF
emmake make -j4

# 3. Copy output to RetroPlay
cp mgba.js mgba.wasm /path/to/retroplay/public/core/
```

---

## Project Structure

```
retroplay/
├── public/
│   └── core/          # mGBA WASM files (mgba.js + mgba.wasm)
├── src/
│   ├── core/          # Emulator bridge, OPFS storage, input handler
│   ├── components/    # Vue components (library, player, layout)
│   ├── views/         # Page-level views (Library, Player, Settings, Stats)
│   ├── stores/        # Pinia state (library, emulator, settings)
│   └── router/        # Vue Router config
└── .github/
    └── workflows/     # GitHub Actions CI
```

---

## Roadmap

- [x] Phase 0 — Project scaffold
- [ ] Phase 1 — mGBA WASM core integration
- [ ] Phase 2 — ROM library & OPFS storage
- [ ] Phase 3 — Controls (keyboard, gamepad, touch)
- [ ] Phase 4 — Save states & auto-save
- [ ] Phase 5 — In-game HUD overlay
- [ ] Phase 6 — UI polish & shaders
- [ ] Phase 7 — Cheats & extras
- [ ] Phase 8 — Multiplayer (link cable via WebRTC)

---

## Legal

RetroPlay does not distribute or host ROM files. You must supply your own legally-owned ROM files. This project is for personal use only.

---

## License

MIT
