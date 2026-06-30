<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-surface p-4 gap-5">
    <!-- Back button -->
    <div class="absolute top-4 left-4">
      <button class="btn-ghost flex items-center gap-1.5 text-sm" @click="router.back()">
        ← <span>Back</span>
      </button>
    </div>

    <!-- Game title -->
    <div class="text-center mt-8">
      <h1 class="text-white/80 font-semibold text-base">{{ game?.title ?? 'Loading…' }}</h1>
      <div class="flex items-center justify-center gap-2 mt-1.5">
        <span class="badge-violet text-[10px]">{{ game?.console }}</span>
        <span v-if="emulator.isPaused" class="badge-amber text-[10px]">PAUSED</span>
        <span v-if="emulator.speed > 1" class="badge-green text-[10px]">{{ emulator.speed }}×</span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex flex-col items-center gap-3">
      <div class="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center animate-pulse">
        <span class="text-2xl">🎮</span>
      </div>
      <p class="text-white/30 text-xs">Loading core…</p>
    </div>

    <!-- Game Canvas -->
    <GameCanvas
      v-show="!loading"
      :scale="settings.scale"
      class="animate-pulse-glow"
      @canvas-ready="onCanvasReady"
      @save="saveState"
      @load="loadState"
      @toggle-pause="togglePause"
      @set-speed="setSpeed"
    />

    <!-- Touch Controls -->
    <TouchControls
      v-if="settings.showTouchControls"
      @press="onTouchPress"
      @release="onTouchRelease"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLibraryStore } from '@/stores/libraryStore'
import { useEmulatorStore } from '@/stores/emulatorStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { initCore, loadROM, saveState as coreSave, loadState as coreLoad, pause, resume, setSpeed as coreSpeed } from '@/core/emulator'
import { initInput, destroyInput } from '@/core/input'
import { readFile } from '@/core/opfs'
import GameCanvas from '@/components/player/GameCanvas.vue'
import TouchControls from '@/components/player/TouchControls.vue'

const route  = useRoute()
const router = useRouter()
const library  = useLibraryStore()
const emulator = useEmulatorStore()
const settings = useSettingsStore()
const loading  = ref(true)

const game = library.games.find((g) => g.id === route.params.id)
let coreInstance = null
let autoSaveTimer = null

async function onCanvasReady(canvas) {
  try {
    coreInstance = await initCore(canvas)
    const romFile = await readFile(`roms/${game.id}`)
    const buffer  = await romFile.arrayBuffer()
    await loadROM(buffer, game.filename)
    initInput(coreInstance, settings.keymap)
    emulator.isRunning = true
    loading.value = false
    autoSaveTimer = setInterval(() => {
      if (emulator.isRunning && !emulator.isPaused) coreSave(0)
    }, settings.autoSaveInterval * 1000)
  } catch (e) {
    console.error('[RetroPlay] Failed to start game:', e)
    loading.value = false
  }
}

function saveState()   { coreSave(0) }
function loadState()   { coreLoad(0) }
function togglePause() {
  emulator.togglePause()
  emulator.isPaused ? pause() : resume()
}
function setSpeed(s) {
  emulator.setSpeed(s)
  coreSpeed(s)
}
function onTouchPress(btn)   { coreInstance?.buttonPress(btn) }
function onTouchRelease(btn) { coreInstance?.buttonUnpress(btn) }

onUnmounted(() => {
  destroyInput()
  clearInterval(autoSaveTimer)
  emulator.reset()
})
</script>
