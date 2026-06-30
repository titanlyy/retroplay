<template>
  <div class="p-6 lg:p-8 max-w-2xl animate-fade-up">
    <h1 class="text-2xl font-bold text-white tracking-tight mb-8">Stats</h1>

    <!-- Summary cards -->
    <div class="grid grid-cols-2 gap-3 mb-8">
      <div class="card p-5">
        <p class="section-label mb-2">Games</p>
        <p class="text-4xl font-bold text-gradient">{{ library.games.length }}</p>
      </div>
      <div class="card p-5">
        <p class="section-label mb-2">Consoles</p>
        <p class="text-4xl font-bold text-gradient">{{ uniqueConsoles }}</p>
      </div>
    </div>

    <!-- Breakdown -->
    <section>
      <p class="section-label">Library Breakdown</p>
      <div class="card divide-y divide-white/5">
        <div v-if="library.games.length === 0" class="px-5 py-10 text-center text-white/25 text-sm">
          No games in your library yet
        </div>
        <div
          v-for="(count, consoleName) in consoleBreakdown"
          :key="consoleName"
          class="flex items-center justify-between px-5 py-3.5"
        >
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ consoleIcon(consoleName) }}</span>
            <span class="text-sm text-white/70">{{ consoleName }}</span>
          </div>
          <span class="badge-violet">{{ count }} game{{ count !== 1 ? 's' : '' }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLibraryStore } from '@/stores/libraryStore'

const library = useLibraryStore()
onMounted(() => library.loadFromStorage())

const consoleBreakdown = computed(() =>
  library.games.reduce((acc, g) => {
    const c = g.console ?? 'Unknown'
    acc[c] = (acc[c] ?? 0) + 1
    return acc
  }, {})
)
const uniqueConsoles = computed(() => Object.keys(consoleBreakdown.value).length)

function consoleIcon(name) {
  return { GB: '🌟', GBC: '🌈', GBA: '🎮', NES: '🕹️', SNES: '🕹️' }[name] ?? '🎮'
}
</script>
