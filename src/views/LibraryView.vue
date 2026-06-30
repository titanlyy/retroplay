<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-white">Library</h1>
        <p class="text-white/40 text-sm mt-0.5">{{ store.games.length }} game{{ store.games.length !== 1 ? 's' : '' }}</p>
      </div>
      <button class="btn-primary" @click="showUploader = true">+ Add Game</button>
    </div>

    <!-- Upload Modal -->
    <div
      v-if="showUploader"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="showUploader = false"
    >
      <div class="card w-full max-w-md p-6">
        <h2 class="text-lg font-semibold mb-4">Add Game</h2>
        <RomUploader @rom-loaded="onRomLoaded" />
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="store.games.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
      <div class="text-6xl mb-4">🎮</div>
      <h2 class="text-xl font-semibold text-white/60">No games yet</h2>
      <p class="text-white/30 text-sm mt-2 max-w-xs">Add a ROM file to get started. Your games are stored locally in your browser.</p>
      <button class="btn-primary mt-6" @click="showUploader = true">Add Your First Game</button>
    </div>

    <!-- Game Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <GameCard
        v-for="game in store.games"
        :key="game.id"
        :game="game"
        @play="launchGame"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLibraryStore } from '@/stores/libraryStore'
import { writeFile } from '@/core/opfs'
import GameCard from '@/components/library/GameCard.vue'
import RomUploader from '@/components/library/RomUploader.vue'

const store = useLibraryStore()
const router = useRouter()
const showUploader = ref(false)

onMounted(() => store.loadFromStorage())

async function onRomLoaded(romData) {
  const id = `game-${Date.now()}`
  await writeFile(`roms/${id}`, new Uint8Array(romData.arrayBuffer))
  store.addGame({
    id,
    title: romData.title,
    filename: romData.filename,
    console: romData.console,
    boxArt: null,
    developer: null,
    addedAt: new Date().toISOString()
  })
  showUploader.value = false
  router.push(`/play/${id}`)
}

function launchGame(game) {
  router.push(`/play/${game.id}`)
}
</script>
