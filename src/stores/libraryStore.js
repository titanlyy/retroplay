import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLibraryStore = defineStore('library', () => {
  const games = ref([])
  const activeGameId = ref(null)

  const activeGame = computed(() => games.value.find((g) => g.id === activeGameId.value))

  function loadFromStorage() {
    const saved = localStorage.getItem('retroplay:library')
    if (saved) {
      games.value = JSON.parse(saved)
    }
  }

  function saveToStorage() {
    localStorage.setItem('retroplay:library', JSON.stringify(games.value))
  }

  function addGame(game) {
    games.value.push(game)
    saveToStorage()
  }

  function removeGame(id) {
    games.value = games.value.filter((g) => g.id !== id)
    saveToStorage()
  }

  function updateGame(id, updates) {
    const idx = games.value.findIndex((g) => g.id === id)
    if (idx !== -1) {
      games.value[idx] = { ...games.value[idx], ...updates }
      saveToStorage()
    }
  }

  return { games, activeGameId, activeGame, loadFromStorage, addGame, removeGame, updateGame }
})
