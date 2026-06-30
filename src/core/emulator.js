/**
 * emulator.js — mGBA WASM core using @thenick775/mgba-wasm npm package
 *
 * No local compilation needed. The WASM binary is bundled
 * via the npm package and served automatically by Vite.
 *
 * Package: https://www.npmjs.com/package/@thenick775/mgba-wasm
 */

import mGBAFactory from '@thenick775/mgba-wasm'

let core = null

/**
 * Initialise the mGBA core and bind it to a canvas element.
 * @param {HTMLCanvasElement} canvasElement
 */
export async function initCore(canvasElement) {
  core = await mGBAFactory({
    canvas: canvasElement,
    locateFile: (file, prefix) => prefix + file
  })

  await core.FSInit()
  console.log('[RetroPlay] mGBA ready —', core.version?.projectName ?? 'mGBA')
  return core
}

/**
 * Load a ROM ArrayBuffer into the emulator and start the game.
 * @param {ArrayBuffer} arrayBuffer
 * @param {string} filename - original filename for extension detection
 */
export async function loadROM(arrayBuffer, filename = 'rom.gba') {
  if (!core) throw new Error('Core not initialised — call initCore() first')
  const data = new Uint8Array(arrayBuffer)
  const path = `/${filename}`
  core.FS.writeFile(path, data)
  core.loadGame(path)
  console.log('[RetroPlay] ROM loaded:', filename, `(${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`)
}

/** Pause emulation */
export function pause() {
  core?.pauseGame()
}

/** Resume emulation */
export function resume() {
  core?.resumeGame()
}

/** Hard reset the current game */
export function reset() {
  core?.resetGame()
}

/**
 * Set fast-forward multiplier.
 * @param {number} multiplier - 1 (normal), 2, 4, or 8
 */
export function setSpeed(multiplier) {
  core?.setFastForwardMultiplier(multiplier)
}

/**
 * Save emulator state to a slot.
 * @param {number} slot - 0–7
 */
export function saveState(slot = 0) {
  core?.saveState(slot)
}

/**
 * Load emulator state from a slot.
 * @param {number} slot - 0–7
 */
export function loadState(slot = 0) {
  core?.loadState(slot)
}

/**
 * Set audio volume.
 * @param {number} level - 0.0 to 1.0
 */
export function setVolume(level) {
  core?.setVolume(Math.max(0, Math.min(1, level)))
}

/** Returns true if core is ready */
export function isReady() {
  return core !== null
}
