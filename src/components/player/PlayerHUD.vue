<template>
  <div class="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-b from-black/50 via-transparent to-black/60">
    <!-- Top row -->
    <div class="flex items-center justify-between">
      <span class="badge-violet text-[10px]">RetroPlay</span>
      <div class="flex items-center gap-1.5">
        <select
          class="bg-black/60 backdrop-blur text-white text-xs rounded-lg px-2 py-1.5 border border-white/10 outline-none cursor-pointer"
          @change="(e) => $emit('set-speed', Number(e.target.value))"
        >
          <option value="1">1×</option>
          <option value="2">2×</option>
          <option value="4">4×</option>
          <option value="8">8×</option>
        </select>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="flex items-center justify-center gap-2">
      <button
        v-for="btn in hudButtons"
        :key="btn.label"
        class="w-9 h-9 rounded-xl bg-black/60 backdrop-blur border border-white/10
               hover:bg-violet-600/80 hover:border-violet-400/50
               text-base flex items-center justify-center
               transition-all duration-150 active:scale-90"
        :title="btn.label"
        @click="$emit(btn.event)"
      >
        {{ btn.icon }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['save', 'load', 'screenshot', 'toggle-pause'])

const hudButtons = [
  { icon: '💾', label: 'Save State',    event: 'save' },
  { icon: '📂', label: 'Load State',    event: 'load' },
  { icon: '📷', label: 'Screenshot',   event: 'screenshot' },
  { icon: '⏸️',  label: 'Pause/Resume', event: 'toggle-pause' },
]
</script>
