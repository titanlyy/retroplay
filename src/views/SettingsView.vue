<template>
  <div class="p-6 max-w-2xl">
    <h1 class="text-2xl font-bold text-white mb-6">Settings</h1>

    <!-- Controls -->
    <section class="mb-8">
      <h2 class="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Controls</h2>
      <div class="card p-4 space-y-3">
        <div v-for="(key, action) in settings.keymap" :key="action" class="flex items-center justify-between">
          <span class="text-sm text-white/70 capitalize">{{ action }}</span>
          <kbd class="bg-white/10 text-white text-xs px-3 py-1.5 rounded font-mono">{{ key }}</kbd>
        </div>
      </div>
    </section>

    <!-- Display -->
    <section class="mb-8">
      <h2 class="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Display</h2>
      <div class="card p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-white/70">Scale Factor</span>
          <select
            v-model.number="settings.scale"
            class="bg-white/10 text-white text-sm rounded px-3 py-1.5 outline-none"
          >
            <option :value="2">2× (320×288)</option>
            <option :value="3">3× (480×432)</option>
            <option :value="4">4× (640×576)</option>
            <option :value="5">5× (800×720)</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-white/70">Video Shader</span>
          <select
            v-model="settings.shader"
            class="bg-white/10 text-white text-sm rounded px-3 py-1.5 outline-none"
          >
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
      <h2 class="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Emulation</h2>
      <div class="card p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-white/70">Auto-save interval</span>
          <select
            v-model.number="settings.autoSaveInterval"
            class="bg-white/10 text-white text-sm rounded px-3 py-1.5 outline-none"
          >
            <option :value="15">Every 15s</option>
            <option :value="30">Every 30s</option>
            <option :value="60">Every 60s</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-white/70">Show touch controls</span>
          <input type="checkbox" v-model="settings.showTouchControls" class="w-4 h-4 accent-gb-purple" />
        </div>
      </div>
    </section>

    <button class="btn-ghost text-sm" @click="settings.resetToDefaults()">Reset to Defaults</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settingsStore'
const settings = useSettingsStore()
onMounted(() => settings.loadFromStorage())
</script>
