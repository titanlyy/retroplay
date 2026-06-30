<template>
  <div class="p-6 lg:p-8 max-w-screen-xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Library</h1>
        <p class="text-white/35 text-sm mt-0.5">
          {{ store.games.length === 0 ? 'No games yet' : `${store.games.length} game${store.games.length !== 1 ? 's' : ''}` }}
        </p>
      </div>
      <button class="btn-primary" @click="showUploader = true">
        <span>+</span> Add Game
      </button>
    </div>

    <!-- Upload Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showUploader"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          @click.self="showUploader = false"
        >
          <div class="card w-full max-w-md p-6 animate-fade-up shadow-2xl shadow-black/50">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-base font-semibold">Add Game</h2>
              <button class="btn-icon" @click="showUploader = false">✕</button>
            </div>
            <RomUploader @rom-loaded="onRomLoaded" />
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Empty State -->
    <Transition name="fade">
      <div
        v-if="store.games.length === 0"
        class="flex flex-col items-center justify-center py-32 text-center animate-fade-up"
      >
        <div class="w-24 h-24 rounded-3xl bg-white/4 border border-white/6 flex items-center justify-center text-5xl mb-5 shadow-inner">
          🎮
        </div>
        <h2 class="text-lg font-semibold text-white/60 mb-2">Your library is empty</h2>
        <p class="text-white/25 text-sm max-w-xs leading-relaxed">
          Upload your ROM files to get started. Games are stored locally in your browser.
        </p>
        <button class="btn-primary mt-6" @click="showUploader = true">
          Add Your First Game
        </button>
      </div>
    </Transition>

    <!-- Game Grid -->
    <div
      v-if="store.games.length > 0"
      class="grid gap-3"
      style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr))"
    >
      <div
        v-for="(game, i) in store.games"
        :key="game.id"
        class="animate-fade-up"
        :class="`stagger-${Math.min(i + 1, 4)}`"
      >
        <GameCard :game="game" @play="launchGame" />
      </div>
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

<style scoped>
.modal-enter-active { transition: opacity 0.2s ease; }
.modal-leave-active { transition: opacity 0.15s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
