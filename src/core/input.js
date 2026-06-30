/**
 * input.js — Keyboard, Gamepad, and Touch input handler
 *
 * Translates browser input events into mGBA button codes.
 * mGBA button map: A=0, B=1, Select=2, Start=3, Right=4, Left=5, Up=6, Down=7, R=8, L=9
 */

const BUTTON = {
  A: 0, B: 1, SELECT: 2, START: 3,
  RIGHT: 4, LEFT: 5, UP: 6, DOWN: 7,
  R: 8, L: 9
}

let keymap = {}
let coreRef = null

export function initInput(mGBACore, keymapConfig) {
  coreRef = mGBACore
  keymap = keymapConfig

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  // Gamepad polling — runs every animation frame
  requestAnimationFrame(pollGamepad)
}

export function destroyInput() {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
}

function getButtonForKey(key) {
  const map = {
    [keymap.up]: BUTTON.UP,
    [keymap.down]: BUTTON.DOWN,
    [keymap.left]: BUTTON.LEFT,
    [keymap.right]: BUTTON.RIGHT,
    [keymap.a]: BUTTON.A,
    [keymap.b]: BUTTON.B,
    [keymap.start]: BUTTON.START,
    [keymap.select]: BUTTON.SELECT,
    [keymap.l]: BUTTON.L,
    [keymap.r]: BUTTON.R
  }
  return map[key] ?? null
}

function onKeyDown(e) {
  if (!coreRef) return
  const btn = getButtonForKey(e.key)
  if (btn !== null) {
    e.preventDefault()
    coreRef.buttonPress(btn)
  }
}

function onKeyUp(e) {
  if (!coreRef) return
  const btn = getButtonForKey(e.key)
  if (btn !== null) {
    coreRef.buttonUnpress(btn)
  }
}

let lastGamepadState = {}

function pollGamepad() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
  const gp = gamepads[0]

  if (gp && coreRef) {
    const mapping = [
      { gpIndex: 0, btn: BUTTON.A },   // A / Cross
      { gpIndex: 1, btn: BUTTON.B },   // B / Circle
      { gpIndex: 8, btn: BUTTON.SELECT },
      { gpIndex: 9, btn: BUTTON.START },
      { gpIndex: 4, btn: BUTTON.L },
      { gpIndex: 5, btn: BUTTON.R }
    ]

    for (const { gpIndex, btn } of mapping) {
      const pressed = gp.buttons[gpIndex]?.pressed
      if (pressed && !lastGamepadState[gpIndex]) coreRef.buttonPress(btn)
      if (!pressed && lastGamepadState[gpIndex]) coreRef.buttonUnpress(btn)
      lastGamepadState[gpIndex] = pressed
    }

    // D-Pad via axes
    const x = gp.axes[0]
    const y = gp.axes[1]
    if (x < -0.5 && !lastGamepadState.left) { coreRef.buttonPress(BUTTON.LEFT); lastGamepadState.left = true }
    else if (x >= -0.5 && lastGamepadState.left) { coreRef.buttonUnpress(BUTTON.LEFT); lastGamepadState.left = false }
    if (x > 0.5 && !lastGamepadState.right) { coreRef.buttonPress(BUTTON.RIGHT); lastGamepadState.right = true }
    else if (x <= 0.5 && lastGamepadState.right) { coreRef.buttonUnpress(BUTTON.RIGHT); lastGamepadState.right = false }
    if (y < -0.5 && !lastGamepadState.up) { coreRef.buttonPress(BUTTON.UP); lastGamepadState.up = true }
    else if (y >= -0.5 && lastGamepadState.up) { coreRef.buttonUnpress(BUTTON.UP); lastGamepadState.up = false }
    if (y > 0.5 && !lastGamepadState.down) { coreRef.buttonPress(BUTTON.DOWN); lastGamepadState.down = true }
    else if (y <= 0.5 && lastGamepadState.down) { coreRef.buttonUnpress(BUTTON.DOWN); lastGamepadState.down = false }
  }

  requestAnimationFrame(pollGamepad)
}
