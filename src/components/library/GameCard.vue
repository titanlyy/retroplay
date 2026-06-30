<template>
  <div class="card-hover group relative flex flex-col" @click="$emit('play', game)">
    <!-- Box Art -->
    <div class="relative aspect-[3/4] bg-surface-2 overflow-hidden">
      <img
        v-if="game.boxArt"
        :src="game.boxArt"
        :alt="game.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2">
        <!-- Placeholder art with gradient based on title hash -->
        <div
          class="w-full h-full absolute inset-0"
          :style="{ background: placeholderGradient }"
        />
        <span class="relative text-5xl opacity-60 select-none">{{ consoleEmoji }}</span>
        <span class="relative text-xs text-white/30 font-medium px-2 text-center line-clamp-2 select-none">
          {{ game.title }}
        </span>
      </div>

      <!-- Play overlay -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
        <div class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200 shadow-xl">
          <span class="text-xl ml-0.5">▶️</span>
        </div>
      </div>

      <!-- Console badge -->
      <div class="absolute top-2 left-2">
        <span class="badge-violet text-[10px]">{{ game.console ?? 'GBA' }}</span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3 flex flex-col gap-0.5">
      <h3 class="text-sm font-semibold text-white leading-tight line-clamp-1">{{ game.title }}</h3>
      <p class="text-xs text-white/35 line-clamp-1">{{ game.developer ?? 'Unknown Developer' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ game: Object })
defineEmits(['play'])

const consoleEmoji = computed(() => {
  const map = { GB: '🌟', GBC: '🌈', GBA: '🎮', NES: '🕹️', SNES: '🕹️' }
  return map[props.game.console] ?? '🎮'
})

const placeholderGradient = computed(() => {
  // Deterministic gradient from title string
  let hash = 0
  for (const c of props.game.title) hash = (hash * 31 + c.charCodeAt(0)) >>> 0
  const h1 = hash % 360
  const h2 = (h1 + 40) % 360
  return `linear-gradient(135deg, hsl(${h1},40%,15%) 0%, hsl(${h2},50%,20%) 100%)`
})
</script>
