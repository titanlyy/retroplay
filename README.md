# 🎮 RetroPlay

A web-based Game Boy ROM player — open source, personal-use emulation platform built with WebAssembly and Vue.js.

> Inspired by [afterplay.io](https://afterplay.io). Play your Game Boy ROM collection directly in your browser — no installation required.

---

## ▶️ Open in GitHub Codespaces (Zero Setup)

Click the button below to launch a fully configured cloud dev environment:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/titanlyy/retroplay)

Codespaces will:
1. Spin up a cloud container with Node.js 20
2. Run `npm install` automatically
3. Start the Vite dev server
4. Open the app in your browser

No local installs. No terminal. Just click and play.

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

## Tech Stack

| Layer | Technology |
|---|---|
| Emulator Core | [@thenick775/mgba-wasm](https://www.npmjs.com/package/@thenick775/mgba-wasm) |
| Frontend | Vue 3 + Vite |
| Styling | Tailwind CSS |
| State | Pinia |
| Storage | Origin Private File System (OPFS) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub Actions |

---

## Project Structure

```
retroplay/
├── .devcontainer/         # GitHub Codespaces config
├── public/
│   └── favicon.svg
├── src/
│   ├── core/              # Emulator bridge, OPFS storage, input handler
│   ├── components/        # Vue components (library, player, layout)
│   ├── views/             # Page-level views
│   ├── stores/            # Pinia state
│   └── router/            # Vue Router
└── .github/workflows/     # GitHub Actions CI
```

---

## Roadmap

- [x] Phase 0 — Project scaffold
- [x] Phase 1 — mGBA WASM core (via npm package)
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
