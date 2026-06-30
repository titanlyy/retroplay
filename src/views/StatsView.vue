<template>
  <div class="p-6 max-w-2xl">
    <h1 class="text-2xl font-bold text-white mb-6">Stats</h1>

    <div class="grid grid-cols-2 gap-4 mb-8">
      <div class="card p-4">
        <p class="text-white/40 text-xs uppercase tracking-widest mb-1">Games in Library</p>
        <p class="text-3xl font-bold text-white">{{ library.games.length }}</p>
      </div>
      <div class="card p-4">
        <p class="text-white/40 text-xs uppercase tracking-widest mb-1">Consoles</p>
        <p class="text-3xl font-bold text-white">{{ uniqueConsoles }}</p>
      </div>
    </div>

    <div class="card p-4">
      <h2 class="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Library Breakdown</h2>
      <div v-if="library.games.length === 0" class="text-white/30 text-sm py-4 text-center">No games yet</div>
      <div v-else class="space-y-2">
        <div
          v-for="(count, console) in consoleBreakdown"
          :key="console"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-white/70">{{ console }}</span>
          <span class="text-gb-purple font-semibold">{{ count }} game{{ count !== 1 ? 's' : '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLibraryStore } from '@/stores/libraryStore'
const library = useLibraryStore()
onMounted(() => library.loadFromStorage())

const consoleBreakdown = computed(() => {
  return library.games.reduce((acc, g) => {
    const c = g.console ?? 'Unknown'
    acc[c] = (acc[c] ?? 0) + 1
    return acc
  }, {})
})

const uniqueConsoles = computed(() => Object.keys(consoleBreakdown.value).length)
</script>
