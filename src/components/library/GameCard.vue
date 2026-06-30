<template>
  <div
    class="card group cursor-pointer hover:border-gb-purple/50 hover:shadow-lg hover:shadow-gb-purple/10 transition-all duration-200"
    @click="$emit('play', game)"
  >
    <!-- Box Art -->
    <div class="aspect-square bg-gb-darker relative overflow-hidden">
      <img
        v-if="game.boxArt"
        :src="game.boxArt"
        :alt="game.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-4xl text-white/10"
      >
        🎮
      </div>

      <!-- Console Badge -->
      <span
        class="absolute top-2 right-2 bg-gb-purple/80 text-white text-xs px-2 py-0.5 rounded-full font-medium"
      >
        {{ game.console ?? 'GBA' }}
      </span>
    </div>

    <!-- Info -->
    <div class="p-3">
      <h3 class="font-semibold text-sm truncate text-white">{{ game.title }}</h3>
      <p class="text-xs text-white/40 mt-0.5 truncate">{{ game.developer ?? 'Unknown' }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ game: Object })
defineEmits(['play'])
</script>
