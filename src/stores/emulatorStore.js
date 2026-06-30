import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmulatorStore = defineStore('emulator', () => {
  const isRunning = ref(false)
  const isPaused = ref(false)
  const speed = ref(1) // 1 = normal, 2 = 2x, 4 = 4x, 8 = 8x
  const volume = ref(0.8)
  const saveSlots = ref(Array(8).fill(null)) // 8 save slots
  const currentCore = ref('mgba') // 'mgba' | 'gambatte' | 'sameboy'

  function setSpeed(val) {
    speed.value = val
  }

  function togglePause() {
    isPaused.value = !isPaused.value
  }

  function setSaveSlot(index, stateBlob) {
    saveSlots.value[index] = {
      blob: stateBlob,
      timestamp: new Date().toISOString(),
      screenshot: null
    }
  }

  function reset() {
    isRunning.value = false
    isPaused.value = false
    speed.value = 1
  }

  return { isRunning, isPaused, speed, volume, saveSlots, currentCore, setSpeed, togglePause, setSaveSlot, reset }
})
