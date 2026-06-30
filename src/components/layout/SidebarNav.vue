<template>
  <aside
    class="flex flex-col shrink-0 bg-surface-1 border-r border-white/5"
    :class="collapsed ? 'w-16' : 'w-60'"
    style="transition: width 0.25s cubic-bezier(.4,0,.2,1)"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 h-16 border-b border-white/5 shrink-0">
      <div class="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-900/50">
        <span class="text-sm">🎮</span>
      </div>
      <Transition name="fade-label">
        <span v-if="!collapsed" class="font-pixel text-violet-400 text-[10px] leading-tight tracking-wide">
          RetroPlay
        </span>
      </Transition>
    </div>

    <!-- Nav -->
    <nav class="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-150 group"
        active-class="!text-violet-300 !bg-violet-600/15 hover:!bg-violet-600/20"
      >
        <span class="text-lg shrink-0 group-[.router-link-active]:drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]">{{ item.icon }}</span>
        <Transition name="fade-label">
          <span v-if="!collapsed" class="text-sm font-medium truncate">{{ item.label }}</span>
        </Transition>
      </RouterLink>
    </nav>

    <!-- Bottom -->
    <div class="p-2 border-t border-white/5 flex flex-col gap-0.5">
      <RouterLink
        to="/settings"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-150"
        active-class="!text-violet-300 !bg-violet-600/15"
      >
        <span class="text-lg shrink-0">⚙️</span>
        <Transition name="fade-label">
          <span v-if="!collapsed" class="text-sm font-medium">Settings</span>
        </Transition>
      </RouterLink>

      <!-- Collapse toggle -->
      <button
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/5 transition-all duration-150 w-full"
        @click="collapsed = !collapsed"
      >
        <span class="text-lg shrink-0 transition-transform duration-300" :style="collapsed ? 'transform:rotate(180deg)' : ''">&#x276E;</span>
        <Transition name="fade-label">
          <span v-if="!collapsed" class="text-xs">Collapse</span>
        </Transition>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const collapsed = ref(false)
const navItems = [
  { name: 'library', label: 'Library',  icon: '🎮', to: '/' },
  { name: 'stats',   label: 'Stats',    icon: '📊', to: '/stats' }
]
</script>

<style scoped>
.fade-label-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-label-leave-active { transition: opacity 0.1s ease; }
.fade-label-enter-from   { opacity: 0; transform: translateX(-6px); }
.fade-label-leave-to     { opacity: 0; }
</style>
