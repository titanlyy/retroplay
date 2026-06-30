<template>
  <div class="p-6 lg:p-8 max-w-2xl animate-fade-up">
    <h1 class="text-2xl font-bold text-white tracking-tight mb-8">Settings</h1>

    <!-- Controls -->
    <section class="mb-8">
      <p class="section-label">Controls</p>
      <div class="card divide-y divide-white/5">
        <div
          v-for="(key, action) in settings.keymap"
          :key="action"
          class="flex items-center justify-between px-4 py-3"
        >
          <span class="text-sm text-white/60 capitalize">{{ action }}</span>
          <kbd class="bg-surface-3 text-white/70 text-xs px-3 py-1.5 rounded-lg font-mono border border-white/8">{{ key }}</kbd>
        </div>
      </div>
    </section>

    <!-- Display -->
    <section class="mb-8">
      <p class="section-label">Display</p>
      <div class="card divide-y divide-white/5">
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm text-white/70">Scale Factor</p>
            <p class="text-xs text-white/25 mt-0.5">Pixel size of the game screen</p>
          </div>
          <select v-model.number="settings.scale" class="select w-36">
            <option :value="2">2× &mdash; 320×288</option>
            <option :value="3">3× &mdash; 480×432</option>
            <option :value="4">4× &mdash; 640×576</option>
            <option :value="5">5× &mdash; 800×720</option>
          </select>
        </div>
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm text-white/70">Video Shader</p>
            <p class="text-xs text-white/25 mt-0.5">Post-processing visual filter</p>
          </div>
          <select v-model="settings.shader" class="select w-36">
            <option value="none">None</option>
            <option value="crt">CRT Scanlines</option>
            <option value="lcd">LCD Grid</option>
            <option value="dmg">DMG Green</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Emulation -->
    <section class="mb-8">
      <p class="section-label">Emulation</p>
      <div class="card divide-y divide-white/5">
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm text-white/70">Auto-save interval</p>
            <p class="text-xs text-white/25 mt-0.5">How often progress is saved</p>
          </div>
          <select v-model.number="settings.autoSaveInterval" class="select w-36">
            <option :value="15">Every 15s</option>
            <option :value="30">Every 30s</option>
            <option :value="60">Every 60s</option>
          </select>
        </div>
        <div class="flex items-center justify-between px-4 py-3">
          <div>
            <p class="text-sm text-white/70">Touch controls</p>
            <p class="text-xs text-white/25 mt-0.5">Show on-screen buttons on mobile</p>
          </div>
          <button
            class="relative w-11 h-6 rounded-full transition-colors duration-200"
            :class="settings.showTouchControls ? 'bg-violet-600' : 'bg-white/10'"
            @click="settings.showTouchControls = !settings.showTouchControls"
          >
            <span
              class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              :class="settings.showTouchControls ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </button>
        </div>
      </div>
    </section>

    <button class="btn-secondary text-sm" @click="settings.resetToDefaults()">Reset to Defaults</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
const settings = useSettingsStore()
onMounted(() => settings.loadFromStorage())
</script>
