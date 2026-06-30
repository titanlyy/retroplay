<template>
  <aside class="w-16 lg:w-56 bg-gb-dark border-r border-white/5 flex flex-col py-4 shrink-0">
    <!-- Logo -->
    <div class="px-4 mb-8 flex items-center gap-3">
      <span class="text-2xl">🎮</span>
      <span class="hidden lg:block font-pixel text-gb-purple text-xs">RetroPlay</span>
    </div>

    <!-- Nav Items -->
    <nav class="flex-1 flex flex-col gap-1 px-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
        active-class="!text-white bg-gb-purple/20 !text-gb-purple"
      >
        <span class="text-xl">{{ item.icon }}</span>
        <span class="hidden lg:block text-sm font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Bottom -->
    <div class="px-2">
      <RouterLink
        to="/settings"
        class="flex items-center gap-3 px-3 py-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
        active-class="!text-white bg-gb-purple/20 !text-gb-purple"
      >
        <span class="text-xl">⚙️</span>
        <span class="hidden lg:block text-sm font-medium">Settings</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const navItems = [
  { name: 'library', label: 'Library', icon: '📚', to: '/' },
  { name: 'stats', label: 'Stats', icon: '📊', to: '/stats' }
]
</script>
