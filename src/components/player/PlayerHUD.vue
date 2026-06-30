<template>
  <div
    class="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-200 group"
  >
    <!-- Top Bar -->
    <div
      class="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <span class="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">RetroPlay</span>

      <div class="flex items-center gap-1">
        <!-- Speed Selector -->
        <select
          class="bg-black/60 text-white text-xs rounded px-2 py-1 border-none outline-none"
          @change="(e) => $emit('set-speed', Number(e.target.value))"
        >
          <option value="1">1×</option>
          <option value="2">2×</option>
          <option value="4">4×</option>
          <option value="8">8×</option>
        </select>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div
      class="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <button class="hud-btn" title="Save State" @click="$emit('save')">💾</button>
      <button class="hud-btn" title="Load State" @click="$emit('load')">📂</button>
      <button class="hud-btn" title="Screenshot" @click="$emit('screenshot')">📷</button>
      <button class="hud-btn" title="Pause/Resume" @click="$emit('toggle-pause')">⏸</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['save', 'load', 'screenshot', 'toggle-pause', 'set-speed'])
</script>

<style scoped>
.hud-btn {
  @apply text-lg bg-black/60 hover:bg-gb-purple/60 rounded-lg p-2 transition-colors duration-150 cursor-pointer;
}
</style>
