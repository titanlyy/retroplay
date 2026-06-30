/**
 * emulator.js — mGBA WASM core loader and controller
 *
 * This module wraps the mGBA WebAssembly core.
 * The actual mGBA WASM build (mgba.wasm + mgba.js) must be placed in /public/core/
 * after compiling mGBA with Emscripten.
 *
 * Compile instructions:
 *   1. Install Emscripten SDK: https://emscripten.org/docs/getting_started/downloads.html
 *   2. Clone mGBA: https://github.com/mgba-emu/mgba
 *   3. mkdir build-wasm && cd build-wasm
 *   4. emcmake cmake .. -DBUILD_SDL=OFF -DBUILD_LIBRETRO=OFF
 *   5. emmake make -j4
 *   6. Copy mgba.js + mgba.wasm to /public/core/
 */

let mGBA = null
let canvas = null

export async function initCore(canvasElement) {
  canvas = canvasElement

  // Load the mGBA WASM module dynamically
  // Replace this with the actual mGBA Emscripten module bootstrap
  if (typeof window.mGBA === 'undefined') {
    await loadScript('/core/mgba.js')
  }

  mGBA = await window.mGBA({
    canvas: canvasElement,
    locateFile: (file) => `/core/${file}`
  })

  console.log('[RetroPlay] mGBA core initialised')
  return mGBA
}

export async function loadROM(arrayBuffer) {
  if (!mGBA) throw new Error('Core not initialised — call initCore() first')
  const romData = new Uint8Array(arrayBuffer)
  mGBA.FS.writeFile('/rom.gba', romData)
  mGBA.loadGame('/rom.gba')
  console.log('[RetroPlay] ROM loaded:', arrayBuffer.byteLength, 'bytes')
}

export function setSpeed(multiplier) {
  if (!mGBA) return
  mGBA.setFastForwardMultiplier(multiplier)
}

export function pause() {
  if (!mGBA) return
  mGBA.pauseGame()
}

export function resume() {
  if (!mGBA) return
  mGBA.resumeGame()
}

export function reset() {
  if (!mGBA) return
  mGBA.resetGame()
}

export function saveState(slot = 0) {
  if (!mGBA) return null
  return mGBA.saveState(slot)
}

export function loadState(slot = 0) {
  if (!mGBA) return
  mGBA.loadState(slot)
}

export function setVolume(level) {
  // level: 0.0 — 1.0
  if (!mGBA) return
  mGBA.setVolume(level)
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}
