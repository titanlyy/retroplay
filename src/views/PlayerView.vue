<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gb-darker p-4">
    <!-- Game Canvas -->
    <GameCanvas
      :scale="settings.scale"
      @canvas-ready="onCanvasReady"
      @save="saveState"
      @load="loadState"
      @toggle-pause="togglePause"
      @set-speed="setSpeed"
    />

    <!-- Touch Controls (mobile) -->
    <TouchControls
      v-if="settings.showTouchControls"
      @press="onTouchPress"
      @release="onTouchRelease"
    />

    <!-- Status Bar -->
    <div class="mt-4 flex items-center gap-4 text-white/30 text-xs">
      <span>{{ game?.title ?? 'Loading...' }}</span>
      <span>{{ game?.console }}</span>
      <span v-if="emulator.isPaused" class="text-yellow-400">PAUSED</span>
      <span v-if="emulator.speed > 1" class="text-gb-purple">{{ emulator.speed }}× speed</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLibraryStore } from '@/stores/libraryStore'
import { useEmulatorStore } from '@/stores/emulatorStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { initCore, loadROM, saveState as coreSave, loadState as coreLoad, pause, resume, setSpeed as coreSpeed } from '@/core/emulator'
import { initInput, destroyInput } from '@/core/input'
import { readFile } from '@/core/opfs'
import GameCanvas from '@/components/player/GameCanvas.vue'
import TouchControls from '@/components/player/TouchControls.vue'

const route = useRoute()
const library = useLibraryStore()
const emulator = useEmulatorStore()
const settings = useSettingsStore()

const game = library.games.find((g) => g.id === route.params.id)
let coreInstance = null

async function onCanvasReady(canvas) {
  coreInstance = await initCore(canvas)
  const romFile = await readFile(`roms/${game.id}`)
  const buffer = await romFile.arrayBuffer()
  await loadROM(buffer)
  initInput(coreInstance, settings.keymap)
  emulator.isRunning = true

  // Auto-save
  setInterval(() => {
    if (emulator.isRunning && !emulator.isPaused) saveState(0)
  }, settings.autoSaveInterval * 1000)
}

function saveState(slot = 0) { coreSave(slot) }
function loadState(slot = 0) { coreLoad(slot) }
function togglePause() {
  emulator.togglePause()
  emulator.isPaused ? pause() : resume()
}
function setSpeed(s) {
  emulator.setSpeed(s)
  coreSpeed(s)
}
function onTouchPress(btn) { coreInstance?.buttonPress(btn) }
function onTouchRelease(btn) { coreInstance?.buttonUnpress(btn) }

onUnmounted(() => {
  destroyInput()
  emulator.reset()
})
</script>
