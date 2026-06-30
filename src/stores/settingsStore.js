import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const DEFAULTS = {
  keymap: {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    a: 'x',
    b: 'z',
    start: 'Enter',
    select: 'Shift',
    l: 'a',
    r: 's'
  },
  shader: 'none', // 'none' | 'crt' | 'lcd' | 'dmg'
  scale: 3, // integer scale factor for the canvas
  showTouchControls: true,
  autoSaveInterval: 30 // seconds
}

export const useSettingsStore = defineStore('settings', () => {
  const keymap = ref({ ...DEFAULTS.keymap })
  const shader = ref(DEFAULTS.shader)
  const scale = ref(DEFAULTS.scale)
  const showTouchControls = ref(DEFAULTS.showTouchControls)
  const autoSaveInterval = ref(DEFAULTS.autoSaveInterval)

  function loadFromStorage() {
    const saved = localStorage.getItem('retroplay:settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      keymap.value = parsed.keymap ?? DEFAULTS.keymap
      shader.value = parsed.shader ?? DEFAULTS.shader
      scale.value = parsed.scale ?? DEFAULTS.scale
      showTouchControls.value = parsed.showTouchControls ?? DEFAULTS.showTouchControls
      autoSaveInterval.value = parsed.autoSaveInterval ?? DEFAULTS.autoSaveInterval
    }
  }

  function saveToStorage() {
    localStorage.setItem(
      'retroplay:settings',
      JSON.stringify({ keymap: keymap.value, shader: shader.value, scale: scale.value, showTouchControls: showTouchControls.value, autoSaveInterval: autoSaveInterval.value })
    )
  }

  function resetToDefaults() {
    keymap.value = { ...DEFAULTS.keymap }
    shader.value = DEFAULTS.shader
    scale.value = DEFAULTS.scale
    saveToStorage()
  }

  watch([keymap, shader, scale, showTouchControls, autoSaveInterval], saveToStorage, { deep: true })

  return { keymap, shader, scale, showTouchControls, autoSaveInterval, loadFromStorage, saveToStorage, resetToDefaults }
})
